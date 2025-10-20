import { useParts } from "@/hooks/useParts"
import { Spinner } from "./ui/spinner"
import { PartCard } from "./part-card"
import { useSearchParams } from "react-router-dom"

export function PartsCatalog() {
    const Parts = useParts()

    const [searchParams] = useSearchParams();
    const search = searchParams.get('search') || '';

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

    if (Parts.catalog.length == 0) {
        return (
            <>
                Catalog is empty....
            </>
        )
    }

    var searchedParts = Parts.catalog.filter(part => part.name && part.name.toLowerCase().includes(search.toLowerCase()));

    return (

        <>
            {
                searchedParts.map(part => <PartCard key={part.id} part={part} />)
            }
        </>
    )
}