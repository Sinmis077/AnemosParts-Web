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

export function PartCard({ part }) {
    const dispatch = useCartDispatch();

    const onAdd = (id) => {
        toast.success("Added an item to your cart!")
        dispatch({
            type: 'add',
            item: {id}
        });
    }

    return (
        <Card className="h-min">
            <CardHeader>
                <CardSimIcon></CardSimIcon>
                <CardTitle>{part.name}</CardTitle>
                <CardDescription>{part.description}</CardDescription>
            </CardHeader>
            <CardFooter>
                <Button onClick={() => {onAdd(part.id)}} size="sm"><Plus /></Button>
            </CardFooter>
        </Card>
    )
}