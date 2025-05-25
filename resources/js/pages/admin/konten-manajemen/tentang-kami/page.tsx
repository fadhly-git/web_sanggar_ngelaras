
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { DataProvider } from './data-context';
import { AboutUsData } from './about-us';
import { DialogPreview } from './dialog-preview';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Konten Manajemen',
        href: '/atmin/konten-manajemen/tentang-kami/index',
    },
    {
        title: 'Tentang Kami',
        href: '/atmin/konten-manajemen/tentang-kami/index',
    },
];

export default function AboutUs() {
    return (
        <AppLayout title="Tentang Kami" breadcrumbs={breadcrumbs}>
            <DataProvider>
                <DialogPreview />
                <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                    <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border md:min-h-min">
                        <AboutUsData />
                    </div>
                </div>
            </DataProvider>
        </AppLayout>
    );
}
