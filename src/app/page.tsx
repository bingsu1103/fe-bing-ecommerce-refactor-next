"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import {
  ShoppingCart,
  Star,
  Headphones,
  Keyboard,
  Mouse,
  Monitor,
  Smartphone,
  Camera,
  ArrowRight,
  TrendingUp,
  Zap,
  Shield,
  Truck,
} from "lucide-react";

// Mock data
const categories = [
  {
    id: 1,
    name: "Tai nghe",
    icon: Headphones,
    count: 245,
    image: "https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg",
  },
  {
    id: 2,
    name: "Bàn phím",
    icon: Keyboard,
    count: 189,
    image: "https://images.pexels.com/photos/2115256/pexels-photo-2115256.jpeg",
  },
  {
    id: 3,
    name: "Chuột",
    icon: Mouse,
    count: 156,
    image: "https://images.pexels.com/photos/2115257/pexels-photo-2115257.jpeg",
  },
  {
    id: 4,
    name: "Màn hình",
    icon: Monitor,
    count: 98,
    image: "https://images.pexels.com/photos/777001/pexels-photo-777001.jpeg",
  },
  {
    id: 5,
    name: "Điện thoại",
    icon: Smartphone,
    count: 312,
    image: "https://images.pexels.com/photos/699122/pexels-photo-699122.jpeg",
  },
  {
    id: 6,
    name: "Camera",
    icon: Camera,
    count: 87,
    image: "https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg",
  },
];

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

const features = [
  {
    icon: Truck,
    title: "Miễn phí vận chuyển",
    description: "Đơn hàng từ 500.000đ",
  },
  {
    icon: Shield,
    title: "Bảo hành chính hãng",
    description: "Cam kết 100% chính hãng",
  },
  {
    icon: Zap,
    title: "Giao hàng nhanh",
    description: "Trong vòng 2-4 giờ",
  },
  {
    icon: TrendingUp,
    title: "Giá tốt nhất",
    description: "Cam kết giá rẻ nhất thị trường",
  },
];

export default function HomePage() {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge className="bg-blue-600 hover:bg-blue-700">
                  <Zap className="w-3 h-3 mr-1" />
                  Flash Sale 50% OFF
                </Badge>
                <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                  Công nghệ
                  <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                    {" "}
                    Tương lai
                  </span>
                </h1>
                <p className="text-xl text-slate-300 leading-relaxed">
                  Khám phá bộ sưu tập các thiết bị công nghệ hàng đầu với giá
                  tốt nhất. Từ gaming gear đến thiết bị văn phòng chuyên nghiệp.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700 text-lg px-8"
                >
                  Mua ngay
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/20 text-white hover:bg-white/10 text-lg px-8"
                >
                  Xem catalog
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.pexels.com/photos/2115256/pexels-photo-2115256.jpeg"
                  alt="Gaming Setup"
                  className="w-full h-96 object-cover"
                />
              </div>
              <div className="absolute -top-4 -right-4 w-full h-full bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded-2xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center space-y-4">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <feature.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-semibold text-lg">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold">
              Danh mục sản phẩm
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Khám phá bộ sưu tập đa dạng các thiết bị công nghệ hàng đầu
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => (
              <Card
                key={category.id}
                className="group cursor-pointer hover:shadow-lg transition-all duration-300 overflow-hidden"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors duration-300" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <category.icon className="w-12 h-12 text-white" />
                  </div>
                </div>
                <CardContent className="p-6 text-center">
                  <h3 className="font-semibold text-xl mb-2">
                    {category.name}
                  </h3>
                  <p className="text-muted-foreground">
                    {category.count} sản phẩm
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div className="space-y-2">
              <h2 className="text-3xl lg:text-4xl font-bold">
                Sản phẩm nổi bật
              </h2>
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
    </div>
  );
}
