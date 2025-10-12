// app/api/auth/[...nextauth]/route.ts
import NextAuth, { NextAuthOptions, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { authApi } from "@/services/api-auth";
import { cartApi } from "@/services/api-cart";

// Hàm refresh token
async function refreshAccessToken(token: any) {
  try {
    const res = await authApi.refresh(token.refresh_token);

    return {
      ...token,
      access_token: res.data.access_token,
      expired_in: new Date(res.data.expired_in),
      refresh_token: res.data.refresh_token,
    };
  } catch (error) {
    console.error("Refresh token error:", error);
    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}

// ✅ Tạo và export authOptions
export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const res = await authApi.login(
            credentials!.username,
            credentials!.password
          );
          const cartRes = await cartApi.findOne(String(res.data?.user.user_id));

          return {
            ...res.data?.user,
            access_token: res.data?.access_token,
            refresh_token: res.data?.refresh_token,
            expired_in: new Date(res.data?.expired_in ?? 0),
            role: res.data?.role,
            cart_id: cartRes.data?.cart_id,
          };
        } catch (error) {
          console.error("Authorize error:", error);
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }: { token: any; user?: User }) {
      if (user) {
        token.user_id = user.user_id;
        token.full_name = user.full_name;
        token.access_token = user.access_token;
        token.refresh_token = user.refresh_token;
        token.expired_in = new Date(user.expired_in);
        token.role = user.role;
        token.cart_id = user.cart_id;
      }

      if (Date.now() < new Date(token.expired_in).getTime()) {
        return token;
      }

      return await refreshAccessToken(token);
    },

    async session({ session, token }) {
      session.user = {
        user_id: String(token.user_id),
        full_name: String(token.full_name),
        role: String(token.role),
      };
      session.access_token = String(token.access_token);
      session.refresh_token = String(token.refresh_token);
      session.cart_id = String(token.cart_id);
      return session;
    },

    async redirect() {
      return "http://localhost:3000/";
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
