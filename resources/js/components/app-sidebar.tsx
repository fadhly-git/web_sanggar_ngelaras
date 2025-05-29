import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
    SidebarRail,
} from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { AppWindow, BracesIcon, Cog, EraserIcon, HouseIcon, NewspaperIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import AppLogo from './app-logo';
import { ScrollArea } from './ui/scroll-area';

const mainNavItems: NavItem[] = [
    {
        title: 'Dev',
        href: '/atmin/developing/index',
        icon: BracesIcon,
    },
    {
        title: 'Clear Cache',
        href: '/clear-cache',
        icon: EraserIcon,
    },
];

const data = {
    navMain: [
        {
            title: 'Dashboard',
            url: '/atmin/dashboard',
            icon: HouseIcon,
        },
        {
            title: 'Konten Manajemen',
            url: '#',
            icon: AppWindow,
            items: [
                {
                    title: 'Banner',
                    url: '/atmin/konten-manajemen/banner/index',
                },
                {
                    title: 'Tentang Kami',
                    url: '/atmin/konten-manajemen/tentang-kami/index',
                },
                {
                    title: 'Galeri',
                    url: '/atmin/konten-manajemen/galeri/index',
                },
                {
                    title: 'Kontak Kami & Faqs',
                    url: '/atmin/konten-manajemen/kontak-kami/index',
                },
            ],
        },
        {
            title: 'Berita',
            url: '/atmin/berita/index',
            icon: NewspaperIcon,
        },
        {
            title: 'App Settings',
            url: '#',
            icon: Cog,
        },
    ],
};

export function AppSidebar() {
    const [currentPath, setCurrentPath] = useState('');

    // Ambil path awal saat komponen dimuat
    useEffect(() => {
        setCurrentPath(window.location.pathname);
    }, []);
    return (
        <Sidebar collapsible="icon" variant="floating">
            <SidebarHeader>
                <NavUser />
            </SidebarHeader>

            <SidebarContent>
                <ScrollArea className="h-full">
                    <SidebarGroup>
                        <SidebarMenu>
                            {data.navMain.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton
                                        asChild
                                        isActive={currentPath === item.url || (item.items?.some((sub) => sub.url === currentPath) ?? false)}
                                        tooltip={{ children: item.title }}
                                    >
                                        <Link href={item.url} className="font-medium">
                                            {item.icon && <item.icon />}
                                            {item.title}
                                        </Link>
                                    </SidebarMenuButton>
                                    {item.items?.length ? (
                                        <SidebarMenuSub>
                                            {item.items.map((item) => {
                                                const isActive = currentPath === item.url;
                                                return (
                                                    <SidebarMenuSubItem key={item.title}>
                                                        <SidebarMenuSubButton asChild isActive={isActive}>
                                                            <a href={item.url}>{item.title}</a>
                                                        </SidebarMenuSubButton>
                                                    </SidebarMenuSubItem>
                                                );
                                            })}
                                        </SidebarMenuSub>
                                    ) : null}
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroup>
                    <NavMain items={mainNavItems} />
                </ScrollArea>
            </SidebarContent>
            <SidebarRail />

            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/atmin/dashboard" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    );
}
