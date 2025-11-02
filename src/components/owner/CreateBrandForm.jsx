import { useForm } from "react-hook-form";
import { useCreateBrand, useUpdateBrand } from "@/app/hooks/useBrands";
import { Input } from "../ui/input";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "../ui/field";
import { Button } from "../ui/button";
import { brandSchema } from "@/app/entities/brand";
import { zodResolver } from "@hookform/resolvers/zod";

export function CreateBrandForm({ id, brand }) {
  const createBrand = useCreateBrand();
  const updateBrand = useUpdateBrand();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(brandSchema),
    defaultValues: {
      name: brand?.name ?? "",
      iconSrc: brand?.icon ?? "",
    },
  });

  const onSubmit = async (data) => {
    console.log(data);

    if (id) {
      updateBrand.mutate(id, data);
    } else {
      createBrand.mutate(data);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <FieldSet>
        <FieldLegend>Brand form</FieldLegend>
        <FieldGroup>
          {/* Name Field */}
          <Field>
            <FieldLabel htmlFor="name">Name</FieldLabel>
            <Input
              id="name"
              {...register("name")}
              aria-invalid={!!errors.name}
              placeholder="Enter brand name"
              autoComplete="off"
            />
            {errors.name && <FieldError>{errors.name.message}</FieldError>}
          </Field>

          {/* Icon Field */}
          <Field>
            <FieldLabel htmlFor="iconSrc">Icon</FieldLabel>
            <Input
              id="iconSrc"
              {...register("iconSrc")}
              aria-invalid={!!errors.iconSrc}
              placeholder="Enter icon URL or identifier"
              autoComplete="off"
            />
            {errors.icon && <FieldError>{errors.iconSrc.message}</FieldError>}
            <FieldDescription>
              URL to brand icon or icon identifier
            </FieldDescription>
          </Field>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isSubmitting}
            className="px-4 py-2 hover:pointer disabled:opacity-50"
          >
            {isSubmitting ? "Saving..." : "Save Brand"}
          </Button>
        </FieldGroup>
      </FieldSet>
    </form>
  );
}
