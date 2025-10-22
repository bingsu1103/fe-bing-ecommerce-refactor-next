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
import { orderApi } from "@/services/api-order";

const OrderTable = () => {
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [page, setPage] = useState(1);
  const limit = 10;
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchOrders = async () => {
      const res = await orderApi.findAll(page, limit);
      if (res && res.data) {
        setOrders(res.data.orders);
        setTotal(Number(res.data?.total));
      }
    };
    fetchOrders();
  }, [page]);

  const totalPages = Math.ceil(total / limit);

  return (
    <div className="rounded-md border bg-background shadow-sm p-4">
      <h2 className="text-xl font-semibold mb-4">Quản lý đơn hàng</h2>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Mã đơn</TableHead>
            <TableHead>Trạng thái</TableHead>
            <TableHead>Tổng tiền</TableHead>
            <TableHead>Ngày đặt</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((o) => (
            <TableRow key={o.order_id}>
              <TableCell>{o.order_id}</TableCell>
              <TableCell>{o.order_status}</TableCell>
              <TableCell>
                {Number(o.total_price).toLocaleString("vi-VN")}₫
              </TableCell>
              <TableCell>
                {new Date(o.created_at).toLocaleDateString("vi-VN")}
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

export default OrderTable;
