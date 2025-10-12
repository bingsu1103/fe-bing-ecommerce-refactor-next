import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      user_id: string;
      full_name: string;
      role: string;
    };
    access_token: string;
    refresh_token: string;
    expired_in: Date;
    cart_id: string;
  }

  interface User {
    user_id: string;
    full_name: string;
    access_token: string;
    refresh_token: string;
    expired_in: Date;
    role: string;
    cart_id: string;
  }
}
