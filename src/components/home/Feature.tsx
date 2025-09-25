import { Shield, TrendingUp, Truck, Zap } from "lucide-react";

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
const Feature: React.FC = () => {
  return (
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
  );
};
export default Feature;
