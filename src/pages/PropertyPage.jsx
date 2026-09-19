import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import {
  BedDouble,
  Bath,
  Square,
  Calendar,
  Phone,
  MessageCircle,
  Mail,
  MapPin,
  CheckCircle2,
} from "lucide-react";
import { useProperties } from "../context/PropertyContext";

import {
  formatLocation,
  formatPrice,
  getSimilarProperties,
} from "../utils/propertyUtils";

import SimilarProperties from "../components/property/SimilarProperties";
import PropertyGallery from "../components/property/PropertyGallery";
import PropertyVideo from "../components/property/PropertyVideo";
import EnquiryForm from "../components/property/EnquiryForm";
import MobileStickyContact from "../components/property/MobileStickyContact";

import NotFound from "./NotFound";

const PropertyPage = () => {
  const { slug } = useParams();
  const { properties } = useProperties();

  // Scroll to top when navigating to this page
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  // Find property using URL slug
  const property = properties.find((item) => item.slug === slug);

  // Handle invalid property slug
  if (!property) {
    return <NotFound />;
  }

  // Similar properties
  const similarProperties = getSimilarProperties(properties, property);

  // Contact details
  const phone = property.contact?.phone || "";
  const whatsappNumber = phone.replace(/\D/g, "");

  const whatsappMessage = encodeURIComponent(
    `Hi, I'm interested in ${property.title} (Property ID: ${property.id}). Please share more details.`
  );

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <main className="mx-auto max-w-7xl px-4 pb-28 pt-8 sm:px-6 md:py-12 lg:px-8 lg:pb-12">
        {/* Breadcrumb */}
        <nav className="mb-6 text-sm text-[var(--muted)]">
          <Link to="/" className="transition hover:text-[var(--foreground)]">
            Home
          </Link>
          <span className="mx-2">/</span>
          <Link
            to="/properties"
            className="transition hover:text-[var(--foreground)]"
          >
            Properties
          </Link>
          <span className="mx-2">/</span>
          <span className="text-[var(--foreground)]">
            {property.location.city}
          </span>
        </nav>

        {/* ======================= */}
        {/* TOP ROW: GALLERY + CARDS */}
        {/* ======================= */}
        <div className="mb-8 grid grid-cols-1 gap-5 lg:grid-cols-3 lg:gap-6">
          
          {/* Left: Gallery (Matches height of right column) */}
          <div className="relative lg:col-span-2">
            <PropertyGallery photos={property.photos} title={property.title} />

            {/* Listing Badge */}
            <div className="pointer-events-none absolute left-3 top-3 z-10 flex gap-1.5">
              <span className="rounded-full bg-[var(--background)] px-2.5 py-1 text-[10px] font-bold text-[var(--foreground)] shadow">
                For {property.purpose}
              </span>
              <span className="rounded-full bg-[var(--background)] px-2.5 py-1 text-[10px] font-bold text-[var(--foreground)] shadow">
                {property.type}
              </span>
            </div>
          </div>

          {/* Right: Key Details & Contact */}
          <div className="flex flex-col gap-4 lg:col-span-1">
            
            {/* Card 1: Key Details */}
            <div className="flex flex-1 flex-col justify-center rounded-xl border border-[var(--border)] bg-[var(--card)] p-4 shadow-sm sm:p-5">
              {/* Title & Location */}
              <div>
                <h1 className="mb-1 text-lg font-bold leading-tight tracking-tight sm:text-xl">
                  {property.title}
                </h1>
                <div className="mb-3 flex items-center gap-1.5 text-[11px] text-[var(--muted)]">
                  <MapPin size={12} />
                  <span>{formatLocation(property)}</span>
                </div>

                {/* Price */}
                <div className="mb-4 border-b border-[var(--border)] pb-4">
                  <p className="text-xl font-extrabold tracking-tight text-[var(--foreground)] sm:text-2xl">
                    {formatPrice(property.price, property.purpose)}
                  </p>
                </div>
              </div>

              {/* Specifications Grid */}
              <div className="grid grid-cols-2 gap-x-3 gap-y-4">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[var(--muted)]/10 text-[var(--foreground)]">
                    <BedDouble size={14} />
                  </div>
                  <div>
                    <p className="text-[9px] font-bold uppercase tracking-wider text-[var(--muted)]">Bedrooms</p>
                    <p className="text-xs font-bold">{property.bedrooms ?? "N/A"}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[var(--muted)]/10 text-[var(--foreground)]">
                    <Bath size={14} />
                  </div>
                  <div>
                    <p className="text-[9px] font-bold uppercase tracking-wider text-[var(--muted)]">Bathrooms</p>
                    <p className="text-xs font-bold">{property.bathrooms ?? "N/A"}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[var(--muted)]/10 text-[var(--foreground)]">
                    <Square size={14} />
                  </div>
                  <div>
                    <p className="text-[9px] font-bold uppercase tracking-wider text-[var(--muted)]">Area</p>
                    <p className="text-xs font-bold">
                      {property.sqft ? `${property.sqft.toLocaleString("en-IN")} sq.ft` : "N/A"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[var(--muted)]/10 text-[var(--foreground)]">
                    <Calendar size={14} />
                  </div>
                  <div>
                    <p className="text-[9px] font-bold uppercase tracking-wider text-[var(--muted)]">Built</p>
                    <p className="text-xs font-bold">{property.yearBuilt ?? "N/A"}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 2: Contact Actions */}
            <div className="flex flex-col justify-center rounded-xl border border-[var(--border)] bg-[var(--card)] p-4 shadow-sm sm:p-5">
              <h2 className="mb-3 text-sm font-bold tracking-tight">
                Interested? Let's Talk.
              </h2>

              <div className="flex flex-col gap-2.5">
                {/* Call */}
                <a
                  href={phone ? `tel:${phone}` : undefined}
                  className="flex items-center justify-center gap-2 rounded-lg py-2.5 text-xs font-bold transition-all hover:scale-[1.02] hover:shadow-md active:scale-95"
                  style={{ backgroundColor: "var(--foreground)", color: "var(--background)" }}
                >
                  <Phone size={14} />
                  Call Now
                </a>

                {/* WhatsApp */}
                <a
                  href={
                    whatsappNumber
                      ? `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`
                      : undefined
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 rounded-lg border border-[var(--border)] py-2.5 text-xs font-bold transition-all hover:bg-[#25D366] hover:text-white hover:border-[#25D366] hover:shadow-md"
                >
                  <MessageCircle size={14} />
                  WhatsApp
                </a>

                {/* Enquire Button */}
                <a
                  href="#enquiry"
                  className="flex items-center justify-center gap-2 rounded-lg py-2.5 text-xs font-bold transition-all hover:scale-[1.02] hover:shadow-md active:scale-95"
                  style={{ backgroundColor: "var(--foreground)", color: "var(--background)" }}
                >
                  <Mail size={14} />
                  Send Enquiry
                </a>
              </div>

              <div className="mt-4 text-center text-[10px] text-[var(--muted)]">
                Mention Property ID: <span className="font-bold text-[var(--foreground)]">{property.id}</span>
              </div>
            </div>

          </div>
        </div>

        {/* ======================= */}
        {/* MIDDLE ROW: DESC + VIDEO */}
        {/* ======================= */}
        <div className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-8">
          
          {/* Left: Text Content */}
          <div className="flex flex-col gap-10 lg:col-span-2">
            {/* About */}
            <div>
              <h2 className="mb-4 text-xl font-bold tracking-tight">
                About This Property
              </h2>
              <p className="leading-relaxed text-[var(--muted)] md:text-[15px]">
                {property.description}
              </p>
            </div>

            {/* Amenities */}
            <div>
              <h2 className="mb-4 text-xl font-bold tracking-tight">
                Amenities
              </h2>
              {property.amenities?.length > 0 ? (
                <div className="flex flex-wrap gap-2.5">
                  {property.amenities.map((amenity) => (
                    <div
                      key={amenity}
                      className="flex cursor-default items-center gap-1.5 rounded-full bg-[var(--muted)]/10 px-3.5 py-2 text-sm font-medium text-[var(--foreground)] transition-colors hover:bg-[var(--foreground)] hover:text-[var(--background)]"
                    >
                      <CheckCircle2 size={14} />
                      {amenity}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-[var(--muted)]">No amenities listed.</p>
              )}
            </div>
          </div>

          {/* Right: Property Video */}
          <div className="lg:col-span-1">
            <PropertyVideo video={property.video} title={property.title} />
          </div>
        </div>

        {/* ======================= */}
        {/* BOTTOM ROW: FORM */}
        {/* ======================= */}
        <div className="mb-16">
          <EnquiryForm property={property} />
        </div>

        {/* Similar Properties */}
        {similarProperties.length > 0 && (
          <section className="mt-16 border-t border-[var(--border)] pt-12">
            <SimilarProperties properties={similarProperties} />
          </section>
        )}
      </main>

      {/* Mobile Sticky Contact Bar */}
      <MobileStickyContact property={property} />
    </div>
  );
};

export default PropertyPage;
