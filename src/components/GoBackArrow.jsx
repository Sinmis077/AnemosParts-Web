import React from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function GoBackArrow() {
    const navigate = useNavigate();

    return (
        <a className="flex flex-row gap-2 cursor-pointer p-5 max-w-fit" onClick={() => {
            navigate(-1);
        }}>
            <ArrowLeft/>
            Go back
        </a>
    )
}