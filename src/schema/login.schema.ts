import * as z from 'zod';

export const loginSchema = z.object({
    email: z.email("Invalid email address").nonempty("Email is required"),
    password: z.string().nonempty("Password is required").regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, "Password must be at least 8 characters,include at least one uppercase letter, one lowercase letter, one number, and one special character")
})

export type LoginSchemaType = z.infer<typeof loginSchema>