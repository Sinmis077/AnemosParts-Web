import * as z from "zod";

export const brandSchema = z.object({
  name: z.string()
         .min(1, "Name is required")
         .max(100, "Name is too long"),
  iconUrl: z.string()
            .optional(),
});
