import { ArrowUpDown, SquarePen, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"

export const partTableSchema = ({onEdit, onDelete}) => [
    {
        accessorKey: "name",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Name
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => <p className="font-medium text-start ps-3">{row.getValue("name")}</p>,
    },
    {
        accessorKey: "description",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Description
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => <p className="font-small text-start ps-3">{row.getValue("description")}</p>,
    },
    {
        accessorKey: "oemNumber",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    OEM Number
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => <p className="font-medium text-start ps-3">{row.getValue("oemNumber")}</p>,
    },
    {
        accessorKey: "partNumber",
        header: "Part Number",
        cell: ({ row }) => <p className="font-medium text-start ps-3">{row.getValue("partNumber")}</p>,
    },
    {
        accessorKey: "price",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Price
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => <p className="font-medium text-start ps-3">{row.getValue("price")}</p>,
    },
    {
        accessorKey: "quantity",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Quantity
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => <p className="font-medium text-start ps-3">{row.getValue("quantity")}</p>,
    },
    {
        accessorKey: "model",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Model
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => 
            <ul className="font-medium text-start ps-3">
                {
                    row.original.models.map((model) => (
                        <li key={model.id}>{model.name}</li>
                    ))
                }
            </ul>,
    },
    {
        accessorKey: "actions",
        header: "Actions",
        cell: ({ row }) => (
            <div className="flex gap-1">
                <Button
                    variant="ghost"
                    className="h-8 w-8 p-0 text-blue-600 hover:text-blue-700"
                    onClick={() => onEdit(row.original)}
                >
                    <SquarePen className="h-4 w-4" />
                    <span className="sr-only">Edit</span>
                </Button>
                <Button
                    variant="ghost"
                    className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
                    onClick={() => onDelete(row.original.id)}
                >
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Delete</span>
                </Button>
            </div>
        ),
    },

]