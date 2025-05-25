/* eslint-disable @typescript-eslint/no-unused-vars */
import InputError from '@/components/input-error';
import { NumberInput } from '@/components/number-input';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { useForm } from '@inertiajs/react';
import { FormEventHandler, useEffect, useState } from 'react';
import { toast } from 'sonner';
import { useDataContext } from './data-context';

interface AboutUs {
    id: number;
    img_banner: File | string;
    tentang_kami: string;
    summary: string;
    sejarah: string;
    visi: string;
    misi?: Misi[];
    created_at: string;
    updated_at: string;
}

interface Misi {
    [key: string]: string | number;
    id: number;
    icon: string;
    deskripsi: string;
    urutan: number;
}

export const AboutUsData = () => {
    const { aboutUs, triggerRefetch, openDialogHandlerImg } = useDataContext();
    const [editing, setEditing] = useState(false);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null); // State untuk URL preview
    const [editImg, setEditImg] = useState(false);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data, setData, processing, errors, post } = useForm<Record<string, any>>({
        id: aboutUs?.id,
        img_banner: '',
        tentang_kami: aboutUs?.tentang_kami,
        summary: aboutUs?.summary,
        sejarah: aboutUs?.sejarah,
        visi: aboutUs?.visi,
        misi: aboutUs?.misi || [],
        created_at: aboutUs?.created_at,
        updated_at: aboutUs?.updated_at,
    });

    useEffect(() => {
        setData('id', aboutUs.id);
        // setData('img_banner', aboutUs.img_banner);
        setData('tentang_kami', aboutUs.tentang_kami);
        setData('summary', aboutUs.summary);
        setData('sejarah', aboutUs.sejarah);
        setData('visi', aboutUs.visi);
        setData('misi', aboutUs.misi || []);
        setData('created_at', aboutUs.created_at);
        setData('updated_at', aboutUs.updated_at);
    }, [aboutUs, setData]);

    // Buat preview saat file berubah
    useEffect(() => {
        let url: string | null = null;

        if (data.img_banner instanceof File) {
            // Jika ini file baru, buat object URL
            url = URL.createObjectURL(data.img_banner);
            setPreviewUrl(url);
        } else if (typeof aboutUs.img_banner === 'string' && aboutUs.img_banner !== '') {
            // Jika ini string (URL dari server), gunakan langsung
            setPreviewUrl('/' + aboutUs.img_banner);
        } else {
            setPreviewUrl(null);
        }

        // Bersihkan object URL jika tidak digunakan lagi
        return () => {
            if (url) URL.revokeObjectURL(url);
        };
    }, [data.img_banner, aboutUs.img_banner]);

    if (!aboutUs) {
        return null; // or a loading state
    }

    const handleChange = (file: File) => {
        setEditImg(true);
        setData('img_banner', file);
    };

    const addField = () => {
        setData('misi', [...data.misi, { icon: '', deskripsi: '', urutan: data.misi.length + 1 }]);
    };

    const submit: FormEventHandler = async (e) => {
        if (editImg === false) {
            setData('img_banner', null);
        }
        e.preventDefault();
        post(route('atmin.konten-manajemen.tentang-kami.update'), {
            onSuccess: () => {
                triggerRefetch();
                setEditing(false);
                toast.success('Berhasil memperbarui data');
            },
            onError: () => {
                toast.error('Gagal memperbarui data', {
                    description: String(
                        errors.tentang_kami || errors.sejarah || errors.visi || errors.img_banner || errors.misi || errors.summary || String(errors),
                    ),
                });
                console.error('Error updating data:', errors);
            },
        });
    };

    return (
        <div className="bg-background flex flex-col items-center justify-center gap-4 px-6 md:p-5">
            <div className="w-full">
                <h1 className="mb-2 text-center text-xl font-extrabold">{editing && 'Edit '}Data halaman Tentang Kami</h1>
                <Separator className="bg-primary mb-4" />
                {editing ? (
                    <form className="flex flex-col gap-6" onSubmit={submit}>
                        <div className="grid gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="about_us">Image Banner</Label>
                                {previewUrl ? (
                                    <div className="w-full place-items-center">
                                        <div className="relative mt-4">
                                            <img
                                                src={previewUrl}
                                                alt="Image preview"
                                                className="mt-2 aspect-video h-auto max-w-full rounded-md border"
                                                style={{ maxHeight: '200px' }}
                                            />
                                            <button
                                                onClick={() => {
                                                    setPreviewUrl('')
                                                    setEditImg(true);
                                                }} // atau fungsi untuk menghapus gambar
                                                className="absolute -top-2 -right-2 rounded-full bg-red-500 p-1 text-white transition-colors hover:bg-red-600"
                                                title="Hapus gambar"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <>
                                        <div className="flex w-full">
                                            <Input
                                                type="file"
                                                id="img_banner"
                                                name="img_banner"
                                                accept="image/*"
                                                onChange={(e) => {
                                                    const file = e.target.files?.[0];
                                                    if (file) {
                                                        handleChange(file);
                                                    }
                                                }}
                                            />
                                        </div>
                                    </>
                                )}
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="tentang_kami">Tentang Kami</Label>
                                <Textarea
                                    id="tentang_kami"
                                    name="tentang_kami"
                                    value={data.tentang_kami}
                                    onChange={(e) => setData('tentang_kami', e.target.value)}
                                    placeholder="Masukkan tentang kami"
                                    className="resize-none"
                                    rows={4}
                                    tabIndex={1}
                                    disabled={processing}
                                >
                                    {data.tentang_kami}
                                </Textarea>
                                <InputError message={errors.tentang_kami} />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="tentang_kami">Ringkasan</Label>
                                <Textarea
                                    id="summary"
                                    name="summary"
                                    value={data.summary}
                                    onChange={(e) => setData('summary', e.target.value)}
                                    placeholder="Masukkan ringkasan"
                                    className="resize-none"
                                    rows={4}
                                    tabIndex={1}
                                    disabled={processing}
                                >
                                    {data.summary}
                                </Textarea>
                                <InputError message={errors.summary} />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="sejarah">Sejarah</Label>
                                <Textarea
                                    id="sejarah"
                                    name="sejarah"
                                    value={data.sejarah}
                                    onChange={(e) => setData('sejarah', e.target.value)}
                                    placeholder="Masukkan sejarah"
                                    className="resize-none"
                                    rows={4}
                                    tabIndex={1}
                                    disabled={processing}
                                >
                                    {data.sejarah}
                                </Textarea>
                                <InputError message={errors.sejarah} />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="visi">Visi</Label>
                                <Textarea
                                    id="visi"
                                    name="visi"
                                    value={data.visi}
                                    onChange={(e) => setData('visi', e.target.value)}
                                    placeholder="Masukkan visi"
                                    className="resize-none"
                                    rows={4}
                                    tabIndex={1}
                                    disabled={processing}
                                >
                                    {data.visi}
                                </Textarea>
                                <InputError message={errors.visi} />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="visi">Misi</Label>
                                <div className="grid gap-4">
                                    {data.misi.map((misiItem: Misi, index: number) => (
                                        <div key={index} className="space-y-2 rounded-md border p-4">
                                            <div className="grid gap-2">
                                                <Label>Icon (class SVG)</Label>
                                                <Textarea
                                                    value={misiItem.icon || ''}
                                                    onChange={(e) =>
                                                        setData('misi', [
                                                            ...data.misi.slice(0, index),
                                                            { ...misiItem, icon: e.target.value },
                                                            ...data.misi.slice(index + 1),
                                                        ])
                                                    }
                                                    placeholder="go to fonts.google.com/icons or lucide.dev/icons copy the svg and paste here"
                                                />
                                                <span className="text-muted-foreground text-xs">
                                                    go to{' '}
                                                    <TextLink href="https://fonts.google.com/icons" target="_blank" className="text-primary text-sm">
                                                        fonts.google.com/icons
                                                    </TextLink>{' '}
                                                    or{' '}
                                                    <TextLink href="https://lucide.dev/icons" target="_blank" className="text-primary text-sm">
                                                        lucide.dev/icons
                                                    </TextLink>{' '}
                                                    copy the svg and paste here
                                                </span>
                                            </div>
                                            <div className="grid gap-2">
                                                <Label>Deskripsi</Label>
                                                <Textarea
                                                    value={misiItem.deskripsi || ''}
                                                    onChange={(e) =>
                                                        setData('misi', [
                                                            ...data.misi.slice(0, index),
                                                            { ...misiItem, deskripsi: e.target.value },
                                                            ...data.misi.slice(index + 1),
                                                        ])
                                                    }
                                                    rows={3}
                                                />
                                            </div>
                                            <div className="grid gap-2">
                                                <Label>Urutan</Label>
                                                <NumberInput
                                                    value={misiItem.urutan || index + 1}
                                                    onChange={(e) =>
                                                        setData('misi', [
                                                            ...data.misi.slice(0, index),
                                                            { ...misiItem, urutan: parseInt(e.target.value) || index + 1 },
                                                            ...data.misi.slice(index + 1),
                                                        ])
                                                    }
                                                />
                                            </div>
                                        </div>
                                    ))}

                                    <Button variant="outline" size="sm" onClick={addField} type="button">
                                        + Tambah Misi
                                    </Button>
                                </div>
                                <InputError message={errors.misi} />
                            </div>
                            {/* button submit */}
                            <div className="flex w-full justify-end">
                                <Button size={'sm'} type="submit" className="mt-4 w-fit" tabIndex={4} onClick={submit}>
                                    Simpan
                                </Button>
                            </div>
                        </div>
                    </form>
                ) : (
                    <div className="flex flex-col gap-6">
                        <div className="grid gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="about_us">Image Banner</Label>
                                <div className="w-full place-items-center">
                                    <div className="relative mt-2">
                                        <img
                                            src={'/' + aboutUs.img_banner}
                                            alt="image banner"
                                            className="mt-2 aspect-video h-auto max-w-full rounded-md border"
                                            style={{ maxHeight: '200px' }}
                                            onClick={()=> openDialogHandlerImg(aboutUs.img_banner)}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="tentang_kami">Tentang Kami</Label>
                                <Textarea
                                    id="tentang_kami"
                                    name="tentang_kami"
                                    value={data.tentang_kami}
                                    onChange={(e) => setData('tentang_kami', e.target.value)}
                                    placeholder="Masukkan tentang kami"
                                    className="resize-none"
                                    rows={4}
                                    tabIndex={1}
                                    disabled={!editing}
                                >
                                    {data.tentang_kami}
                                </Textarea>
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="tentang_kami">Ringkasan</Label>
                                <Textarea
                                    id="summary"
                                    name="summary"
                                    value={data.summary}
                                    onChange={(e) => setData('summary', e.target.value)}
                                    placeholder="Masukkan ringkasan"
                                    className="resize-none"
                                    rows={4}
                                    tabIndex={1}
                                    disabled={!editing}
                                >
                                    {data.summary}
                                </Textarea>
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="sejarah">Sejarah</Label>
                                <Textarea
                                    id="sejarah"
                                    name="sejarah"
                                    value={data.sejarah}
                                    onChange={(e) => setData('sejarah', e.target.value)}
                                    placeholder="Masukkan sejarah"
                                    className="resize-none"
                                    rows={4}
                                    tabIndex={1}
                                    disabled={!editing}
                                >
                                    {data.sejarah}
                                </Textarea>
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="visi">Visi</Label>
                                <Textarea
                                    id="visi"
                                    name="visi"
                                    value={data.visi}
                                    onChange={(e) => setData('visi', e.target.value)}
                                    placeholder="Masukkan visi"
                                    className="resize-none"
                                    rows={4}
                                    tabIndex={1}
                                    disabled={!editing}
                                >
                                    {data.visi}
                                </Textarea>
                            </div>
                            <div className="grid-gap-2">
                                <Label htmlFor="Misi">Misi</Label>
                                <div className="grid gap-4">
                                    {data.misi.map((misiItem: Misi, index: number) => (
                                        <div key={index} className="space-y-2 rounded-md border p-4">
                                            <div className="grid gap-2">
                                                <Label>Icon (class SVG)</Label>
                                                <Textarea
                                                    value={misiItem.icon || ''}
                                                    onChange={(e) =>
                                                        setData('misi', [
                                                            ...data.misi.slice(0, index),
                                                            { ...misiItem, icon: e.target.value },
                                                            ...data.misi.slice(index + 1),
                                                        ])
                                                    }
                                                    placeholder="go to fonts.google.com/icons or lucide.dev/icons copy the svg and paste here"
                                                    disabled={!editing}
                                                />
                                                <span className="text-muted-foreground text-xs">
                                                    go to{' '}
                                                    <TextLink href="https://fonts.google.com/icons" target="_blank" className="text-primary text-sm">
                                                        fonts.google.com/icons
                                                    </TextLink>{' '}
                                                    or{' '}
                                                    <TextLink href="https://lucide.dev/icons" target="_blank" className="text-primary text-sm">
                                                        lucide.dev/icons
                                                    </TextLink>{' '}
                                                    copy the svg and paste here
                                                </span>
                                            </div>
                                            <div className="grid gap-2">
                                                <Label>Deskripsi</Label>
                                                <Textarea
                                                    value={misiItem.deskripsi || ''}
                                                    onChange={(e) =>
                                                        setData('misi', [
                                                            ...data.misi.slice(0, index),
                                                            { ...misiItem, deskripsi: e.target.value },
                                                            ...data.misi.slice(index + 1),
                                                        ])
                                                    }
                                                    rows={3}
                                                    disabled={!editing}
                                                />
                                            </div>
                                            <div className="grid gap-2">
                                                <Label>Urutan</Label>
                                                <Input
                                                    type="text"
                                                    value={misiItem.urutan || index + 1}
                                                    onChange={(e) =>
                                                        setData('misi', [
                                                            ...data.misi.slice(0, index),
                                                            { ...misiItem, urutan: parseInt(e.target.value) || index + 1 },
                                                            ...data.misi.slice(index + 1),
                                                        ])
                                                    }
                                                    disabled={!editing}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="grid gap-2">
                                <div className="flex w-full justify-end">
                                    <Button
                                        variant={'secondary'}
                                        type="button"
                                        className="mt-4 w-fit"
                                        tabIndex={4}
                                        onClick={async (e) => {
                                            e.preventDefault();
                                            setEditing(true);
                                        }}
                                    >
                                        Edit
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
