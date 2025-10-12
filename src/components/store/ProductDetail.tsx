"use client";
import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { useSession } from "next-auth/react";
import { Input } from "../ui/input";
import { cartApi } from "@/services/api-cart";
import { useCartStore } from "@/store/useCartStore";
import { Spinner } from "../ui/spinner";

const COLOR_MAP: Record<string, string> = {
  black: "#000000",
  white: "#FFFFFF",
  silver: "#C0C0C0",
  gray: "#808080",
  blue: "#007BFF",
  red: "#FF0000",
  green: "#28A745",
  yellow: "#FFD700",
  pink: "#FF69B4",
  orange: "#FFA500",
  purple: "#800080",
  brown: "#A52A2A",
  graphite: "#383838",
  gold: "#D4AF37",
};

interface ProductDetailProps {
  product: IProduct;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product }) => {
  const variants = product.variants ?? [];
  const { data: session } = useSession();
  const { fetchCart } = useCartStore();
  const [loading, setLoading] = useState(false);

  const colors = useMemo(
    () => Array.from(new Set(variants.map((v) => v.color))).filter(Boolean),
    [variants]
  );

  const layouts = useMemo(
    () => Array.from(new Set(variants.map((v) => v.layout))).filter(Boolean),
    [variants]
  );

  const [selectedColor, setSelectedColor] = useState<string>(colors[0] || "");
  const [selectedLayout, setSelectedLayout] = useState<string>(
    layouts[0] || ""
  );
  const [selectedQuantity, setSelectedQuantity] = useState<number>(1);

  const selectedVariant = useMemo(
    () =>
      variants.find(
        (v) => v.color === selectedColor && v.layout === selectedLayout
      ) ?? variants[0],
    [variants, selectedColor, selectedLayout]
  );

  const price = Number(selectedVariant?.price ?? 0);
  const stock = selectedVariant?.stock_quantity ?? 0;

  const handleAddToCart = async (
    cart_id: string,
    user_id: string,
    variant_id: string,
    quantity: number
  ) => {
    setLoading(true);
    const res = await cartApi.addToCart(cart_id, user_id, variant_id, quantity);
    if (res && res.data) {
      fetchCart(user_id);
    }
    setLoading(false);
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (value > 0 && value <= stock) {
      setSelectedQuantity(value);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="container mx-auto px-6 py-10"
    >
      <div className="grid md:grid-cols-2 gap-10">
        <div className="flex justify-center items-center">
          {/* <img
            src={
              (selectedVariant as any)?.image_url ||
              "https://placehold.co/500x400?text=No+Image"
            }
            alt={product.name}
            className="rounded-2xl shadow-md object-contain w-full max-h-[400px]"
          /> */}
        </div>

        <div>
          <div className="flex items-center gap-5 flex-wrap">
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
          <div className="mb-5">
            <h3 className="text-sm font-medium mb-2">Số lượng:</h3>
            <Input
              type="number"
              className="w-20"
              value={selectedQuantity}
              onChange={handleQuantityChange} // Handle change of quantity
              min={1} // Ensure that quantity cannot go below 1
              max={stock} // Ensure that quantity cannot exceed stock
            />
          </div>
          <Separator className="my-4" />

          {colors.length > 0 && (
            <div className="mb-5">
              <h3 className="text-sm font-medium mb-3">Màu sắc:</h3>
              <div className="flex flex-wrap gap-3">
                {colors.map((color) => {
                  const colorCode = COLOR_MAP[color.toLowerCase()] || "#ccc";
                  const isSelected = selectedColor === color;

                  return (
                    <button
                      key={color}
                      title={color}
                      onClick={() => setSelectedColor(color)}
                      className={cn(
                        "w-8 h-8 rounded-full border-2 flex items-center justify-center transition",
                        isSelected
                          ? "border-primary ring-2 ring-primary/50"
                          : "border-muted hover:scale-105"
                      )}
                    >
                      <span
                        className="w-6 h-6 rounded-full"
                        style={{ backgroundColor: colorCode }}
                      ></span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {layouts.length > 0 && (
            <div className="mb-5">
              <h3 className="text-sm font-medium mb-2">Layout:</h3>
              <Select
                onValueChange={setSelectedLayout}
                defaultValue={selectedLayout}
              >
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Chọn layout" />
                </SelectTrigger>
                <SelectContent>
                  {layouts.map((layout) => (
                    <SelectItem key={layout} value={layout}>
                      {layout}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          <Separator className="my-4" />

          <div className="flex items-center justify-between mb-4">
            <span className="text-2xl font-semibold text-primary">
              {price.toLocaleString("vi-VN")}₫
            </span>
          </div>

          <div className="flex gap-3">
            <Button
              variant={"outline"}
              size="lg"
              className="mb-4 cursor-pointer"
              disabled={stock <= 0 || loading}
              onClick={() =>
                handleAddToCart(
                  session?.cart_id || "",
                  session?.user.user_id || "",
                  selectedVariant.variant_id,
                  selectedQuantity
                )
              }
            >
              {loading && <Spinner />}
              Thêm vào giỏ hàng
            </Button>
            <Button
              size="lg"
              className="mb-4 cursor-pointer"
              disabled={stock <= 0}
              onClick={() =>
                console.log("Mua ngay:", selectedVariant?.variant_id)
              }
            >
              Mua ngay
            </Button>
          </div>

          <Separator className="my-4" />

          {/* ========== CHI TIẾT SẢN PHẨM ========== */}
          <div>
            <h3 className="text-lg font-medium mb-2">Thông tin chi tiết</h3>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li>Danh mục: {product.category?.name || "Không có"}</li>
              <li>Mã sản phẩm: {product.product_id}</li>
              <li>Layout: {selectedLayout || "N/A"}</li>
              <li>Màu sắc: {selectedColor || "Không rõ"}</li>
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
