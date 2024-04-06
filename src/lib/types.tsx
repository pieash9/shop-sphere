import { z } from "zod";

export const FormSchema = z.object({
  phone: z
    .string()
    .describe("Phone")
    .min(11, "Enter correct phone number")
    .max(14, "Enter correct phone number"),
  password: z.string().describe("Password").min(1, "Password is required"),
});
