// lib/authApi.ts
import axios from "@/configs/axios.config";
export default class ProductApi {
  async create(
    name: string,
    brand: string,
    description: string,
    category_id: string
  ) {
    const backendUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/products`;
    return await axios.post<IBackendRes<IProduct>>(backendUrl, {
      name,
      brand,
      description,
      category_id,
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async update(id: string, data: any) {
    const backendUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/products/${id}`;
    return await axios.put(backendUrl, data);
  }

  async findOne(id: string) {
    const backendUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/products/${id}`;
    return await axios.get<IBackendRes<IProduct>>(backendUrl);
  }

  async findAll(params?: {
    page?: number;
    limit?: number;
    category?: string;
    search?: string;
    minPrice?: number;
    maxPrice?: number;
    sort?: string;
  }) {
    const {
      page = 1,
      limit = 10,
      category,
      search,
      minPrice,
      maxPrice,
      sort,
    } = params || {};

    const query = new URLSearchParams();

    query.append("page", String(page));
    query.append("limit", String(limit));

    if (category && category !== "all") query.append("category", category);
    if (search) query.append("search", search);
    if (minPrice !== undefined) query.append("minPrice", String(minPrice));
    if (maxPrice !== undefined) query.append("maxPrice", String(maxPrice));
    if (sort && sort !== "default") query.append("sort", sort);

    const backendUrl = `${
      process.env.NEXT_PUBLIC_BACKEND_URL
    }/products?${query.toString()}`;

    try {
      const res = await axios.get<IBackendRes<IProductWithPage>>(backendUrl);
      return res;
    } catch (error) {
      console.error("Error fetching products:", error);
      throw error;
    }
  }

  async delete(id: string) {
    const backendUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/products/${id}`;
    return axios.delete(backendUrl);
  }
}

export const productApi = new ProductApi();
