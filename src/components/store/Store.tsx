"use client";

import React, { useState, useMemo, useEffect } from "react";
import { Card, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Separator } from "@/components/ui/separator";
import { productApi } from "@/services/api-product";
import { useDebounce } from "@/hooks/useDebouce";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import ProductCard from "./ProductCard";
import ProductSkeleton from "./ProductSkeleton";

interface StoreProps {
  initialProducts: IProduct[];
  categories: ICategory[];
}

// ==============================
// STORE CLIENT
// ==============================
const Store: React.FC<StoreProps> = ({ initialProducts, categories }) => {
  const [products, setProducts] = useState<IProduct[]>(initialProducts);
  const [total, setTotal] = useState<number>(0);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [sortOption, setSortOption] = useState<string>("default");
  const [search, setSearch] = useState<string>("");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 70000000]);
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const limit = 10;
  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    const fetchFiltered = async () => {
      try {
        setLoading(true);

        const data = await productApi.findAll({
          page,
          limit,
          category: selectedCategory !== "all" ? selectedCategory : undefined,
          search: debouncedSearch || undefined,
          minPrice: priceRange[0],
          maxPrice: priceRange[1],
          sort: sortOption !== "default" ? sortOption : undefined,
        });

        if (data.success && data.data?.product) {
          setProducts(data.data.product);
          setTotal(data.data.total || 0);
        } else {
          setProducts([]);
          setTotal(0);
        }
      } catch (error) {
        console.error("Fetch filter failed:", error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchFiltered();
  }, [page, selectedCategory, sortOption, debouncedSearch, priceRange]);

  // ==========================================
  // 🔹 LỌC LOCAL NẾU KHÔNG CÓ API THẬT
  // ==========================================
  const filteredProducts = useMemo(() => {
    if (initialProducts.length && !products.length) {
      return initialProducts
        .filter((p) =>
          selectedCategory === "all"
            ? true
            : p.category.category_id === selectedCategory
        )
        .filter((p) => p.name.toLowerCase().includes(search.toLowerCase()))
        .filter((p) => {
          const price = Number(p.variants?.[0]?.price ?? 0);
          return price >= priceRange[0] && price <= priceRange[1];
        })
        .sort((a, b) => {
          const priceA = Number(a.variants?.[0]?.price ?? 0);
          const priceB = Number(b.variants?.[0]?.price ?? 0);
          if (sortOption === "price_asc") return priceA - priceB;
          if (sortOption === "price_desc") return priceB - priceA;
          if (sortOption === "name_asc") return a.name.localeCompare(b.name);
          if (sortOption === "name_desc") return b.name.localeCompare(a.name);
          return 0;
        });
    }
    return products;
  }, [
    products,
    initialProducts,
    selectedCategory,
    sortOption,
    search,
    priceRange,
  ]);

  const totalPages = Math.ceil(total / limit);

  // ==========================================
  // 🔹 RENDER UI
  // ==========================================
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Cửa Hàng Công Nghệ
      </h1>

      <div className="grid md:grid-cols-[250px_1fr] gap-6">
        {/* ========== FILTER PANEL ========== */}
        <Card className="p-4 h-fit">
          <CardTitle className="mb-4">Bộ lọc</CardTitle>

          {/* Search */}
          <div className="mb-4">
            <Input
              placeholder="Tìm kiếm sản phẩm..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1); // reset page khi search
              }}
            />
          </div>

          {/* Category */}
          <div className="mb-4">
            <label className="text-sm font-medium mb-1 block">Danh mục</label>
            <Select
              onValueChange={(value) => {
                setSelectedCategory(value);
                setPage(1);
              }}
              defaultValue="all"
            >
              <SelectTrigger>
                <SelectValue placeholder="Chọn danh mục" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả</SelectItem>
                {categories.map((c) => (
                  <SelectItem key={c.category_id} value={c.category_id}>
                    {c.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Price Range */}
          <div className="mb-4">
            <label className="text-sm font-medium mb-2 block">Khoảng giá</label>
            <Slider
              defaultValue={[0, 70000000]}
              max={70000000}
              step={1000000}
              onValueChange={(value) => {
                setPriceRange(value as [number, number]);
                setPage(1);
              }}
            />
            <div className="flex justify-between mt-2 text-sm text-muted-foreground">
              <span>{priceRange[0].toLocaleString("vi-VN")}₫</span>
              <span>{priceRange[1].toLocaleString("vi-VN")}₫</span>
            </div>
          </div>

          <Separator className="my-4" />

          {/* Sort */}
          <div>
            <label className="text-sm font-medium mb-1 block">
              Sắp xếp theo
            </label>
            <Select
              onValueChange={(value) => {
                setSortOption(value);
                setPage(1);
              }}
              defaultValue="default"
            >
              <SelectTrigger>
                <SelectValue placeholder="Chọn tiêu chí" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="default">Mặc định</SelectItem>
                <SelectItem value="price_asc">Giá tăng dần</SelectItem>
                <SelectItem value="price_desc">Giá giảm dần</SelectItem>
                <SelectItem value="name_asc">Tên A-Z</SelectItem>
                <SelectItem value="name_desc">Tên Z-A</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </Card>

        {/* ========== PRODUCT GRID + PAGINATION ========== */}
        <div>
          {loading ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <ProductSkeleton key={i} />
              ))}
            </div>
          ) : filteredProducts.length === 0 ? (
            <p className="text-center text-muted-foreground mt-10">
              Không tìm thấy sản phẩm nào phù hợp.
            </p>
          ) : (
            <>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.product_id} product={product} />
                ))}
              </div>

              {totalPages > 1 && (
                <div className="flex justify-center mt-8">
                  <Pagination>
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious
                          onClick={() => setPage((p) => Math.max(1, p - 1))}
                          className={
                            page === 1 ? "opacity-50 pointer-events-none" : ""
                          }
                        />
                      </PaginationItem>

                      <PaginationItem>
                        <span className="px-4 py-2 text-sm text-muted-foreground">
                          Trang {page}/{totalPages}
                        </span>
                      </PaginationItem>

                      <PaginationItem>
                        <PaginationNext
                          onClick={() =>
                            setPage((p) => Math.min(totalPages, p + 1))
                          }
                          className={
                            page === totalPages
                              ? "opacity-50 pointer-events-none"
                              : ""
                          }
                        />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Store;
