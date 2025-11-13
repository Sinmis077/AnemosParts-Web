import { ArrowUpDown, SquarePen, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"

export const brandTableSchema = ({onEdit, onDelete}) => [
    {
        accessorKey: "Icon",
        header: "Icon",
        cell: ({ row }) => <img className="h-10 max-w-3xs" src={row.original.iconUrl} alt="Brand icon" />,
    },
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