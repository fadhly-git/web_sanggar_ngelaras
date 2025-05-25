import { GuestNavigationMenu } from '@/components/guest/guest-nav-menu';
import { ScrollBar } from '@/components/ui/scroll-area';
import { useScrollAreaScroll } from '@/hooks/use-scroll-direction';
import { Head, Link } from '@inertiajs/react';
import * as ScrollArea from '@radix-ui/react-scroll-area';
import React from 'react';
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa';

interface GuestLayoutProps {
    children: React.ReactNode;
    titles?: string;
    description: string;
    keywords?: string;
    image?: string;
    imageAlt?: string;
}

export const GuestLayout: React.FC<GuestLayoutProps> = ({ children, titles, description }) => {
    const { scrolled, scrollAreaRef } = useScrollAreaScroll();
    return (
        <>
            <Head title={titles}>
                <meta name="description" content={description} />
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <div className="h-full min-h-screen">
                <ScrollArea.Root className="h-screen w-full overflow-hidden">
                    <ScrollArea.Viewport ref={scrollAreaRef} style={{ height: '100%', maxHeight: '100%', overflowY: 'auto' }} className="w-full">
                        <div className="flex h-full min-h-screen flex-col items-center justify-center">
                            <header className="mx-auto w-screen shadow">
                                <GuestNavigationMenu scrolled={scrolled} />
                            </header>
                            <main className="w-full flex-grow p-4">{children}</main>
                            <footer className="mt-4 w-full max-w-7xl items-center justify-center shadow">
                                <Footer7 />
                            </footer>
                        </div>
                    </ScrollArea.Viewport>
                    <ScrollBar className="z-100" />
                </ScrollArea.Root>
            </div>
        </>
    );
};

interface Footer7Props {
    logo?: {
        url: string;
        src: string;
        alt: string;
        title: string;
    };
}
const Footer7 = ({
    logo = {
        url: '#',
        src: 'https://absensi.ngelaras.my.id/img/logo.png',
        alt: 'logo',
        title: 'Ngesti Laras Budaya',
    },
}: Footer7Props) => {
    return (
        <section className="mx-auto flex w-full items-center justify-center py-4 pt-16">
            <div className="container mx-auto px-4 lg:px-0">
                <div className="flex max-w-7xl flex-col items-center justify-between gap-10 text-center lg:flex-row lg:items-start lg:text-left">
                    <div className="flex w-full flex-col items-center justify-between gap-6 lg:items-start">
                        {/* Logo */}
                        <div className="flex items-center gap-2 lg:justify-start">
                            <Link href="/">
                                <img src={logo.src} alt={logo.alt} title={logo.title} className="h-8" />
                            </Link>
                            <h2 className="text-xl font-semibold">{logo.title}</h2>
                        </div>
                        <p className="text-muted-foreground text-justify text-sm lg:text-center">
                            A collection of 100+ responsive HTML templates for your startup business or side project.
                        </p>
                        <ul className="text-muted-foreground flex items-center space-x-6">
                            <li className="hover:text-primary font-medium">
                                <Link href="#">
                                    <FaInstagram className="size-6" />
                                </Link>
                            </li>
                            <li className="hover:text-primary font-medium">
                                <Link href="#">
                                    <FaFacebook className="size-6" />
                                </Link>
                            </li>
                            <li className="hover:text-primary font-medium">
                                <Link href="#">
                                    <FaTwitter className="size-6" />
                                </Link>
                            </li>
                            <li className="hover:text-primary font-medium">
                                <Link href="#">
                                    <FaLinkedin className="size-6" />
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="grid w-full grid-cols-3 gap-6 lg:gap-20">
                        <div className="flex flex-col gap-4 text-start">
                            <Link href="#">
                                <h3 className="font-bold">Beranda</h3>
                            </Link>
                            <Link href="#">
                                <h3 className="font-bold">Tentang Kami</h3>
                            </Link>
                        </div>
                        <div className="flex flex-col gap-4">
                            <Link href="#">
                                <h3 className="font-bold">Galeri</h3>
                            </Link>
                            <Link href="#">
                                <h3 className="font-bold">Artikel</h3>
                            </Link>
                        </div>
                        <div className="flex flex-col gap-4">
                            <Link href="#">
                                <h3 className="font-bold">Kontak Kami</h3>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="text-muted-foreground mt-8 flex flex-col justify-between gap-4 border-t pt-8 text-center text-sm font-medium lg:flex-row lg:items-center lg:text-left">
                    <p>&copy; {new Date().getFullYear()} Ngesti Laras Budaya. All rights reserved.</p>
                </div>
            </div>
        </section>
    );
};

export { Footer7 };
