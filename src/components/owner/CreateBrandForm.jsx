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
import { useState } from "react";

export function CreateBrandForm({ id, brand }) {
  const createBrand = useCreateBrand();
  const updateBrand = useUpdateBrand();
  const uploadImage = useUploadImage();

  const [imagePreview, setImagePreview] = useState(brand?.icon ?? null);
  const [uploadedIconUrl, setUploadedIconUrl] = useState(brand?.icon ?? null);
  const [selectedFile, setSelectedFile] = useState(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(brandSchema),
    defaultValues: {
      name: brand?.name ?? "",
    },
  });

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);

      // Auto-upload immediately
      uploadImage.mutate(file, {
        onSuccess: (data) => {
          setUploadedIconUrl(data.url);
          setValue("icon", data.url);
        },
      });
    }
  };

  const handleUploadImage = () => {
    if (selectedFile) {
      uploadImage.mutate(selectedFile, {
        onSuccess: (data) => {
          setUploadedIconUrl(data.url); // Adjust based on your API response structure
          setValue("icon", data.url);
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
      icon: uploadedIconUrl,
    };

    console.log(brandData);

    if (id) {
      updateBrand.mutate({ id, data: brandData });
    } else {
      createBrand.mutate(brandData);
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

          {/* Icon Upload Field */}
          <Field>
            <FieldLabel htmlFor="icon">Brand Icon</FieldLabel>
            <div className="space-y-2">
              <Input
                id="icon"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="cursor-pointer"
                aria-invalid={!!errors.icon}
                disabled={uploadImage.isPending}
              />

              {/* Upload Button */}
              {selectedFile && !uploadedIconUrl && (
                <Button
                  type="button"
                  onClick={handleUploadImage}
                  disabled={uploadImage.isPending}
                  className="w-full"
                >
                  {uploadImage.isPending ? "Uploading..." : "Upload Icon"}
                </Button>
              )}

              {errors.icon && <FieldError>{errors.icon.message}</FieldError>}

              <FieldDescription>
                {uploadedIconUrl
                  ? "✓ Icon uploaded successfully"
                  : "Upload a brand icon (PNG, JPG, SVG, etc.)"}
              </FieldDescription>

              {/* Image Preview */}
              {imagePreview && (
                <div className="mt-2">
                  <img
                    src={imagePreview}
                    alt="Brand icon preview"
                    className="h-20 w-20 object-contain rounded border p-2 bg-white"
                  />
                </div>
              )}
            </div>
          </Field>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isSubmitting || !uploadedIconUrl}
            className="px-4 py-2 hover:pointer disabled:opacity-50"
          >
            {isSubmitting ? "Saving..." : "Save Brand"}
          </Button>
        </FieldGroup>
      </FieldSet>
    </form>
  );
}