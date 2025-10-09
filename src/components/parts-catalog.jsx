import { useParts } from "@/hooks/useParts"
import { Spinner } from "./ui/spinner"
import { PartCard } from "./part-card"

export function PartsCatalog() {
    const Parts = useParts()
    console.log(Parts)


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

    if(Parts.catalog.length == 0 ) {
        return (
            <>
                Catalog is empty....
            </>
        )
    }

    return (
        <>
            {Parts.catalog.map((part) => <PartCard key={part.id} part={part} />)}    
        </>
    )
}