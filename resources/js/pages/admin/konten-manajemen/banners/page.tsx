import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { DataProvider } from './DataContext';
import { DialogEdit } from './dialog-edit';
import { HeadingForm } from './heading';
import { ImageBannersForm } from './image';
import { BannersActionTable } from './table-banners';
import { ImageActionTable } from './table-image';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Konten Manajemen',
        href: '/atmin/konten-manajemen/banner/index',
    },
    {
        title: 'Hero',
        href: '/atmin/konten-manajemen/banner/index',
    },
];

export default function Banners() {
    return (
        <AppLayout title="Hero" breadcrumbs={breadcrumbs}>
            <DataProvider>
                <DialogEdit />
                <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                    <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                        <div className="border-sidebar-border/70 dark:border-sidebar-border relative h-[450px] place-content-start rounded-xl border">
                            <HeadingForm />
                        </div>
                        <div className="border-sidebar-border/70 dark:border-sidebar-border relative h-[450px] place-content-start rounded-xl border">
                            <ImageBannersForm />
                        </div>
                        <div className="border-sidebar-border/70 dark:border-sidebar-border relative h-[450px] place-content-start rounded-xl border">
                            <ImageActionTable />
                        </div>
                    </div>
                    <div className="grid auto-rows-min gap-4 md:grid-cols-1">
                        <div className="border-sidebar-border/70 dark:border-sidebar-border relative h-[450px] place-content-start rounded-xl border">
                            <BannersActionTable />
                        </div>
                    </div>
                </div>
            </DataProvider>
        </AppLayout>
    );
}
