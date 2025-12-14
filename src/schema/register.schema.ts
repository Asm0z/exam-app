import * as z from 'zod';

export const registerSchema = z.object({
    username: z.string().nonempty("User Name is required").min(3, 'User Name must be at least 3 characters').max(20, 'User Name must be at most 20 characters'),
    firstName: z.string().nonempty("First Name is required").min(3, 'First Name must be at least 3 characters').max(20, 'First Name must be at most 20 characters'),
    lastName: z.string().nonempty("Last Name is required").min(3, 'Last Name must be at least 3 characters').max(20, 'Last Name must be at most 20 characters'),
    email: z.email("Invalid email address").nonempty("Email is required"),
    password: z.string().nonempty("Password is required").regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, "Password must be at least 8 characters,include at least one uppercase letter, one lowercase letter, one number, and one special character"),
    rePassword: z.string().nonempty("Confirm password is required"),
    phone: z.string().nonempty("Phone number is required").regex(/^01[0125][0-9]{8}$/, "Invalid phone number"),
}).refine((data) => data.password === data.rePassword, {
    path: ['rePassword'],
    error: 'Password and confirm password do not match',
})

export type RegisterSchemaType = z.infer<typeof registerSchema>