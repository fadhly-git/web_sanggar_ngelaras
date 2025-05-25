import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Carousel, CarouselApi, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import { useDataContext } from './data-context';

export interface ShowGalleryItem {
    id: number;
    item_title: string | null;
    img_path: string;
}

export interface ShowGalleryProps {
    id: number;
    title?: string;
    description?: string;
    items: ShowGalleryItem[];
}

const ShowGallery = () => {
    const { gallery } = useDataContext();

    return (
        <>
            {gallery.map((item, index) => (
                <div className="border-sidebar-border/70 dark:border-sidebar-border m-4 rounded-xl border">
                    <div className="p-4">
                        <Prev key={index} title={item.title} description={item.deskripsi} items={item.items} id={item.id} />
                    </div>
                </div>
            ))}
        </>
    );
};

export const Prev = ({ title, description, items, id }: ShowGalleryProps) => {
    const [carouselApi, setCarouselApi] = useState<CarouselApi>();
    const [canScrollPrev, setCanScrollPrev] = useState(false);
    const [canScrollNext, setCanScrollNext] = useState(false);
    const [currentSlide, setCurrentSlide] = useState(0);

    const handleRemove = (id: number) => {
        if (confirm('Apakah Anda yakin ingin menghapus galeri ini?')) {
            // TODO: implement remove logic here
            console.log('Remove gallery with id:', id);
        }
    };

    const handleEdit = (id: number) => {
        window.location.href = '/atmin/konten-manajemen/galeri/edit/' + id;
    };

    useEffect(() => {
        if (!carouselApi) {
            return;
        }
        const updateSelection = () => {
            setCanScrollPrev(carouselApi.canScrollPrev());
            setCanScrollNext(carouselApi.canScrollNext());
            setCurrentSlide(carouselApi.selectedScrollSnap());
        };
        updateSelection();
        carouselApi.on('select', updateSelection);
        return () => {
            carouselApi.off('select', updateSelection);
        };
    }, [carouselApi]);
    return (
        <section className="flex w-full items-center justify-center pt-12">
            <div className="container flex flex-col items-center gap-6">
                <div className="container max-w-5xl">
                    <div className="mb-8 flex flex-col items-start justify-between md:mb-14 md:flex-row md:items-end lg:mb-16">
                        <div className="flex w-full flex-col gap-4">
                            <h2 className="text-2xl font-medium capitalize md:text-2xl lg:text-3xl">{title}</h2>
                            <p className="text-muted-foreground max-w-lg text-justify text-wrap">{description}</p>
                        </div>
                        <div className="flex flex-row items-center gap-2 pt-2 md:flex-col md:gap-4 md:pt-0">
                            <div className="w-full">
                                <Button
                                    size={'sm'}
                                    variant="destructive"
                                    className="mx-auto mt-2 w-full md:mt-0"
                                    onClick={() => {
                                        handleRemove(id);
                                    }}
                                >
                                    Hapus
                                </Button>
                                <Button
                                    size={'sm'}
                                    onClick={() => {
                                        handleEdit(id);
                                    }}
                                    className="mx-auto mt-2 w-full md:mt-2"
                                >
                                    Edit
                                </Button>
                            </div>
                            <div className="hidden shrink-0 gap-2 md:flex">
                                <Button
                                    size="icon"
                                    variant="ghost"
                                    onClick={() => {
                                        carouselApi?.scrollPrev();
                                    }}
                                    disabled={!canScrollPrev}
                                    className="disabled:pointer-events-auto"
                                >
                                    <ArrowLeft className="size-5" />
                                </Button>
                                <Button
                                    size="icon"
                                    variant="ghost"
                                    onClick={() => {
                                        carouselApi?.scrollNext();
                                    }}
                                    disabled={!canScrollNext}
                                    className="disabled:pointer-events-auto"
                                >
                                    <ArrowRight className="size-5" />
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-full max-w-3xl">
                    <Carousel
                        setApi={setCarouselApi}
                        opts={{
                            breakpoints: {
                                '(max-width: 768px)': {
                                    dragFree: true,
                                },
                            },
                        }}
                    >
                        <CarouselContent className="ml-0 2xl:mr-[max(0rem,calc(50vw-700px))] 2xl:ml-[max(8rem,calc(50vw-700px))]">
                            {items.map((item) => (
                                <CarouselItem key={item.id} className="max-w-[320px] pl-[20px] lg:max-w-[360px]">
                                    <div className="group rounded-xl">
                                        <div className="group relative h-full min-h-[27rem] max-w-full overflow-hidden rounded-xl md:aspect-[5/4] lg:aspect-[16/9]">
                                            <img
                                                src={'/' + item.img_path}
                                                alt={item.item_title || ''}
                                                className="absolute h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
                                            />
                                            <div className="absolute inset-0 h-full bg-[linear-gradient(transparent_20%,var(--secondary)_100%)] mix-blend-multiply" />
                                            <div className="text-secondary-foreground absolute inset-x-0 bottom-0 flex flex-col items-start p-6 md:p-8">
                                                <div className="mb-2 pt-4 text-xl font-semibold md:mb-3 md:pt-4 lg:pt-4">{item.item_title || ''}</div>
                                            </div>
                                        </div>
                                    </div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                    </Carousel>
                    <div className="mt-8 flex justify-center gap-2">
                        {items.map((_, index) => (
                            <button
                                key={index}
                                className={`h-2 w-2 rounded-full transition-colors ${currentSlide === index ? 'bg-primary' : 'bg-primary/20'}`}
                                onClick={() => carouselApi?.scrollTo(index)}
                                aria-label={`Go to slide ${index + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export { ShowGallery };
