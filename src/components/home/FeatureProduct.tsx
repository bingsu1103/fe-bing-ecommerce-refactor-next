import { ArrowRight, Badge, ShoppingCart, Star } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";

const formatPrice = (price: number) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(price);
};

const featuredProducts = [
  {
    id: 1,
    name: "Tai nghe Gaming RGB Pro X",
    price: 1299000,
    originalPrice: 1599000,
    rating: 4.8,
    reviews: 256,
    image: "https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg",
    badge: "Bán chạy",
    discount: 19,
  },
  {
    id: 2,
    name: "Bàn phím cơ Mechanical Pro",
    price: 2199000,
    originalPrice: 2699000,
    rating: 4.9,
    reviews: 189,
    image: "https://images.pexels.com/photos/2115256/pexels-photo-2115256.jpeg",
    badge: "Giảm giá",
    discount: 18,
  },
  {
    id: 3,
    name: "Chuột Gaming Wireless Elite",
    price: 899000,
    originalPrice: 1199000,
    rating: 4.7,
    reviews: 342,
    image: "https://images.pexels.com/photos/2115257/pexels-photo-2115257.jpeg",
    badge: "Mới",
    discount: 25,
  },
  {
    id: 4,
    name: 'Màn hình 4K UltraWide 34"',
    price: 8990000,
    originalPrice: 10990000,
    rating: 4.8,
    reviews: 98,
    image: "https://images.pexels.com/photos/777001/pexels-photo-777001.jpeg",
    badge: "Premium",
    discount: 18,
  },
  {
    id: 5,
    name: "iPhone 15 Pro Max 256GB",
    price: 32990000,
    originalPrice: 35990000,
    rating: 4.9,
    reviews: 512,
    image: "https://images.pexels.com/photos/699122/pexels-photo-699122.jpeg",
    badge: "Hot",
    discount: 8,
  },
  {
    id: 6,
    name: "Camera DSLR Professional",
    price: 15990000,
    originalPrice: 18990000,
    rating: 4.8,
    reviews: 156,
    image: "https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg",
    badge: "Chuyên nghiệp",
    discount: 16,
  },
];
const FeatureProduct: React.FC = () => {
  return (
    <section className="py-16 ">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-12">
          <div className="space-y-2">
            <h2 className="text-3xl lg:text-4xl font-bold">Sản phẩm nổi bật</h2>
            <p className="text-muted-foreground">
              Những sản phẩm được yêu thích nhất
            </p>
          </div>
          <Button variant="outline" className="hidden sm:flex">
            Xem tất cả
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProducts.map((product) => (
            <Card
              key={product.id}
              className="group cursor-pointer hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              <div className="relative">
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <Badge className="absolute top-4 left-4 bg-red-600 hover:bg-red-700">
                  -{product.discount}%
                </Badge>
                <Badge className="absolute top-4 right-4 bg-blue-600 hover:bg-blue-700">
                  {product.badge}
                </Badge>
                <Button
                  size="icon"
                  variant="secondary"
                  className="absolute top-4 right-16 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                >
                  <ShoppingCart className="w-4 h-4" />
                </Button>
              </div>

              <CardContent className="p-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-lg line-clamp-2 group-hover:text-primary transition-colors">
                      {product.name}
                    </h3>
                    <div className="flex items-center mt-2 space-x-2">
                      <div className="flex items-center">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium ml-1">
                          {product.rating}
                        </span>
                      </div>
                      <span className="text-sm text-muted-foreground">
                        ({product.reviews} đánh giá)
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl font-bold text-red-600">
                        {formatPrice(product.price)}
                      </span>
                    </div>
                    <span className="text-sm text-muted-foreground line-through">
                      {formatPrice(product.originalPrice)}
                    </span>
                  </div>
                </div>
              </CardContent>

              <CardFooter className="p-6 pt-0">
                <Button className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Thêm vào giỏ
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
export default FeatureProduct;
