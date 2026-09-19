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
      <div className="mx-auto max-w-5xl px-5 py-6 sm:px-6 lg:px-8 lg:py-8">

        {/* Page Header */}
        <div className="mb-4 flex flex-wrap items-baseline gap-2 sm:gap-3">
          <span className="shrink-0 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
            Explore
          </span>

          <h1 className="shrink-0 text-2xl font-bold tracking-tight text-[var(--foreground)] sm:text-3xl">
            Properties
          </h1>

          <span className="text-sm text-[var(--muted)]">
            Find a property that matches your needs.
          </span>
        </div>

        {/* Filter Box */}
        <div className="w-full rounded-2xl border border-[var(--border)] bg-[var(--card)] p-4">
          
          {/* Search */}
          <div className="mb-3 flex items-center gap-2 rounded-xl border border-[var(--border)] px-3">
            <Search
              size={16}
              className="shrink-0 text-[var(--muted)]"
            />

            <input
              type="text"
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
              placeholder="Search by city or area..."
              className="h-10 w-full bg-transparent text-sm text-[var(--foreground)] outline-none placeholder:text-[var(--muted)]"
            />
          </div>

          {/* Filter Controls Grid */}
          <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-3">

            {/* Purpose */}
            <select
              value={purpose}
              onChange={(event) =>
                setPurpose(event.target.value)
              }
              className="h-10 rounded-xl border border-[var(--border)] bg-[var(--card)] px-3 text-sm text-[var(--foreground)] outline-none"
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
              className="h-10 rounded-xl border border-[var(--border)] bg-[var(--card)] px-3 text-sm text-[var(--foreground)] outline-none"
            >
              <option value="">All Types</option>
              <option value="Apartment">Apartment</option>
              <option value="Villa">Villa</option>
              <option value="House">House</option>
              <option value="Land">Land</option>
            </select>

            {/* Bedrooms */}
            <select
              value={bedrooms}
              onChange={(event) =>
                setBedrooms(event.target.value)
              }
              className="h-10 rounded-xl border border-[var(--border)] bg-[var(--card)] px-3 text-sm text-[var(--foreground)] outline-none"
            >
              <option value="">Any Bedrooms</option>
              <option value="1">1+ Bedroom</option>
              <option value="2">2+ Bedrooms</option>
              <option value="3">3+ Bedrooms</option>
              <option value="4">4+ Bedrooms</option>
              <option value="5">5+ Bedrooms</option>
            </select>

            {/* Minimum Price */}
            <input
              type="number"
              value={minPrice}
              onChange={(event) =>
                setMinPrice(event.target.value)
              }
              placeholder="Min price"
              className="h-10 rounded-xl border border-[var(--border)] bg-[var(--card)] px-3 text-sm text-[var(--foreground)] outline-none placeholder:text-[var(--muted)]"
            />

            {/* Maximum Price */}
            <input
              type="number"
              value={maxPrice}
              onChange={(event) =>
                setMaxPrice(event.target.value)
              }
              placeholder="Max price"
              className="h-10 rounded-xl border border-[var(--border)] bg-[var(--card)] px-3 text-sm text-[var(--foreground)] outline-none placeholder:text-[var(--muted)]"
            />

            {/* Sort (Moved here to be parallel to Max Price) */}
            <select
              value={sort}
              onChange={(event) =>
                setSort(event.target.value)
              }
              className="h-10 rounded-xl border border-[var(--border)] bg-[var(--card)] px-3 text-sm text-[var(--foreground)] outline-none"
            >
              <option value="newest">Newest</option>
              <option value="price_low">
                Price: Low to High
              </option>
              <option value="price_high">
                Price: High to Low
              </option>
            </select>
          </div>

          {/* Bottom Row */}
          <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            
            {/* Properties Found Count */}
            <div className="flex items-center gap-2 text-xs text-[var(--muted)]">
              <SlidersHorizontal size={14} />
              <span>
                {filteredProperties.length}{" "}
                {filteredProperties.length === 1
                  ? "property"
                  : "properties"}{" "}
                found
              </span>
            </div>

            {/* Clear Filters */}
            {hasFilters && (
              <button
                type="button"
                onClick={clearFilters}
                className="inline-flex h-9 items-center justify-center gap-1.5 rounded-lg border border-[var(--border)] px-3 text-xs font-medium text-[var(--foreground)] transition-colors hover:bg-[var(--foreground)] hover:text-[var(--background)]"
              >
                <X size={14} />
                Clear filters
              </button>
            )}
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
