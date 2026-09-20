import { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { useDebounce } from "./useDebounce";
import { useProperties } from "../context/PropertyContext";

export const usePropertyFilters = () => {
  const { properties } = useProperties();
  const [searchParams, setSearchParams] = useSearchParams();

  // 1. Initialize State
  const [search, setSearch] = useState(searchParams.get("city") || "");
  const [purpose, setPurpose] = useState(searchParams.get("purpose") || "");
  const [type, setType] = useState(searchParams.get("type") || "");
  const [minPrice, setMinPrice] = useState(searchParams.get("min_price") || "");
  const [maxPrice, setMaxPrice] = useState(searchParams.get("max_price") || "");
  const [bedrooms, setBedrooms] = useState(searchParams.get("bedrooms") || "");
  const [sort, setSort] = useState(searchParams.get("sort") || "newest");

  // 2. Debounce text/number inputs
  const debouncedSearch = useDebounce(search, 400);
  const debouncedMinPrice = useDebounce(minPrice, 400);
  const debouncedMaxPrice = useDebounce(maxPrice, 400);

  // 3. Sync to URL Parameters
  useEffect(() => {
    setSearchParams((params) => {
      if (debouncedSearch.trim()) params.set("city", debouncedSearch.trim());
      else params.delete("city");

      if (purpose) params.set("purpose", purpose);
      else params.delete("purpose");

      if (type) params.set("type", type);
      else params.delete("type");

      if (debouncedMinPrice) params.set("min_price", debouncedMinPrice);
      else params.delete("min_price");

      if (debouncedMaxPrice) params.set("max_price", debouncedMaxPrice);
      else params.delete("max_price");

      if (bedrooms) params.set("bedrooms", bedrooms);
      else params.delete("bedrooms");

      if (sort && sort !== "newest") params.set("sort", sort);
      else params.delete("sort");

      return params;
    });
  }, [
    debouncedSearch,
    purpose,
    type,
    debouncedMinPrice,
    debouncedMaxPrice,
    bedrooms,
    sort,
    setSearchParams,
  ]);

  // 4. Filter Properties
  const filteredProperties = useMemo(() => {
    let result = [...properties];

    // Use debounced search for filtering
    if (debouncedSearch.trim()) {
      const query = debouncedSearch.trim().toLowerCase();
      result = result.filter(
        (p) =>
          p.location.city.toLowerCase().includes(query) ||
          p.location.area.toLowerCase().includes(query)
      );
    }

    if (purpose) result = result.filter((p) => p.purpose === purpose);
    if (type) result = result.filter((p) => p.type === type);
    if (debouncedMinPrice) result = result.filter((p) => p.price >= Number(debouncedMinPrice));
    if (debouncedMaxPrice) result = result.filter((p) => p.price <= Number(debouncedMaxPrice));
    if (bedrooms) result = result.filter((p) => p.bedrooms >= Number(bedrooms));

    // Sort
    if (sort === "newest") {
      result.sort((a, b) => new Date(b.postedAt) - new Date(a.postedAt));
    } else if (sort === "price_low") {
      result.sort((a, b) => a.price - b.price);
    } else if (sort === "price_high") {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [debouncedSearch, purpose, type, debouncedMinPrice, debouncedMaxPrice, bedrooms, sort, properties]);

  // 5. Helper Functions
  const clearFilters = () => {
    setSearch("");
    setPurpose("");
    setType("");
    setMinPrice("");
    setMaxPrice("");
    setBedrooms("");
    setSort("newest");
  };

  const hasFilters =
    search ||
    purpose ||
    type ||
    minPrice ||
    maxPrice ||
    bedrooms ||
    sort !== "newest";

  return {
    filters: {
      search,
      purpose,
      type,
      minPrice,
      maxPrice,
      bedrooms,
      sort,
    },
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
  };
};
