"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
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
import { useState } from "react";

interface CartContentProps {
  cart: ICart;
  onRemove: (id: string) => void;
  onQuantityChange: (id: string, delta: number) => void;
}

export default function CartContent({
  cart,
  onRemove,
  onQuantityChange,
}: CartContentProps) {
  const total = cart.items.reduce(
    (sum, item) => sum + Number(item.variant.price) * item.quantity,
    0
  );
  const router = useRouter();
  const [openDialogId, setOpenDialogId] = useState<string | null>(null);

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-semibold">🛒 Giỏ hàng của bạn</h1>

      <div className="space-y-4">
        {cart.items.map((item) => (
          <div
            key={item.cart_item_id}
            className="flex items-center justify-between bg-card rounded-xl p-4 shadow-sm"
          >
            {/* Thông tin sản phẩm */}
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-muted rounded-md flex items-center justify-center text-xs text-muted-foreground">
                Ảnh
              </div>
              <div>
                <p className="font-medium">{item.variant.layout}</p>
                <p className="text-sm text-muted-foreground">
                  {item.variant.color}
                </p>
                <p className="font-semibold text-primary">
                  {Number(item.variant.price).toLocaleString("vi-VN")} ₫
                </p>
              </div>
            </div>

            {/* Số lượng và hành động */}
            <div className="flex items-center gap-4">
              <div className="flex items-center border rounded-lg">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onQuantityChange(item.cart_item_id, -1)}
                >
                  <Minus size={14} />
                </Button>
                <span className="px-3 select-none">{item.quantity}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onQuantityChange(item.cart_item_id, 1)}
                >
                  <Plus size={14} />
                </Button>
              </div>

              <p className="w-24 text-right font-semibold">
                {(Number(item.variant.price) * item.quantity).toLocaleString(
                  "vi-VN"
                )}{" "}
                ₫
              </p>

              {/* ✅ Dialog xác nhận xóa */}
              <AlertDialog
                open={openDialogId === item.cart_item_id}
                onOpenChange={(open) =>
                  setOpenDialogId(open ? item.cart_item_id : null)
                }
              >
                <AlertDialogTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-red-500 hover:text-red-600"
                  >
                    <Trash2 size={16} />
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Xác nhận xoá sản phẩm</AlertDialogTitle>
                    <AlertDialogDescription>
                      Bạn có chắc muốn xoá sản phẩm này khỏi giỏ hàng không?
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Huỷ</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => onRemove(item.cart_item_id)}
                    >
                      Xoá
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        ))}
      </div>

      <Separator />

      {/* Tổng cộng */}
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-medium">Tổng cộng</h2>
        <p className="text-xl font-bold text-primary">
          {total.toLocaleString("vi-VN")} ₫
        </p>
      </div>

      {/* Thanh toán */}
      <div className="text-right">
        <Button
          size="lg"
          className="bg-primary hover:bg-primary/50 cursor-pointer"
          onClick={() => router.push("/checkout")}
        >
          Tiến hành thanh toán
        </Button>
      </div>
    </div>
  );
}
