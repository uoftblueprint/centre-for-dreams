import { Skeleton } from "./ui/skeleton";

export function SkeletonCard() {
  return (
    <div className="flex h-[150px] flex-col space-y-3">
      <Skeleton className="h-[125px] w-full rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
      </div>
    </div>
  );
}
