import { z } from "zod";
export const MovieValidation = z.object({
  name: z.string().min(3).max(25),
  released_on: z.string(),
});
