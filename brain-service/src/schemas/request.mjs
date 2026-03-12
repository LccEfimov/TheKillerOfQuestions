import { z } from 'zod';
export const AnalyzeRequest = z.object({
  text: z.string().min(20),
  mode: z.string().optional(),
  protectedMode: z.boolean().optional()
});
