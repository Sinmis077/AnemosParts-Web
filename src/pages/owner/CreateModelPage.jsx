import { ModelForm } from "@/components/owner/ModelForm";

export function CreateModelPage() {
  return (
    <main className="flex w-full justify-center p-10">
      <div className="w-full md:w-[50%] lg:w-[25%]">
        <ModelForm />
      </div>
    </main>
  );
}