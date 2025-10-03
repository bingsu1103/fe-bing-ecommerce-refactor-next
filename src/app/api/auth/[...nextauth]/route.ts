// app/api/auth/[...nextauth]/route.ts
import { authApi } from "@/services/api-auth";
import NextAuth, { User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

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

const handler = NextAuth({
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

          return {
            ...res.data?.user,
            access_token: res.data?.access_token,
            refresh_token: res.data?.refresh_token,
            expired_in: new Date(res.data?.expired_in ?? 0),
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
  pages: {
    // signIn: "/login",
    // error: "/login",
  },
  callbacks: {
    async jwt({ token, user }: { token: any; user?: User }) {
      if (user) {
        token.user_id = user.user_id;
        token.full_name = user.full_name;
        token.access_token = user.access_token;
        token.refresh_token = user.refresh_token;
        token.expired_in = new Date(user.expired_in);
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
      };
      session.access_token = String(token.access_token);
      session.refresh_token = String(token.refresh_token);
      return session;
    },
    async redirect({ url, baseUrl }) {
      // bất kể callbackUrl là gì, mình ép sang dashboard 3001
      return "http://localhost:3000/dashboard";
    },
  },
});

export { handler as GET, handler as POST };
