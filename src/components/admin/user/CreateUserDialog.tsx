"use client";

import React, { useState } from "react";
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
import { Plus, Save } from "lucide-react";
import { toast } from "sonner";

type CreatePayload = Omit<
  IUser,
  "user_id" | "created_at" | "updated_at" | "deletedAt"
> & {
  phone: string | null;
  address: string | null;
};

interface CreateUserDialogProps {
  onCreate: (data: CreatePayload) => Promise<void> | void;
  children?: React.ReactNode; // optional custom trigger
}

const CreateUserDialog: React.FC<CreateUserDialogProps> = ({
  onCreate,
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

  const handleSave = async () => {
    if (!form.full_name.trim() || !form.email.trim()) {
      toast.error("Vui lòng nhập họ tên và email");
      return;
    }
    try {
      setLoading(true);
      await onCreate({
        full_name: form.full_name.trim(),
        email: form.email.trim(),
        phone: form.phone ? form.phone.trim() : null,
        address: form.address ? form.address.trim() : null,
      });
      toast.success("Thêm người dùng thành công!");
      setOpen(false);
      setForm({ full_name: "", email: "", phone: "", address: "" });
    } catch (e) {
      toast.error("Không thể thêm người dùng");
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
          <Button onClick={() => setOpen(true)}>
            <Plus className="mr-2 h-4 w-4" /> Thêm người dùng
          </Button>
        )}
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Thêm người dùng mới</DialogTitle>
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
            {loading ? "Đang lưu..." : "Lưu"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateUserDialog;
