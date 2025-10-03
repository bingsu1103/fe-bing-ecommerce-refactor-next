// lib/authApi.ts
import axios from "@/configs/axios.config";
export default class CategoryApi {
  async create(name: string) {
    const backendUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/categories`;
    return await axios.post<IBackendRes<ICategory>>(backendUrl, {
      name,
    });
  }

  async findAll(page?: number, limit?: number) {
    const backendUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/categories?page=${page}&limit=${limit}`;
    return await axios.get<IBackendRes<ICategoryWithPage>>(backendUrl);
  }

  async delete(id: string) {
    const backendUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/categories/${id}`;
    return axios.delete(backendUrl);
  }
}

export const categoryApi = new CategoryApi();
