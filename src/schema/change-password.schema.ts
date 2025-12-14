import * as z from 'zod';

export const changePasswordSchema = z.object({
    oldPassword: z.string().nonempty("Password is required").regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, "Password must be at least 8 characters,include at least one uppercase letter, one lowercase letter, one number, and one special character"),
    password: z.string().nonempty("Password is required").regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, "Password must be at least 8 characters,include at least one uppercase letter, one lowercase letter, one number, and one special character"),
    rePassword: z.string().nonempty("Confirm password is required"),
}).refine((data) => data.password === data.rePassword, {
    path: ['rePassword'],
    error: 'Password and confirm password do not match',
})

export type ChangePasswordSchemaType = z.infer<typeof changePasswordSchema>