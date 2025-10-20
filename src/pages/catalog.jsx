import { SideMenuFilters } from "@/components/filter-side-menu";
import { PartsCatalog } from "@/components/parts-catalog";

export function Catalog() {
    return (
        <main className="grid grid-cols-7">
            <SideMenuFilters />
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-7 col-span-7 md:col-span-6 gap-4 p-7">
                <PartsCatalog />
            </div>
        </main>
    )    
}