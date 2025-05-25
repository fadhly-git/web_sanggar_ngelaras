import { ArrowRight } from 'lucide-react';

import { Card } from '@/components/ui/card';
import { Link } from '@inertiajs/react';

interface Post {
    id: string;
    title: string;
    summary: string;
    label: string;
    author: string;
    published: string;
    url: string;
    image: string;
    tags?: string[];
}

interface NewsBlogProps {
    heading?: string;
    description?: string;
    posts?: Post[];
}

const NewsBlog = ({
    heading = 'Berita Kegiatan',
    description = 'Discover the latest insights and tutorials about modern web development, UI design, and component-driven architecture.',
    posts = [
        {
            id: 'post-1',
            title: 'Building Modern UIs: A Deep Dive into Shadcn and React Components',
            summary:
                'Join us for an in-depth exploration of building modern user interfaces using shadcn/ui and React. Learn best practices and advanced techniques.',
            label: 'Web Design',
            author: 'Sarah Chen',
            published: '15 Feb 2024',
            url: 'https://shadcnblocks.com',
            image: 'https://shadcnblocks.com/images/block/placeholder-dark-1.svg',
            tags: ['Web Design', 'UI Development'],
        },
        {
            id: 'post-2',
            title: 'Mastering Tailwind CSS: From Basics to Advanced Techniques',
            summary:
                'Discover how to leverage the full power of Tailwind CSS to create beautiful, responsive websites with clean and maintainable code.',
            label: 'Web Design',
            author: 'Michael Park',
            published: '22 Feb 2024',
            url: 'https://shadcnblocks.com',
            image: 'https://shadcnblocks.com/images/block/placeholder-dark-1.svg',
            tags: ['Web Design', 'CSS'],
        },
    ],
}: NewsBlogProps) => {
    return (
        <section className="bg-background flex w-full items-center justify-center pt-16">
            <div className="container flex flex-col items-center gap-16 max-w-6xl">
                <div className="w-full">
                    <h2 className="mx-auto mb-6 text-3xl font-semibold text-pretty md:text-4xl lg:max-w-3xl text-center">{heading}</h2>
                    <p className="text-muted-foreground mx-auto max-w-3xl md:text-lg text-justify lg:text-center text-warp">{description}</p>
                </div>

                <div className="grid gap-y-10 sm:grid-cols-12 sm:gap-y-12 md:gap-y-16 lg:gap-y-20">
                    {posts.map((post) => (
                        <Card
                            key={post.id}
                            className="order-last border-0 bg-transparent shadow-none sm:order-first sm:col-span-12 lg:col-span-10 lg:col-start-2"
                        >
                            <div className="grid gap-y-6 sm:grid-cols-12 sm:gap-x-5 sm:gap-y-0 md:items-center md:gap-x-8 lg:gap-x-12">
                                <div className="sm:col-span-6">
                                    <div className="mb-4 md:mb-6">
                                        <div className="text-muted-foreground flex flex-wrap gap-3 text-xs tracking-wider uppercase md:gap-5 lg:gap-6">
                                            {post.tags?.map((tag) => <span key={tag}>{tag}</span>)}
                                        </div>
                                    </div>
                                    <h3 className="text-xl font-semibold md:text-2xl lg:text-3xl">
                                        <Link href={post.url} target="_blank" className="hover:underline">
                                            {post.title}
                                        </Link>
                                    </h3>
                                    <p className="text-muted-foreground mt-4 md:mt-5 text-justify text-wrap">{post.summary}</p>
                                    <div className="mt-6 flex items-center space-x-4 text-sm md:mt-8">
                                        <span className="text-muted-foreground">{post.author}</span>
                                        <span className="text-muted-foreground">•</span>
                                        <span className="text-muted-foreground">{post.published}</span>
                                    </div>
                                    <div className="mt-6 flex items-center space-x-2 md:mt-8">
                                        <Link
                                            href={post.url}
                                            target="_blank"
                                            className="inline-flex items-center font-semibold hover:underline md:text-base"
                                        >
                                            <span>Read more</span>
                                            <ArrowRight className="ml-2 size-4 transition-transform" />
                                        </Link>
                                    </div>
                                </div>
                                <div className="order-first sm:order-last sm:col-span-6">
                                    <Link href={post.url} target="_blank" className="block">
                                        <div className="border-border aspect-[16/9] overflow-clip rounded-lg border">
                                            <img
                                                src={post.image}
                                                alt={post.title}
                                                className="fade-in h-full w-full object-cover transition-opacity duration-200 hover:opacity-70"
                                            />
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
};

export { NewsBlog };
