import {
    Card,
    CardHeader,
    CardFooter,
    CardTitle,
    CardDescription,
    CardContent
} from "@/components/ui/card"

export function PartCard({part}) {
    return(
        <Card className="h-min">
            <CardHeader>
                <CardTitle>{part.name}</CardTitle>
                <CardDescription>{part.description}</CardDescription>
            </CardHeader>
        </Card>
    )
}