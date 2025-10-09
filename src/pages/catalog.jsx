import { PartCard } from "@/components/part-card"
import { Spinner } from "@/components/ui/spinner"
import { useParts } from "@/hooks/useParts"

export function Catalog() {
    const Parts = useParts()

    if (Parts.isLoading) {
        return (
            <>
                <p>
                    Please wait... 
                </p>
                <Spinner />
            </>
        )
    }

    if (Parts.error) {
        return (
            <div>
                Error: {Parts.error.message}
            </div>
        )
    }

    return (
        <main>
            <h1 className="text-5xl font-bold">Catalog</h1>

            {Parts.catalog.map((part) => <PartCard key={part.number} part={part} />)}
        </main>
    )
}