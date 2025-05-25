// Hero7.tsx
import { Button } from "@/components/ui/button";
import { Link } from "@inertiajs/react";
import { SwipeCarouselBackground } from "./SwipeCarouselBackground";

interface Hero7Props {
  heading?: string;
  description?: string;
  button?: {
    text: string;
    url: string;
  };
}

const Hero7 = ({
  heading = "Pelestari Seni Tari Tradisional Nusantara",
  description = "Menjaga Budaya Leluhur Melalui Gerak dan Irama",
  button = {
    text: "Bergabung Sekarang",
    url: "/",
  },
}: Hero7Props) => {
  return (
    <section className="relative h-96 w-full overflow-hidden rounded-2xl lg:h-[600px]">
      {/* Background Carousel */}
      <div className="absolute inset-0 z-0">
        <SwipeCarouselBackground />
      </div>

      {/* Overlay untuk kontras teks */}
      <div className="absolute inset-0 z-10 bg-black/50" />

      {/* Konten Utama */}
      <div className="relative z-20 flex h-full w-full items-center justify-center px-4 text-center">
        <div className="mx-auto max-w-screen-lg space-y-4">
          <h1 className="text-2xl font-extrabold text-white sm:text-3xl md:text-4xl lg:text-5xl shadow shadow-black/50 rounded">
            {heading}
          </h1>
          <p className="text-balance text-white text-sm sm:text-base md:text-lg shadow shadow-black/50 rounded">
            {description}
          </p>
          <Button asChild size="lg" className="mt-4">
            <Link href={button.url}>{button.text}</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export { Hero7 };
