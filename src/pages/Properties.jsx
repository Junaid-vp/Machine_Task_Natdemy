import { Search, SlidersHorizontal, X } from "lucide-react";
import PropertyCard from "../components/property/PropertyCard";
import { usePropertyFilters } from "../hooks/usePropertyFilters";

const Properties = () => {
  const {
    filters: { search, purpose, type, minPrice, maxPrice, bedrooms, sort },
    setters: {
      setSearch,
      setPurpose,
      setType,
      setMinPrice,
      setMaxPrice,
      setBedrooms,
      setSort,
    },
    filteredProperties,
    clearFilters,
    hasFilters,
  } = usePropertyFilters();

  return (
    <section className="min-h-screen bg-[var(--background)]">
      <div className="mx-auto max-w-5xl px-5 py-10 sm:px-6 lg:px-8 lg:py-14">

        {/* Page Header */}
        <div className="mb-8">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
            Explore
          </p>

          <h1 className="text-3xl font-bold tracking-tight text-[var(--foreground)] sm:text-4xl">
            Properties
          </h1>

          <p className="mt-3 text-sm text-[var(--muted)]">
            Find a property that matches your needs.
          </p>
        </div>

        {/* Filters */}
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-4 sm:p-5">

          {/* Search */}
          <div className="flex items-center gap-3 rounded-xl border border-[var(--border)] px-4">
            <Search
              size={18}
              className="shrink-0 text-[var(--muted)]"
            />

            <input
              type="text"
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
              placeholder="Search by city or area..."
              className="h-12 w-full bg-transparent text-sm text-[var(--foreground)] outline-none placeholder:text-[var(--muted)]"
            />
          </div>

          {/* Filter Controls */}
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">

            {/* Purpose */}
            <select
              value={purpose}
              onChange={(event) =>
                setPurpose(event.target.value)
              }
              className="h-12 rounded-xl border border-[var(--border)] bg-[var(--card)] px-3 text-sm text-[var(--foreground)] outline-none"
            >
              <option value="">Buy or Rent</option>
              <option value="Buy">Buy</option>
              <option value="Rent">Rent</option>
            </select>

            {/* Type */}
            <select
              value={type}
              onChange={(event) =>
                setType(event.target.value)
              }
              className="h-12 rounded-xl border border-[var(--border)] bg-[var(--card)] px-3 text-sm text-[var(--foreground)] outline-none"
            >
              <option value="">All Types</option>
              <option value="Apartment">Apartment</option>
              <option value="Villa">Villa</option>
              <option value="House">House</option>
              <option value="Land">Land</option>
            </select>

            {/* Minimum Price */}
            <input
              type="number"
              value={minPrice}
              onChange={(event) =>
                setMinPrice(event.target.value)
              }
              placeholder="Min price"
              className="h-12 rounded-xl border border-[var(--border)] bg-[var(--card)] px-3 text-sm text-[var(--foreground)] outline-none placeholder:text-[var(--muted)]"
            />

            {/* Maximum Price */}
            <input
              type="number"
              value={maxPrice}
              onChange={(event) =>
                setMaxPrice(event.target.value)
              }
              placeholder="Max price"
              className="h-12 rounded-xl border border-[var(--border)] bg-[var(--card)] px-3 text-sm text-[var(--foreground)] outline-none placeholder:text-[var(--muted)]"
            />

            {/* Bedrooms */}
            <select
              value={bedrooms}
              onChange={(event) =>
                setBedrooms(event.target.value)
              }
              className="h-12 rounded-xl border border-[var(--border)] bg-[var(--card)] px-3 text-sm text-[var(--foreground)] outline-none"
            >
              <option value="">Any Bedrooms</option>
              <option value="1">1+ Bedroom</option>
              <option value="2">2+ Bedrooms</option>
              <option value="3">3+ Bedrooms</option>
              <option value="4">4+ Bedrooms</option>
              <option value="5">5+ Bedrooms</option>
            </select>
          </div>

          {/* Bottom Filter Row */}
          <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

            {/* Active Filters */}
            <div className="flex items-center gap-2 text-sm text-[var(--muted)]">
              <SlidersHorizontal size={16} />

              <span>
                {filteredProperties.length}{" "}
                {filteredProperties.length === 1
                  ? "property"
                  : "properties"}{" "}
                found
              </span>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">

              {/* Sort */}
              <select
                value={sort}
                onChange={(event) =>
                  setSort(event.target.value)
                }
                className="h-11 rounded-xl border border-[var(--border)] bg-[var(--card)] px-3 text-sm text-[var(--foreground)] outline-none"
              >
                <option value="newest">Newest</option>
                <option value="price_low">
                  Price: Low to High
                </option>
                <option value="price_high">
                  Price: High to Low
                </option>
              </select>

              {/* Clear Filters */}
              {hasFilters && (
                <button
                  type="button"
                  onClick={clearFilters}
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-[var(--border)] px-4 text-sm font-medium text-[var(--foreground)] transition-colors hover:bg-[var(--foreground)] hover:text-[var(--background)]"
                >
                  <X size={15} />
                  Clear filters
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Properties */}
        {filteredProperties.length > 0 ? (
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProperties.map((property) => (
              <PropertyCard
                key={property.id}
                property={property}
              />
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="mt-8 rounded-2xl border border-[var(--border)] px-6 py-20 text-center">
            <h2 className="text-xl font-semibold text-[var(--foreground)]">
              No properties found
            </h2>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[var(--muted)]">
              Try changing your search or removing some
              filters to see more properties.
            </p>

            <button
              type="button"
              onClick={clearFilters}
              className="mt-6 inline-flex items-center justify-center rounded-xl bg-[var(--foreground)] px-5 py-3 text-sm font-semibold text-[var(--background)] transition-opacity hover:opacity-80"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Properties;
