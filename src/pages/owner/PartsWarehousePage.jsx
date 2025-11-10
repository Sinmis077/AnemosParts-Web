import { useParts } from "@/app/hooks/useParts";
import { partTableSchema } from "@/app/tables/partTableSchema";
import { DataTable } from "@/components/DataTable";
import { Spinner } from "@/components/ui/spinner";

export function PartsWarehousePage() {
  const Parts = useParts();

    if (Parts.isLoading) {
    return (
      <>
        <Spinner /> Loading
      </>
    )
  }

  if (Parts.error) {
    return (
      <>
        <p>An error has occured</p>
        <p className="text-red-600">{Parts.error}</p>
      </>
    )
  }


  return (
    <main className="flex w-full justify-center p-10">
        <DataTable
          columns={partTableSchema()}
          data={Parts.catalog}
          filterColumn="name"
          showSelected={false}
        />
    </main>
  );
}
