import { useParts } from '@/app/hooks/useParts';
import { Spinner } from './ui/spinner';
import { PartCard } from './PartCard';
import { useSearchParams } from 'react-router-dom';

export function PartsCatalog() {
    const Parts = useParts();
    const [searchParams] = useSearchParams();

    const search = searchParams.get('search') || '';
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');
    const brandId = searchParams.get('brandId');
    const modelId = searchParams.get('modelId');
    const minYear = searchParams.get('minYear');
    const maxYear = searchParams.get('maxYear');

    if (Parts.isLoading) {
        return (
          <>
              <p>Please wait...</p>
              <Spinner />
          </>
        );
    }

    if (Parts.error) {
        return <div>Error: {Parts.error.message}</div>;
    }

    if (Parts.catalog == null || Parts.catalog.length === 0) {
        return <>Catalog is empty...</>;
    }

    let filteredParts = Parts.catalog;

    // Text search
    if (search) {
        filteredParts = filteredParts.filter(
          (part) => part.name && part.name.toLowerCase().includes(search.toLowerCase())
        );
    }

    // Price filters
    if (minPrice) {
        filteredParts = filteredParts.filter((part) => part.price >= Number(minPrice));
    }
    if (maxPrice) {
        filteredParts = filteredParts.filter((part) => part.price <= Number(maxPrice));
    }

    // Brand filter
    if (brandId) {
        filteredParts = filteredParts.filter((part) =>
          part.brands?.some((brand) => brand.id === Number(brandId))
        );
    }

    // Model filter
    if (modelId) {
        filteredParts = filteredParts.filter((part) =>
          part.models?.some((model) => model.id === Number(modelId))
        );
    }

    // Year filters
    if (minYear) {
        filteredParts = filteredParts.filter((part) =>
          part.models?.some((model) => model.productionYear >= Number(minYear))
        );
    }
    if (maxYear) {
        filteredParts = filteredParts.filter((part) =>
          part.models?.some((model) => model.productionYear <= Number(maxYear))
        );
    }

    if (filteredParts.length === 0) {
        return <p className="col-span-full text-gray-500">No parts match your filters.</p>;
    }

    return (
      <>
          {filteredParts.map((part) => (
            <PartCard key={part.id} part={part} />
          ))}
      </>
    );
}