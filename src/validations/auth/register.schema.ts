import z from "zod";
import { loginSchema } from "./login.schema";

export const registerSchema = loginSchema.extend({
    name: z.string().trim().min(3).max(255)
}).strict()

export type RegisterInput = z.infer<typeof registerSchema>
