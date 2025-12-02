import { useParams } from "react-router-dom";
import React from "react";

export function PartDetailsPage() {
    const { id } = useParams();

    let part = {
        id: id,
        name: "Test part",
        description: "This is an example part and is hard coded",
        price: 20,
        quantity: 7,
    };
  
    return (
        <main>
            {part.id}<br />
            {part.name}<br />
            {part.description}<br />
            {part.price}<br />
            {part.quantity}<br />
        </main>
    );
}
