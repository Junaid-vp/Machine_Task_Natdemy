import PropertyCardSkeleton from "./PropertyCardSkeleton";

export default function PropertyCardSkeletons({ count = 6 }) {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
      {Array.from({ length: count }).map((_, index) => (
        <PropertyCardSkeleton key={index} />
      ))}
    </div>
  );
}
