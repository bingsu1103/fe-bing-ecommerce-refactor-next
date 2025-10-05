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
import { Trash, Pencil } from "lucide-react";
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
import CreateUserDialog from "../user/CreateUserDialog";
import UpdateUserDialog from "../user/UpdateUserDialog";

const UserTable = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const limit = 10;

  useEffect(() => {
    const mockUsers: IUser[] = Array.from({ length: 10 }, (_, i) => ({
      user_id: `user-${(page - 1) * 10 + i + 1}`,
      full_name: `User ${(page - 1) * 10 + i + 1}`,
      email: `user${i + 1}@example.com`,
      phone: "0123456789",
      address: "TP.HCM",
      created_at: new Date(),
      updated_at: new Date(),
      deletedAt: null,
    }));
    setUsers(mockUsers);
    setTotal(50);
  }, [page]);

  const totalPages = Math.ceil(total / limit);

  const handleCreateUser = (
    data: Omit<IUser, "user_id" | "created_at" | "updated_at" | "deletedAt">
  ) => {
    setUsers((prev) => [
      ...prev,
      {
        ...data,
        user_id: `user-${Date.now()}`,
        created_at: new Date(),
        updated_at: new Date(),
        deletedAt: null,
      },
    ]);
    toast.success("Thêm người dùng thành công!");
  };

  const handleUpdateUser = (id: string, data: Partial<IUser>) => {
    setUsers((prev) =>
      prev.map((u) =>
        u.user_id === id ? { ...u, ...data, updated_at: new Date() } : u
      )
    );
    toast.success("Cập nhật người dùng thành công!");
  };

  const handleDelete = (id: string) => {
    setUsers((prev) => prev.filter((u) => u.user_id !== id));
    toast.success("Xoá người dùng thành công!");
  };

  return (
    <div className="rounded-md border bg-background shadow-sm p-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Quản lý người dùng</h2>
        <CreateUserDialog onCreate={handleCreateUser} />
      </div>

      {/* Table */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Họ tên</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Điện thoại</TableHead>
            <TableHead>Địa chỉ</TableHead>
            <TableHead className="text-right">Hành động</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {users.map((u) => (
            <TableRow key={u.user_id}>
              <TableCell>{u.full_name}</TableCell>
              <TableCell>{u.email}</TableCell>
              <TableCell>{u.phone}</TableCell>
              <TableCell>{u.address}</TableCell>

              <TableCell className="text-right flex justify-end gap-2">
                {/* === EDIT === */}
                <Tooltip>
                  <TooltipTrigger asChild>
                    <UpdateUserDialog user={u} onUpdate={handleUpdateUser}>
                      <Button variant="outline" size="sm">
                        <Pencil className="h-4 w-4" />
                      </Button>
                    </UpdateUserDialog>
                  </TooltipTrigger>
                  <TooltipContent>Sửa người dùng</TooltipContent>
                </Tooltip>

                {/* === DELETE === */}
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
                            Bạn có chắc chắn muốn xoá{" "}
                            <strong>{u.full_name}</strong> không? Hành động này
                            không thể hoàn tác.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Huỷ</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleDelete(u.user_id)}
                          >
                            Xoá
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </TooltipTrigger>
                  <TooltipContent>Xoá người dùng</TooltipContent>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Pagination */}
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

export default UserTable;
