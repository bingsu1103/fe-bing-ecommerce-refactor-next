"use client";

import { useCartStore } from "@/store/useCartStore";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

const FetchCart: React.FC = () => {
  const { fetchCart } = useCartStore();
  const { data: session } = useSession();
  const userId = session?.user.user_id;
  useEffect(() => {
    if (userId) fetchCart(userId);
  }, [userId, fetchCart]);
  return <></>;
};
export default FetchCart;
