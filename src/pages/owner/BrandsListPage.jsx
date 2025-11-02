import { useBrands } from "@/app/hooks/useBrands";
import { CreateBrandForm } from "@/components/owner/CreateBrandForm";

export function BrandsListPage() {
  const Brands = useBrands();

  return (
    <main className="flex w-full justify-center p-10">
      <div className="w-full md:w-[50%] lg:w-[25%]">
        <CreateBrandForm />
      </div>
    </main>
  );
}
