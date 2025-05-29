import { AlertDialogTemplate } from '@/components/alert-template';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler, useEffect, useState } from 'react';
import { toast } from 'sonner';
import { typeDataEditFaqs, useDataContext } from './data-context';
import axios from 'axios';

export function DialogEditFaqs() {
    const { editFaqs, editFaqsHandler, dataEditFaqs, triggerRefetch } = useDataContext();
    const [open, setOpen] = useState(false);
    const { data, setData, processing, errors, post } = useForm<typeDataEditFaqs>({
        id: 0,
        question: '',
        answer: '',
        is_active: 0,
    });

    useEffect(() => {
        if (dataEditFaqs) {
            setData({
                id: dataEditFaqs.id,
                question: dataEditFaqs.question,
                answer: dataEditFaqs.answer,
                is_active: dataEditFaqs.is_active ? 1 : 0,
            });
        }
    }, [dataEditFaqs, setData]);

    const handleClose = () => {
        editFaqsHandler();
    };

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        if (!data.question || !data.answer) {
            toast.error('Pertanyaan dan jawaban tidak boleh kosong');
            return; // Prevent submission if question or answer is empty
        }
        post(route('atmin.konten-manajemen.kontak-kami.store-faqs'), {
            onSuccess: () => {
                triggerRefetch();
                toast.success('FAQ berhasil diperbarui');
                editFaqsHandler();
            },
            onError: () => {
                toast.error('Terjadi kesalahan saat memperbarui FAQ');
                console.error('Error updating FAQ:', errors);
            },
        });
    };

    const handleDelete = () => {
        handleDeleteFaqs(data.id);
        setOpen(false);
    };

    const handleDeleteFaqs = async (id: number) => {
        const route = `/api/destroy-faqs/${id}`;
        try {
            await axios.get('/sanctum/csrf-cookie');
            axios
                .delete(route)
                .then(() => {
                    toast.success('FAQ berhasil dihapus');
                    triggerRefetch();
                })
                .catch((error) => {
                    toast.error('Terjadi kesalahan saat menghapus FAQ');
                    console.error('Error deleting FAQ:', error);
                });
        } catch (error) {
            console.error('Error preparing to delete FAQ:', error);
            toast.error('Terjadi kesalahan saat mempersiapkan penghapusan FAQ');
            return;
        }
    };

    return (
        <>
            <AlertDialogTemplate
                title="Hapus Data FAQ"
                description="Apakah Anda yakin ingin menghapus FAQ ini?"
                open={open}
                handleClose={() => setOpen(false)}
                onAction={handleDelete}
                actionText="Hapus"
                cancelText="Batal"
            />
            <Dialog open={editFaqs} onOpenChange={handleClose}>
                <DialogContent className="max-w-[800px]">
                    <form onSubmit={submit} className="w-full">
                        <DialogHeader>
                            <DialogTitle>Edit FAQ</DialogTitle>
                            <DialogDescription>
                                Buat perubahan pada pertanyaan dan jawaban FAQ. Pastikan informasi yang diberikan akurat dan jelas untuk membantu
                                pengguna.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid items-center gap-4">
                                <Label htmlFor="question" className="text-right">
                                    Pertanyaan
                                </Label>
                                <Input id="question" value={data.question} className="col-span-3" />
                                <InputError message={errors.question} className="mt-2" />
                            </div>
                            <div className="grid items-center gap-4">
                                <Label htmlFor="answer" className="text-right">
                                    Jawaban
                                </Label>
                                <Textarea id="answer" value={data.answer} className="col-span-3" />
                                <InputError message={errors.answer} className="mt-2" />
                            </div>
                            <div className="grid items-center gap-4">
                                <Label htmlFor="is_active" className="text-right">
                                    Aktif
                                </Label>
                                <Switch
                                    id="is_active"
                                    checked={data.is_active === 1}
                                    onCheckedChange={(checked) => setData('is_active', checked ? 1 : 0)}
                                />
                                <InputError message={errors.is_active} className="mt-2" />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button type="button" variant={'destructive'} onClick={() => setOpen(true)} disabled={processing}>
                                {processing && <LoaderCircle className="mr-2 size-4 animate-spin" />}
                                Hapus
                            </Button>
                            <Button type="submit" disabled={processing}>
                                {processing && <LoaderCircle className="mr-2 size-4 animate-spin" />}
                                Simpan
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    );
}
