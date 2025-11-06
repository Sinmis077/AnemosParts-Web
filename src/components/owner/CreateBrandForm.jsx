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

export function CreateBrandForm({ id, brand }) {
  const createBrand = useCreateBrand();
  const updateBrand = useUpdateBrand();
  const uploadImage = useUploadImage();

  const [imagePreview, setImagePreview] = useState(brand?.icon ?? null);
  const [uploadedIconUrl, setUploadedIconUrl] = useState(brand?.icon ?? null);
  const [selectedFile, setSelectedFile] = useState(null);
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
          setUploadedIconUrl(data.url);
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
              {/* Hidden file input */}
              <Input
                ref={fileInputRef}
                id="icon"
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
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 text-gray-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
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
            className="px-4 py-2 hover:pointer disabled:opacity-50"
          >
            {isSubmitting ? "Saving..." : "Save Brand"}
          </Button>
        </FieldGroup>
      </FieldSet>
    </form>
  );
}