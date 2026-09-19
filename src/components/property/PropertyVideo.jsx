import { Play } from "lucide-react";

// Helper function to extract YouTube Video ID easily
const getYoutubeId = (url) => {
  if (!url) return null;
  if (url.includes("youtu.be/")) return url.split("youtu.be/")[1]?.split("?")[0];
  if (url.includes("v=")) return url.split("v=")[1]?.split("&")[0];
  if (url.includes("embed/")) return url.split("embed/")[1]?.split("?")[0];
  return null;
};

const PropertyVideo = ({ video, title = "Property Tour" }) => {
  if (!video?.url) return null;

  const youtubeId = getYoutubeId(video.url);

  return (
    <section className="mb-12">
      {/* Section Heading */}
      <div className="mb-6">
        <div className="mb-2 flex items-center gap-2">
          <Play size={18} className="text-[var(--foreground)]" />
          <span className="text-sm font-bold tracking-wider text-[var(--muted)]">
            PROPERTY VIDEO
          </span>
        </div>
        <h2 className="text-2xl font-bold tracking-tight">
          Take a Virtual Tour
        </h2>
      </div>

      {/* Video Container */}
      <div className="relative aspect-video overflow-hidden rounded-3xl border border-[var(--border)] bg-black shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300 dark:shadow-[0_8px_30px_rgba(255,255,255,0.05)]">
        {youtubeId ? (
          <iframe
            src={`https://www.youtube.com/embed/${youtubeId}?autoplay=0`}
            title={`${title} - Property Tour`}
            className="absolute inset-0 h-full w-full"
            allow="encrypted-media; picture-in-picture"
            allowFullScreen
            loading="lazy"
          />
        ) : (
          <video
            src={video.url}
            controls
            autoPlay={false}
            preload="metadata"
            playsInline
            className="h-full w-full object-contain"
            aria-label={`${title} - Property Tour`}
          />
        )}
      </div>

      {/* Optional Video Description */}
      {video.title && (
        <p className="mt-4 text-sm font-medium text-[var(--muted)]">
          {video.title}
        </p>
      )}
    </section>
  );
};

export default PropertyVideo;
