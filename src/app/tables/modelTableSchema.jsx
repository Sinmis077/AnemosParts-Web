import { ArrowUpDown, SquarePen, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"

export const modelTableSchema = () => [
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
        accessorKey: "productionYear",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Production year
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => <p className="font-medium text-start ps-3">{row.getValue("productionYear")}</p>,
    },
    {
        accessorKey: "brand",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Manufacturer
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => <p className="font-medium text-start ps-3">{row.getValue("brand").name}</p>,
    },
    
    // {
    //     accessorKey: "actions",
    //     header: "Actions",
    //     cell: ({ row }) => (
    //         <div className="flex gap-1">
    //             <Button
    //                 variant="ghost"
    //                 className="h-8 w-8 p-0 hover:text-blue-700"
    //                 onClick={() => onEdit(row.original)}
    //             >
    //                 <SquarePen className="h-4 w-4" />
    //                 <span className="sr-only">Edit</span>
    //             </Button>
    //             <Button
    //                 variant="ghost"
    //                 className="h-8 w-8 p-0 hover:text-red-600"
    //                 onClick={() => onDelete(row.original)}
    //             >
    //                 <Trash2 className="h-4 w-4" />
    //                 <span className="sr-only">Delete</span>
    //             </Button>
    //         </div>
    //     ),
    // },

]