import {CatalogSideMenu} from '@/components/CatalogSideMenu';
import {PartsCatalog} from '@/components/PartsCatalog';

export function PartsCatalogPage() {
    return (
        <main className="flex flex-row">
            <CatalogSideMenu/>
            <PartsCatalog/>
        </main>
    );
}
