import React from "react";
import { BrandForm } from "@/components/owner/BrandForm";

export function CreateBrandPage() {
  return (
    <main className="flex w-full justify-center p-10">
      <div className="w-full md:w-[50%] lg:w-[25%]">
        <BrandForm />
      </div>
    </main>
  );
}