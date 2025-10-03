import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Zap,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

const footerSections = [
  {
    title: "Sản phẩm",
    links: [
      { name: "Tai nghe", href: "/category/headphones" },
      { name: "Bàn phím", href: "/category/keyboards" },
      { name: "Chuột gaming", href: "/category/mice" },
      { name: "Màn hình", href: "/category/monitors" },
      { name: "Điện thoại", href: "/category/phones" },
      { name: "Laptop", href: "/category/laptops" },
    ],
  },
  {
    title: "Hỗ trợ khách hàng",
    links: [
      { name: "Liên hệ", href: "/contact" },
      { name: "Chính sách bảo hành", href: "/warranty" },
      { name: "Hướng dẫn mua hàng", href: "/guide" },
      { name: "Chính sách đổi trả", href: "/return-policy" },
      { name: "Câu hỏi thường gặp", href: "/faq" },
      { name: "Tình trạng đơn hàng", href: "/order-status" },
    ],
  },
  {
    title: "Về TechStore",
    links: [
      { name: "Giới thiệu", href: "/about" },
      { name: "Tuyển dụng", href: "/careers" },
      { name: "Tin tức", href: "/news" },
      { name: "Blog công nghệ", href: "/blog" },
      { name: "Đối tác", href: "/partners" },
      { name: "Chương trình affiliate", href: "/affiliate" },
    ],
  },
];

const socialLinks = [
  { name: "Facebook", icon: Facebook, href: "#" },
  { name: "Twitter", icon: Twitter, href: "#" },
  { name: "Instagram", icon: Instagram, href: "#" },
  { name: "Youtube", icon: Youtube, href: "#" },
];

export default function Footer() {
  return (
    <footer className="border-t">
      {/* Newsletter Section */}
      <div className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center space-y-6">
            <h2 className="text-2xl lg:text-3xl font-bold ">
              Đăng ký nhận tin tức và ưu đãi
            </h2>
            <p>
              Nhận thông tin về sản phẩm mới và các chương trình khuyến mãi hấp
              dẫn
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input placeholder="Nhập email của bạn" className="flex-1" />
              <Button>
                <Mail className="w-4 h-4 mr-2" />
                Đăng ký
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {/* Company Info */}
            <div className="lg:col-span-2 space-y-6">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">TechStore</span>
              </div>
              <p className="max-w-md">
                Cửa hàng công nghệ hàng đầu Việt Nam, cung cấp các sản phẩm chất
                lượng cao với giá cả hợp lý và dịch vụ khách hàng tận tâm.
              </p>

              {/* Contact Info */}
              <div className="space-y-3">
                <div className="flex items-center space-x-3 ">
                  <Phone className="w-4 h-4" />
                  <span>1900 1000 (Miễn phí)</span>
                </div>
                <div className="flex items-center space-x-3 ">
                  <Mail className="w-4 h-4" />
                  <span>support@techstore.vn</span>
                </div>
                <div className="flex items-center space-x-3 ">
                  <MapPin className="w-4 h-4" />
                  <span>123 Nguyễn Trãi, Q.1, TP.HCM</span>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex space-x-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    className="w-10 h-10 rounded-lg flex items-center justify-center transition-colors"
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>

            {/* Footer Links */}
            {footerSections.map((section) => (
              <div key={section.title} className="space-y-4">
                <h3 className="font-semibold">{section.title}</h3>
                <ul className="space-y-3">
                  {section.links.map((link) => (
                    <li key={link.name}>
                      <a
                        href={link.href}
                        className=" transition-colors text-sm"
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Separator className="bg-gray-200" />

      {/* Bottom Footer */}
      <div className="py-6">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-600 text-sm">
              © 2024 TechStore. Tất cả quyền được bảo lưu.
            </p>
            <div className="flex flex-wrap justify-center md:justify-end space-x-6">
              <a
                href="/terms"
                className="text-gray-600 hover:text-gray-900 transition-colors text-sm"
              >
                Điều khoản sử dụng
              </a>
              <a
                href="/privacy"
                className="text-gray-600 hover:text-gray-900 transition-colors text-sm"
              >
                Chính sách bảo mật
              </a>
              <a
                href="/cookies"
                className="text-gray-600 hover:text-gray-900 transition-colors text-sm"
              >
                Chính sách Cookie
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
