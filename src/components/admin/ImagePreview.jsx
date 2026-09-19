import { X, Star } from "lucide-react";

export default function ImagePreview({ images, setImages }) {
  // Sort images by order number
  const sortedImages = images.toSorted(
    (a, b) => a.order - b.order
  );

  // Set selected image as cover
  const setCover = (id) => {
    setImages((prev) =>
      prev.map((image) => ({
        ...image,
        isCover: image.id === id,
      }))
    );
  };

  // Delete image
  const deleteImage = (id) => {
    setImages((prev) => {
      const updatedImages = prev.filter(
        (image) => image.id !== id
      );

      // Normalize order numbers after deletion
      const reorderedImages = updatedImages.map(
        (image, index) => ({
          ...image,
          order: index + 1,
        })
      );

      // Assign a new cover if the cover was deleted
      if (
        reorderedImages.length > 0 &&
        !reorderedImages.some((image) => image.isCover)
      ) {
        reorderedImages[0].isCover = true;
      }

      return reorderedImages;
    });
  };

  // Change image order
  const handleOrderChange = (id, value) => {
    const newOrder = Number(value);

    if (!Number.isInteger(newOrder) || newOrder < 1) {
      return;
    }

    setImages((prev) =>
      prev.map((image) =>
        image.id === id
          ? { ...image, order: newOrder }
          : image
      )
    );
  };

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
      {sortedImages.map((image, index) => (
        <div
          key={image.id}
          className="overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--card)]"
        >
          {/* Image */}
          <div className="relative aspect-[4/3]">
            <img
              src={image.preview}
              alt={`Property preview ${index + 1}`}
              className="h-full w-full object-cover"
            />

            {/* Cover Badge */}
            {image.isCover && (
              <span className="absolute left-2 top-2 rounded-full bg-black px-2 py-1 text-xs text-white">
                Cover Image
              </span>
            )}

            {/* Delete Button */}
            <button
              type="button"
              onClick={() => deleteImage(image.id)}
              aria-label="Delete image"
              className="absolute right-2 top-2 rounded-full bg-white p-1.5 text-black shadow"
            >
              <X size={16} />
            </button>
          </div>

          {/* Image Controls */}
          <div className="flex flex-wrap items-center justify-between gap-2 p-3">
            {/* Set Cover */}
            <button
              type="button"
              onClick={() => setCover(image.id)}
              className="flex items-center gap-1 text-xs font-medium"
            >
              <Star
                size={14}
                className={
                  image.isCover ? "fill-yellow-400 text-yellow-500" : ""
                }
              />

              {image.isCover ? "Cover" : "Set Cover"}
            </button>

            {/* Order Input */}
            <label className="flex items-center gap-2 text-xs">
              Order

              <input
                type="number"
                min="1"
                value={image.order}
                onChange={(event) =>
                  handleOrderChange(image.id, event.target.value)
                }
                className="w-14 rounded-md border border-[var(--border)] bg-transparent px-2 py-1 text-sm"
              />
            </label>
          </div>
        </div>
      ))}
    </div>
  );
}
