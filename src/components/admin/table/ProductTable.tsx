"use client";

import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Pencil, Trash } from "lucide-react";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import CreateProductDialog from "../product/CreateProductDialog";
import { productApi } from "@/services/api-product";
import UpdateProductDialog from "../product/UpdateProductDialog";
import { categoryApi } from "@/services/api-category";
import { Badge } from "@/components/ui/badge";
import { variantApi } from "@/services/api-variant";

const ProductTable = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [page, setPage] = useState(1);
  const limit = 10;
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<ICategory[]>([]);

  // ===== FETCH PRODUCTS =====
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await productApi.findAll({ page, limit });
        if (res.data?.product) {
          setProducts(res.data.product);
          setTotal(res.data.total || 0);
        } else {
          setProducts([]);
          setTotal(0);
        }
      } catch {
        toast.error("Không thể tải danh sách sản phẩm!");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [page]);

  useEffect(() => {
    const fetchCategories = async () => {
      const categoriesRes = await categoryApi.findAll(1, 100);
      setCategories(categoriesRes.data?.categories || []);
    };
    fetchCategories();
  }, []);

  const totalPages = Math.max(1, Math.ceil(total / limit));

  // ===== HANDLERS =====
  const handleCreate = async (
    name: string,
    brand: string,
    description: string,
    category_id: string
  ) => {
    const res = await productApi.create(name, brand, description, category_id);
    setProducts((prev) => [res.data as IProduct, ...prev]);
    toast.success("Thêm sản phẩm thành công!");
  };

  const handleUpdate = async (id: string, updated: Partial<IProduct>) => {
    await productApi.update(id, updated);
    setProducts((prev) =>
      prev.map((p) => (p.product_id === id ? { ...p, ...updated } : p))
    );
    toast.success("Cập nhật sản phẩm thành công!");
  };

  const handleDelete = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.product_id !== id));
    toast.success("Xoá sản phẩm thành công!");
  };

  // ===== RENDER =====
  return (
    <div className="rounded-md border bg-background shadow-sm p-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Quản lý sản phẩm</h2>
        <CreateProductDialog onCreate={handleCreate} categories={categories} />
      </div>

      {/* Table */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Tên sản phẩm</TableHead>
            <TableHead>Thương hiệu</TableHead>
            <TableHead>Danh mục</TableHead>
            <TableHead>Mô tả</TableHead>
            <TableHead>Variant</TableHead>
            <TableHead className="text-right">Hành động</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-6">
                Đang tải dữ liệu...
              </TableCell>
            </TableRow>
          ) : products.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-6">
                Không có sản phẩm nào
              </TableCell>
            </TableRow>
          ) : (
            products.map((p) => (
              <TableRow key={p.product_id}>
                <TableCell>{p.name}</TableCell>
                <TableCell>{p.brand}</TableCell>
                <TableCell>{p.category?.name}</TableCell>
                <TableCell className="truncate max-w-[200px]">
                  {p.description}
                </TableCell>
                <TableCell className="truncate max-w-[200px]">
                  {p.variants?.length === 0 ? (
                    <Badge variant={"destructive"}>Mising variant</Badge>
                  ) : (
                    <Badge style={{ backgroundColor: "green" }}>Valid</Badge>
                  )}
                </TableCell>
                <TableCell className="text-right flex justify-end gap-2">
                  {/* EDIT */}
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <UpdateProductDialog product={p} onUpdate={handleUpdate}>
                        <Button variant="outline" size="sm">
                          <Pencil className="h-4 w-4" />
                        </Button>
                      </UpdateProductDialog>
                    </TooltipTrigger>
                    <TooltipContent>Sửa sản phẩm</TooltipContent>
                  </Tooltip>

                  {/* DELETE */}
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="destructive" size="sm">
                            <Trash className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Xác nhận xoá?</AlertDialogTitle>
                            <AlertDialogDescription>
                              Bạn có chắc muốn xoá <strong>{p.name}</strong>{" "}
                              không? Hành động này không thể hoàn tác.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Huỷ</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDelete(p.product_id)}
                            >
                              Xoá
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </TooltipTrigger>
                    <TooltipContent>Xoá sản phẩm</TooltipContent>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      {/* Pagination */}
      {total > 0 && (
        <div className="flex justify-center py-4">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  className={page === 1 ? "opacity-50 pointer-events-none" : ""}
                />
              </PaginationItem>
              <PaginationItem>
                <span className="px-4 py-2 text-sm text-muted-foreground">
                  Trang {page}/{totalPages}
                </span>
              </PaginationItem>
              <PaginationItem>
                <PaginationNext
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  className={
                    page === totalPages ? "opacity-50 pointer-events-none" : ""
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
};

export default ProductTable;
