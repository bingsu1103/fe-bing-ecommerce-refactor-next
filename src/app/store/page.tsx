import Store from "@/components/store/Store";
import { categoryApi } from "@/services/api-category";
import { productApi } from "@/services/api-product";

const StorePage = async () => {
  const res = await productApi.findAll(1, 10);

  const res2 = await categoryApi.findAll(1, 10);

  return (
    <div className="p-10">
      <Store products={res.data!} categories={res2.data!} />
    </div>
  );
};

export default StorePage;
