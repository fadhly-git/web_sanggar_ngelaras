import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { BtnAdd, BtnEdit } from './btn-edit';
import { DataProvider } from './data-context';
import { KontakKamiEditForm } from './kontak-kami-edit';
import { AddFaqs } from './add-faqs';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Konten Manajemen',
        href: '/atmin/konten-manajemen/kontak-kami/index',
    },
    {
        title: 'Kontak Kami & Faqs',
        href: '/atmin/konten-manajemen/kontak-kami/index',
    },
];

export default function KontakKami() {
    return (
        <AppLayout title="Kontak Kami & Faqs" breadcrumbs={breadcrumbs}>
            <DataProvider>
                <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                    <div className="border-sidebar-border/70 dark:border-sidebar-border rounded-xl border">
                        <div className="border-sidebar-border/70 dark:border-sidebar-border relative m-2 h-fit place-content-start rounded-xl border">
                            <div className="mx-auto flex w-full flex-row gap-2 p-4">
                                <div className="flex w-full items-center justify-start">
                                    <h2 className="text-xl font-black">Data Kontak Kami</h2>
                                </div>

                                <div className="flex justify-end">
                                    <BtnEdit />
                                </div>
                            </div>
                        </div>
                        <div className="border-sidebar-border/70 dark:border-sidebar-border relative m-2 h-fit place-content-start rounded-xl border">
                            <div className="mx-auto flex w-full flex-col gap-2 p-4">
                                <KontakKamiEditForm />
                            </div>
                        </div>
                    </div>
                    <div className="border-sidebar-border/70 dark:border-sidebar-border rounded-xl border">
                        <div className="border-sidebar-border/70 dark:border-sidebar-border relative m-2 h-fit place-content-start rounded-xl border">
                            <div className="mx-auto flex w-full flex-row gap-2 p-4">
                                <div className="flex w-full items-center justify-start">
                                    <h2 className="text-xl font-black">Data Frequently asked questions</h2>
                                </div>

                                <div className="flex justify-end">
                                    <BtnAdd />
                                </div>
                            </div>
                        </div>
                        <div className="border-sidebar-border/70 dark:border-sidebar-border relative m-2 h-fit place-content-start rounded-xl border">
                            <div className="mx-auto flex w-full flex-col gap-2 p-4">
                                <AddFaqs />
                            </div>
                        </div>
                    </div>
                </div>
            </DataProvider>
        </AppLayout>
    );
}
