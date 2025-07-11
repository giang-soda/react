import { useEffect, useState } from 'react';
import type { EmblaCarouselType } from 'embla-carousel';
import { Carousel, CarouselContent, CarouselItem } from '~/components/ui/carousel';
import Autoplay from "embla-carousel-autoplay"
import { Link } from 'react-router';

interface Banner {
  src: string;
  href?: string;
}

interface SlideShowProps {
  banners: Banner[]
}

export function SlideShow({ banners }: SlideShowProps) {
  const [api, setApi] = useState<EmblaCarouselType | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    if (!api) return;
    const onSelect = () => setSelectedIndex(api.selectedScrollSnap());
    api.on('select', onSelect);
    onSelect();
    return () => { api.off('select', onSelect); };
  }, [api]);

  return (
    <Carousel
      opts={{
        loop: true,
        align: 'center',
        slidesToScroll: 1,
      }}
      plugins={[
        Autoplay({
          delay: 5000,
        }),
      ]}
      setApi={(api) => setApi(api ?? null)}
    >
      <div className="relative w-full">
        <CarouselContent>
          {banners.map((banner, idx) => {
            return (
              <CarouselItem key={idx}>
                <Link to={banner.href || '#'} rel="noopener noreferrer">
                  <img src={banner.src} alt={`Banner ${idx + 1}`} className="w-full h-full object-cover cursor-pointer" />
                </Link>
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <div className="absolute w-full left-0 bottom-4 flex justify-center gap-2 z-10">
          {banners.map((_, idx) => (
            <button
              key={idx}
              className={`w-3 h-3 rounded-full border border-blue-400 transition-all duration-200 ${selectedIndex === idx ? 'bg-blue-500' : 'bg-white'}`}
              onClick={() => api && api.scrollTo && api.scrollTo(idx)}
              aria-label={`Next banner ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </Carousel>
  );
}
