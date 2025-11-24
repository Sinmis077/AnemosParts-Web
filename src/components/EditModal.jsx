import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"


export function EditModal({className, modalOpen, onClose, Form }) {
    return (
        <Dialog open={modalOpen} onOpenChange={onClose}>
            <DialogHeader>
                <DialogTitle className="hidden">Edit modal</DialogTitle>
            </DialogHeader>
            <DialogContent className={className ?? "sm:max-w-[425px] max-h-[90vh] flex flex-col"}>
                <DialogDescription className="hidden">
                    A form to edit an object
                </DialogDescription>
                <div className="overflow-y-auto flex-1">
                    {Form}
                </div>
            </DialogContent>
        </Dialog>
    )
}
