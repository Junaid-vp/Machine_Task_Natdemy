export default function PropertyCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--card)]">
      {/* Image skeleton */}
      <div className="h-56 animate-pulse bg-neutral-200 dark:bg-neutral-800" />

      {/* Content skeleton */}
      <div className="space-y-4 p-5">
        <div className="h-4 w-1/3 animate-pulse rounded bg-neutral-200 dark:bg-neutral-800" />

        <div className="h-6 w-3/4 animate-pulse rounded bg-neutral-200 dark:bg-neutral-800" />

        <div className="h-4 w-1/2 animate-pulse rounded bg-neutral-200 dark:bg-neutral-800" />

        <div className="flex gap-3 pt-2">
          <div className="h-4 w-16 animate-pulse rounded bg-neutral-200 dark:bg-neutral-800" />
          <div className="h-4 w-16 animate-pulse rounded bg-neutral-200 dark:bg-neutral-800" />
          <div className="h-4 w-16 animate-pulse rounded bg-neutral-200 dark:bg-neutral-800" />
        </div>

        <div className="h-10 w-full animate-pulse rounded-lg bg-neutral-200 dark:bg-neutral-800" />
      </div>
    </div>
  );
}
