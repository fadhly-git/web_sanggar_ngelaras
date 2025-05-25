import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { DataProvider } from './data-context';
import FileUploadPage from './file-upload-page';
import { GalleryCreateForm } from './form-create';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Konten Manajemen',
        href: '/atmin/konten-manajemen/galeri/index',
    },
    {
        title: 'Tentang Kami',
        href: '/atmin/konten-manajemen/galeri/create',
    },
];

export default function GalleryCreate() {
    return (
        <AppLayout title="Tambah Galeri" breadcrumbs={breadcrumbs}>
            <DataProvider>
                <div className="flex h-full w-full flex-1 flex-col gap-4 rounded-xl p-4">
                    <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border md:min-h-min">
                        <div className="flex w-full flex-col items-center justify-center gap-4 px-6 md:p-5">
                            <div className="w-full">
                                <div className="my-2 flex w-full flex-row justify-between">
                                    <h2 className="text-2xl font-black">Tambah Data Galeri Kegiatan</h2>
                                </div>
                                <div className="flex flex-col gap-6">
                                    <GalleryCreateForm />
                                    <div className="grid gap-2">
                                        <Label htmlFor="img_path" className="peer text-sm leading-none font-medium">
                                            Gambar
                                        </Label>
                                        <div className="grid gap-2 space-y-2 rounded-md border p-4">
                                            <FileUploadPage />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </DataProvider>
        </AppLayout>
    );
}
