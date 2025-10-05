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
import { Pencil, Trash, Plus } from "lucide-react";

const CategoryTable = () => {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const limit = 10;

  useEffect(() => {
    const mock: ICategory[] = Array.from({ length: 10 }, (_, i) => ({
      category_id: `cat-${i + 1}`,
      name: `Category ${i + 1}`,
      created_at: new Date(),
      updated_at: new Date(),
    }));
    setCategories(mock);
    setTotal(30);
  }, [page]);

  const totalPages = Math.ceil(total / limit);

  return (
    <div className="rounded-md border bg-background shadow-sm p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Quản lý danh mục</h2>
        <Button>
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
                <Button variant="outline" size="sm">
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button variant="destructive" size="sm">
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
    </div>
  );
};

export default CategoryTable;
