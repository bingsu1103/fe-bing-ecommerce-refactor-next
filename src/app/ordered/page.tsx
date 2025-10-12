"use client";

import { CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import { motion } from "framer-motion";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function OrderedPage() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("order_id"); // nếu bạn truyền id qua router.push
  const [time, setTime] = useState("");

  useEffect(() => {
    const now = new Date();
    setTime(now.toLocaleString("vi-VN"));
  }, []);

  return (
    <div className="flex items-center justify-center min-h-[80vh] bg-gray-50 p-4">
      <Card className="max-w-md w-full text-center shadow-lg rounded-2xl">
        <CardHeader>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 120 }}
            className="flex justify-center mb-4"
          >
            <CheckCircle2 className="text-green-500 w-20 h-20" />
          </motion.div>
          <CardTitle className="text-2xl font-semibold text-green-600">
            🎉 Đặt hàng thành công!
          </CardTitle>
        </CardHeader>

        <CardContent className="text-sm text-muted-foreground space-y-2">
          <p>
            Cảm ơn bạn đã mua sắm tại{" "}
            <span className="font-medium text-foreground">Technical Store</span>
            .
          </p>
          <p>Chúng tôi sẽ liên hệ xác nhận đơn hàng sớm nhất có thể.</p>
          <div className="pt-3 space-y-1 border-t border-gray-200 mt-4">
            {orderId && (
              <p>
                <span className="font-semibold">Mã đơn hàng:</span> #{orderId}
              </p>
            )}
            <p>
              <span className="font-semibold">Thời gian đặt:</span> {time}
            </p>
          </div>
        </CardContent>

        <CardFooter className="flex flex-col gap-2 mt-4">
          <Link href="/profile/orders" className="w-full">
            <Button className="w-full bg-primary text-white hover:bg-primary/90">
              Xem đơn hàng của tôi
            </Button>
          </Link>
          <Link href="/" className="w-full">
            <Button variant="outline" className="w-full">
              Tiếp tục mua sắm
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
