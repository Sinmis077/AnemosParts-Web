import { useParts } from "@/app/hooks/useParts"
import { PartDataForm } from "@/components/owner/part-data-form"

export function PartFormHandler() {
    const Parts = useParts();

    return (
        <main className="flex justify-center p-10">
            <div className="w-full md:w-[50%] lg:w-[25%]">
                <PartDataForm />
            </div>
        </main>
    )
}