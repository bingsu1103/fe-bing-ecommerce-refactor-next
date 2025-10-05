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
import { Pencil, Save } from "lucide-react";
import { toast } from "sonner";

type UpdatePayload = Partial<
  Omit<IUser, "user_id" | "created_at" | "updated_at">
> & {
  phone?: string | null;
  address?: string | null;
};

interface UpdateUserDialogProps {
  user: IUser;
  onUpdate: (id: string, data: UpdatePayload) => Promise<void> | void;
  children?: React.ReactNode;
}

const UpdateUserDialog: React.FC<UpdateUserDialogProps> = ({
  user,
  onUpdate,
  children,
}) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    full_name: "",
    email: "",
    phone: "",
    address: "",
  });

  useEffect(() => {
    if (open) {
      setForm({
        full_name: user.full_name ?? "",
        email: user.email ?? "",
        phone: user.phone ?? "",
        address: user.address ?? "",
      });
    }
  }, [open, user]);

  const handleSave = async () => {
    if (!form.full_name.trim() || !form.email.trim()) {
      toast.error("Vui lòng nhập họ tên và email");
      return;
    }
    try {
      setLoading(true);
      await onUpdate(user.user_id, {
        full_name: form.full_name.trim(),
        email: form.email.trim(),
        phone: form.phone ? form.phone.trim() : null,
        address: form.address ? form.address.trim() : null,
      });

      setOpen(false);
    } catch (e) {
    } finally {
      setLoading(false);
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

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Sửa thông tin người dùng</DialogTitle>
        </DialogHeader>

        <div className="grid gap-3 py-2">
          <Input
            placeholder="Họ và tên"
            value={form.full_name}
            onChange={(e) =>
              setForm((s) => ({ ...s, full_name: e.target.value }))
            }
          />
          <Input
            placeholder="Email"
            type="email"
            value={form.email}
            onChange={(e) => setForm((s) => ({ ...s, email: e.target.value }))}
          />
          <Input
            placeholder="Số điện thoại"
            value={form.phone}
            onChange={(e) => setForm((s) => ({ ...s, phone: e.target.value }))}
          />
          <Input
            placeholder="Địa chỉ"
            value={form.address}
            onChange={(e) =>
              setForm((s) => ({ ...s, address: e.target.value }))
            }
          />
        </div>

        <DialogFooter>
          <Button onClick={handleSave} disabled={loading}>
            <Save className="mr-2 h-4 w-4" />
            {loading ? "Đang lưu..." : "Lưu thay đổi"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateUserDialog;
