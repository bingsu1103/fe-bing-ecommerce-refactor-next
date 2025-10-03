"use client";

import { useSession } from "next-auth/react";

export default function DashboardPage() {
  const { data: session, status } = useSession();

  if (status === "loading") return <p>Loading...</p>;
  if (!session) return <p>Bạn cần đăng nhập để xem dashboard</p>;

  return (
    <div>
      <h3>{JSON.stringify(session)}</h3>
      <h1>Xin chào {session.user?.full_name}</h1>
      <p>Access Token: {session.access_token}</p>
      <p>Refresh Token: {session.refresh_token}</p>
    </div>
  );
}
