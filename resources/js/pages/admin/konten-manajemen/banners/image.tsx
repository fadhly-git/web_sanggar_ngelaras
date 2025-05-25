import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler, useEffect, useState } from 'react';
import { toast } from 'sonner';
import { useDataContext } from './DataContext';

type Props = {
    image: File | undefined;
};

export const ImageBannersForm = () => {
    const { triggerRefetch } = useDataContext();
    const { data, setData, processing, errors, post } = useForm<Props>({
        image: undefined,
    });
    const [previewUrl, setPreviewUrl] = useState<string | null>(null); // State untuk URL preview

    // Buat preview saat file berubah
    useEffect(() => {
        if (data.image) {
            const url = URL.createObjectURL(data.image);
            setPreviewUrl(url);
            // Bersihkan URL saat komponen unmount atau file berubah
            return () => URL.revokeObjectURL(url);
        } else {
            setPreviewUrl(null);
        }
    }, [data.image]);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('atmin.konten-manajemen.banner.store.any', { any: 'image' }), {
            onSuccess: () => {
                triggerRefetch();
                toast.success('Berhasil memperbarui gambar');
            },
            onError: () => {
                toast.error('Gagal memperbarui gambar', {
                    description: String(errors.image),
                });
                console.error('Error updating image:', errors);
            },
        });
    };

    console.log('Image:', typeof data.image);

    return (
        <div className="bg-background flex flex-col items-center justify-center gap-4 px-6 md:p-5">
            <div className="w-full max-w-sm">
                <form className="flex flex-col gap-6" onSubmit={submit}>
                    <div className="grid gap-6">
                        <div className="grid gap-2">
                            <Label htmlFor="file">File Gambar</Label>
                            <Input
                                id="file"
                                type="file"
                                required
                                tabIndex={1}
                                accept="image/*"
                                onChange={(e) => {
                                    if (e.target.files && e.target.files[0]) {
                                        setData('image', e.target.files[0]);
                                    } else {
                                        setData('image', undefined);
                                        setPreviewUrl(null);
                                    }
                                }}
                            />
                            <InputError message={errors.image} />
                        </div>

                        {/* Preview Gambar */}
                        {previewUrl && (
                            <div className="mt-4">
                                <p className="text-sm font-medium">Preview:</p>
                                <img
                                    src={previewUrl}
                                    alt="Image preview"
                                    className="mt-2 aspect-video h-auto max-w-full rounded-md border"
                                    style={{ maxHeight: '200px' }}
                                />
                            </div>
                        )}

                        <Button type="submit" className="mt-4 w-full" tabIndex={4} disabled={processing}>
                            {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                            Simpan
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};
