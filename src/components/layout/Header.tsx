"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Search,
  ShoppingCart,
  User,
  Menu,
  X,
  Zap,
  LogOut,
  History,
  LayoutDashboard,
} from "lucide-react";
import { useSession, signOut } from "next-auth/react";
import Login from "../login";
import Register from "../register";
import ThemeToggle from "../ui/theme-toggle";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { useDebounce } from "@/hooks/useDebouce";
import { productApi } from "@/services/api-product";
import { useCartStore } from "@/store/useCartStore";
import { authApi } from "@/services/api-auth";

const navigationItems = [
  { name: "Trang chủ", href: "/" },
  { name: "Cửa hàng", href: "/store" },
  { name: "Về chúng tôi", href: "/about" },
  { name: "Liên hệ", href: "/contact" },
];

const Header: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { status, data: session } = useSession();
  const [products, setProducts] = useState<IProduct[]>([]);
  const debouncedSearch = useDebounce(searchQuery, 300);
  const { cart } = useCartStore();

  useEffect(() => {
    const fetchData = async () => {
      const res = await productApi.findAll({ search: debouncedSearch });
      setProducts(res.data?.product as IProduct[]);
    };
    fetchData();
  }, [debouncedSearch]);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-5">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold"></span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Search Bar */}
          <div className="flex-1 max-w-md mx-8 hidden lg:block">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Tìm kiếm sản phẩm..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />

              {/* 🔽 Search Result List */}
              {debouncedSearch && products.length > 0 && (
                <div className="absolute mt-2 w-full bg-background border rounded-md shadow-lg z-50 max-h-80 overflow-y-auto">
                  {products.slice(0, 6).map((product) => (
                    <Link
                      onClick={() => setSearchQuery("")}
                      key={product.product_id}
                      href={`/store/${product.product_id}`}
                      className="flex items-center gap-3 px-3 py-2 hover:bg-muted transition-colors"
                    >
                      {/* <img
                        src={product.image}
                        alt={product.name}
                        className="w-10 h-10 object-cover rounded"
                      /> */}
                      <div className="flex-1">
                        <p className="text-sm font-medium">{product.name}</p>
                        {product &&
                          product.variants &&
                          product.variants?.length > 0 && (
                            <p className="text-xs text-muted-foreground">
                              {product.variants[0].price.toLocaleString()}₫
                            </p>
                          )}
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              className="relative cursor-pointer"
              asChild
            >
              <Link href="/cart" aria-label="Giỏ hàng">
                <ShoppingCart className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  {cart ? <>{cart.items.length}</> : <>{0}</>}
                </span>
              </Link>
            </Button>

            <ThemeToggle />

            {status === "unauthenticated" ? (
              <div className="flex gap-2">
                <Login />
                <Register />
              </div>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="cursor-pointer"
                    aria-label="Tài khoản"
                  >
                    <User className="w-5 h-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-44">
                  <DropdownMenuLabel>Tài khoản</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {session?.role === "admin" && (
                    <DropdownMenuItem>
                      <Link className="flex items-center gap-2" href="/admin">
                        <LayoutDashboard />
                        <span>Admin Dashboard</span>
                      </Link>
                    </DropdownMenuItem>
                  )}

                  <DropdownMenuItem>
                    <Link className="flex items-center gap-2" href="/order">
                      <History />
                      <span>Lịch sử đặt hàng</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={async () => {
                      const res = await authApi.logout(
                        String(session?.access_token)
                      );
                      console.log(res);

                      signOut({ callbackUrl: "/" });
                    }}
                  >
                    <LogOut />
                    Đăng xuất
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Mở menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="lg:hidden pb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Tìm kiếm sản phẩm..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t bg-background">
            <nav className="py-4 space-y-2">
              {navigationItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};
export default Header;
