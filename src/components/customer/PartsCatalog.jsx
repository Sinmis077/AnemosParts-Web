import { useParts, useCreatePart } from "@/app/hooks/useParts";
import { Spinner } from "../ui/spinner";
import { PartCard } from "./PartCard";
import { useSearchParams } from "react-router-dom";
import { Button } from "../ui/button";

export function PartsCatalog() {
  const Parts = useParts();
  const createPart = useCreatePart();

  const [searchParams] = useSearchParams();
  const search = searchParams.get("search") || "";

  const handleSubmit = () => {
    createPart.mutate({ data: "something" });
  };

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

  if (Parts.catalog ?? Parts.catalog.length == 0) {
    return (
      <>
        Catalog is empty....
        <Button onClick={() => handleSubmit()} />
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
      <Button onClick={() => handleSubmit()} />
    </>
  );
}
