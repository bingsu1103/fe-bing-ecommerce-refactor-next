import {
  Camera,
  Headphones,
  Keyboard,
  Monitor,
  Mouse,
  Smartphone,
} from "lucide-react";
import { Card, CardContent } from "../ui/card";

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

const Categories: React.FC = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold">Danh mục sản phẩm</h2>
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
                <h3 className="font-semibold text-xl mb-2">{category.name}</h3>
                <p className="text-muted-foreground">
                  {category.count} sản phẩm
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
export default Categories;
