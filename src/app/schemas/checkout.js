import * as z from "zod";

export const checkoutAccountSchema = z.object({
    email: z.string()
        .min(1, "Email is required")
        .email("Please enter a valid email"),
});

export const addressSchema = z.object({
    forename: z.string()
        .min(1, "First name is required")
        .max(50, "First name is too long"),
    surname: z.string()
        .min(1, "Last name is required")
        .max(50, "Last name is too long"),
    extras: z.string().optional(),
    houseNumber: z.string()
        .min(1, "House number is required"),
    street: z.string()
        .min(1, "Street is required"),
    city: z.string()
        .min(1, "City is required"),
    state: z.string()
        .min(1, "State/Province is required"),
    postalCode: z.string()
        .min(1, "Postal code is required"),
    country: z.string()
        .min(1, "Country is required"),
});

export const checkoutSchema = z.object({
    account: checkoutAccountSchema,
    address: addressSchema,
});