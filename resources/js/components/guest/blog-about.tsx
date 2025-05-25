import { Icon } from '@/components/icon';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export const BlogAbout = () => {
    return (
        <section className="flex w-full items-center justify-center pt-16">
            <div className="container flex flex-col items-center gap-16">
                <div className="w-full max-w-5xl">
                    <h1 className="mb-5 text-center text-3xl font-bold text-balance lg:text-center lg:text-4xl">Tentang Kami</h1>
                    <p className="text-muted-foreground mb-4 text-justify text-lg text-wrap">
                        Selamat datang di blog kami! Di sini, kami berbagi informasi dan pengetahuan tentang seni tari tradisional Nusantara. Kami
                        percaya bahwa seni tari adalah bagian penting dari budaya kita yang harus dilestarikan.
                    </p>
                    <p className="text-muted-foreground mb-4 text-lg">
                        Kami berharap blog ini dapat menjadi sumber inspirasi dan pengetahuan bagi Anda semua. Terima kasih telah mengunjungi blog
                        kami!
                    </p>
                    <Button size={'sm'} className="mt-4 text-center">
                        Lihat selengkapnya <Icon iconNode={ArrowRight} />
                    </Button>
                </div>
            </div>
        </section>
    );
};
