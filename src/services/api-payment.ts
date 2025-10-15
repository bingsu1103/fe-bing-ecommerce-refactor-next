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

  async findAll(page?: number, limit?: number) {
    const backendUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/payments?page=${page}&limit=${limit}`;
    return await axios.get<IBackendRes<IPaymentWithPage>>(backendUrl);
  }

  async createMomoPayment(amount: number, orderInfo: string) {
    const backendUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/momo/create`;
    return await axios.post<IBackendRes<IMomoCreateResponse>>(backendUrl, {
      amount,
      orderInfo,
    });
  }

  async createVnpayPayment(amount: number, orderInfo: string) {
    const backendUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/vnpay/create`;
    return await axios.post<IBackendRes<IVnpayCreateResponse>>(backendUrl, {
      amount,
      orderInfo,
    });
  }
}

export const paymentApi = new PaymentApi();
