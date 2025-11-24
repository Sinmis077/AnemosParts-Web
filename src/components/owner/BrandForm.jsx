import { useForm } from "react-hook-form";
import { useCreateBrand, useUpdateBrand } from "@/app/hooks/useBrands";
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
import { Button } from "../ui/button";
import { brandSchema } from "@/app/entities/brand";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useRef } from "react";
import { Camera } from "lucide-react";

export function BrandForm({ brandId, brand, onClose }) {
  const createBrand = useCreateBrand();
  const updateBrand = useUpdateBrand();
  const uploadImage = useUploadImage();

  const [imagePreview, setImagePreview] = useState(brand?.iconUrl ?? null);
  const [uploadedIconUrl, setUploadedIconUrl] = useState(brand?.iconUrl ?? null);
  const fileInputRef = useRef(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(brandSchema),
    defaultValues: {
      name: brand?.name ?? "",
      iconUrl: brand?.iconUrl ?? ""
    },
  });

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      // Auto-upload immediately
      uploadImage.mutate(file, {
        onSuccess: (data) => {
          setImagePreview(data.url);
          setUploadedIconUrl(data.url);
          setValue("iconUrl", data.url);
        },
      });
    }
  };

  const onSubmit = async (data) => {
    if (!uploadedIconUrl) {
      toast.error("Please upload an icon first");
      return;
    }

    const brandData = {
      name: data.name,
      iconUrl: uploadedIconUrl,
    };

    if (brandId) {
      updateBrand.mutate({ id: brandId, brand: brandData });
    } else {
      createBrand.mutate(brandData);
    }

    if (onClose) {
      onClose()
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <FieldSet>
        <FieldLegend>
          {
            brand == null ? "Add new brand" : "Edit brand"
          }
        </FieldLegend>
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

          {/* Icon Upload Field */}
          <Field>
            <FieldLabel htmlFor="icon">Brand Icon</FieldLabel>
            <div className="space-y-2">
              {/* Hidden file input */}
              <Input
                ref={fileInputRef}
                id="iconUrl"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
                aria-invalid={!!errors.icon}
                disabled={uploadImage.isPending}
              />

              {/* Clickable Image Preview Area */}
              <div
                onClick={() => fileInputRef.current?.click()}
                className="relative h-32 w-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-gray-400 transition-colors bg-gray-50 flex items-center justify-center overflow-hidden group"
              >
                {imagePreview ? (
                  <>
                    <img
                      src={imagePreview}
                      alt="Brand icon preview"
                      className="h-full w-full object-contain p-2"
                    />
                    {/* Camera icon overlay */}
                    <div className="absolute top-2 right-2 bg-white rounded-full p-1.5 shadow-md">
                      <Camera />
                    </div>
                  </>
                ) : (
                  <div className="text-center p-4">
                    <Camera stroke="currentColor" />
                    <p className="text-xs text-gray-500">Click to upload</p>
                  </div>
                )}
              </div>

              {errors.icon && <FieldError>{errors.icon.message}</FieldError>}

              <FieldDescription>
                {uploadImage.isPending
                  ? "Uploading..."
                  : uploadedIconUrl
                    ? "✓ Icon uploaded successfully"
                    : "Upload a brand icon (PNG, JPG, SVG, etc.)"}
              </FieldDescription>
            </div>
          </Field>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isSubmitting || !uploadedIconUrl}

            className="px-4 py-2 disabled:opacity-50"
          >
            {isSubmitting ? "Saving..." : "Save Brand"}
          </Button>
        </FieldGroup>
      </FieldSet>
    </form>
  );
}