import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle, Send } from "lucide-react";
import { enquirySchema } from "../../schemas/enquirySchema";

const EnquiryForm = ({ property }) => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(enquirySchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      message: "",
      preferredVisitDate: "",
    },
  });

  // Handle valid form submission
  const onSubmit = async (data) => {
    const enquiryData = {
      ...data,
      propertyId: property.id,
      propertyTitle: property.title,
    };

    console.log("Property Enquiry Submitted:", enquiryData);

    setIsSubmitted(true);
    reset();
  };

  // Minimum selectable visit date
  const today = new Date();
  const minDate = [
    today.getFullYear(),
    String(today.getMonth() + 1).padStart(2, "0"),
    String(today.getDate()).padStart(2, "0"),
  ].join("-");

  const inputClass = (field) =>
    `w-full rounded-xl border ${
      errors[field]
        ? "border-red-500 ring-1 ring-red-500/20"
        : "border-[var(--border)]"
    } bg-[var(--background)] text-[var(--foreground)] px-4 py-3 text-sm outline-none focus:border-[var(--foreground)] focus:ring-2 focus:ring-[var(--foreground)]/10 transition-all`;

  return (
    <section
      id="enquiry"
      className="mt-12 overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--card)] p-6 sm:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300 dark:shadow-[0_8px_30px_rgba(255,255,255,0.05)]"
    >
      {/* Form Heading */}
      <div className="mb-8">
        <p className="mb-2 text-xs font-bold tracking-widest text-[var(--muted)]">
          PROPERTY ENQUIRY
        </p>

        <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
          Interested in this property?
        </h2>

        <p className="mt-2 text-sm font-medium text-[var(--muted)]">
          Fill out the form and let us know when you'd like to visit.
        </p>
      </div>

      {/* Success Message */}
      {isSubmitted && (
        <div
          role="status"
          className="mb-8 flex items-start gap-3 rounded-2xl border border-green-500/30 bg-green-500/10 p-5"
        >
          <CheckCircle className="mt-0.5 shrink-0 text-green-600 dark:text-green-500" size={20} />

          <div>
            <p className="font-bold text-green-700 dark:text-green-400">
              Enquiry submitted successfully!
            </p>

            <p className="mt-1 text-sm font-medium text-green-600/80 dark:text-green-500/80">
              Thank you for your interest. Your enquiry has been recorded.
            </p>
          </div>
        </div>
      )}

      {/* Enquiry Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        onChange={() => setIsSubmitted(false)}
        noValidate
        className="space-y-6"
      >
        {/* Name */}
        <div>
          <label htmlFor="name" className="mb-2 block text-sm font-medium">
            Full Name *
          </label>

          <input
            id="name"
            type="text"
            placeholder="Enter your full name"
            autoComplete="name"
            {...register("name")}
            className={inputClass("name")}
          />

          {errors.name && (
            <p className="mt-1.5 text-xs font-medium text-red-500">
              {errors.name.message}
            </p>
          )}
        </div>

        {/* Phone + Email */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor="phone" className="mb-2 block text-sm font-medium">
              Phone Number *
            </label>

            <input
              id="phone"
              type="tel"
              inputMode="numeric"
              maxLength={10}
              placeholder="10-digit phone number"
              autoComplete="tel-national"
              {...register("phone")}
              className={inputClass("phone")}
            />

            {errors.phone && (
              <p className="mt-1.5 text-xs font-medium text-red-500">
                {errors.phone.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="email" className="mb-2 block text-sm font-medium">
              Email Address *
            </label>

            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              autoComplete="email"
              {...register("email")}
              className={inputClass("email")}
            />

            {errors.email && (
              <p className="mt-1.5 text-xs font-medium text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>
        </div>

        {/* Preferred Visit Date */}
        <div>
          <label
            htmlFor="preferredVisitDate"
            className="mb-2 block text-sm font-medium"
          >
            Preferred Visit Date *
          </label>

          <input
            id="preferredVisitDate"
            type="date"
            min={minDate}
            {...register("preferredVisitDate")}
            className={inputClass("preferredVisitDate")}
          />

          {errors.preferredVisitDate && (
            <p className="mt-1.5 text-xs font-medium text-red-500">
              {errors.preferredVisitDate.message}
            </p>
          )}
        </div>

        {/* Message */}
        <div>
          <label htmlFor="message" className="mb-2 block text-sm font-medium">
            Message *
          </label>

          <textarea
            id="message"
            rows={4}
            placeholder="I'm interested in this property..."
            {...register("message")}
            className={`${inputClass("message")} resize-y`}
          />

          {errors.message && (
            <p className="mt-1.5 text-xs font-medium text-red-500">
              {errors.message.message}
            </p>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--foreground)] px-5 py-4 text-sm font-bold text-[var(--background)] transition-all hover:scale-[1.01] hover:opacity-90 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50"
        >
          <Send size={18} />
          Submit Enquiry
        </button>

        <p className="text-center text-xs font-medium text-[var(--muted)]">
          Enquiring about Property ID: <span className="font-bold">{property.id}</span>
        </p>
      </form>
    </section>
  );
};

export default EnquiryForm;
