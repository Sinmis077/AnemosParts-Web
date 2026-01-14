import { CatalogSideMenu } from '@/components/CatalogSideMenu';
import { PartsCatalog } from '@/components/PartsCatalog';

export function PartsCatalogPage() {
  return (
    <main className="flex flex-col md:flex-row gap-6 p-6">
      <div className="w-full md:w-64 lg:w-72">
        <CatalogSideMenu />
      </div>
      <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        <PartsCatalog />
      </div>
    </main>
  );
}