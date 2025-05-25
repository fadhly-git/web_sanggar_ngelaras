import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useDataContext } from './data-context';

export const DialogPreview = () => {
    const { DialogState, closeDialog } = useDataContext();
    const { open, selectedImg } = DialogState;
    const img_banner = selectedImg || '';
    return (
        <Dialog open={open} onOpenChange={closeDialog}>
            <DialogContent className="sm:max-w-[425px] md:max-w-5xl">
                <DialogHeader>
                    <DialogTitle>Preview</DialogTitle>
                    <DialogDescription>Preview image</DialogDescription>
                </DialogHeader>
                <div className="flex flex-col gap-4">
                    <div className="bg-background flex w-full items-center relative rounded-lg">
                        <img src={'/'+img_banner} alt="Image preview" className="mt-2 aspect-video h-auto max-w-full rounded-md border" />
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};
