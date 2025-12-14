import * as z from 'zod';

export const ResetCodeSchema = z.object({
    resetCode: z.string().nonempty("Reset Code is required")
})

export type ResetCodeSchemaType = z.infer<typeof ResetCodeSchema>