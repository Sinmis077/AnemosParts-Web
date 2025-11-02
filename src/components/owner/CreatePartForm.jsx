import { Controller, Form, useForm } from "react-hook-form";
import { useCreatePart, useUpdatePart } from "@/app/hooks/useParts";
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
import { Skeleton } from "../ui/skeleton";
import { Button } from "../ui/button";
import { partSchema } from "@/app/entities/part";
import { zodResolver } from "@hookform/resolvers/zod";
import { useModels } from "@/app/hooks/useModels";
import { Textarea } from "../ui/textarea";

export function CreatePartForm({ id, part }) {
  const createPart = useCreatePart();
  const updatePart = useUpdatePart();

  const {
    models,
    isLoading: isLoadingModels,
    error: loadingModelsError,
  } = useModels();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(partSchema),
    defaultValues: {
      name: part?.name ?? "",
      description: part?.description ?? "",
      oemNumber: part?.oemNumber ?? "",
      partNumber: part?.partNumber ?? "",
      price: part?.price ?? 0,
      quantity: part?.quantity ?? 0,
      modelIds: part?.modelIds ?? [],
    },
  });

  const onSubmit = async (data) => {
    console.log(data);

    if (id) {
      updatePart(id, data);
    } else {
      createPart(data);
    }
  };

  const selectedModelIds = watch("modelIds");

  const toggleModel = (modelId) => {
    const currentIds = selectedModelIds || [];
    if (currentIds.includes(modelId)) {
      setValue(
        "modelIds",
        currentIds.filter((id) => id !== modelId),
      );
    } else {
      setValue("modelIds", [...currentIds, modelId]);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <FieldSet>
        <FieldLegend>Part form</FieldLegend>
        <FieldGroup>
          {/* Name Field */}
          <Field>
            <FieldLabel htmlFor="name">Name</FieldLabel>
            <Input
              id="name"
              {...register("name")}
              aria-invalid={!!errors.name}
              placeholder="Enter part name"
              autoComplete="off"
            />
            {errors.name && <FieldError>{errors.name.message}</FieldError>}
          </Field>

          {/* Description Field */}
          <Field>
            <FieldLabel htmlFor="description">Description</FieldLabel>
            <Textarea
              id="description"
              {...register("description")}
              aria-invalid={!!errors.description}
              placeholder="Enter part description (10-500 characters)"
              className="min-h-[100px] w-full rounded-md border px-3 py-2"
            />
            {errors.description && (
              <FieldError>{errors.description.message}</FieldError>
            )}
          </Field>

          {/* OEM Number */}
          <Field>
            <FieldLabel htmlFor="oemNumber">OEM Number</FieldLabel>
            <Input
              id="oemNumber"
              {...register("oemNumber")}
              aria-invalid={!!errors.oemNumber}
              placeholder="Enter OEM number"
            />
            {errors.oemNumber && (
              <FieldError>{errors.oemNumber.message}</FieldError>
            )}
          </Field>

          {/* Part Number */}
          <Field>
            <FieldLabel htmlFor="partNumber">Part Number</FieldLabel>
            <Input
              id="partNumber"
              {...register("partNumber")}
              aria-invalid={!!errors.partNumber}
              placeholder="Enter part number"
            />
            {errors.partNumber && (
              <FieldError>{errors.partNumber.message}</FieldError>
            )}
          </Field>

          {/* Price */}
          <Field>
            <FieldLabel htmlFor="price">Price</FieldLabel>
            <Input
              id="price"
              type="number"
              step="0.01"
              {...register("price", { valueAsNumber: true })}
              aria-invalid={!!errors.price}
              placeholder="0.00"
            />
            {errors.price && <FieldError>{errors.price.message}</FieldError>}
          </Field>

          {/* Quantity */}
          <Field>
            <FieldLabel htmlFor="quantity">Quantity</FieldLabel>
            <Input
              id="quantity"
              type="number"
              {...register("quantity", { valueAsNumber: true })}
              aria-invalid={!!errors.quantity}
              placeholder="0"
            />
            {errors.quantity && (
              <FieldError>{errors.quantity.message}</FieldError>
            )}
          </Field>

          {/* models Multi-Select */}
          <Field>
            <FieldLabel>Models</FieldLabel>
            {isLoadingModels ? (
              <Skeleton className="h-32 w-full" />
            ) : loadingModelsError ? (
              <div>
                <p>Failed to load models</p>
                <p className="text-red-600">{loadingModelsError.message}</p>
              </div>
            ) : (
              <div className="border rounded-md p-3 max-h-48 overflow-y-auto">
                {models ? (
                  models.map((model) => (
                    <FieldLabel
                      key={model.id}
                      className="flex items-center space-x-2 py-1 cursor-pointer hover:bg-gray-50"
                    >
                      <Input
                        type="checkbox"
                        checked={selectedModelIds?.includes(model.id) || false}
                        onChange={() => toggleModel(model.id)}
                        className="rounded"
                      />
                      <span>{model.name}</span>
                    </FieldLabel>
                  ))
                ) : (
                  <p>No models were found....</p>
                )}
              </div>
            )}
            {errors.modelIds && (
              <FieldError>{errors.modelIds.message}</FieldError>
            )}
          </Field>

          {/* Images placeholder */}
          <Field>
            <FieldLabel htmlFor="images">Images (coming soon)</FieldLabel>
            <Input
              id="images"
              type="file"
              multiple
              accept="image/*"
              disabled
              className="opacity-50"
            />
            <FieldDescription>
              Image upload will be added later
            </FieldDescription>
          </Field>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isSubmitting}
            className="px-4 py-2 hover:pointer disabled:opacity-50"
          >
            {isSubmitting ? "Saving..." : "Save Part"}
          </Button>
        </FieldGroup>
      </FieldSet>
    </form>
  );
}
