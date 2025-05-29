import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Index } from '.';
import { NewsProvider } from './data-context';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Berita',
        href: '/atmin/berita/index',
    },
];

export default function Berita() {
    return (
        <AppLayout title="Berita" breadcrumbs={breadcrumbs}>
            <NewsProvider>
                <Index />
            </NewsProvider>
        </AppLayout>
    );
}
