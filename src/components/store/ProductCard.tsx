import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

const ProductCard: React.FC<{ product: IProduct }> = ({ product }) => {
  const router = useRouter();

  const price = product.variants?.[0]?.price ?? 0;
  const stock = product.variants?.[0]?.stock_quantity ?? 0;

  // 🔹 Lấy ra ảnh đầu tiên có tồn tại
  const variantWithImage = product.variants?.find(
    (v: any) => v?.image && typeof v.image === "string"
  );
  const imageUrl = variantWithImage?.image ?? null;

  return (
    <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
      <Card
        onClick={() => router.push(`store/${product.product_id}`)}
        className="shadow-md hover:shadow-lg transition rounded-2xl cursor-pointer overflow-hidden"
      >
        {/* Hình ảnh sản phẩm */}
        <div className="w-full h-48 bg-gray-50 flex items-center justify-center overflow-hidden">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={product.name}
              className="object-cover w-full h-full"
            />
          ) : (
            <div className="text-gray-400 text-sm">No image</div>
          )}
        </div>

        <CardHeader>
          <CardTitle className="truncate">{product.name}</CardTitle>
        </CardHeader>

        <CardContent>
          <p className="text-sm text-muted-foreground mb-2 truncate">
            {product.description}
          </p>

          <div className="flex items-center justify-between mb-2">
            <Badge variant="outline">{product.brand}</Badge>
            <span className="text-lg font-semibold">
              {Number(price).toLocaleString("vi-VN")}₫
            </span>
          </div>

          <p className="text-xs text-muted-foreground mb-4">Tồn kho: {stock}</p>

          <Button className="w-full cursor-pointer">Thêm vào giỏ</Button>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ProductCard;
