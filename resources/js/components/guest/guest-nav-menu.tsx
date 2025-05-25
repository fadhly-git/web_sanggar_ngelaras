import { Button } from '@/components/ui/button';
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Link, usePage } from '@inertiajs/react';
import { MenuIcon } from 'lucide-react';

type GuestNavigationMenuProps = {
    scrolled: boolean;
};

const GuestNavigationMenu = ({ scrolled }: GuestNavigationMenuProps) => {
    const { url } = usePage();
    return (
        <section
            className={`bg-background z-50 flex w-screen items-center justify-center transition-all duration-300 ease-in-out shadow shadow-primary-foreground ${
                scrolled ? 'fixed top-0 p-4' : 'relative top-0 p-2'
            }`}
        >
            <div className="bg-background container mx-auto max-w-7xl">
                <nav className="flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2">
                        <img src="https://absensi.ngelaras.my.id/img/logo.png " className="max-h-8" alt="Ngesti Laras Budaya" />
                        <span className="text-lg font-semibold tracking-tighter">Ngesti Laras Budaya</span>
                    </Link>
                    <NavigationMenu className="hidden lg:block">
                        <NavigationMenuList>
                            <NavigationMenuItem>
                                <NavigationMenuLink href="/" className={navigationMenuTriggerStyle()} active={'/' === url}>
                                    <span className="text-base font-semibold">Beranda</span>
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <NavigationMenuLink href="/tentang-kami" className={navigationMenuTriggerStyle()} active={'/tentang-kami' === url}>
                                    <span className="text-base font-semibold">Tentang Kami</span>
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <NavigationMenuLink href="/gallery" className={navigationMenuTriggerStyle()} active={'/gallery' === url}>
                                    <span className="text-base font-semibold">Galeri</span>
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <NavigationMenuLink href="/berita-kegiatan" className={navigationMenuTriggerStyle()} active={'/berita-kegiatan' === url}>
                                    <span className="text-base font-semibold">Artikel</span>
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <NavigationMenuLink href="/kontak-kami" className={navigationMenuTriggerStyle()} active={'/kontak-kami' === url}>
                                    <span className="text-base font-semibold">Kontak Kami</span>
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                        </NavigationMenuList>
                    </NavigationMenu>
                    <Sheet>
                        <SheetTrigger asChild className="lg:hidden">
                            <Button variant="outline" size="icon">
                                <MenuIcon className="h-4 w-4" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="top" className="max-h-screen overflow-auto">
                            <SheetHeader>
                                <SheetTitle>
                                    <Link href="/" className="flex items-center gap-2">
                                        <img src="https://absensi.ngelaras.my.id/img/logo.png " className="max-h-8" alt="Ngesti Laras Budaya" />
                                        <span className="text-lg font-semibold tracking-tighter">Ngesti Laras Budaya</span>
                                    </Link>
                                </SheetTitle>
                            </SheetHeader>
                            <div className="flex flex-col p-4">
                                <div className="flex flex-col gap-6">
                                    <Link href="/" className="font-medium">
                                        Home
                                    </Link>
                                    <Link href="/tentang-kami" className="font-medium">
                                        Tentang Kami
                                    </Link>
                                    <Link href="/gallery" className="font-medium">
                                        Galeri
                                    </Link>
                                    <Link href="/berita-kegiatan" className="font-medium">
                                        Artikel
                                    </Link>
                                    <Link href="/kontak-kami" className="font-medium">
                                        Kontak Kami
                                    </Link>
                                </div>
                            </div>
                        </SheetContent>
                    </Sheet>
                </nav>
            </div>
        </section>
    );
};

export { GuestNavigationMenu };
