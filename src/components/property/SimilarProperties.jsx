import PropertyCard from "./PropertyCard";

const SimilarProperties = ({ properties }) => {
  if (!properties || properties.length === 0) return null;

  return (
    <div>
      <h2 className="text-2xl font-bold tracking-tight text-[var(--foreground)] mb-6">
        Similar Properties
      </h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {properties.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>
    </div>
  );
};

export default SimilarProperties;
