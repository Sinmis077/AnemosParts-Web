import { CreateBrandForm } from "@/components/owner/CreateBrandForm";
import { CreateModelForm } from "@/components/owner/CreateModelForm";

export function CreateModelPage() {
  return (
    <main className="flex w-full justify-center p-10">
      <div className="w-full md:w-[50%] lg:w-[25%]">
        <CreateModelForm />
      </div>
    </main>
  );
}