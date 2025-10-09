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
        <Card className="w-100 sm:w-50 md:w-60 lg:w-70">
            <CardHeader>
                <CardTitle>{part.name}</CardTitle>
                <CardDescription>{part.description}</CardDescription>
            </CardHeader>
        </Card>
    )
}