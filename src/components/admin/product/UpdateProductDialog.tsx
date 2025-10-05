"use client";

import React, { useEffect, useState } from "react";
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
import { Save } from "lucide-react";
import { toast } from "sonner";

interface UpdateProductDialogProps {
  product: IProduct;
  onUpdate: (id: string, data: Partial<IProduct>) => void;
  children: React.ReactNode;
}

const UpdateProductDialog: React.FC<UpdateProductDialogProps> = ({
  product,
  onUpdate,
  children,
}) => {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    name: "",
    brand: "",
    description: "",
  });

  useEffect(() => {
    if (product) {
      setForm({
        name: product.name,
        brand: product.brand,
        description: product.description,
      });
    }
  }, [product]);

  const handleSave = () => {
    if (!form.name || !form.brand) {
      toast.error("Vui lòng nhập đầy đủ thông tin!");
      return;
    }
    onUpdate(product.product_id, form);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Cập nhật sản phẩm</DialogTitle>
        </DialogHeader>

        <div className="grid gap-3 py-4">
          <Input
            placeholder="Tên sản phẩm"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <Input
            placeholder="Thương hiệu"
            value={form.brand}
            onChange={(e) => setForm({ ...form, brand: e.target.value })}
          />
          <Input
            placeholder="Mô tả"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
        </div>

        <DialogFooter>
          <Button onClick={handleSave}>
            <Save className="mr-2 h-4 w-4" /> Lưu thay đổi
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateProductDialog;
