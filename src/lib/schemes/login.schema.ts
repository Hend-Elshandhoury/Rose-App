import { z } from "zod";

export const LoginSchema = z.object({
  email: z.email().min(1, "Email is required"),

  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[#?!@$%^&*-]).+$/,
      "Password must contain uppercase, lowercase, number, and special character",
    ),
  remember: z.boolean(),
});

export const defaultValue = {
  email: "",
  password: "",
  remember: false,
};

export type LoginSchemaType = z.infer<typeof LoginSchema>;
