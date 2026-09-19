import { useState } from "react";
import { MapPin, Search, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

import PropertyCard from "../components/property/PropertyCard";
import { useProperties } from "../context/PropertyContext";

const Home = () => {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");

  const { properties } = useProperties();

  const featuredProperties = properties.filter(
    (property) => property.featured
  );

  const handleSearch = (event) => {
    event.preventDefault();

    const query = search.trim();

    if (!query) {
      return;
    }

    navigate(`/properties?city=${encodeURIComponent(query)}`);
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="border-b border-[var(--border)] bg-[var(--background)]">
        <div className="mx-auto flex min-h-[620px] max-w-5xl items-center px-5 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto flex w-full max-w-4xl flex-col items-center text-center">
            {/* Eyebrow */}
            <div className="mb-6 flex items-center justify-center gap-2 text-sm font-medium text-[var(--muted)]">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--foreground)]" />
              Discover your next property
            </div>

            {/* Heading */}
            <h1 className="max-w-4xl text-5xl font-bold tracking-[-0.04em] text-[var(--foreground)] sm:text-6xl lg:text-7xl">
              Find a place
              <br />
              that feels like home.
            </h1>

            {/* Description */}
            <p className="mt-7 max-w-2xl text-base leading-7 text-[var(--muted)] sm:text-lg">
              Explore carefully selected homes, apartments, villas and land
              across Kerala. Find a property that fits your lifestyle and
              future.
            </p>

            {/* Search Box */}
            <form
              onSubmit={handleSearch}
              className="mt-10 w-full max-w-3xl rounded-2xl border border-[var(--border)] bg-[var(--card)] p-2 shadow-sm"
            >
              <div className="flex flex-col gap-2 sm:flex-row">
                {/* Search Input */}
                <div className="flex min-h-14 flex-1 items-center gap-3 rounded-xl px-4 text-left">
                  <MapPin
                    size={20}
                    strokeWidth={1.8}
                    className="shrink-0 text-[var(--muted)]"
                  />

                  <div className="min-w-0 flex-1">
                    <label
                      htmlFor="property-search"
                      className="sr-only"
                    >
                      Search location
                    </label>

                    <input
                      id="property-search"
                      type="text"
                      value={search}
                      onChange={(event) => setSearch(event.target.value)}
                      placeholder="Search by city or location"
                      className="w-full bg-transparent text-sm text-[var(--foreground)] outline-none placeholder:text-[var(--muted)]"
                    />
                  </div>
                </div>

                {/* Search Button */}
                <button
                  type="submit"
                  className="inline-flex min-h-14 items-center justify-center gap-2 rounded-xl bg-[var(--foreground)] px-7 text-sm font-semibold text-[var(--background)] transition-opacity hover:opacity-80"
                >
                  <Search size={18} />
                  Search
                </button>
              </div>
            </form>

            {/* Quick Search Links */}
            <div className="mt-5 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm text-[var(--muted)]">
              <span>Popular:</span>

              {["Calicut", "Kochi", "Kannur", "Trivandrum"].map(
                (city) => (
                  <button
                    key={city}
                    type="button"
                    onClick={() =>
                      navigate(
                        `/properties?city=${encodeURIComponent(city)}`
                      )
                    }
                    className="font-medium text-[var(--foreground)] underline-offset-4 hover:underline"
                  >
                    {city}
                  </button>
                )
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="bg-[var(--background)]">
        <div className="mx-auto max-w-5xl px-5 py-16 sm:px-6 lg:px-8 lg:py-20">
          {/* Section Header */}
          <div className="mb-10 flex items-end justify-between gap-6">
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
                Handpicked for you
              </p>

              <h2 className="text-3xl font-bold tracking-tight text-[var(--foreground)] sm:text-4xl">
                Featured Properties
              </h2>

              <p className="mt-3 max-w-xl text-sm leading-6 text-[var(--muted)]">
                Explore some of the properties currently available on
                Natdemy.
              </p>
            </div>

            {/* Desktop View All */}
            <button
              type="button"
              onClick={() => navigate("/properties")}
              className="hidden shrink-0 items-center gap-2 text-sm font-semibold text-[var(--foreground)] sm:inline-flex"
            >
              View all
              <ArrowRight size={16} />
            </button>
          </div>

          {/* Property Grid */}
          {featuredProperties.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {featuredProperties.map((property) => (
                <PropertyCard
                  key={property.id}
                  property={property}
                />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-[var(--border)] px-6 py-16 text-center">
              <p className="text-sm text-[var(--muted)]">
                No featured properties available right now.
              </p>
            </div>
          )}

          {/* Mobile View All */}
          <button
            type="button"
            onClick={() => navigate("/properties")}
            className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-[var(--border)] px-5 py-3.5 text-sm font-semibold text-[var(--foreground)] transition-colors hover:bg-[var(--foreground)] hover:text-[var(--background)] sm:hidden"
          >
            View all properties
            <ArrowRight size={16} />
          </button>
        </div>
      </section>
    </div>
  );
};

export default Home;