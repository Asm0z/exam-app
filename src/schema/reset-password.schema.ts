import * as z from "zod";

export const resetPasswordSchema = z
  .object({
    email: z.email(),
    newPassword: z
      .string()
      .nonempty("New Password is required")
      .regex(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
        "Password must be at least 8 characters,include at least one uppercase letter, one lowercase letter, one number, and one special character"
      ),
    confirmPassword: z.string().nonempty("Confirm Password is required"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    path: ["confirmPassword"],
    error: "New Password and confirm password do not match",
  });

export type ResetPasswordSchemaType = z.infer<typeof resetPasswordSchema>;
