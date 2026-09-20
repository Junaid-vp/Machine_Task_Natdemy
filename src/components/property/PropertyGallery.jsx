import { useState } from "react";
import { X, ChevronLeft, ChevronRight, Images } from "lucide-react";


const Lightbox = ({ photos, activeIndex, setActiveIndex, title }) => {
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  if (activeIndex === null) return null;

  const handleNext = (event) => {
    // Prevent click from closing the lightbox
    if (event) {
      event.stopPropagation();
    }

    setActiveIndex((currentIndex) => {
      const isLastPhoto = currentIndex === photos.length - 1;
      
      if (isLastPhoto) {
        return 0; // Go back to the first photo
      } else {
        return currentIndex + 1; // Go to the next photo
      }
    });
  };

  const handlePrev = (event) => {
    // Prevent click from closing the lightbox
    if (event) {
      event.stopPropagation();
    }

    setActiveIndex((currentIndex) => {
      const isFirstPhoto = currentIndex === 0;
      
      if (isFirstPhoto) {
        return photos.length - 1; // Go to the very last photo
      } else {
        return currentIndex - 1; // Go to the previous photo
      }
    });
  };

  const handleTouchEnd = () => {
    // If the user just tapped without swiping, do nothing
    if (!touchStart || !touchEnd) {
      return;
    }

    // Calculate how far the user swiped
    const swipeDistance = touchStart - touchEnd;
    const minimumSwipeDistance = 50;

    // Swiped left (Next)
    if (swipeDistance > minimumSwipeDistance) {
      handleNext();
    }
    
    // Swiped right (Previous)
    if (swipeDistance < -minimumSwipeDistance) {
      handlePrev();
    }
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
        loading="eager"
        fetchPriority="high"
        decoding="async"
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
      <div className="relative grid h-[300px] min-h-0 grid-cols-1 gap-3 overflow-hidden rounded-2xl sm:h-[400px] md:grid-cols-4 lg:h-[500px]">
        {/* Main Image */}
        <button
          onClick={() => setActiveIndex(0)}
          className={`group relative overflow-hidden text-left col-span-1 ${
            photos.length === 1 ? "md:col-span-4" : "md:col-span-2"
          } md:row-span-2`}
        >
          <img
            src={photos[0]?.url}
            alt={`${title} - Image 1`}
            loading="eager"
            fetchPriority="high"
            decoding="async"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </button>

        {/* Thumbnails */}
        {photos.slice(1, 5).map((photo, index) => {
          // Dynamic classes based on total photo count to prevent empty spaces
          let thumbClass = "md:col-span-1 md:row-span-1"; // default for 5+ photos
          
          if (photos.length === 2) {
            thumbClass = "md:col-span-2 md:row-span-2"; // Single thumbnail takes right half
          } else if (photos.length === 3) {
            thumbClass = "md:col-span-2 md:row-span-1"; // Two thumbnails split the right half horizontally
          } else if (photos.length === 4) {
            // Three thumbnails: first two take top right, third takes bottom right full width
            thumbClass = index === 2 ? "md:col-span-2 md:row-span-1" : "md:col-span-1 md:row-span-1";
          }

          return (
            <button
              key={photo.url || index}
              onClick={() => setActiveIndex(index + 1)}
              className={`group relative hidden overflow-hidden text-left md:block ${thumbClass}`}
            >
              <img
                src={photo.url}
                alt={`${title} - Image ${index + 2}`}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </button>
          );
        })}

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
