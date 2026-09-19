import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useProperties } from "../../context/PropertyContext";
import ImageUpload from "../../components/admin/ImageUpload";

const initialFormData = {
  title: "",
  purpose: "Buy",
  type: "Apartment",
  price: "",
  city: "",
  area: "",
  state: "",
  bedrooms: "",
  bathrooms: "",
  sqft: "",
  yearBuilt: "",
  description: "",
  amenities: "",
  phone: "",
  email: "",
  videoUrl: "",
};

// Helper function to convert File to Base64
const convertToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

export default function AdminAddProperty() {
  const { addProperty } = useProperties();
  const navigate = useNavigate();

  const [formData, setFormData] = useState(initialFormData);
  const [images, setImages] = useState([]);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    // Validate required fields
    if (
      !formData.title.trim() ||
      !formData.price ||
      !formData.city.trim() ||
      !formData.area.trim() ||
      !formData.description.trim() ||
      !formData.phone.trim()
    ) {
      setError("Please fill in all required fields.");
      return;
    }

    if (Number(formData.price) <= 0) {
      setError("Price must be greater than zero.");
      return;
    }

    if (images.length === 0) {
      setError("Please upload at least one property image.");
      return;
    }

    setIsSubmitting(true);

    try {
      // Process images to Base64 for localStorage persistence
      const processedPhotos = await Promise.all(
        images
          .toSorted((a, b) => a.order - b.order)
          .map(async (image) => {
            const base64Url = await convertToBase64(image.file);
            return {
              url: base64Url,
              isCover: image.isCover,
            };
          })
      );

      // Prepare property data
      const propertyId = `NAT-${crypto.randomUUID().slice(0, 8)}`;

      const slug = formData.title
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");

      const newProperty = {
        id: propertyId,
        slug: `${slug}-${Date.now()}`,
        title: formData.title.trim(),
        purpose: formData.purpose,
        type: formData.type,
        price: Number(formData.price),

        location: {
          city: formData.city.trim(),
          area: formData.area.trim(),
          state: formData.state.trim(),
        },

        bedrooms: Number(formData.bedrooms) || 0,
        bathrooms: Number(formData.bathrooms) || 0,
        sqft: Number(formData.sqft) || 0,
        yearBuilt: Number(formData.yearBuilt) || null,

        description: formData.description.trim(),

        amenities: formData.amenities
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean),

        contact: {
          phone: formData.phone.trim(),
          email: formData.email.trim(),
        },

        photos: processedPhotos,

        video: formData.videoUrl.trim()
          ? {
              type: "youtube",
              url: formData.videoUrl.trim(),
            }
          : null,

        featured: false,
        postedAt: new Date().toISOString().split("T")[0],
      };

      // Add property to Context
      addProperty(newProperty);

      // Navigate to properties page
      navigate("/properties");
    } catch (err) {
      setError("Failed to process images. File might be too large.");
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass =
    "w-full rounded-lg border border-[var(--border)] bg-[var(--card)] px-4 py-3 text-sm text-[var(--foreground)] outline-none focus:border-neutral-500";

  const labelClass =
    "mb-2 block text-sm font-medium text-[var(--foreground)]";

  return (
    <section className="min-h-screen bg-[var(--background)] px-4 py-10 text-[var(--foreground)] sm:px-6">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-[var(--muted)]">
            Admin Panel
          </p>

          <h1 className="text-3xl font-semibold tracking-tight">
            Add New Property
          </h1>

          <p className="mt-2 text-sm text-[var(--muted)]">
            Enter property details and publish your listing.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5 sm:p-8">
            <h2 className="mb-6 text-lg font-semibold">
              Basic Information
            </h2>

            <div className="space-y-5">
              <div>
                <label className={labelClass}>
                  Property Title *
                </label>

                <input
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="e.g. Luxury Villa in Calicut"
                  className={inputClass}
                  required
                />
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className={labelClass}>Purpose *</label>

                  <select
                    name="purpose"
                    value={formData.purpose}
                    onChange={handleChange}
                    className={inputClass}
                  >
                    <option value="Buy">Buy</option>
                    <option value="Rent">Rent</option>
                  </select>
                </div>

                <div>
                  <label className={labelClass}>
                    Property Type *
                  </label>

                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    className={inputClass}
                  >
                    <option value="Apartment">Apartment</option>
                    <option value="Villa">Villa</option>
                    <option value="House">House</option>
                    <option value="Land">Land</option>
                  </select>
                </div>
              </div>

              <div>
                <label className={labelClass}>Price (₹) *</label>

                <input
                  type="number"
                  name="price"
                  min="1"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="Enter price"
                  className={inputClass}
                  required
                />
              </div>
            </div>
          </div>

          {/* Location */}
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5 sm:p-8">
            <h2 className="mb-6 text-lg font-semibold">
              Location
            </h2>

            <div className="grid gap-5 sm:grid-cols-2">
              {[
                ["city", "City *"],
                ["area", "Area *"],
                ["state", "State"],
              ].map(([name, label]) => (
                <div key={name}>
                  <label className={labelClass}>{label}</label>

                  <input
                    name={name}
                    value={formData[name]}
                    onChange={handleChange}
                    className={inputClass}
                    required={name !== "state"}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Property Specifications */}
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5 sm:p-8">
            <h2 className="mb-6 text-lg font-semibold">
              Specifications
            </h2>

            <div className="grid gap-5 sm:grid-cols-2">
              {[
                ["bedrooms", "Bedrooms"],
                ["bathrooms", "Bathrooms"],
                ["sqft", "Area (sqft)"],
                ["yearBuilt", "Year Built"],
              ].map(([name, label]) => (
                <div key={name}>
                  <label className={labelClass}>{label}</label>

                  <input
                    type="number"
                    name={name}
                    min="0"
                    value={formData[name]}
                    onChange={handleChange}
                    className={inputClass}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Description & Amenities */}
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5 sm:p-8">
            <h2 className="mb-6 text-lg font-semibold">
              Description & Amenities
            </h2>

            <div className="space-y-5">
              <div>
                <label className={labelClass}>
                  Description *
                </label>

                <textarea
                  name="description"
                  rows="5"
                  value={formData.description}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder="Describe the property..."
                  required
                />
              </div>

              <div>
                <label className={labelClass}>
                  Amenities (comma separated)
                </label>

                <input
                  name="amenities"
                  value={formData.amenities}
                  onChange={handleChange}
                  placeholder="Swimming Pool, Parking, Garden"
                  className={inputClass}
                />
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5 sm:p-8">
            <h2 className="mb-6 text-lg font-semibold">
              Contact Information
            </h2>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className={labelClass}>Phone *</label>

                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={inputClass}
                  required
                />
              </div>

              <div>
                <label className={labelClass}>Email</label>

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>
            </div>
          </div>

          {/* Images */}
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5 sm:p-8">
            <h2 className="mb-6 text-lg font-semibold">
              Property Media
            </h2>

            <ImageUpload
              images={images}
              setImages={setImages}
            />

            <div className="mt-6">
              <label className={labelClass}>
                YouTube Video URL (optional)
              </label>

              <input
                type="url"
                name="videoUrl"
                value={formData.videoUrl}
                onChange={handleChange}
                placeholder="https://www.youtube.com/watch?v=..."
                className={inputClass}
              />
            </div>
          </div>

          {/* Error */}
          {error && (
            <p className="rounded-lg bg-red-50 p-4 text-sm text-red-600">
              {error}
            </p>
          )}

          {/* Submit */}
          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={() => navigate("/properties")}
              className="rounded-lg border border-[var(--border)] px-6 py-3 text-sm font-medium"
              disabled={isSubmitting}
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded-lg bg-black px-6 py-3 text-sm font-medium text-white transition hover:bg-neutral-800 disabled:opacity-50"
            >
              {isSubmitting ? "Saving Property..." : "Add Property"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
