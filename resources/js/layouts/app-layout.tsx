import AppLayoutTemplate from '@/layouts/app/app-sidebar-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { type ReactNode } from 'react';

interface AppLayoutProps {
    children: ReactNode;
    breadcrumbs?: BreadcrumbItem[];
    title: string;
    description?: string;
}

export default ({ children, breadcrumbs, title, description,...props }: AppLayoutProps) => (
    <>
        <Head>
            <title>{title}</title>
            {description && <meta name="description" content={description} />}
        </Head>
        <AppLayoutTemplate breadcrumbs={breadcrumbs} {...props}>
            {children}
        </AppLayoutTemplate>
    </>
);
