import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { usePage } from '@inertiajs/react';
import axios from 'axios';
import { XIcon } from 'lucide-react';
import { useState } from 'react';
import { DataProvider } from './data-context';
import { FileUploader, UploadedFile } from './file-upload';
import { toast } from 'sonner';

export interface ShowGalleryItem {
    id: number;
    item_title: string | null;
    img_path: string;
}

export interface ShowGalleryProps {
    id: number;
    title: string;
    deskripsi: string;
    items: ShowGalleryItem[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Konten Manajemen',
        href: '/atmin/konten-manajemen/galeri/index',
    },
    {
        title: 'Galeri',
        href: '/atmin/konten-manajemen/galeri/index',
    },
];

export default function GalleryEdit() {
    const { data_edit } = usePage().props;
    const [galleryData, setGalleryData] = useState<ShowGalleryProps>(data_edit as ShowGalleryProps);
    const [newFiles, setNewFiles] = useState<UploadedFile[]>([]);
    const [deletedItems, setDeletedItems] = useState<number[]>([]);
    const [itemTitles, setItemTitles] = useState<Record<number, string>>({});
    const maxFiles = 5; // Atau bisa dari props

    // Hitung max file yang bisa diupload
    const calculateMaxFiles = () => {
        const remainingItems = galleryData.items.filter((item) => !deletedItems.includes(item.id));
        return maxFiles - remainingItems.length;
    };

    // Handle remove existing item
    const handleRemoveItem = (itemId: number) => {
        setDeletedItems([...deletedItems, itemId]);
    };

    // Handle update item title
    const handleItemTitleChange = (itemId: number, value: string) => {
        setItemTitles({
            ...itemTitles,
            [itemId]: value,
        });
    };

    // Handle form submit
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('title', galleryData.title);
        formData.append('deskripsi', galleryData.deskripsi);

        // Format item_titles sebagai array dalam FormData
        Object.entries(itemTitles).forEach(([id, title]) => {
            formData.append(`item_titles[${id}]`, title);
        });

        // Format deleted_items sebagai array dalam FormData
        deletedItems.forEach((id) => {
            formData.append('deleted_items[]', id.toString());
        });
        // Tambah file baru
        newFiles.forEach((file) => {
            formData.append('files[]', file.file);
        });

        try {
            // Debug: Log formData sebelum dikirim
            // for (let [key, value] of formData.entries()) {
            //     console.log(key, value);
            // }

            const response = await axios.post(`/atmin/konten-manajemen/galeri/update/${galleryData.id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });


            toast.success('Galeri berhasil diperbarui', {
                description: response.data.message || 'Data berhasil diperbarui',
                action: (
                    <Button
                        variant="outline"
                        className='hover:cursor-pointer justify-end'
                        size="sm"
                        onClick={() => window.location.reload()}
                    >
                        Segarkan
                    </Button>
                )
            });
            // Redirect atau refresh data setelah sukses
        } catch (error) {
            console.error('Error updating gallery:', error);
            toast.error('Gagal memperbarui galeri', {
                description: error instanceof Error ? error.message : 'Terjadi kesalahan saat memperbarui galeri',
                action: (
                    <Button
                        variant="outline"
                        className='hover:cursor-pointer justify-end'
                        size="sm"
                        onClick={() => window.location.reload()}
                    >
                        Segarkan
                    </Button>
                )
            });
        }
    };
    return (
        <AppLayout title="Galeri Edit" breadcrumbs={breadcrumbs}>
            <DataProvider>
                <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                    <div className="grid auto-rows-min gap-4 md:grid-cols-1">
                        <div className="border-sidebar-border/70 dark:border-sidebar-border relative h-fit place-content-start rounded-xl border">
                            <div className="mx-auto flex w-full flex-row gap-2 p-4">
                                <div className="flex w-full items-center justify-start">
                                    <h2 className="text-xl font-black">Edit Data Galeri Kegiatan</h2>
                                </div>
                                <div className="flex justify-end">
                                    <Button type="submit" size={'sm'} onClick={() => window.history.back()}>
                                        Kembali
                                    </Button>
                                </div>
                            </div>
                        </div>
                        <div className="border-sidebar-border/70 dark:border-sidebar-border relative h-fit place-content-center rounded-xl border">
                            <div className="border-sidebar-border/70 dark:border-sidebar-border m-4 rounded-xl border">
                                <form className="p-4" onSubmit={handleSubmit}>
                                    <div className="p-2">
                                        <Label htmlFor="title" className="text-sm font-medium">
                                            Judul
                                        </Label>
                                        <Input
                                            type="text"
                                            id="title"
                                            name="title"
                                            value={galleryData.title}
                                            onChange={(e) => setGalleryData({ ...galleryData, title: e.target.value })}
                                            className="mt-1 block w-full rounded-md"
                                            placeholder="Masukkan Judul"
                                        />
                                    </div>
                                    <div className="p-2">
                                        <Label htmlFor="deskripsi" className="text-sm font-medium">
                                            Deskripsi
                                        </Label>
                                        <Textarea
                                            id="deskripsi"
                                            name="deskripsi"
                                            value={galleryData.deskripsi}
                                            onChange={(e) => setGalleryData({ ...galleryData, deskripsi: e.target.value })}
                                            className="mt-1 block w-full rounded-md"
                                            placeholder="Masukkan Deskripsi"
                                        />
                                    </div>

                                    {/* Existing Items */}
                                    <div className="border-sidebar-border/70 dark:border-sidebar-border rounded-xl">
                                        {galleryData.items.map((item) => {
                                            if (deletedItems.includes(item.id)) return null;

                                            return (
                                                // Di dalam map items
                                                <div key={item.id} className="relative mb-4 rounded-lg border p-2">
                                                    <button
                                                        type="button"
                                                        onClick={() => handleRemoveItem(item.id)}
                                                        className="absolute top-2 right-2 rounded-full bg-red-500 p-1 text-white hover:bg-red-600"
                                                    >
                                                        <XIcon className="h-4 w-4" />
                                                    </button>

                                                    <img
                                                        src={`/${item.img_path}`}
                                                        alt={item.item_title || 'Gallery item'}
                                                        className="h-auto max-w-full"
                                                    />

                                                    <Input
                                                        value={itemTitles[item.id] || item.item_title || ''}
                                                        onChange={(e) => handleItemTitleChange(item.id, e.target.value)}
                                                        placeholder="Judul item"
                                                        className="mt-2"
                                                    />
                                                </div>
                                            );
                                        })}
                                    </div>

                                    {/* File Uploader */}
                                    <div className="p-2">
                                        <Label className="text-sm font-medium">Tambah File Baru</Label>
                                        <FileUploader
                                            multiple={true}
                                            maxFiles={calculateMaxFiles()}
                                            supportedFiles={['image/png', 'image/jpeg', 'image/jpg']}
                                            onFilesChange={setNewFiles}
                                        />
                                    </div>

                                    {/* Submit Button */}
                                    <div className="flex justify-end p-2">
                                        <Button
                                            type="button"
                                            size={'sm'}
                                            className="mr-2 hover:cursor-pointer"
                                            variant={'destructive'}
                                            onClick={() => window.history.back()}
                                        >
                                            <XIcon className="mr-1 h-4 w-4" />
                                            Kembali
                                        </Button>
                                        <Button type="submit" size={'sm'}>
                                            Simpan Perubahan
                                        </Button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </DataProvider>
        </AppLayout>
    );
}
