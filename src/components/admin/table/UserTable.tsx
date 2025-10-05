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
import { userApi } from "@/services/api-user";

const UserTable = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const limit = 10;

  // ===== FETCH USERS =====
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const res = await userApi.findAll(page, 10);
        if (res.data?.users) {
          setUsers(res.data.users);
          setTotal(res.data.total || 0);
        } else {
          setUsers([]);
          setTotal(0);
        }
      } catch (err) {
        toast.error("Không thể tải danh sách người dùng!");
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, [page]);

  const totalPages = Math.max(1, Math.ceil(total / limit));

  // ===== HANDLERS =====
  const handleCreateUser = async (
    data: Omit<IUser, "user_id" | "created_at" | "updated_at" | "deletedAt">
  ) => {
    try {
      await userApi.create(data);
      toast.success("Thêm người dùng thành công!");
      setPage(1);
    } catch {
      toast.error("Không thể thêm người dùng!");
    }
  };

  const handleUpdateUser = async (id: string, data: Partial<IUser>) => {
    try {
      await userApi.update(id, data);
      setUsers((prev) =>
        prev.map((u) =>
          u.user_id === id ? { ...u, ...data, updated_at: new Date() } : u
        )
      );
      toast.success("Cập nhật người dùng thành công!");
    } catch {
      toast.error("Không thể cập nhật người dùng!");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await userApi.delete(id);
      setUsers((prev) => prev.filter((u) => u.user_id !== id));
      setTotal((t) => t - 1);
      toast.success("Xoá người dùng thành công!");
    } catch {
      toast.error("Không thể xoá người dùng!");
    }
  };

  // ===== UI =====
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
          {loading ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-6 text-sm">
                Đang tải dữ liệu...
              </TableCell>
            </TableRow>
          ) : users.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-6 text-sm">
                Không có người dùng nào
              </TableCell>
            </TableRow>
          ) : (
            users.map((u) => (
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
                              <strong>{u.full_name}</strong>? Hành động này
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

export default UserTable;
