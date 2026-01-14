import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useBrands } from '@/app/hooks/useBrands';
import { useModels } from '@/app/hooks/useModels';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FilterSection } from '@/components/FilterSection.jsx';
import { X } from 'lucide-react';

export function CatalogSideMenu() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { brands, isLoading: brandsLoading } = useBrands();
  const { models, isLoading: modelsLoading } = useModels();

  const [openSections, setOpenSections] = useState({
    price: true,
    brand: true,
    model: false,
    year: false,
  });

  const [filters, setFilters] = useState({
    minPrice: searchParams.get('minPrice') || '',
    maxPrice: searchParams.get('maxPrice') || '',
    brandId: searchParams.get('brandId') || '',
    modelId: searchParams.get('modelId') || '',
    minYear: searchParams.get('minYear') || '',
    maxYear: searchParams.get('maxYear') || '',
  });

  const toggleSection = (section) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const updateFilter = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const applyFilters = () => {
    const params = new URLSearchParams(searchParams);

    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    });

    setSearchParams(params);
  };

  const clearFilters = () => {
    setFilters({
      minPrice: '',
      maxPrice: '',
      brandId: '',
      modelId: '',
      minYear: '',
      maxYear: '',
    });

    const params = new URLSearchParams(searchParams);
    ['minPrice', 'maxPrice', 'brandId', 'modelId', 'minYear', 'maxYear'].forEach((key) => {
      params.delete(key);
    });
    setSearchParams(params);
  };

  const hasActiveFilters = Object.values(filters).some((v) => v !== '');

  // Filter models by selected brand
  const filteredModels = filters.brandId
    ? models.filter((m) => m.brand.id === Number(filters.brandId))
    : models;

  // Get unique years from models
  const years = [...new Set(models.map((m) => m.productionYear))].sort((a, b) => b - a);

  return (
    <aside className="w-full bg-gray-50 p-4 rounded-lg h-fit">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-semibold text-lg">Filters</h2>
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1"
          >
            <X className="w-4 h-4" />
            Clear
          </button>
        )}
      </div>

      {/* Price Filter */}
      <FilterSection
        title="Price"
        isOpen={openSections.price}
        onToggle={() => toggleSection('price')}
      >
        <div className="flex gap-2 items-center">
          <Input
            type="number"
            placeholder="Min"
            value={filters.minPrice}
            onChange={(e) => updateFilter('minPrice', e.target.value)}
            className="w-full"
            min="0"
          />
          <span className="text-gray-400">-</span>
          <Input
            type="number"
            placeholder="Max"
            value={filters.maxPrice}
            onChange={(e) => updateFilter('maxPrice', e.target.value)}
            className="w-full"
            min="0"
          />
        </div>
      </FilterSection>

      {/* Brand Filter */}
      <FilterSection
        title="Brand"
        isOpen={openSections.brand}
        onToggle={() => toggleSection('brand')}
      >
        {brandsLoading ? (
          <p className="text-sm text-gray-500">Loading...</p>
        ) : (
          <select
            value={filters.brandId}
            onChange={(e) => {
              updateFilter('brandId', e.target.value);
              updateFilter('modelId', ''); // Reset model when brand changes
            }}
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
          >
            <option value="">All brands</option>
            {brands.map((brand) => (
              <option key={brand.id} value={brand.id}>
                {brand.name}
              </option>
            ))}
          </select>
        )}
      </FilterSection>

      {/* Model Filter */}
      <FilterSection
        title="Model"
        isOpen={openSections.model}
        onToggle={() => toggleSection('model')}
      >
        {modelsLoading ? (
          <p className="text-sm text-gray-500">Loading...</p>
        ) : (
          <select
            value={filters.modelId}
            onChange={(e) => updateFilter('modelId', e.target.value)}
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
          >
            <option value="">All models</option>
            {filteredModels.map((model) => (
              <option key={model.id} value={model.id}>
                {model.name} ({model.productionYear})
              </option>
            ))}
          </select>
        )}
      </FilterSection>

      {/* Year Filter */}
      <FilterSection
        title="Year"
        isOpen={openSections.year}
        onToggle={() => toggleSection('year')}
      >
        <div className="flex gap-2 items-center">
          <select
            value={filters.minYear}
            onChange={(e) => updateFilter('minYear', e.target.value)}
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
          >
            <option value="">From</option>
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
          <span className="text-gray-400">-</span>
          <select
            value={filters.maxYear}
            onChange={(e) => updateFilter('maxYear', e.target.value)}
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
          >
            <option value="">To</option>
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
      </FilterSection>

      <Button
        onClick={applyFilters}
        className="w-full mt-4 bg-sky-500 hover:bg-sky-600"
      >
        Apply Filters
      </Button>
    </aside>
  );
}