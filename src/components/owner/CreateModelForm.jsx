import { useForm } from "react-hook-form";
import { useCreateModel, useUpdateModel } from "@/app/hooks/useModels";
import { Input } from "../ui/input";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "../ui/field";
import { Skeleton } from "../ui/skeleton";
import { Button } from "../ui/button";
import { modelSchema } from "@/app/entities/model";
import { zodResolver } from "@hookform/resolvers/zod";
import { useBrands } from "@/app/hooks/useBrands";

export function CreateModelForm({ id, model }) {
  const createModel = useCreateModel();
  const updateModel = useUpdateModel();

  const {
    brands: brands,
    isLoading: isLoadingBrands,
    error: loadingBrandsError,
  } = useBrands();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(modelSchema),
    defaultValues: {
      name: model?.name ?? "",
      productionYear: model?.productionYear ?? new Date().getFullYear(),
      brandId: model?.brandId ?? "",
    },
  });

  const onSubmit = async (data) => {

    if (id) {
      updateModel.mutate(id, data);
    } else {
      createModel.mutate(data);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <FieldSet>
        <FieldLegend>Model form</FieldLegend>
        <FieldGroup>
          {/* Name Field */}
          <Field>
            <FieldLabel htmlFor="name">Name</FieldLabel>
            <Input
              id="name"
              {...register("name")}
              aria-invalid={!!errors.name}
              placeholder="Enter model name"
              autoComplete="off"
            />
            {errors.name && <FieldError>{errors.name.message}</FieldError>}
          </Field>

          {/* Production Year Field */}
          <Field>
            <FieldLabel htmlFor="productionYear">Production Year</FieldLabel>
            <Input
              id="productionYear"
              type="number"
              {...register("productionYear", { valueAsNumber: true })}
              aria-invalid={!!errors.productionYear}
              placeholder="Enter production year"
            />
            {errors.productionYear && (
              <FieldError>{errors.productionYear.message}</FieldError>
            )}
          </Field>

          {/* Brand Select */}
          <Field>
            <FieldLabel htmlFor="brandId">Brand</FieldLabel>
            {isLoadingBrands ? (
              <Skeleton className="h-10 w-full" />
            ) : loadingBrandsError ? (
              <div>
                <p>Failed to load brands</p>
                <p className="text-red-600">{loadingBrandsError.message}</p>
              </div>
            ) : (
              <select
                id="brandId"
                {...register("brandId", { valueAsNumber: true })}
                aria-invalid={!!errors.brandId}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                <option value="">Select a brand</option>
                {brands?.map((brand) => (
                  <option key={brand.id} value={brand.id}>
                    {brand.name}
                  </option>
                ))}
              </select>
            )}
            {errors.brandId && (
              <FieldError>{errors.brandId.message}</FieldError>
            )}
          </Field>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isSubmitting}
            className="px-4 py-2 hover:pointer disabled:opacity-50"
          >
            {isSubmitting ? "Saving..." : "Save Model"}
          </Button>
        </FieldGroup>
      </FieldSet>
    </form>
  );
}