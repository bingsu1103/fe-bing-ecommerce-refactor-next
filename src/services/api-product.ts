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

  async findAll(page?: number, limit?: number) {
    const backendUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/products?page=${page}&limit=${limit}`;
    return await axios.get<IBackendRes<IProductWithPage>>(backendUrl);
  }

  async delete(id: string) {
    const backendUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/products/${id}`;
    return axios.delete(backendUrl);
  }
}

export const productApi = new ProductApi();
