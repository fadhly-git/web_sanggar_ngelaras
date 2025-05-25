import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useForm } from '@inertiajs/react';
import axios from 'axios';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler, useState } from 'react';
import { toast } from 'sonner';
import { useDataContext } from './data-context';

interface FormData {
    title: string;
    deskripsi: string;
}

export const GalleryCreateForm = () => {
    const { handleIsTrue } = useDataContext();
    const [processing, setProcessing] = useState(false);
    const { data, setData } = useForm<Required<FormData>>({
        title: '',
        deskripsi: '',
    });

    const sumbit: FormEventHandler = (e) => {
        setProcessing(true);
        e.preventDefault();
        axios
            .post('/atmin/konten-manajemen/galeri/store-main', {
                title: data.title,
                deskripsi: data.deskripsi,
            })
            .then((res) => {
                toast.success('Berhasil menyimpan data');
                setProcessing(false);
                handleIsTrue(res.data);
            })
            .catch((err) => {
                setProcessing(false);
                toast.error('Gagal menyimpan data', {
                    description: String(err.response.data.message),
                });
                console.error('Error updating heading:', err);
            });
    };
    return (
        <form className='grid gap-4' onSubmit={sumbit}>
            <div className="grid gap-2">
                <Label htmlFor="title" className="peer text-sm leading-none font-medium">
                    Judul
                </Label>
                <Input
                    id="title"
                    type="text"
                    placeholder="Judul Galeri Kegiatan"
                    className="w-full"
                    value={data.title}
                    onChange={(e) => setData('title', e.target.value)}
                />
            </div>
            <div className="grid gap-2">
                <Label htmlFor="deskripsi" className="peer text-sm leading-none font-medium">
                    Deskripsi
                </Label>
                <Textarea
                    id="deskripsi"
                    placeholder="Deskripsi Galeri Kegiatan"
                    className="w-full"
                    value={data.deskripsi}
                    onChange={(e) => setData('deskripsi', e.target.value)}
                />
            </div>

            <div className="flex flex-row justify-between gap-2">
                <span className="text-primary text-sm">Simpan Judul dan Deskripsi terlebih dahulu baru Gambar</span>
                <Button type="submit" size={'sm'} variant={'default'} className="bg-primary hover:bg-primary/80" disabled={processing}>
                    {processing && <LoaderCircle className="animate-spin" />}
                    Simpan
                </Button>
            </div>
        </form>
    );
};
