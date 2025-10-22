// lib/authApi.ts
import axios from "@/configs/axios.config";
export default class OrderApi {
  async create(
    user_id: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    order_item: any,
    payment_method: string,
    address: string,
    city: string,
    country: string
  ) {
    const backendUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/orders`;
    return await axios.post<IBackendRes<IOrder>>(backendUrl, {
      user_id,
      order_item,
      payment_method,
      address,
      city,
      country,
    });
  }

  async findOne(order_id: string) {
    const backendUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/orders/${order_id}`;
    return await axios.get<IBackendRes<IOrder>>(backendUrl);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async update(id: string, data: any) {
    const backendUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/orders/${id}`;
    return await axios.put(backendUrl, data);
  }

  async findAll(page?: number, limit?: number) {
    const backendUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/orders?page=${page}&limit=${limit}`;
    return await axios.get<IBackendRes<IOrderWithPage>>(backendUrl);
  }

  async findByUserId(id: string, page?: number, limit?: number) {
    const backendUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/orders/user/${id}?page=${page}&limit=${limit}`;
    return await axios.get<IBackendRes<IOrderWithPage>>(backendUrl);
  }
}

export const orderApi = new OrderApi();
