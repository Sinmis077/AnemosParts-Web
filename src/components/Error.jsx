import React from "react";
import {Empty, EmptyContent, EmptyHeader, EmptyMedia, EmptyTitle} from "@/components/ui/empty.jsx";
import {TriangleAlert} from "lucide-react";

export function Error({ title, message }) {
    if (!title) {
        title = "Error";
    }
    if (!message) {
        message = "An unexpected error has occurred";
    }
    return (
        <div className="container">
            <Empty>
                <EmptyHeader>
                    <EmptyMedia className="text-red-600" variant="icon">
                        <TriangleAlert/>
                    </EmptyMedia>
                    <EmptyTitle>{title}</EmptyTitle>
                </EmptyHeader>
                <EmptyContent className="text-red-600">
                    {message}
                </EmptyContent>
            </Empty>
        </div>
    )
}