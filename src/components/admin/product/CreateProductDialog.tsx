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
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Plus, Save } from "lucide-react";
import { toast } from "sonner";

interface CreateProductDialogProps {
  onCreate: (
    name: string,
    brand: string,
    description: string,
    category_id: string
  ) => void;
  categories: ICategory[];
}

const CreateProductDialog: React.FC<CreateProductDialogProps> = ({
  onCreate,
  categories,
}) => {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    name: "",
    brand: "",
    description: "",
    categoryId: "", // <-- lưu id danh mục
  });

  const handleSubmit = () => {
    if (!form.name || !form.brand || !form.categoryId) {
      toast.error("Vui lòng nhập đầy đủ thông tin và chọn danh mục!");
      return;
    }

    const selectedCategory = categories.find(
      (c) => c.category_id === form.categoryId
    );
    if (!selectedCategory) {
      toast.error("Danh mục không hợp lệ!");
      return;
    }

    onCreate(form.name, form.brand, form.description, form.categoryId);
    setOpen(false);
    setForm({ name: "", brand: "", description: "", categoryId: "" });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Thêm sản phẩm
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Thêm sản phẩm mới</DialogTitle>
        </DialogHeader>

        <div className="grid gap-3 py-4">
          <Input
            placeholder="Tên sản phẩm"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <Input
            placeholder="Thương hiệu"
            value={form.brand}
            onChange={(e) => setForm({ ...form, brand: e.target.value })}
          />
          <Input
            placeholder="Mô tả"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />

          {/* Select danh mục */}
          <div className="space-y-1">
            <span className="text-sm text-muted-foreground">Danh mục</span>
            <Select
              value={form.categoryId}
              onValueChange={(val) => setForm({ ...form, categoryId: val })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Chọn danh mục" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((c) => (
                  <SelectItem key={c.category_id} value={c.category_id}>
                    {c.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter>
          <Button onClick={handleSubmit}>
            <Save className="mr-2 h-4 w-4" /> Lưu
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateProductDialog;
