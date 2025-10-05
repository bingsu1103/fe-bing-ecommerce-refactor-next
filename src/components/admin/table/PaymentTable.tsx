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
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const PaymentTable = () => {
  const [payments, setPayments] = useState<IPayment[]>([]);
  const [page, setPage] = useState(1);
  const limit = 10;
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const mock: IPayment[] = Array.from({ length: 10 }, (_, i) => ({
      payment_id: `pay-${i + 1}`,
      payment_method: "Credit Card",
      amount: 500000 + i * 20000,
      status: i % 2 ? "Success" : "Pending",
      created_at: new Date(),
      updated_at: new Date(),
      user: {
        user_id: "u1",
        full_name: "John Doe",
        email: "john@example.com",
        phone: null,
        address: null,
        created_at: new Date(),
        updated_at: new Date(),
        deletedAt: null,
      },
      order: {
        order_id: "o1",
        order_status: "Delivered",
        total_price: "500000",
        created_at: new Date(),
        updated_at: new Date(),
      },
    }));
    setPayments(mock);
    setTotal(60);
  }, [page]);

  const totalPages = Math.ceil(total / limit);

  return (
    <div className="rounded-md border bg-background shadow-sm p-4">
      <h2 className="text-xl font-semibold mb-4">Quản lý thanh toán</h2>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Mã thanh toán</TableHead>
            <TableHead>Người dùng</TableHead>
            <TableHead>Phương thức</TableHead>
            <TableHead>Trạng thái</TableHead>
            <TableHead>Số tiền</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {payments.map((p) => (
            <TableRow key={p.payment_id}>
              <TableCell>{p.payment_id}</TableCell>
              <TableCell>{p.user.full_name}</TableCell>
              <TableCell>{p.payment_method}</TableCell>
              <TableCell>{p.status}</TableCell>
              <TableCell>{Number(p.amount).toLocaleString("vi-VN")}₫</TableCell>
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

export default PaymentTable;
