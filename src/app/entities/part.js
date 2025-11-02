import * as z from "zod"

export const partSchema = z.object({
    name: z.string()
        .min(1, "Name is required")
        .max(100, "Name is too long"),
    description: z.string()
        .min(10, "The description is too short")
        .max(500, "The description is too long"),
    oemNumber: z.string()
        .min(1, "The OEM number is required"),
    partNumber: z.string()
        .min(1, "The part number is required"),
    price: z.number()
        .min(0.25, "The price can't be less than 25 cents")
        .max(1000, "The price can't be higher than 1000 euros"),
    quantity: z.number()
        .min(1, "You can't sell what you don't have")
        .max(100, "Too many! I know you don't have that many!!"),
    modelIds: z.array(z.number())
        .min(1, "You must select at least 1 model")
        .max(20, "You should make a universal model instead")
})