import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";

export default function Home() {
    return (
        <main>
            hello
            <Button onClick={() => {toast.loading("hello")}}>submit</Button>
        </main>
    )
}