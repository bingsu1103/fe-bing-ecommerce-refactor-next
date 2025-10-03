"use client";

import { useState, useMemo } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import Image from "next/image";

interface StoreProps {
  products: IProductWithPage;
  categories: ICategoryWithPage;
}

export default function Store({ products, categories }: StoreProps) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<string | null>(null);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]);
  const [sort, setSort] = useState<"asc" | "desc" | "none">("none");

  // Filter & sort logic
  const filteredProducts = useMemo(() => {
    if (!products) return [];

    let result = [...products.product];

    // Search
    if (search.trim() !== "") {
      result = result.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Category
    if (category) {
      result = result.filter((p) => p.category?.category_id === category);
    }

    // Price range (dựa trên min variant price)
    result = result.filter((p) => {
      const minPrice = p.variants?.length
        ? Math.min(...p.variants.map((v) => Number(v.price)))
        : 0;
      return minPrice >= priceRange[0] && minPrice <= priceRange[1];
    });

    // Sort
    if (sort !== "none") {
      result.sort((a, b) => {
        const priceA = a.variants?.length
          ? Math.min(...a.variants.map((v) => Number(v.price)))
          : 0;
        const priceB = b.variants?.length
          ? Math.min(...b.variants.map((v) => Number(v.price)))
          : 0;

        return sort === "asc" ? priceA - priceB : priceB - priceA;
      });
    }

    return result;
  }, [products, search, category, priceRange, sort]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      {/* Sidebar Filter */}
      <div className="md:col-span-1 space-y-6">
        <div>
          <h3 className="font-semibold mb-2">Tìm kiếm</h3>
          <Input
            placeholder="Tìm sản phẩm..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div>
          <h3 className="font-semibold mb-2">Danh mục</h3>
          <Select
            onValueChange={(v) => setCategory(v === "all" ? null : v)}
            value={category ?? "all"}
          >
            <SelectTrigger>
              <SelectValue placeholder="Chọn danh mục" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả</SelectItem>
              {categories &&
                categories.categories.map((cat) => (
                  <SelectItem key={cat.category_id} value={cat.category_id}>
                    {cat.name}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <h3 className="font-semibold mb-2">Khoảng giá</h3>
          <Slider
            defaultValue={[0, 500]}
            min={0}
            max={1000}
            step={10}
            onValueChange={(v) =>
              setPriceRange([v[0], v[1]] as [number, number])
            }
          />
          <p className="text-sm mt-2">
            {priceRange[0]}$ - {priceRange[1]}$
          </p>
        </div>

        <div>
          <h3 className="font-semibold mb-2">Sắp xếp</h3>
          <Select
            onValueChange={(v) => setSort(v as "asc" | "desc" | "none")}
            value={sort}
          >
            <SelectTrigger>
              <SelectValue placeholder="Chọn cách sắp xếp" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">Mặc định</SelectItem>
              <SelectItem value="asc">Giá tăng dần</SelectItem>
              <SelectItem value="desc">Giá giảm dần</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Product Grid */}
      <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => {
          const minPrice = product.variants?.length
            ? Math.min(...product.variants.map((v) => Number(v.price)))
            : 0;
          return (
            <Card key={product.product_id} className="flex flex-col">
              <CardHeader className="p-0">
                <Image
                  src={product.variants?.[0]?.layout || "/images/default.jpg"}
                  alt={product.name}
                  width={400}
                  height={300}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
              </CardHeader>
              <CardContent className="flex-1">
                <h4 className="font-semibold text-lg">{product.name}</h4>
                <p className="text-muted-foreground text-sm">
                  {product.category?.name}
                </p>
                <p className="text-primary font-bold mt-2">${minPrice}</p>
                {product.description && (
                  <p className="text-sm text-gray-500 mt-1">
                    {product.description}
                  </p>
                )}
              </CardContent>
              <CardFooter>
                <Button className="w-full">Thêm vào giỏ</Button>
              </CardFooter>
            </Card>
          );
        })}

        {filteredProducts.length === 0 && (
          <p className="text-center col-span-full text-gray-500">
            Không tìm thấy sản phẩm nào.
          </p>
        )}
      </div>
    </div>
  );
}
