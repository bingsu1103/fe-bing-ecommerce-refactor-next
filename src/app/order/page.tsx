import OrderHistory from "@/components/order/OrderHistory";
import { orderApi } from "@/services/api-order";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface SearchParams {
  searchParams?: { page?: string; limit?: string };
}

const Order = async ({ searchParams }: SearchParams) => {
  const session = await getServerSession(authOptions);
  const params = await searchParams;
  const page = Number(params?.page) || 1;
  const limit = Number(params?.limit) || 4;

  const orderUser = await orderApi.findByUserId(
    String(session?.user.user_id),
    page,
    limit
  );

  const orders = orderUser.data?.orders ?? [];
  const total = orderUser.data?.total ?? 0;
  const totalPages = Math.ceil(total / limit);

  return (
    <main className="min-h-screen py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-semibold mb-8 text-center">
          Lịch sử mua hàng
        </h1>
        <section className="shadow-sm rounded-2xl p-6 sm:p-8 border">
          <OrderHistory orders={orders} />

          {totalPages > 1 && (
            <Pagination className="mt-8">
              <PaginationContent className="flex justify-center gap-2">
                <PaginationItem>
                  <PaginationPrevious
                    href={`?page=${Math.max(1, page - 1)}&limit=${limit}`}
                    aria-disabled={page <= 1}
                    className={
                      page <= 1 ? "pointer-events-none opacity-50" : ""
                    }
                  />
                </PaginationItem>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (p) => (
                    <PaginationItem key={p}>
                      <PaginationLink
                        href={`?page=${p}&limit=${limit}`}
                        isActive={p === page}
                      >
                        {p}
                      </PaginationLink>
                    </PaginationItem>
                  )
                )}

                <PaginationItem>
                  <PaginationNext
                    href={`?page=${Math.min(
                      totalPages,
                      page + 1
                    )}&limit=${limit}`}
                    aria-disabled={page >= totalPages}
                    className={
                      page >= totalPages ? "pointer-events-none opacity-50" : ""
                    }
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}
        </section>
      </div>
    </main>
  );
};

export default Order;
