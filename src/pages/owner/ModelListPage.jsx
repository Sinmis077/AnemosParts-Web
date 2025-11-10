import { useModels } from "@/app/hooks/useModels";
import { modelTableSchema } from "@/app/tables/modelTableSchema";
import { DataTable } from "@/components/DataTable";
import { Spinner } from "@/components/ui/spinner";

export function ModelsListPage() {
  const Models = useModels();

  if (Models.isLoading) {
    return (
      <>
        <Spinner /> Loading
      </>
    )
  }

  if (Models.error) {
    return (
      <>
        <p>An error has occured</p>
        <p className="text-red-600">{Models.error}</p>
      </>
    )
  }

  return (
    <main className="flex w-full justify-center p-10">
        <DataTable
          columns={modelTableSchema()}
          data={Models.models}
          filterColumn="name"
          showSelected={false}
        />
    </main>
  );
}