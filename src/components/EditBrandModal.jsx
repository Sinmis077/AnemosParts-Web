import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"


export function EditBrandModal({ modalOpen, onClose, Form }) {
    return (
        <Dialog open={modalOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Edit brand</DialogTitle>
                </DialogHeader>
                {Form}                
            </DialogContent>
        </Dialog>
    )
}
