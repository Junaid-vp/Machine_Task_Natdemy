import { Link, useParams } from "react-router-dom";
import { BedDouble, Bath, Square, Calendar, Phone, MessageCircle, Mail, MapPin, CheckCircle2 } from "lucide-react";
import properties from "../data/properties.json";

import {
  formatLocation,
  formatPrice,
  getSimilarProperties,
} from "../utils/propertyUtils";

import SimilarProperties from "../components/property/SimilarProperties";
import PropertyGallery from "../components/property/PropertyGallery";
import PropertyVideo from "../components/property/PropertyVideo";
import EnquiryForm from "../components/property/EnquiryForm";

const PropertyPage = () => {
  const { slug } = useParams();

  // Find property using URL slug
  const property = properties.find((item) => item.slug === slug);

  // Handle invalid property slug
  if (!property) {
    return (
      <main className="min-h-[70vh] flex items-center justify-center px-4 bg-[var(--background)] text-[var(--foreground)]">
        <div className="text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">
            Property Not Found
          </h1>

          <p className="text-[var(--muted)] mb-6">
            The property you're looking for doesn't exist or may have been
            removed.
          </p>

          <Link
            to="/properties"
            className="inline-flex items-center justify-center rounded-lg bg-[var(--foreground)] px-6 py-3 text-[var(--background)] font-medium hover:opacity-80 transition"
          >
            Browse Properties
          </Link>
        </div>
      </main>
    );
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
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">

        {/* Breadcrumb */}
        <nav className="text-sm text-[var(--muted)] mb-6">
          <Link to="/" className="hover:text-[var(--foreground)] transition">
            Home
          </Link>

          <span className="mx-2">/</span>

          <Link
            to="/properties"
            className="hover:text-[var(--foreground)] transition"
          >
            Properties
          </Link>

          <span className="mx-2">/</span>

          <span className="text-[var(--foreground)]">
            {property.location.city}
          </span>
        </nav>

        {/* Top Section: Gallery & Key Details */}
        <div className="mb-10 grid grid-cols-1 gap-10 lg:grid-cols-3">
          
          {/* Left: Image Gallery */}
          <section className="relative min-h-0 lg:col-span-2">
            <PropertyGallery
              photos={property.photos}
              title={property.title}
            />
            
            {/* Listing Badge */}
            <div className="absolute left-4 top-4 z-10 flex pointer-events-none gap-2">
              <span className="rounded-full bg-[var(--background)] px-3 py-1.5 text-xs font-semibold text-[var(--foreground)] shadow">
                For {property.purpose}
              </span>

              <span className="rounded-full bg-[var(--background)] px-3 py-1.5 text-xs font-semibold text-[var(--foreground)] shadow">
                {property.type}
              </span>
            </div>
          </section>

          {/* Right: Key Details Card */}
          <aside className="h-fit">
            <div className="flex flex-col justify-start rounded-3xl border border-[var(--border)] bg-[var(--card)] p-6 sm:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300 dark:shadow-[0_8px_30px_rgba(255,255,255,0.05)]">
              
              {/* Title & Location */}
              <div>
                <h1 className="mb-3 text-2xl font-bold leading-tight tracking-tight sm:text-3xl">
                  {property.title}
                </h1>
                <div className="mb-6 flex items-center gap-2 text-sm text-[var(--muted)]">
                  <MapPin size={16} />
                  <span>{formatLocation(property)}</span>
                </div>

                {/* Price */}
                <div className="mb-8 border-b border-[var(--border)] pb-8">
                  <p className="text-3xl font-extrabold tracking-tight text-[var(--foreground)] sm:text-4xl">
                    {formatPrice(property.price, property.purpose)}
                  </p>
                </div>
              </div>

              {/* Property Specifications */}
              <div className="grid grid-cols-2 gap-x-4 gap-y-8">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--muted)]/10 text-[var(--foreground)]">
                    <BedDouble size={20} />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-[var(--muted)]">Bedrooms</p>
                    <p className="text-sm font-semibold">{property.bedrooms ?? "N/A"}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--muted)]/10 text-[var(--foreground)]">
                    <Bath size={20} />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-[var(--muted)]">Bathrooms</p>
                    <p className="text-sm font-semibold">{property.bathrooms ?? "N/A"}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--muted)]/10 text-[var(--foreground)]">
                    <Square size={20} />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-[var(--muted)]">Area</p>
                    <p className="text-sm font-semibold">
                      {property.sqft ? `${property.sqft.toLocaleString("en-IN")} sq.ft` : "N/A"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--muted)]/10 text-[var(--foreground)]">
                    <Calendar size={20} />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-[var(--muted)]">Built In</p>
                    <p className="text-sm font-semibold">{property.yearBuilt ?? "N/A"}</p>
                  </div>
                </div>
              </div>

            </div>
          </aside>
        </div>

        {/* Bottom Section: Description & Amenities */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
          <section className="min-w-0 lg:col-span-2">
            
            {/* Property Video */}
            <PropertyVideo video={property.video} title={property.title} />

            {/* Description */}
            <div className="mb-12">
              <h2 className="mb-6 text-2xl font-bold tracking-tight">
                About This Property
              </h2>

              <p className="leading-relaxed text-[var(--muted)] md:text-lg">
                {property.description}
              </p>
            </div>

            {/* Amenities */}
            <div className="mb-12">
              <h2 className="mb-6 text-2xl font-bold tracking-tight">
                Amenities
              </h2>

              {property.amenities?.length > 0 ? (
                <div className="flex flex-wrap gap-3">
                  {property.amenities.map((amenity) => (
                    <div
                      key={amenity}
                      className="flex cursor-default items-center gap-2 rounded-full bg-[var(--muted)]/10 px-4 py-2.5 text-sm font-medium text-[var(--foreground)] shadow-sm transition-all duration-300 hover:scale-[1.02] hover:bg-[var(--foreground)] hover:text-[var(--background)] hover:shadow-md"
                    >
                      <CheckCircle2 size={16} />
                      {amenity}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-[var(--muted)]">
                  No amenities listed.
                </p>
              )}
            </div>

            {/* Property ID */}
            <div className="border-t border-[var(--border)] pt-5 text-sm text-[var(--muted)]">
              <span className="font-semibold text-[var(--foreground)]">
                Property ID:{" "}
              </span>
              {property.id}
            </div>

            {/* Enquiry Form */}
            <EnquiryForm property={property} />
          </section>

          {/* Right: Contact Sidebar */}
          <aside className="h-full">
            <div className="flex h-full flex-col rounded-3xl border border-[var(--border)] bg-[var(--card)] p-6 sm:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300 dark:shadow-[0_8px_30px_rgba(255,255,255,0.05)]">
              <h2 className="mb-8 text-xl font-bold tracking-tight">
                Interested in this property?
              </h2>

              <div className="flex flex-1 flex-col justify-center gap-4">
                {/* Call */}
                <a
                  href={phone ? `tel:${phone}` : undefined}
                  className="flex items-center justify-center gap-2 rounded-xl py-3.5 text-center font-medium transition-all duration-300 hover:scale-[1.02] hover:shadow-lg active:scale-95"
                  style={{ backgroundColor: "var(--foreground)", color: "var(--background)" }}
                >
                  <Phone size={18} />
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
                  className="flex items-center justify-center gap-2 rounded-xl border border-[var(--border)] py-3.5 text-center font-medium transition-all duration-300 hover:bg-[var(--foreground)] hover:text-[var(--background)] hover:shadow-md"
                >
                  <MessageCircle size={18} />
                  WhatsApp
                </a>

                {/* Enquire Button */}
                <a
                  href="#enquiry"
                  className="flex items-center justify-center gap-2 rounded-xl border border-[var(--border)] py-3.5 text-center font-medium transition-all duration-300 hover:bg-[var(--foreground)] hover:text-[var(--background)] hover:shadow-md"
                >
                  <Mail size={18} />
                  Send Enquiry
                </a>
              </div>

              <p className="mt-8 text-center text-xs font-medium text-[var(--muted)]">
                Mention Property ID: {property.id}
              </p>
            </div>
          </aside>
        </div>

        {/* Similar Properties */}
        {similarProperties.length > 0 && (
          <section className="mt-16">
            <SimilarProperties properties={similarProperties} />
          </section>
        )}
      </div>
    </main>
  );
};

export default PropertyPage;
