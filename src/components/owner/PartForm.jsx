import { useForm } from "react-hook-form";
import { useCreatePart, useUpdatePart } from "@/app/hooks/useParts";
import { useUploadImages } from "@/app/hooks/useUploadImage";
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
import { useState, useRef, useMemo, useEffect } from "react";
import { Camera, X } from "lucide-react";

export function PartForm({ partId, part, onClose }) {
  const createPart = useCreatePart();
  const updatePart = useUpdatePart();
  const uploadImages = useUploadImages();

  const {
    models,
    isLoading: isLoadingModels,
    error: loadingModelsError,
  } = useModels();

  const [imagePreviews, setImagePreviews] = useState(part?.imageUrls ?? []);
  const [uploadedImageUrls, setUploadedImageUrls] = useState(part?.imageUrls ?? []);
  const [modelSearchQuery, setModelSearchQuery] = useState("");
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
    imageUrls: part?.images ?? [],
  },
});

const handleImageChange = (e) => {
  const files = Array.from(e.target.files || []);

  if (files.length === 0) return;

  // Check if adding these files would exceed the limit
  const remainingSlots = 10 - imagePreviews.length;
  if (files.length > remainingSlots) {
    alert(`You can only add ${remainingSlots} more image${remainingSlots !== 1 ? 's' : ''}. Maximum is 10 images.`);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    return;
  }

  uploadImages.mutate(files, {
    onSuccess: (data) => {
      const newImageUrls = data.imageUrls || [];
      setImagePreviews((prev) => [...prev, ...newImageUrls]);
      setUploadedImageUrls((prev) => {
        const updatedUrls = [...prev, ...newImageUrls];
        setValue("imageUrls", updatedUrls);
        return updatedUrls;
      });
    }
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
    setValue("imageUrls", newUrls);
    return newUrls;
  });
};

const onSubmit = async (data) => {
  const partData = {
    ...data,
    imageUrls: uploadedImageUrls,
  };

  if (partId) {
    updatePart.mutate({ id: partId, part: partData });
  } else {
    createPart.mutate(partData);
  }

  if (onClose) {
    onClose();
  }
};

const selectedModelIds = watch("modelIds");

// Filter models based on search query (only show dropdown if 3+ characters)
const filteredModels = useMemo(() => {
  if (!models) return [];
  if (modelSearchQuery.length < 3) return [];

  const query = modelSearchQuery.toLowerCase();
  return models.filter((model) =>
    model.name.toLowerCase().includes(query) &&
    !selectedModelIds?.includes(model.id)
  );
}, [models, modelSearchQuery, selectedModelIds]);

// Get selected model objects for display
const selectedModels = useMemo(() => {
  if (!models || !selectedModelIds) return [];
  return models.filter((model) => selectedModelIds.includes(model.id));
}, [models, selectedModelIds]);

const addModel = (modelId) => {
  const currentIds = selectedModelIds || [];
  if (!currentIds.includes(modelId)) {
    setValue("modelIds", [...currentIds, modelId]);
    setModelSearchQuery("");
  }
};

const removeModel = (modelId) => {
  const currentIds = selectedModelIds || [];
  setValue(
    "modelIds",
    currentIds.filter((id) => id !== modelId)
  );
};

useEffect(() => {
  if(!part) return
  part.models.forEach(model => {
    addModel(model.id)

    if(!selectedModelIds.includes(model.id)) { selectedModelIds.push(model.id) }
  });

  if (part.images) {
    var imageListUrls = []
    part.images.forEach(image => {
      if(!imageListUrls.includes(image.source)) {
        imageListUrls.push(image.source)
      }
    });

    setUploadedImageUrls(imageListUrls)
    setImagePreviews(imageListUrls)
    setValue("imageUrls", imageListUrls)
  }
}, [])

return (
  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
    <FieldSet>
      <FieldLegend>
        {
          part == null ? "Add new part" : "Edit part"
        }
      </FieldLegend>

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
                disabled={uploadImages.isPending}
              />

              {/* Upload Button */}
              <Button
                type="button"
                variant="outline"
                onClick={() => fileInputRef.current?.click()}
                disabled={uploadImages.isPending || imagePreviews.length >= 10}
                className="w-full"
              >
                <Camera className="mr-2 h-4 w-4" />
                {uploadImages.isPending
                  ? "Uploading..."
                  : imagePreviews.length >= 10
                    ? "Maximum 10 images reached"
                    : "Add Images"}
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
                {uploadImages.isPending
                  ? "Uploading images..."
                  : "Upload one or multiple images for this part"}
              </FieldDescription>
            </div>
            {errors.imageUrls && (
              <FieldError>{errors.imageUrls.message}</FieldError>
            )}
          </Field>
        </div>

        {/* Form Fields Section */}
        <FieldGroup className="order-1 lg:order-2">
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

          {/* Models Searchable Multi-Select */}
          <Field>
            <FieldLabel htmlFor="modelSearch">Models</FieldLabel>
            {isLoadingModels ? (
              <Skeleton className="h-32 w-full" />
            ) : loadingModelsError ? (
              <div>
                <p>Failed to load models</p>
                <p className="text-red-600">{loadingModelsError.message}</p>
              </div>
            ) : (
              <div className="space-y-2">
                {/* Selected Models - Chips with X */}
                {selectedModels.length > 0 && (
                  <div className="flex flex-wrap gap-2 p-2 border rounded-md bg-gray-50">
                    {selectedModels.map((model) => (
                      <div
                        key={model.id}
                        className="flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                      >
                        <span>{model.name}</span>
                        <button
                          type="button"
                          onClick={() => removeModel(model.id)}
                          className="hover:bg-blue-200 rounded-full p-0.5"
                          aria-label={`Remove ${model.name}`}
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {/* Search Input */}
                <div className="relative">
                  <Input
                    id="modelSearch"
                    type="text"
                    value={modelSearchQuery}
                    onChange={(e) => setModelSearchQuery(e.target.value)}
                    placeholder="Type at least 3 characters to search models..."
                    className="w-full"
                    autoComplete="off"
                  />

                  {/* Dropdown with filtered results */}
                  {modelSearchQuery.length >= 3 && filteredModels.length > 0 && (
                    <div className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg max-h-48 overflow-y-auto">
                      {filteredModels.map((model) => (
                        <button
                          key={model.id}
                          type="button"
                          onClick={() => addModel(model.id)}
                          className="w-full text-left px-3 py-2 hover:bg-gray-100 transition-colors"
                        >
                          {model.name}
                        </button>
                      ))}
                    </div>
                  )}

                  {/* No results message */}
                  {modelSearchQuery.length >= 3 && filteredModels.length === 0 && (
                    <div className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg p-3 text-sm text-gray-500">
                      No models found matching &quot;{modelSearchQuery}&quot;
                    </div>
                  )}
                </div>

                <FieldDescription>
                  {modelSearchQuery.length < 3
                    ? "Type at least 3 characters to search and select models"
                    : `Found ${filteredModels.length} model${filteredModels.length !== 1 ? 's' : ''}`}
                </FieldDescription>
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