import { Link } from "react-router-dom";
import {
  Bath,
  BedDouble,
  MapPin,
  Maximize,
  Play,
} from "lucide-react";

import {
  formatLocation,
  formatPrice,
  getCoverPhoto,
} from "../../utils/propertyUtils";

const PropertyCard = ({ property }) => {
  const coverPhoto = getCoverPhoto(property);

  return (
    <article className="group overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--card)] transition-shadow duration-300 hover:shadow-lg">
      {/* Property Image */}
      <Link
        to={`/property/${property.slug}`}
        className="relative block aspect-[4/3] overflow-hidden bg-[var(--border)]"
      >
        {coverPhoto ? (
          <img
            src={coverPhoto.url}
            alt={property.title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-[var(--muted)]">
            No image available
          </div>
        )}

        {/* Buy / Rent Badge */}
        <span className="absolute left-4 top-4 rounded-full bg-[var(--background)] px-3 py-1.5 text-xs font-semibold text-[var(--foreground)] shadow-sm">
          {property.purpose}
        </span>

        {/* Video Badge */}
        {property.video && (
          <span className="absolute bottom-4 right-4 flex items-center gap-1.5 rounded-full bg-black/80 px-3 py-1.5 text-xs font-medium text-white">
            <Play size={12} fill="currentColor" />
            Video
          </span>
        )}
      </Link>

      {/* Property Information */}
      <div className="p-5">
        {/* Location */}
        <p className="flex items-center gap-1.5 text-sm text-[var(--muted)]">
          <MapPin size={15} />
          {formatLocation(property)}
        </p>

        {/* Title */}
        <Link
          to={`/property/${property.slug}`}
          className="mt-2 block"
        >
          <h3 className="line-clamp-1 text-lg font-semibold text-[var(--foreground)] transition-opacity group-hover:opacity-70">
            {property.title}
          </h3>
        </Link>

        {/* Price */}
        <p className="mt-2 text-xl font-bold text-[var(--foreground)]">
          {formatPrice(property.price, property.purpose)}
        </p>

        {/* Property Specs */}
        <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-[var(--border)] pt-4 text-sm text-[var(--muted)]">
          {property.bedrooms > 0 && (
            <span className="flex items-center gap-1.5">
              <BedDouble size={16} />
              {property.bedrooms} Beds
            </span>
          )}

          {property.bathrooms > 0 && (
            <span className="flex items-center gap-1.5">
              <Bath size={16} />
              {property.bathrooms} Baths
            </span>
          )}

          <span className="flex items-center gap-1.5">
            <Maximize size={16} />
            {property.sqft.toLocaleString("en-IN")} sqft
          </span>
        </div>
      </div>
    </article>
  );
};

export default PropertyCard;
