/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useMemo, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Pencil, Save, Trash, Plus } from "lucide-react";
import { toast } from "sonner";
import { variantApi } from "@/services/api-variant";

interface UpdateProductDialogProps {
  product: IProduct;
  onUpdate: (id: string, data: Partial<IProduct>) => Promise<void> | void;
  children?: React.ReactNode;
}

const UpdateProductDialog: React.FC<UpdateProductDialogProps> = ({
  product,
  onUpdate,
  children,
}) => {
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);

  // ===== product fields =====
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [description, setDescription] = useState("");

  // ===== variants =====
  const initialVariants: IVariant[] = useMemo(
    () =>
      (product.variants || []).map((v) => ({
        variant_id: v.variant_id ?? "",
        layout: (v as any)?.layout ?? "",
        color: (v as any)?.color ?? "",
        price: Number((v as any)?.price ?? 0),
        stock_quantity: Number((v as any)?.stock_quantity ?? 0),
      })),
    [product.variants]
  );
  const [variants, setVariants] = useState<IVariant[]>(initialVariants);

  // editing one row
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editForm, setEditForm] = useState<IVariant>({
    layout: "",
    color: "",
    price: 0,
    stock_quantity: 0,
  });

  // add row form
  const [addForm, setAddForm] = useState<IVariant>({
    layout: "",
    color: "",
    price: 0,
    stock_quantity: 0,
  });

  useEffect(() => {
    if (open) {
      setName(product.name ?? "");
      setBrand(product.brand ?? "");
      setDescription(product.description ?? "");
      setVariants(initialVariants);
      setEditingIndex(null);
      setEditForm({ layout: "", color: "", price: 0, stock_quantity: 0 });
      setAddForm({ layout: "", color: "", price: 0, stock_quantity: 0 });
    }
  }, [open, product, initialVariants]);

  // ===== handlers =====
  const handleSaveProduct = async () => {
    if (!name.trim() || !brand.trim()) {
      toast.error("Vui lòng nhập Tên sản phẩm và Thương hiệu.");
      return;
    }
    try {
      setSaving(true);
      await onUpdate(product.product_id, {
        name: name.trim(),
        brand: brand.trim(),
        description: description.trim(),
      });
      toast.success("Cập nhật sản phẩm thành công!");
      setOpen(false);
    } catch {
      toast.error("Không thể cập nhật sản phẩm.");
    } finally {
      setSaving(false);
    }
  };

  const startEdit = (index: number) => {
    setEditingIndex(index);
    setEditForm({ ...variants[index] });
  };

  const cancelEdit = () => {
    setEditingIndex(null);
    setEditForm({ layout: "", color: "", price: 0, stock_quantity: 0 });
  };

  const commitEdit = async () => {
    if (!editForm.layout.trim() || !editForm.color.trim()) {
      toast.error("Variant cần có layout và color.");
      return;
    }

    try {
      if (!editForm.variant_id) {
        toast.error("Không tìm thấy ID của variant.");
        return;
      }

      await variantApi.update(editForm.variant_id, {
        layout: editForm.layout.trim(),
        color: editForm.color.trim(),
        price: Number(editForm.price) || 0,
        stock_quantity: Number(editForm.stock_quantity) || 0,
      });

      setVariants((prev) =>
        prev.map((v, i) =>
          i === editingIndex
            ? {
                ...v,
                layout: editForm.layout.trim(),
                color: editForm.color.trim(),
                price: Number(editForm.price) || 0,
                stock_quantity: Number(editForm.stock_quantity) || 0,
              }
            : v
        )
      );

      toast.success("Đã cập nhật variant thành công!");
      cancelEdit();
    } catch {
      toast.error("Không thể cập nhật variant.");
    }
  };

  const deleteVariant = (index: number) => {
    setVariants((prev) => prev.filter((_, i) => i !== index));
  };

  const addVariant = async () => {
    if (!addForm.layout.trim() || !addForm.color.trim()) {
      toast.error("Vui lòng nhập layout và color cho variant.");
      return;
    }
    // Gọi API tạo variant nếu cần
    try {
      await variantApi.create(
        product.product_id,
        addForm.layout,
        addForm.color,
        addForm.price as number,
        addForm.stock_quantity
      );
      setVariants((prev) => [
        ...prev,
        {
          layout: addForm.layout.trim(),
          color: addForm.color.trim(),
          price: Number(addForm.price) || 0,
          stock_quantity: Number(addForm.stock_quantity) || 0,
        },
      ]);
      setAddForm({ layout: "", color: "", price: 0, stock_quantity: 0 });
      toast.success("Đã thêm variant.");
    } catch {
      toast.error("Không thể thêm variant.");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children ? (
          children
        ) : (
          <Button variant="outline" size="sm" onClick={() => setOpen(true)}>
            <Pencil className="h-4 w-4" />
          </Button>
        )}
      </DialogTrigger>

      <DialogContent className="w-[95vw] max-w-5xl p-6 max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Chỉnh sửa sản phẩm</DialogTitle>
        </DialogHeader>

        {/* ===== Product basic fields ===== */}
        <div className="grid gap-3 py-2">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <Input
              placeholder="Tên sản phẩm"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Input
              placeholder="Thương hiệu"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
            />
            <Input
              placeholder="Mô tả"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="text-xs text-muted-foreground">
            ID: <Badge variant="outline">{product.product_id}</Badge>
          </div>
        </div>

        {/* ===== Variants table ===== */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h4 className="font-medium">Variants</h4>
            <Badge variant={variants.length ? "secondary" : "destructive"}>
              {variants.length
                ? `${variants.length} variant(s)`
                : "Missing variants"}
            </Badge>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[20%]">Layout</TableHead>
                <TableHead className="w-[20%]">Color</TableHead>
                <TableHead className="w-[20%]">Price (₫)</TableHead>
                <TableHead className="w-[20%]">Stock</TableHead>
                <TableHead className="w-[20%] text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {variants.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-sm py-6">
                    Chưa có variant nào
                  </TableCell>
                </TableRow>
              ) : (
                variants.map((v, i) =>
                  editingIndex === i ? (
                    <TableRow key={`editing-${i}`}>
                      <TableCell>
                        <Input
                          value={editForm.layout}
                          onChange={(e) =>
                            setEditForm((s) => ({
                              ...s,
                              layout: e.target.value,
                            }))
                          }
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          value={editForm.color}
                          onChange={(e) =>
                            setEditForm((s) => ({
                              ...s,
                              color: e.target.value,
                            }))
                          }
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          type="number"
                          inputMode="numeric"
                          value={String(editForm.price)}
                          onChange={(e) =>
                            setEditForm((s) => ({
                              ...s,
                              price: Number(e.target.value),
                            }))
                          }
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          type="number"
                          inputMode="numeric"
                          value={String(editForm.stock_quantity)}
                          onChange={(e) =>
                            setEditForm((s) => ({
                              ...s,
                              stock_quantity: Number(e.target.value),
                            }))
                          }
                        />
                      </TableCell>
                      <TableCell className="text-right space-x-2">
                        <Button size="sm" onClick={commitEdit}>
                          <Save className="h-4 w-4 mr-1" />
                          Lưu
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={cancelEdit}
                        >
                          Huỷ
                        </Button>
                      </TableCell>
                    </TableRow>
                  ) : (
                    <TableRow key={i}>
                      <TableCell>{v.layout}</TableCell>
                      <TableCell className="capitalize">{v.color}</TableCell>
                      <TableCell>
                        {Number(v.price).toLocaleString("vi-VN")}
                      </TableCell>
                      <TableCell>{Number(v.stock_quantity)}</TableCell>
                      <TableCell className="text-right space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => startEdit(i)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => deleteVariant(i)}
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  )
                )
              )}

              {/* Add row */}
              <TableRow>
                <TableCell>
                  <Input
                    placeholder="Layout (VD: ANSI)"
                    value={addForm.layout}
                    onChange={(e) =>
                      setAddForm((s) => ({ ...s, layout: e.target.value }))
                    }
                  />
                </TableCell>
                <TableCell>
                  <Input
                    placeholder="Color (VD: black)"
                    value={addForm.color}
                    onChange={(e) =>
                      setAddForm((s) => ({ ...s, color: e.target.value }))
                    }
                  />
                </TableCell>
                <TableCell>
                  <Input
                    placeholder="Giá"
                    type="number"
                    inputMode="numeric"
                    value={String(addForm.price)}
                    onChange={(e) =>
                      setAddForm((s) => ({
                        ...s,
                        price: Number(e.target.value),
                      }))
                    }
                  />
                </TableCell>
                <TableCell>
                  <Input
                    placeholder="Tồn kho"
                    type="number"
                    inputMode="numeric"
                    value={String(addForm.stock_quantity)}
                    onChange={(e) =>
                      setAddForm((s) => ({
                        ...s,
                        stock_quantity: Number(e.target.value),
                      }))
                    }
                  />
                </TableCell>
                <TableCell className="text-right">
                  <Button size="sm" onClick={addVariant}>
                    <Plus className="h-4 w-4 mr-1" />
                    Thêm variant
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>

        <DialogFooter className="mt-4">
          <Button onClick={handleSaveProduct} disabled={saving}>
            <Save className="mr-2 h-4 w-4" />
            {saving ? "Đang lưu..." : "Lưu thay đổi"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateProductDialog;
