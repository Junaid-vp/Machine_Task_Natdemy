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
    <Link 
      to={`/property/${property.slug}`}
      className="group block overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--card)] transition-shadow duration-300 hover:shadow-lg"
    >
      <article>
        {/* Property Image */}
        <div className="relative block aspect-video overflow-hidden bg-[var(--border)]">
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
        <span className="absolute left-3 top-3 rounded-full bg-[var(--background)] px-2.5 py-1 text-xs font-semibold text-[var(--foreground)] shadow-sm">
          {property.purpose}
        </span>

        {/* Video Badge */}
        {property.video && (
          <span className="absolute bottom-3 right-3 flex items-center gap-1.5 rounded-full bg-black/80 px-2.5 py-1 text-xs font-medium text-white">
            <Play size={12} fill="currentColor" />
            Video
          </span>
        )}
        </div>

      {/* Property Information */}
      <div className="p-4">
        {/* Location */}
        <p className="flex items-center gap-1.5 text-xs text-[var(--muted)]">
          <MapPin size={14} />
          {formatLocation(property)}
        </p>

        {/* Title */}
        <div className="mt-1.5 block">
          <h3 className="line-clamp-1 text-base font-semibold text-[var(--foreground)] transition-opacity group-hover:opacity-70">
            {property.title}
          </h3>
        </div>

        {/* Price */}
        <p className="mt-1.5 text-lg font-bold text-[var(--foreground)]">
          {formatPrice(property.price, property.purpose)}
        </p>

        {/* Property Specs */}
        <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-2 border-t border-[var(--border)] pt-3 text-xs text-[var(--muted)]">
          {property.bedrooms > 0 && (
            <span className="flex items-center gap-1.5">
              <BedDouble size={14} />
              {property.bedrooms} Beds
            </span>
          )}

          {property.bathrooms > 0 && (
            <span className="flex items-center gap-1.5">
              <Bath size={14} />
              {property.bathrooms} Baths
            </span>
          )}

          <span className="flex items-center gap-1.5">
            <Maximize size={14} />
            {property.sqft.toLocaleString("en-IN")} sqft
          </span>
        </div>
      </div>
      </article>
    </Link>
  );
};

export default PropertyCard;
