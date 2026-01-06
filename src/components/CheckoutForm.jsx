import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Lock, MapPin, User } from "lucide-react";
import { FloatingInput } from "@/components/ui/floating-input";
import {
    FieldDescription,
    FieldGroup,
    FieldLegend,
    FieldSet,
} from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { checkoutSchema } from "@/app/schemas/checkout";
import { Divider } from "@/components/ui/divider";

CheckoutForm.propTypes = {
    onSubmit: Function,
    isSubmitting: Boolean,
};

export function CheckoutForm({ onSubmit, isSubmitting }) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(checkoutSchema),
        defaultValues: {
            account: {
                email: "",
            },
            address: {
                forename: "",
                surname: "",
                extras: "",
                houseNumber: "",
                street: "",
                city: "",
                state: "",
                postalCode: "",
                country: "",
            },
        },
    });

    return (
        <form
            className="bg-blue-50 p-6 rounded-2xl w-full max-w-2xl space-y-6"
            onSubmit={handleSubmit(onSubmit)}
        >
            <FieldSet>
                <FieldLegend className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Your Details
                </FieldLegend>
                <FieldDescription className="text-start">
                    We'll use this to send your order confirmation
                </FieldDescription>

                <FieldGroup>
                    <FloatingInput
                        id="email"
                        type="email"
                        label="Email"
                        {...register("account.email")}
                        aria-invalid={!!errors.account?.email}
                        error={errors.account?.email?.message}
                    />
                </FieldGroup>
            </FieldSet>

            <Divider />

            <FieldSet>
                <FieldLegend className="flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    Shipping Address
                </FieldLegend>
                <FieldDescription className="text-start">
                    Where should we send your parts?
                </FieldDescription>

                <FieldGroup>
                    <div className="grid grid-cols-2 gap-4">
                        <FloatingInput
                            id="forename"
                            label="First Name"
                            {...register("address.forename")}
                            aria-invalid={!!errors.address?.forename}
                            error={errors.address?.forename?.message}
                        />
                        <FloatingInput
                            id="surname"
                            label="Last Name"
                            {...register("address.surname")}
                            aria-invalid={!!errors.address?.surname}
                            error={errors.address?.surname?.message}
                        />
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                        <FloatingInput
                            id="houseNumber"
                            label="House/Apt"
                            {...register("address.houseNumber")}
                            aria-invalid={!!errors.address?.houseNumber}
                            error={errors.address?.houseNumber?.message}
                        />
                        <div className="col-span-2">
                            <FloatingInput
                                id="street"
                                label="Street"
                                {...register("address.street")}
                                aria-invalid={!!errors.address?.street}
                                error={errors.address?.street?.message}
                            />
                        </div>
                    </div>

                    <FloatingInput
                        id="extras"
                        label="Additional Info (optional)"
                        {...register("address.extras")}
                    />

                    <div className="grid grid-cols-2 gap-4">
                        <FloatingInput
                            id="city"
                            label="City"
                            {...register("address.city")}
                            aria-invalid={!!errors.address?.city}
                            error={errors.address?.city?.message}
                        />
                        <FloatingInput
                            id="state"
                            label="State/Province"
                            {...register("address.state")}
                            aria-invalid={!!errors.address?.state}
                            error={errors.address?.state?.message}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <FloatingInput
                            id="postalCode"
                            label="Postal Code"
                            {...register("address.postalCode")}
                            aria-invalid={!!errors.address?.postalCode}
                            error={errors.address?.postalCode?.message}
                        />
                        <FloatingInput
                            id="country"
                            label="Country"
                            {...register("address.country")}
                            aria-invalid={!!errors.address?.country}
                            error={errors.address?.country?.message}
                        />
                    </div>
                </FieldGroup>
            </FieldSet>

            <Divider />

            <FieldSet>
                <FieldLegend className="flex items-center gap-2">
                    <Lock className="h-5 w-5" />
                    Secure Checkout
                </FieldLegend>
                <FieldDescription className="text-start">
                    You'll be redirected to Stripe's secure payment page.
                </FieldDescription>
            </FieldSet>

            <Button type="submit" disabled={isSubmitting} className="w-full">
                {isSubmitting ? "Processing..." : "Proceed to Payment"}
            </Button>
        </form>
    );
}