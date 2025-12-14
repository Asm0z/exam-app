import * as z from 'zod';

export const forgetPasswordSchema = z.object({
    email: z.email("Invalid email address").nonempty("Email is required"),
})

export type ForgetPasswordSchemaType = z.infer<typeof forgetPasswordSchema>