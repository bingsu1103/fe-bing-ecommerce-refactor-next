"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { categoryApi } from "@/services/api-category";
import { toast } from "sonner";

interface CreateCategoryProps {
  open: boolean;
  onClose: () => void;
}

const CreateCategory: React.FC<CreateCategoryProps> = ({ open, onClose }) => {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!name.trim()) {
      toast.error("Vui lòng nhập tên danh mục!");
      return;
    }

    setLoading(true);
    try {
      const res = await categoryApi.create(name);
      if (res && res.data) {
        toast.success("Thêm danh mục thành công!");
        setName("");
        onClose();
      }
    } catch (error) {
      toast.error("Không thể thêm danh mục. Vui lòng thử lại!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Thêm danh mục mới</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          <Input
            placeholder="Nhập tên danh mục..."
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <DialogFooter className="mt-6">
          <Button variant="outline" onClick={onClose}>
            Hủy
          </Button>
          <Button onClick={handleSubmit} disabled={loading}>
            {loading ? "Đang lưu..." : "Lưu"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateCategory;
