import { useBrands } from "@/app/hooks/useBrands";
import { brandTableSchema } from "@/app/tables/brandTableSchema";
import { DataTable } from "@/components/DataTable";
import { CreateBrandForm } from "@/components/owner/CreateBrandForm";
import { Spinner } from "@/components/ui/spinner";

export function BrandsListPage() {
  const Brands = useBrands();

  if (Brands.isLoading) {
    return (
      <>
        <Spinner /> Loading
      </>
    )
  }

  if (Brands.error) {
    return (
      <>
        <p>An error has occured</p>
        <p className="text-red-600">{Brands.error}</p>
      </>
    )
  }

  console.log("Brands array: ", Brands.models)
  return (
    <main className="flex w-full justify-center p-10">
        <DataTable
          columns={brandTableSchema}
          data={Brands.models}
          filterColumn="name"
          showSelected={false}
        />
    </main>
  );
}