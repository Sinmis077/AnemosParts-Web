import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";

export function HomePage() {
  return (
    <main>
      hello
      <Button
        onClick={() => {
          toast.loading("hello");
        }}
      >
        submit
      </Button>
    </main>
  );
}
