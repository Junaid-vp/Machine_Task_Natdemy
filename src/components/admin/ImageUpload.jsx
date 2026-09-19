import ImagePreview from "./ImagePreview";

export default function ImageUpload({ images, setImages }) {
  const handleUpload = (event) => {
    const files = Array.from(event.target.files);

    const imageFiles = files.filter((file) =>
      file.type.startsWith("image/")
    );

    const newImages = imageFiles.map((file, index) => ({
      id: crypto.randomUUID(),
      file,
      preview: URL.createObjectURL(file),
      isCover: false,
      order: images.length + index + 1,
    }));

    setImages((prev) => {
      const updatedImages = [...prev, ...newImages];

      // Set first image as cover if no cover exists
      if (!updatedImages.some((image) => image.isCover)) {
        updatedImages[0] = {
          ...updatedImages[0],
          isCover: true,
        };
      }

      return updatedImages;
    });

    // Allow uploading the same file again
    event.target.value = "";
  };

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-semibold">
          Property Images
        </h3>

        <p className="mt-1 text-xs text-[var(--muted)]">
          Upload images, select a cover, and set their display order.
        </p>
      </div>

      {/* Upload Area */}
      <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-[var(--border)] bg-transparent p-8 text-center transition hover:bg-[var(--muted)]/5">
        <span className="text-sm font-medium">
          Click to upload images
        </span>

        <span className="mt-1 text-xs text-[var(--muted)]">
          PNG, JPG, WEBP
        </span>

        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleUpload}
          className="sr-only"
        />
      </label>

      {/* Image Preview */}
      {images.length > 0 && (
        <ImagePreview
          images={images}
          setImages={setImages}
        />
      )}
    </div>
  );
}
