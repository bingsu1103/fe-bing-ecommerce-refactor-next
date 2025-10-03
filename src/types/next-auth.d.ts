import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      user_id: string;
      full_name: string;
    };
    access_token: string;
    refresh_token: string;
    expired_in: Date;
  }

  interface User {
    user_id: string;
    full_name: string;
    access_token: string;
    refresh_token: string;
    expired_in: Date;
  }
}
