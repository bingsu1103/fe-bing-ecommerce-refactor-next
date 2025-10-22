"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { orderApi } from "@/services/api-order";
import { paymentApi } from "@/services/api-payment";

interface IProps {
  orders: IOrder[] | null;
}

const OrderHistory = ({ orders }: IProps) => {
  if (!orders || orders.length === 0) {
    return (
      <Card className="p-4 text-center text-sm">Bạn chưa có đơn hàng nào.</Card>
    );
  }
  const handleRepayment = async (order_id: string) => {
    const order = await orderApi.findOne(order_id);
    if (order.data?.payment && order.data.payment.status === "unpaid") {
      if (order.data.payment.payment_method === "momo") {
        const momoRes = await paymentApi.createMomoPayment(
          Number(order.data.payment.amount),
          order.data.payment.payment_id!
        );
      }
    }
  };

  return (
    <div className="space-y-2">
      {orders.map((order) => {
        const date = new Date(order.created_at).toLocaleString("vi-VN", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        });

        const total = Number(order.total_price).toLocaleString("vi-VN", {
          style: "currency",
          currency: "VND",
        });

        return (
          <Card
            key={order.order_id}
            className="shadow-sm hover:shadow border transition p-3"
          >
            <CardHeader className="flex flex-row justify-between items-center p-0 pb-2">
              <CardTitle className="text-base font-medium ">
                #{order.order_id.slice(0, 6)}
              </CardTitle>
              <Badge
                className="text-xs px-2 py-0.5"
                variant={
                  order.order_status === "pending"
                    ? "secondary"
                    : order.order_status === "completed"
                    ? "default"
                    : "destructive"
                }
              >
                {order.order_status === "pending"
                  ? "Đang xử lý"
                  : order.order_status === "completed"
                  ? "Hoàn tất"
                  : "Đã hủy"}
              </Badge>
            </CardHeader>

            <CardContent className="flex justify-between items-center text-xs p-0 pt-1">
              <div className="space-y-0.5">
                <p>Ngày: {date}</p>
                <p className="font-semibold">Tổng: {total}</p>
              </div>
              {order.payment?.status === "unpaid" ? (
                <Button
                  variant="destructive"
                  size="sm"
                  className="h-7 text-xs px-3"
                  onClick={() => handleRepayment(order.order_id)}
                >
                  Thanh toán
                </Button>
              ) : (
                <Button size="sm" className="h-7 text-xs px-3 bg-green-600">
                  Đã thanh toán
                </Button>
              )}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default OrderHistory;
