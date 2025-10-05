import { Metadata } from "next";
import { notFound } from "next/navigation";
import { productApi } from "@/services/api-product";
import ProductDetail from "@/components/store/ProductDetail";

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  try {
    const { id } = await params;
    const res = await productApi.findOne(id);
    const product = res?.data;

    if (!product) {
      return {
        title: "Không tìm thấy sản phẩm | FGAG Store",
        description: "Sản phẩm này không tồn tại hoặc đã bị xoá.",
      };
    }

    return {
      title: `${product.name} | BingTech Store`,
      description: product.description || `Mua ${product.name} chính hãng.`,
      openGraph: {
        title: `${product.name} | BingTech Store`,
        description: product.description || "Sản phẩm công nghệ chính hãng.",
      },
    };
  } catch {
    return {
      title: "Sản phẩm | BingTech Store",
      description: "Xem chi tiết sản phẩm tại BingTech Store",
    };
  }
}

async function getProduct(id: string): Promise<IProduct | null> {
  try {
    const res = await productApi.findOne(id);
    return res?.data || null;
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
}

export default async function ProductDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  const product = await getProduct(id);

  if (!product) return notFound();

  return <ProductDetail product={product} />;
}
