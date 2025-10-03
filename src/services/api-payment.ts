// lib/authApi.ts
import axios from "@/configs/axios.config";
export default class PaymentApi {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async update(id: string, data: any) {
    const backendUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/payments/${id}`;
    return await axios.put(backendUrl, data);
  }

  async findOne(id: string) {
    const backendUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/payments/${id}`;
    return await axios.get<IBackendRes<IPayment>>(backendUrl);
  }
}

export const paymentApi = new PaymentApi();
