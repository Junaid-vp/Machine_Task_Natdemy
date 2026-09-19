import { z } from "zod";

export const enquirySchema = z.object({
  name: z.string().trim().min(1, "Name is required"),

  phone: z
    .string()
    .trim()
    .regex(/^\d{10}$/, "Enter a valid 10-digit phone number"),

  email: z
    .string()
    .trim()
    .min(1, "Email is required")
    .email("Enter a valid email address"),

  message: z.string().trim().min(1, "Message is required"),

  preferredVisitDate: z
    .string()
    .min(1, "Preferred visit date is required")
    .refine(
      (date) => date >= new Date().toLocaleDateString("en-CA"),
      "Visit date cannot be in the past"
    ),
});
