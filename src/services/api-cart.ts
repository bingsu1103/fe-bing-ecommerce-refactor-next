// lib/authApi.ts
import axios from "@/configs/axios.config";
export default class CartApi {
  // id <-> user_id
  async findOne(id: string) {
    const backendUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/carts/${id}`;
    return await axios.get<IBackendRes<ICart>>(backendUrl);
  }

  async addToCart(
    cart_id: string,
    user_id: string,
    variant_id: string,
    quantity: number
  ) {
    const backendUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/cart-items`;
    return await axios.post<IBackendRes<ICartItem>>(backendUrl, {
      cart_id,
      user_id,
      variant_id,
      quantity,
    });
  }

  async removeFromCart(id: string) {
    const backendUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/cart-items/${id}`;
    return await axios.delete(backendUrl);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async updateItem(id: string, data: any) {
    const backendUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/cart-items/${id}`;
    return await axios.put(backendUrl, data);
  }
}

export const cartApi = new CartApi();
