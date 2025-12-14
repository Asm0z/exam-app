import * as z from 'zod';

export const editProfileSchema = z.object({
    username: z.string().nonempty("User Name is required").min(3, 'User Name must be at least 3 characters').max(20, 'User Name must be at most 20 characters'),
    firstName: z.string().nonempty("First Name is required").min(3, 'First Name must be at least 3 characters').max(20, 'First Name must be at most 20 characters'),
    lastName: z.string().nonempty("Last Name is required").min(3, 'Last Name must be at least 3 characters').max(20, 'Last Name must be at most 20 characters'),
    email: z.email("Invalid email address").nonempty("Email is required"),
    phone: z.string().nonempty("Phone number is required").regex(/^01[0125][0-9]{8}$/, "Invalid phone number"),
})

export type EditProfileSchemaSchemaType = z.infer<typeof editProfileSchema>