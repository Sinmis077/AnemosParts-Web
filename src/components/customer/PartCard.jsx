import { useCartDispatch } from "@/app/contexts/CartContext";
import {
    Card,
    CardHeader,
    CardFooter,
    CardTitle,
    CardDescription,
    CardContent
} from "@/components/ui/card"
import { CardSimIcon, Plus } from "lucide-react";
import { Button } from "../ui/button";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

export function PartCard({ part }) {
    const dispatch = useCartDispatch();

    const onAdd = (id) => {
        toast.success("Added an item to your cart!")
        dispatch({
            type: 'add',
            item: { id }
        });
    }

    return (
        <Link to={`item/${part.id}`}>
            <Card className="cursor-pointer">
                <CardHeader>
                    <img className="w-full" src={part.thumbnailSrc} alt="Part thumbnail" />
                    <CardTitle className="text-start">{part.name}</CardTitle>
                </CardHeader>
                <CardContent>
                    <CardDescription className="text-balance text-start">{part.description}</CardDescription>
                </CardContent>
                <CardFooter className="flex items-end justify-end">
                    <img className="w-1/2" src={part.brandIconSrc} alt="Brand icon" />
                </CardFooter>
            </Card>
        </Link>
    )
}