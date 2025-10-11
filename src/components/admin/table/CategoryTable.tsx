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
import { Trash, Plus } from "lucide-react";
import { categoryApi } from "@/services/api-category";
import CreateCategory from "../category/CreateCategory";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";

interface ICategory {
  category_id: string;
  name: string;
  created_at: Date;
  updated_at: Date;
}

const CategoryTable = () => {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [openCreate, setOpenCreate] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState<ICategory | null>(
    null
  );
  const limit = 10;

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await categoryApi.findAll(page, limit);
      if (res && res.data) {
        setCategories(res.data.categories);
        setTotal(res.data.total || 30);
      }
    };
    fetchCategories();
  }, [page, categories]);

  const totalPages = Math.ceil(total / limit);

  const handleDelete = (category: ICategory) => {
    setCategoryToDelete(category);
    setOpenDeleteDialog(true);
  };

  const confirmDelete = async () => {
    if (categoryToDelete) {
      const res = await categoryApi.delete(categoryToDelete.category_id);
      if (res.success) {
        toast.success("Category deleted");
      } else toast.error("Error when deleted");
      setOpenDeleteDialog(false);
    }
  };

  return (
    <div className="rounded-md border bg-background shadow-sm p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Quản lý danh mục</h2>
        <Button onClick={() => setOpenCreate(true)}>
          <Plus className="mr-2 h-4 w-4" /> Thêm danh mục
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Tên danh mục</TableHead>
            <TableHead>Ngày tạo</TableHead>
            <TableHead>Cập nhật</TableHead>
            <TableHead className="text-right">Hành động</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {categories.map((c) => (
            <TableRow key={c.category_id}>
              <TableCell>{c.name}</TableCell>
              <TableCell>
                {new Date(c.created_at).toLocaleDateString("vi-VN")}
              </TableCell>
              <TableCell>
                {new Date(c.updated_at).toLocaleDateString("vi-VN")}
              </TableCell>
              <TableCell className="text-right space-x-2">
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDelete(c)}
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

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

      <CreateCategory open={openCreate} onClose={() => setOpenCreate(false)} />

      {/* Xác nhận xoá danh mục */}
      <Dialog open={openDeleteDialog} onOpenChange={setOpenDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Xác nhận xoá</DialogTitle>
          </DialogHeader>
          <div className="mt-4">
            <p>
              Bạn có chắc chắn muốn xoá danh mục {categoryToDelete?.name}
              không?
            </p>
          </div>
          <DialogFooter className="mt-6">
            <Button
              variant="outline"
              onClick={() => setOpenDeleteDialog(false)}
            >
              Hủy
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Xoá
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CategoryTable;
