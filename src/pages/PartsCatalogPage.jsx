import { CatalogSideMenu } from "@/components/CatalogSideMenu";
import { PartsCatalog } from "@/components/PartsCatalog";

export function PartsCatalogPage() {
  return (
    <main className="grid grid-cols-7">
      <CatalogSideMenu />
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-7 col-span-7 md:col-span-6 gap-4 p-7">
        <PartsCatalog />
      </div>
    </main>
  );
}
