"use client";

import { useEffect, useState } from "react";
import CartSkeleton from "@/components/cart/CartSkeleton";
import CartContent from "@/components/cart/CartContent";
import { useCartStore } from "@/store/useCartStore";
import { useSession } from "next-auth/react";
import { cartApi } from "@/services/api-cart";

export default function CartPage() {
  const { cart, fetchCart } = useCartStore();
  const { data: session } = useSession();

  //   useEffect(() => {
  //     fetchCart(String(session?.user.user_id));
  //   }, [session?.user.user_id, fetchCart]);

  const handleRemove = async (id: string) => {
    try {
      await cartApi.removeFromCart(id);
      fetchCart(String(session?.user.user_id));
    } catch (error) {
      console.error(error);
    }
  };

  const handleQuantityChange = async (id: string, delta: number) => {
    if (!cart) return;
    const item = cart.items.find((i) => i.cart_item_id === id);
    if (!item) return;
    const newQuantity = item.quantity + delta;
    if (newQuantity <= 0) return;
    try {
      await cartApi.updateItem(id, { quantity: newQuantity });
      fetchCart(String(session?.user.user_id));
    } catch (error) {
      console.error(error);
    }
  };

  if (!cart) return <CartSkeleton />;

  if (!cart || cart.items.length === 0)
    return (
      <div className="p-6 text-center text-muted-foreground">
        Giỏ hàng của bạn đang trống
      </div>
    );

  return (
    <CartContent
      cart={cart}
      onRemove={handleRemove}
      onQuantityChange={handleQuantityChange}
    />
  );
}
