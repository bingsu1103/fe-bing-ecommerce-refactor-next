import { Skeleton } from "../ui/skeleton";

const ProductSkeleton = () => (
  <div className="rounded-2xl border p-4 space-y-3 shadow-sm">
    <Skeleton className="h-6 w-3/4 rounded" />
    <Skeleton className="h-4 w-full rounded" />
    <Skeleton className="h-4 w-1/2 rounded" />
    <div className="flex justify-between mt-3">
      <Skeleton className="h-6 w-16 rounded" />
      <Skeleton className="h-6 w-24 rounded" />
    </div>
    <Skeleton className="h-9 w-full rounded-md mt-3" />
  </div>
);
export default ProductSkeleton;
