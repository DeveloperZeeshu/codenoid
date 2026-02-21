import z from "zod";

export const promptSchema = z.object({
  prompt: z
    .string()
    .min(2, "Please enter at least a few characters.")
    .max(5000, "Input is too long (max 5000 characters).")
    .trim(),
});

export type PromptInput = z.infer<typeof promptSchema>;