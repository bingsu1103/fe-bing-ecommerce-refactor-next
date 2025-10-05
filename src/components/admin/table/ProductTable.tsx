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

const ProductTable = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [page, setPage] = useState(1);
  const limit = 10;
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const mock: IProduct[] = Array.from({ length: 10 }, (_, i) => ({
      product_id: `p-${i + 1}`,
      name: `Product ${i + 1}`,
      description: "Mô tả sản phẩm demo",
      brand: "BrandX",
      category: {
        category_id: "c1",
        name: "Laptop",
        created_at: new Date(),
        updated_at: new Date(),
      },
      variants: [],
      created_at: new Date(),
      updated_at: new Date(),
    }));
    setProducts(mock);
    setTotal(50);
  }, [page]);

  const totalPages = Math.ceil(total / limit);

  return (
    <div className="rounded-md border bg-background shadow-sm p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Quản lý sản phẩm</h2>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Thêm sản phẩm
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Tên sản phẩm</TableHead>
            <TableHead>Thương hiệu</TableHead>
            <TableHead>Danh mục</TableHead>
            <TableHead>Mô tả</TableHead>
            <TableHead className="text-right">Hành động</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((p) => (
            <TableRow key={p.product_id}>
              <TableCell>{p.name}</TableCell>
              <TableCell>{p.brand}</TableCell>
              <TableCell>{p.category?.name}</TableCell>
              <TableCell className="truncate max-w-[200px]">
                {p.description}
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

export default ProductTable;
