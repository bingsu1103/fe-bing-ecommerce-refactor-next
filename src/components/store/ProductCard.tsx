import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
const ProductCard: React.FC<{ product: IProduct }> = ({ product }) => {
  const price = product.variants?.[0]?.price ?? 0;
  const stock = product.variants?.[0]?.stock_quantity ?? 0;

  return (
    <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
      <Card className="shadow-md hover:shadow-lg transition rounded-2xl">
        <CardHeader>
          <CardTitle>{product.name}</CardTitle>
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
          <Button className="w-full">Thêm vào giỏ</Button>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ProductCard;
