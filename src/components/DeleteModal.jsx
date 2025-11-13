import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "./ui/button"
import { DialogClose } from "@radix-ui/react-dialog"

export function DeleteModal({ modalOpen, onClose, onConfirm, objectId }) {
    return (
        <Dialog open={modalOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Confirm deletion</DialogTitle>
                    <DialogDescription>
                        This cannot be undone!
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline" >Cancel</Button>
                    </DialogClose>
                    <DialogClose asChild>
                        <Button variant="destructive" type="submit" onClick={() => onConfirm(objectId)}>Delete</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
