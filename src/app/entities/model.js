import * as z from "zod";

export const modelSchema = z.object({
    name: z.string()
           .min(1, "Name is required")
           .max(100, "Name is too long"),
    productionYear: z.int()
                     .min(1885, "I don't think motorbikes existed prior to 1885")
                     .max(2027, "Production year cannot be in that far into future, only till next year"),
    brandId: z.number()
              .min(1, "Brand ID is required"),
});