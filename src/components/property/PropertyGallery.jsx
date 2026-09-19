import { useState } from "react";
import { X, ChevronLeft, ChevronRight, Images } from "lucide-react";

// Extracted Lightbox component for cleaner logic
const Lightbox = ({ photos, activeIndex, setActiveIndex, title }) => {
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  if (activeIndex === null) return null;

  const handleNext = (e) => {
    e?.stopPropagation();
    setActiveIndex((p) => (p === photos.length - 1 ? 0 : p + 1));
  };

  const handlePrev = (e) => {
    e?.stopPropagation();
    setActiveIndex((p) => (p === 0 ? photos.length - 1 : p - 1));
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    if (distance > 50) handleNext();
    if (distance < -50) handlePrev();
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4"
      onClick={() => setActiveIndex(null)}
      onTouchStart={(e) => {
        setTouchEnd(null);
        setTouchStart(e.targetTouches[0].clientX);
      }}
      onTouchMove={(e) => setTouchEnd(e.targetTouches[0].clientX)}
      onTouchEnd={handleTouchEnd}
      role="dialog"
      aria-label="Property image gallery"
    >
      <button
        onClick={() => setActiveIndex(null)}
        className="absolute right-5 top-5 rounded-full p-2 text-white transition hover:bg-white/10"
      >
        <X size={28} />
      </button>

      <div className="absolute left-1/2 top-7 -translate-x-1/2 text-sm text-white">
        {activeIndex + 1} / {photos.length}
      </div>

      {photos.length > 1 && (
        <>
          <button
            onClick={handlePrev}
            className="absolute left-3 rounded-full p-2 text-white transition hover:bg-white/10 sm:left-6"
          >
            <ChevronLeft size={32} />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-3 rounded-full p-2 text-white transition hover:bg-white/10 sm:right-6"
          >
            <ChevronRight size={32} />
          </button>
        </>
      )}

      <img
        src={photos[activeIndex]?.url}
        alt={`${title} - Image ${activeIndex + 1}`}
        onClick={(e) => e.stopPropagation()}
        className="max-h-[80vh] max-w-full rounded-lg object-contain"
      />
    </div>
  );
};

// Main Gallery Component
const PropertyGallery = ({ photos = [], title = "Property" }) => {
  const [activeIndex, setActiveIndex] = useState(null);

  if (!photos.length) {
    return (
      <div className="flex h-72 items-center justify-center rounded-2xl border border-[var(--border)] bg-[var(--card)] text-[var(--muted)]">
        No images available
      </div>
    );
  }

  return (
    <>
      <div className="relative grid h-[300px] min-h-0 grid-cols-1 gap-3 overflow-hidden rounded-2xl sm:h-[400px] md:grid-cols-4 lg:h-full">
        {/* Main Image */}
        <button
          onClick={() => setActiveIndex(0)}
          className="group relative col-span-1 overflow-hidden text-left md:col-span-2 md:row-span-2"
        >
          <img
            src={photos[0]?.url}
            alt={`${title} - Image 1`}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </button>

        {/* Thumbnails */}
        {photos.slice(1, 5).map((photo, index) => (
          <button
            key={photo.url || index}
            onClick={() => setActiveIndex(index + 1)}
            className="group relative hidden overflow-hidden text-left md:block"
          >
            <img
              src={photo.url}
              alt={`${title} - Image ${index + 2}`}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </button>
        ))}

        {/* View All Photos */}
        {photos.length > 1 && (
          <button
            onClick={() => setActiveIndex(0)}
            className="absolute bottom-4 right-4 flex items-center gap-2 rounded-lg bg-[var(--background)] px-4 py-2.5 text-sm font-medium text-[var(--foreground)] shadow-lg transition hover:opacity-80"
          >
            <Images size={17} />
            View all {photos.length} photos
          </button>
        )}
      </div>

      <Lightbox
        photos={photos}
        activeIndex={activeIndex}
        setActiveIndex={setActiveIndex}
        title={title}
      />
    </>
  );
};

export default PropertyGallery;
