import React from "react";
import {Empty, EmptyHeader, EmptyMedia, EmptyTitle} from "@/components/ui/empty.jsx";
import {Spinner} from "@/components/ui/spinner.jsx";

export function Loading({ description }) {
    if (!description) {
        description = "Loading...";
    }

    return (
        <div className="container w-full">
            <Empty>
                <EmptyHeader>
                    <EmptyMedia className="rounded-full" variant="icon">
                        <Spinner />
                    </EmptyMedia>
                    <EmptyTitle>{description}</EmptyTitle>
                </EmptyHeader>
            </Empty>
        </div>
    )
}