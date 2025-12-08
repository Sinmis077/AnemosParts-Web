import { useParts } from '@/app/hooks/useParts';
import { Spinner } from './ui/spinner';
import { PartCard } from './PartCard';
import { useSearchParams } from 'react-router-dom';

export function PartsCatalog() {
  const Parts = useParts();

  const [searchParams] = useSearchParams();
  const search = searchParams.get("search") || "";

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

  if (Parts.catalog == null || Parts.catalog.length == 0) {
    return (
      <>
        Catalog is empty....
      </>
    );
  }

  var searchedParts = Parts.catalog.filter(
    (part) =>
      part.name && part.name.toLowerCase().includes(search.toLowerCase()),
  );


  return (
    <>
      {searchedParts.map((part) => (
        <PartCard key={part.id} part={part} />
      ))}
    </>
  );
}
