"use client";

import React from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface ProductDetailProps {
  product: IProduct;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product }) => {
  const variant = product.variants?.[0];
  const price = Number(variant?.price ?? 0);
  const stock = variant?.stock_quantity ?? 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="container mx-auto px-6 py-10"
    >
      <div className="grid md:grid-cols-2 gap-10">
        {/* ========== IMAGE ========== */}
        <div className="flex justify-center items-center">
          {/* <img
            src={
              (variant as any)?.image_url ||
              "https://placehold.co/500x400?text=No+Image+Available"
            }
            alt={product.name}
            className="rounded-2xl shadow-md object-contain w-full max-h-[400px]"
          /> */}
        </div>

        {/* ========== INFO ========== */}
        <div>
          <div className="flex items-center gap-5">
            <h1 className="text-3xl font-bold mb-3">{product.name}</h1>
            {stock > 0 ? (
              <Badge style={{ backgroundColor: "green" }}>Còn hàng</Badge>
            ) : (
              <Badge variant={"destructive"}>Hết hàng</Badge>
            )}
          </div>
          <Badge variant="secondary" className="mb-3">
            {product.brand}
          </Badge>

          <p className="text-muted-foreground mb-4 leading-relaxed">
            {product.description}
          </p>

          <Separator className="my-4" />

          <div className="flex items-center justify-between mb-4">
            <span className="text-2xl font-semibold text-primary">
              {price.toLocaleString("vi-VN")}₫
            </span>
          </div>

          <div className="flex gap-3">
            <Button variant={"outline"} size="lg" className="mb-4">
              Thêm vào giỏ hàng
            </Button>
            <Button size="lg" className="mb-4">
              Mua ngay
            </Button>
          </div>

          <Separator className="my-4" />

          <div>
            <h3 className="text-lg font-medium mb-2">Thông tin chi tiết</h3>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li>Danh mục: {product.category?.name || "Không có"}</li>
              <li>Mã sản phẩm: {product.product_id}</li>
              <li>Layout: {variant?.layout || "N/A"}</li>
              <li>Màu sắc: {variant?.color || "Không rõ"}</li>
              <li>
                Cập nhật:{" "}
                {new Date(product.updated_at).toLocaleDateString("vi-VN")}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductDetail;
