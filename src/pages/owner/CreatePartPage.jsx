import { CreatePartForm } from "@/components/owner/CreatePartForm";

export function CreatePartPage() {
  return (
    <main className="flex w-full justify-center p-10">
      <div className="w-full md:w-[50%] lg:w-[25%]">
        <CreatePartForm />
      </div>
    </main>
  );
}