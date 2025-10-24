import { motion } from "framer-motion";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

const ProductCard: React.FC<{ product: IProduct }> = ({ product }) => {
  const router = useRouter();

  const price = product.variants?.[0]?.price ?? 0;
  const variantWithImage = product.variants?.find(
    (v: any) => v?.image && typeof v.image === "string"
  );
  const imageUrl = variantWithImage?.image ?? null;

  return (
    <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
      <div
        onClick={() => router.push(`store/${product.product_id}`)}
        className="bg-white border border-gray-200 hover:shadow-md transition cursor-pointer overflow-hidden rounded-none flex flex-col"
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

        {/* Nội dung */}
        <div className="flex flex-col flex-1 p-4">
          <h3 className="text-base font-semibold text-gray-900 truncate mb-1">
            {product.name}
          </h3>
          <p className="text-sm text-gray-500 line-clamp-2 mb-3">
            {product.description}
          </p>

          <div className="flex items-center justify-between mb-2">
            <Badge variant="outline" className="text-xs px-2 py-1">
              {product.brand}
            </Badge>
            <span className="text-lg font-semibold text-gray-900">
              {Number(price).toLocaleString("vi-VN")}₫
            </span>
          </div>

          <Button
            className="w-full text-sm font-medium mt-auto"
            onClick={(e) => {
              e.stopPropagation();
              // handleAddToCart(product)
            }}
          >
            Thêm vào giỏ
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
