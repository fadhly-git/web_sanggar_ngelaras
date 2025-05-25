import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler, useEffect } from 'react';
import { toast } from 'sonner';
import { useDataContext } from './DataContext';

interface Props {
    name: string;
    heading: string;
    sub_heading: string;
    link: string;
    is_active: number;
}

export function DialogEdit() {
    const { dialogStateB, dialogStateI, closeDialogI, closeDialogB, triggerRefetch } = useDataContext();
    const { openImg, selectedImg } = dialogStateI;
    const { openBnr, selectedBanner } = dialogStateB;
    const { data, setData, processing, errors, put } = useForm<Required<Props>>({
        name: '',
        heading: '',
        sub_heading: '',
        link: '',
        is_active: 0,
    });
    useEffect(() => {
        if (openBnr) {
            setData('heading', selectedBanner?.heading ?? '');
            setData('sub_heading', selectedBanner?.sub_heading ?? '');
            setData('link', selectedBanner?.link ?? '');
            setData('is_active', selectedBanner?.is_active ?? 0);
        } else if (openImg) {
            setData('name', selectedImg?.name ?? '');
        }
    }, [selectedImg?.name, setData, openBnr, openImg, selectedBanner]);
    const submitB: FormEventHandler = (e) => {
        e.preventDefault();
        put(route('atmin.konten-manajemen.banner.update', { any: 'heading', id: selectedBanner?.id }), {
            onSuccess: () => {
                triggerRefetch();
                toast.success('Berhasil memperbarui heading');
                closeDialogB();
            },
            onError: () => {
                toast.error('Gagal memperbarui heading', {
                    description: String(errors.link || errors.heading || errors.sub_heading),
                });
                console.error('Error updating heading:', errors);
            },
        });
    };

    const submitI: FormEventHandler = (e) => {
        e.preventDefault();
        put(route('atmin.konten-manajemen.banner.update', { any: 'image', id: selectedImg?.id }), {
            onSuccess: () => {
                triggerRefetch();
                toast.success('Berhasil memperbarui gambar');
                closeDialogI();
            },
            onError: () => {
                toast.error('Gagal memperbarui gambar', {
                    description: String(errors.name),
                });
                console.error('Error updating image:', errors);
            },
        });
    };

    return (
        <>
            {/* Dialog untuk edit gambar */}
            {!openBnr && openImg && (
                <Dialog open={openImg} onOpenChange={closeDialogI} key={'edit-image'}>
                    <DialogContent className="w-full sm:min-w-xl lg:min-w-5xl overflow-auto sm:max-w-[425px]">
                        <form onSubmit={submitI}>
                            <DialogHeader>
                                <DialogTitle>Edit image</DialogTitle>
                                <DialogDescription>Click save ketika selesai.</DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                                <div className="grid aspect-video items-center gap-4">
                                    <img src={`/${selectedImg?.path}`} alt={selectedImg?.name} className="aspect-video" />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="nama" className="text-right">
                                        Nama
                                    </Label>
                                    <Input id="nama" value={data.name} onChange={(e) => setData('name', e.target.value)} className="col-span-3" />
                                </div>
                            </div>
                            <DialogFooter>
                                <Button variant={'destructive'} onClick={closeDialogI} disabled={processing}>
                                    Close
                                </Button>
                                <Button type="submit" disabled={processing}>
                                    {processing && <LoaderCircle className="h-4 w-4 animate-spin" />} Simpan
                                </Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
            )}

            {/* Dialog untuk edit heading */}
            {openBnr && !openImg && (
                <Dialog open={openBnr} onOpenChange={closeDialogB} key={selectedBanner?.id}>
                    <DialogContent className="w-full min-w-[600px] overflow-auto sm:max-w-[425px]">
                        <form onSubmit={submitB}>
                            <DialogHeader>
                                <DialogTitle>Edit Heading</DialogTitle>
                                <DialogDescription>Click save ketika selesai.</DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="heading" className="text-right">
                                        Heading
                                    </Label>
                                    <Input
                                        id="heading"
                                        value={data.heading}
                                        onChange={(e) => setData('heading', e.target.value)}
                                        className="col-span-3"
                                    />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="sub_heading" className="text-right">
                                        Sub Heading
                                    </Label>
                                    <Input
                                        id="sub_heading"
                                        value={data.sub_heading}
                                        onChange={(e) => setData('sub_heading', e.target.value)}
                                        className="col-span-3"
                                    />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="link" className="text-right">
                                        Link
                                    </Label>
                                    <Input id="link" value={data.link} onChange={(e) => setData('link', e.target.value)} className="col-span-3" />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="is_active" className="text-right">
                                        Aktif
                                    </Label>
                                    <Select onValueChange={(value) => setData('is_active', Number(value))} defaultValue={String(data.is_active)}>
                                        <SelectTrigger className="col-span-3">
                                            <SelectValue placeholder="Pilih status" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="1" className="hover:bg-accent">
                                                Aktif
                                            </SelectItem>
                                            <SelectItem value="0" className="hover:bg-accent">
                                                Tidak Aktif
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                            <DialogFooter>
                                <Button variant={'destructive'} onClick={closeDialogB} disabled={processing}>
                                    Close
                                </Button>
                                <Button type="submit" disabled={processing}>
                                    {processing && <LoaderCircle className="h-4 w-4 animate-spin" />} Simpan
                                </Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
            )}
        </>
    );
}
