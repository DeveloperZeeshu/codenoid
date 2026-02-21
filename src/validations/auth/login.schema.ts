import z from "zod";

export const loginSchema = z.object({
    email: z.string().email().trim().min(5).max(255).toLowerCase(),
    password: z.string().trim().min(8).max(128)
}).strict()

export type LoginInput = z.infer<typeof loginSchema>
