import { Gallery4 } from '@/components/gallery4';
import { Banners } from '@/components/guest/banners';
import { ScrollArea } from '@/components/ui/scroll-area';
import { GuestLayout } from '@/layouts/guest-layout';

const data = [
    [
        {
            title: 'Ujian Tari Sanggar Tari Ngesti Laras Budaya Tahun 2024',
            description:
                'Discover how leading companies and developers are leveraging modern web technologies to build exceptional digital experiences. These case studies showcase real-world applications and success stories.',
            item: [
                {
                    id: 'shadcn-ui',
                    title: 'shadcn/ui: Building a Modern Component Library',
                    description:
                        'Explore how shadcn/ui revolutionized React component libraries by providing a unique approach to component distribution and customization, making it easier for developers to build beautiful, accessible applications.',
                    href: 'https://ui.shadcn.com',
                    image: 'https://images.unsplash.com/photo-1551250928-243dc937c49d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NDI3NzN8MHwxfGFsbHwxMjN8fHx8fHwyfHwxNzIzODA2OTM5fA&ixlib=rb-4.0.3&q=80&w=1080',
                },
                {
                    id: 'tailwind',
                    title: 'Tailwind CSS: The Utility-First Revolution',
                    description:
                        'Discover how Tailwind CSS transformed the way developers style their applications, offering a utility-first approach that speeds up development while maintaining complete design flexibility.',
                    href: 'https://tailwindcss.com',
                    image: 'https://images.unsplash.com/photo-1551250928-e4a05afaed1e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NDI3NzN8MHwxfGFsbHwxMjR8fHx8fHwyfHwxNzIzODA2OTM5fA&ixlib=rb-4.0.3&q=80&w=1080',
                },
                {
                    id: 'astro',
                    title: 'Astro: The All-in-One Web Framework',
                    description:
                        "Learn how Astro's innovative 'Islands Architecture' and zero-JS-by-default approach is helping developers build faster websites while maintaining rich interactivity where needed.",
                    href: 'https://astro.build',
                    image: 'https://images.unsplash.com/photo-1536735561749-fc87494598cb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NDI3NzN8MHwxfGFsbHwxNzd8fHx8fHwyfHwxNzIzNjM0NDc0fA&ixlib=rb-4.0.3&q=80&w=1080',
                },
                {
                    id: 'react',
                    title: 'React: Pioneering Component-Based UI',
                    description:
                        'See how React continues to shape modern web development with its component-based architecture, enabling developers to build complex user interfaces with reusable, maintainable code.',
                    href: 'https://react.dev',
                    image: 'https://images.unsplash.com/photo-1548324215-9133768e4094?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NDI3NzN8MHwxfGFsbHwxMzF8fHx8fHwyfHwxNzIzNDM1MzA1fA&ixlib=rb-4.0.3&q=80&w=1080',
                },
                {
                    id: 'nextjs',
                    title: 'Next.js: The React Framework for Production',
                    description:
                        'Explore how Next.js has become the go-to framework for building full-stack React applications, offering features like server components, file-based routing, and automatic optimization.',
                    href: 'https://nextjs.org',
                    image: 'https://images.unsplash.com/photo-1550070881-a5d71eda5800?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NDI3NzN8MHwxfGFsbHwxMjV8fHx8fHwyfHwxNzIzNDM1Mjk4fA&ixlib=rb-4.0.3&q=80&w=1080',
                },
            ],
        },

    ],
    [
        {
            title: 'Ujian Tari Sanggar Tari Ngesti Laras Budaya Tahun 2023',
            description:
                'Discover how leading companies and developers are leveraging modern web technologies to build exceptional digital experiences. These case studies showcase real-world applications and success stories.',
            item: [
                {
                    id: 'shadcn-ui',
                    title: 'shadcn/ui: Building a Modern Component Library',
                    description:
                        'Explore how shadcn/ui revolutionized React component libraries by providing a unique approach to component distribution and customization, making it easier for developers to build beautiful, accessible applications.',
                    href: 'https://ui.shadcn.com',
                    image: 'https://images.unsplash.com/photo-1551250928-243dc937c49d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NDI3NzN8MHwxfGFsbHwxMjN8fHx8fHwyfHwxNzIzODA2OTM5fA&ixlib=rb-4.0.3&q=80&w=1080',
                },
                {
                    id: 'tailwind',
                    title: 'Tailwind CSS: The Utility-First Revolution',
                    description:
                        'Discover how Tailwind CSS transformed the way developers style their applications, offering a utility-first approach that speeds up development while maintaining complete design flexibility.',
                    href: 'https://tailwindcss.com',
                    image: 'https://images.unsplash.com/photo-1551250928-e4a05afaed1e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NDI3NzN8MHwxfGFsbHwxMjR8fHx8fHwyfHwxNzIzODA2OTM5fA&ixlib=rb-4.0.3&q=80&w=1080',
                },
                {
                    id: 'astro',
                    title: 'Astro: The All-in-One Web Framework',
                    description:
                        "Learn how Astro's innovative 'Islands Architecture' and zero-JS-by-default approach is helping developers build faster websites while maintaining rich interactivity where needed.",
                    href: 'https://astro.build',
                    image: 'https://images.unsplash.com/photo-1536735561749-fc87494598cb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NDI3NzN8MHwxfGFsbHwxNzd8fHx8fHwyfHwxNzIzNjM0NDc0fA&ixlib=rb-4.0.3&q=80&w=1080',
                },
                {
                    id: 'react',
                    title: 'React: Pioneering Component-Based UI',
                    description:
                        'See how React continues to shape modern web development with its component-based architecture, enabling developers to build complex user interfaces with reusable, maintainable code.',
                    href: 'https://react.dev',
                    image: 'https://images.unsplash.com/photo-1548324215-9133768e4094?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NDI3NzN8MHwxfGFsbHwxMzF8fHx8fHwyfHwxNzIzNDM1MzA1fA&ixlib=rb-4.0.3&q=80&w=1080',
                },
                {
                    id: 'nextjs',
                    title: 'Next.js: The React Framework for Production',
                    description:
                        'Explore how Next.js has become the go-to framework for building full-stack React applications, offering features like server components, file-based routing, and automatic optimization.',
                    href: 'https://nextjs.org',
                    image: 'https://images.unsplash.com/photo-1550070881-a5d71eda5800?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NDI3NzN8MHwxfGFsbHwxMjV8fHx8fHwyfHwxNzIzNDM1Mjk4fA&ixlib=rb-4.0.3&q=80&w=1080',
                },
            ],
        },
    ]
];

const Gallery = () => {
    console.log('gallery', data.length);
    return (
        <>
            <ScrollArea className="h-[calc(100vh-4rem)] w-full">
                <GuestLayout titles="Galeri" description="Galeri kegiatan Sanggar Tari Ngesti Laras Budaya">
                    <Banners />
                    {data.map((group, index) => (
                        <Gallery4
                            key={index}
                            items={group.flatMap((section) => section.item.map((item) => ({
                                id: item.id,
                                title: item.title,
                                description: item.description,
                                href: item.href,
                                image: item.image,
                            })))}
                            title={group[0].title}
                        />
                    ))}
                </GuestLayout>
            </ScrollArea>
        </>
    );
};

export default Gallery;
