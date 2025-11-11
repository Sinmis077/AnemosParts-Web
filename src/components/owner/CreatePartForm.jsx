import { useForm } from "react-hook-form";
import { useCreatePart, useUpdatePart } from "@/app/hooks/useParts";
import { useUploadImage } from "@/app/hooks/useUploadImage";
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
import { useState, useRef } from "react";
import { Camera, X } from "lucide-react";

export function CreatePartForm({ id, part }) {
  const createPart = useCreatePart();
  const updatePart = useUpdatePart();
  const uploadImage = useUploadImage();

  const {
    models,
    isLoading: isLoadingModels,
    error: loadingModelsError,
  } = useModels();

  const [imagePreviews, setImagePreviews] = useState(part?.images ?? []);
  const [uploadedImageUrls, setUploadedImageUrls] = useState(part?.images ?? []);
  const fileInputRef = useRef(null);

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
      images: part?.images ?? [],
    },
  });

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files || []);
    
    files.forEach((file) => {
      uploadImage.mutate(file, {
        onSuccess: (data) => {
          setImagePreviews((prev) => [...prev, data.url]);
          setUploadedImageUrls((prev) => {
            const newUrls = [...prev, data.url];
            setValue("images", newUrls);
            return newUrls;
          });
        }
      });
    });

    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const removeImage = (indexToRemove) => {
    setImagePreviews((prev) => prev.filter((_, index) => index !== indexToRemove));
    setUploadedImageUrls((prev) => {
      const newUrls = prev.filter((_, index) => index !== indexToRemove);
      setValue("images", newUrls);
      return newUrls;
    });
  };

  const onSubmit = async (data) => {
    const partData = {
      ...data,
      images: uploadedImageUrls,
    };

    if (id) {
      updatePart.mutate({ id, data: partData });
    } else {
      createPart.mutate(partData);
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
        
        {/* Responsive grid: images on left for desktop, bottom for mobile */}
        <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-6">
          
          {/* Images Section */}
          <div className="order-2 lg:order-1">
            <Field>
              <FieldLabel htmlFor="images">Images</FieldLabel>
              <div className="space-y-3">
                {/* Hidden file input */}
                <Input
                  ref={fileInputRef}
                  id="images"
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                  disabled={uploadImage.isPending}
                />

                {/* Upload Button */}
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploadImage.isPending}
                  className="w-full"
                >
                  <Camera className="mr-2 h-4 w-4" />
                  {uploadImage.isPending ? "Uploading..." : "Add Images"}
                </Button>

                {/* Image Previews Grid */}
                {imagePreviews.length > 0 && (
                  <div className="grid grid-cols-2 gap-2">
                    {imagePreviews.map((imageUrl, index) => (
                      <div
                        key={index}
                        className="relative aspect-square border-2 border-gray-200 rounded-lg overflow-hidden group"
                      >
                        <img
                          src={imageUrl}
                          alt={`Part image ${index + 1}`}
                          className="h-full w-full object-cover"
                        />
                        {/* Remove button */}
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                          aria-label="Remove image"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                <FieldDescription>
                  {uploadImage.isPending
                    ? "Uploading images..."
                    : "Upload one or multiple images for this part"}
                </FieldDescription>
              </div>
              {errors.images && (
                <FieldError>{errors.images.message}</FieldError>
              )}
            </Field>
          </div>

          {/* Form Fields Section */}
          <FieldGroup className="order-1 lg:order-2 space-y-4">
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

            {/* Models Multi-Select */}
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
                  {models && models.length > 0 ? (
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
          </FieldGroup>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={isSubmitting}
          className="px-4 py-2 hover:pointer disabled:opacity-50 mt-6"
        >
          {isSubmitting ? "Saving..." : "Save Part"}
        </Button>
      </FieldSet>
    </form>
  );
}