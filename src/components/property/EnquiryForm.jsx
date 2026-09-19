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
      className="overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 shadow-sm sm:p-8"
    >
      <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:gap-12">
        {/* Left Side: Heading */}
        <div className="lg:w-1/3">
          <p className="mb-1 text-xs font-bold tracking-widest text-[var(--muted)]">
            PROPERTY ENQUIRY
          </p>
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Interested in this property?
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">
            Fill out the form and let us know when you'd like to visit. We will get back to you within 24 hours.
          </p>

          {/* Success Message */}
          {isSubmitted && (
            <div
              role="status"
              className="mt-6 flex items-start gap-3 rounded-xl border border-green-500/30 bg-green-500/10 p-4"
            >
              <CheckCircle className="mt-0.5 shrink-0 text-green-600 dark:text-green-500" size={18} />
              <div>
                <p className="text-sm font-bold text-green-700 dark:text-green-400">
                  Enquiry submitted successfully!
                </p>
                <p className="mt-1 text-xs font-medium text-green-600/80 dark:text-green-500/80">
                  Thank you for your interest.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Right Side: Enquiry Form */}
        <div className="flex-1">
          <form
            onSubmit={handleSubmit(onSubmit)}
            onChange={() => setIsSubmitted(false)}
            noValidate
            className="grid grid-cols-1 gap-5 sm:grid-cols-2"
          >
            {/* Name */}
            <div className="sm:col-span-1">
              <label htmlFor="name" className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-[var(--muted)]">
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

            {/* Email Address */}
            <div className="sm:col-span-1">
              <label htmlFor="email" className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-[var(--muted)]">
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

            {/* Phone */}
            <div className="sm:col-span-1">
              <label htmlFor="phone" className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-[var(--muted)]">
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

            {/* Preferred Visit Date */}
            <div className="sm:col-span-1">
              <label
                htmlFor="preferredVisitDate"
                className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-[var(--muted)]"
              >
                Visit Date *
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
            <div className="sm:col-span-2">
              <label htmlFor="message" className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-[var(--muted)]">
                Message *
              </label>
              <textarea
                id="message"
                rows={3}
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

            {/* Submit & Meta */}
            <div className="flex flex-col gap-4 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between sm:gap-6 mt-2">
              <p className="text-xs font-medium text-[var(--muted)] order-2 sm:order-1 text-center sm:text-left">
                Enquiring about Property ID: <span className="font-bold text-[var(--foreground)]">{property.id}</span>
              </p>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex items-center justify-center gap-2 rounded-xl bg-[var(--foreground)] px-8 py-3.5 text-sm font-bold text-[var(--background)] transition-all hover:scale-[1.02] hover:opacity-90 active:scale-95 disabled:pointer-events-none disabled:opacity-50 order-1 sm:order-2"
              >
                <Send size={16} />
                Submit Enquiry
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default EnquiryForm;
