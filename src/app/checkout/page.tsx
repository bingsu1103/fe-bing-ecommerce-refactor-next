"use client";

import { useSession } from "next-auth/react";
import { useCartStore } from "@/store/useCartStore";
import { useRef, useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { orderApi } from "@/services/api-order";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { paymentApi } from "@/services/api-payment";

export default function CheckoutPage() {
  const { data: session } = useSession();
  const { cart, fetchCart } = useCartStore();

  const addressRef = useRef<HTMLInputElement>(null);
  const cityRef = useRef<HTMLInputElement>(null);
  const countryRef = useRef<HTMLInputElement>(null);
  const [payment, setPayment] = useState("cod");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  if (!cart || cart.items.length === 0)
    return (
      <div className="p-6 text-center text-muted-foreground">
        Giỏ hàng của bạn đang trống
      </div>
    );

  const handleCheckout = async () => {
    if (!session?.user?.user_id) return toast.error("Bạn chưa đăng nhập");

    const address = addressRef.current?.value?.trim();
    const city = cityRef.current?.value?.trim();
    const country = countryRef.current?.value?.trim() || "Vietnam";

    if (!address || !city)
      return toast.error("Vui lòng nhập đầy đủ địa chỉ và thành phố");

    const payload = {
      user_id: session.user.user_id,
      order_item: cart.items.map((item) => ({
        cart_item: {
          cart_item_id: item.cart_item_id,
          variant: { variant_id: item.variant.variant_id },
          quantity: item.quantity,
        },
      })),
      payment_method: payment,
      address,
      city,
      country,
    };

    try {
      setLoading(true);

      // Tạo đơn hàng trước
      const res = await orderApi.create(
        payload.user_id,
        payload.order_item,
        payload.payment_method,
        payload.address,
        payload.city,
        payload.country
      );

      const orderId = res.data?.order_id;
      const paymentId = res.data?.payment?.payment_id;

      if (payment === "cod") {
        toast.success("Đặt hàng thành công");
        fetchCart(String(session.user.user_id));
        router.push(`/ordered?order_id=${orderId}`);
      } else if (payment === "momo") {
        const momoRes = await paymentApi.createMomoPayment(total, paymentId!);
        if (momoRes?.data?.payUrl) {
          window.location.href = momoRes.data.payUrl;
        } else {
          toast.error("Không thể khởi tạo thanh toán MoMo");
        }
      } else if (payment === "vnpay") {
        const vnpayRes = await paymentApi.createVnpayPayment(total, paymentId!);
        if (vnpayRes?.data?.payUrl) {
          window.location.href = vnpayRes.data.payUrl;
        } else {
          toast.error("Không thể khởi tạo thanh toán VNPAY");
        }
        return;
      }
    } catch (err) {
      console.error(err);
      toast.error("Có lỗi khi đặt hàng! Vui lòng thử lại");
    } finally {
      setLoading(false);
    }
  };

  const total = cart.items.reduce(
    (sum, item) => sum + Number(item.variant.price) * item.quantity,
    0
  );

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-semibold mb-4">Thông tin thanh toán</h1>

      {/* Địa chỉ giao hàng */}
      <Card>
        <CardHeader>
          <CardTitle>Địa chỉ giao hàng</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Địa chỉ</Label>
            <Input placeholder="Nhập địa chỉ của bạn" ref={addressRef} />
          </div>
          <div className="flex gap-4">
            <div className="flex-1">
              <Label>Thành phố</Label>
              <Input placeholder="VD: Hồ Chí Minh" ref={cityRef} />
            </div>
            <div className="flex-1">
              <Label>Quốc gia</Label>
              <Input
                placeholder="VD: Vietnam"
                defaultValue="Vietnam"
                ref={countryRef}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Phương thức thanh toán */}
      <Card>
        <CardHeader>
          <CardTitle>Phương thức thanh toán</CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup value={payment} onValueChange={setPayment}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="cod" id="cod" />
              <Label htmlFor="cod">Thanh toán khi nhận hàng (COD)</Label>
            </div>
            <div className="flex items-center space-x-2 mt-2">
              <RadioGroupItem value="momo" id="momo" />
              <Label htmlFor="momo">Thanh toán qua MoMo</Label>
            </div>
            <div className="flex items-center space-x-2 mt-2">
              <RadioGroupItem value="vnpay" id="vnpay" />
              <Label htmlFor="vnpay">Thanh toán qua VNPAY</Label>
            </div>
          </RadioGroup>
        </CardContent>
      </Card>

      {/* Tóm tắt đơn hàng */}
      <Card>
        <CardHeader>
          <CardTitle>Tóm tắt đơn hàng</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {cart.items.map((item) => (
            <div
              key={item.cart_item_id}
              className="flex justify-between text-sm"
            >
              <span>
                {item.variant.layout} x {item.quantity}
              </span>
              <span>
                {(Number(item.variant.price) * item.quantity).toLocaleString(
                  "vi-VN"
                )}{" "}
                ₫
              </span>
            </div>
          ))}
          <Separator className="my-2" />
          <div className="flex justify-between font-semibold">
            <span>Tổng cộng</span>
            <span>{total.toLocaleString("vi-VN")} ₫</span>
          </div>
        </CardContent>
        <CardFooter className="justify-end">
          <Button
            size="lg"
            disabled={loading}
            onClick={handleCheckout}
            className="bg-primary cursor-pointer"
          >
            {loading ? "Đang xử lý..." : "Xác nhận đặt hàng"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
