import { ArrowRight, Zap } from "lucide-react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

const Hero: React.FC = () => {
  return (
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
                Khám phá bộ sưu tập các thiết bị công nghệ hàng đầu với giá tốt
                nhất. Từ gaming gear đến thiết bị văn phòng chuyên nghiệp.
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
  );
};

export default Hero;
