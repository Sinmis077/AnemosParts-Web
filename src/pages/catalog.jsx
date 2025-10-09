import { SideMenuFilters } from "@/components/filter-side-menu";
import { PartsCatalog } from "@/components/parts-catalog";

export function Catalog() {
    return (
        <main className="grid grid-cols-7">
            <SideMenuFilters />
            <div className="flex justify-center flex-wrap gap-4 sm:gap-3 md:gap-4 col-span-6">
                <PartsCatalog />
            </div>
        </main>
    )    
}