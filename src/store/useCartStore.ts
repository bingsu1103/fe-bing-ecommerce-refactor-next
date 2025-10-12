import { create } from "zustand";
import { cartApi } from "@/services/api-cart";

interface CartStore {
  cart: ICart | null;
  hasFetchedCart: boolean;
  setCart: (cart: ICart) => void;
  fetchCart: (userId: string) => Promise<void>;
  setHasFetchedCart: (value: boolean) => void;
}

export const useCartStore = create<CartStore>((set) => ({
  cart: null,
  hasFetchedCart: false,
  setCart: (cart: ICart) => set({ cart }),
  setHasFetchedCart: (value: boolean) => set({ hasFetchedCart: value }),
  fetchCart: async (userId: string) => {
    try {
      const response = await cartApi.findOne(userId);
      set({ cart: response.data });
      set({ hasFetchedCart: true });
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  },
}));
