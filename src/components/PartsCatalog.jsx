import React from "react";
import {useParts} from '@/app/hooks/useParts';
import {PartCard} from './PartCard';
import {useSearchParams} from 'react-router-dom';
import {Loading} from "@/components/Loading.jsx";
import {Error} from "@/components/Error.jsx";

export function PartsCatalog() {
    const Parts = useParts();

    const [searchParams] = useSearchParams();
    const search = searchParams.get("search") || "";

    if (Parts.isLoading) {
        return <Loading description="Loading the catalog..."/>
    }

    if (Parts.error) {
        return <Error title="Failed to load the part catalog" description={Parts.error.message} />
    }

    if (Parts?.catalog == null || Parts?.catalog.length === 0) {
        return (
            <>
                Catalog is empty....
            </>
        );
    }

    var searchedParts = Parts.catalog.filter(
        (part) =>
            part.name && part.name.toLowerCase().includes(search.toLowerCase()),
    );


    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-6">
            {searchedParts.map((part) => (
                <PartCard key={part.id} part={part} />
            ))}
        </div>
    );
}
