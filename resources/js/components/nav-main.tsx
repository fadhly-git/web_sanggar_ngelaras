import { SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { Button } from './ui/button';
import axios from 'axios';
import { useState } from 'react';
import { LoaderCircle } from 'lucide-react';
import { toast } from 'sonner';

export function NavMain({ items = [] }: { items: NavItem[] }) {
    const page = usePage();
    const [isLoading, setIsLoading] = useState(false);
    const handleClearCache = () => {
        setIsLoading(true);
        axios.post('/clear-cache')
            .then((response) => {
                toast.success(response.data.message);
                // Handle success response
            }
            )
            .catch((error) => {
                toast.error(error.response.data.message);
                // Handle error response
            }
            )
            .finally(() => {
                setIsLoading(false);
            }
            );
    }
    return (
        <SidebarGroup className="px-2 py-0">
            <SidebarGroupLabel>DEv</SidebarGroupLabel>
            <SidebarMenu>
                {items.map((item) => (
                    <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton
                            asChild isActive={item.href === page.url}
                            tooltip={{ children: item.title }}
                        >
                            {item.href === '/clear-cache' ? (
                                <Button variant="ghost" className="w-full flex-row items-left justify-start" onClick={() => handleClearCache()} disabled={isLoading}>
                                    {item.icon && <item.icon />}
                                    <span>{item.title}</span>
                                    {isLoading && <LoaderCircle className="animate-spin" />}
                                </Button>
                            ) : (
                                <Link href={item.href} prefetch>
                                    {item.icon && <item.icon />}
                                    <span>{item.title}</span>
                                </Link>
                            )}
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                ))}
            </SidebarMenu>
        </SidebarGroup>
    );
}
