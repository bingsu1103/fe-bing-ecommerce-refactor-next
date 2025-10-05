import Store from "@/components/store/Store";
import { categoryApi } from "@/services/api-category";
import { productApi } from "@/services/api-product";

export default async function StorePage() {
  const productRes: IBackendRes<IProductWithPage> = await productApi.findAll({
    page: 1,
    limit: 10,
  });
  const categoriesRes: IBackendRes<ICategoryWithPage> =
    await categoryApi.findAll(1, 10);
  const products = productRes?.data?.product as IProduct[];
  const categories = categoriesRes.data?.categories as ICategory[];

  return (
    <Store initialProducts={products ?? []} categories={categories ?? []} />
  );
}
