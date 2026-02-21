import z from "zod";

export const promptSchema = z.object({
    prompt: z.string().min(2).max(5000).trim(),
    type: z.enum(['generate', 'explain', 'report'])
}).strict()

export type PromptInput = z.infer<typeof promptSchema>