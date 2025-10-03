// lib/authApi.ts
import axios from "@/configs/axios.config";
export default class VariantApi {
  async create(
    product_id: string,
    layout: string,
    color: string,
    price: string,
    stock_quantity: number
  ) {
    const backendUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/variants`;
    return await axios.post<IBackendRes<IVariant>>(backendUrl, {
      product_id,
      layout,
      color,
      price,
      stock_quantity,
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async update(id: string, data: any) {
    const backendUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/variants/${id}`;
    return await axios.put(backendUrl, data);
  }

  async delete(id: string) {
    const backendUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/variants/${id}`;
    return axios.delete(backendUrl);
  }
}

export const variantApi = new VariantApi();
