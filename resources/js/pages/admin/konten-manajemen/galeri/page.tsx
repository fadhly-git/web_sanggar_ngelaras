import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { DataProvider } from './data-context';
import { ShowGallery } from './show-gallery';

export interface ShowGalleryItem {
    id: number;
    item_title: string | null;
    img_path: string;
}

export interface ShowGalleryProps {
    title?: string;
    description?: string;
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

export default function Gallery() {
    const handleCreate = () => {
        window.location.href = '/atmin/konten-manajemen/galeri/create';
    };
    return (
        <AppLayout title="Galeri" breadcrumbs={breadcrumbs}>
            <DataProvider>
                <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                    <div className="grid auto-rows-min gap-4 md:grid-cols-1">
                        <div className="border-sidebar-border/70 dark:border-sidebar-border relative h-fit place-content-start rounded-xl border">
                            <div className="mx-auto flex flex-row gap-2 p-4 w-full">
                                <div className='flex w-full items-center justify-start'>
                                    <h2 className="text-xl font-black">Data Galeri Kegiatan</h2>
                                </div>

                                <div className="flex justify-end">
                                    <Button type="submit" size={'sm'} onClick={handleCreate}>
                                        Tambah Data
                                    </Button>
                                </div>
                            </div>
                        </div>
                        <div className="border-sidebar-border/70 dark:border-sidebar-border relative h-fit place-content-center rounded-xl border">
                            <div className="border-sidebar-border/70 dark:border-sidebar-border m-4 rounded-xl border">
                                <div className="p-4">
                                    <ShowGallery />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </DataProvider>
        </AppLayout>
    );
}
