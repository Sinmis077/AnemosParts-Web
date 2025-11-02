import { useParts } from "@/app/hooks/useParts";
import { CreatePartForm } from "@/components/owner/CreatePartForm";

export function PartsWarehousePage() {
  const Parts = useParts();

  return (
    <main className="flex w-full justify-center p-10">
      <div className="w-full md:w-[50%] lg:w-[25%]">
        <CreatePartForm />
      </div>
    </main>
  );
}
