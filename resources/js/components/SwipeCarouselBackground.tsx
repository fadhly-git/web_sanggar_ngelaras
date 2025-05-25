// SwipeCarouselBackground.tsx
import { motion, useMotionValue } from 'framer-motion';
import { useEffect, useState } from 'react';

const imgs = [
    'https://shadcnblocks.com/images/block/placeholder-dark-1.svg',
    'https://shadcnblocks.com/images/block/placeholder-dark-1.svg',
];

const AUTO_DELAY = 1000 * 6;

export const SwipeCarouselBackground = () => {
    const [imgIndex, setImgIndex] = useState(0);
    const dragX = useMotionValue(0);

    // Auto slide
    useEffect(() => {
        const intervalRef = setInterval(() => {
            const x = dragX.get();

            if (x === 0) {
                setImgIndex((pv) => {
                    if (pv === imgs.length - 1) {
                        return 0;
                    }
                    return pv + 1;
                });
            }
        }, AUTO_DELAY);

        return () => clearInterval(intervalRef);
    }, [dragX]);

    return (
        <div className="absolute inset-0 overflow-hidden">
            {imgs.map((src, idx) => (
                <motion.div
                    key={idx}
                    initial={{ opacity: 0 }}
                    animate={{
                        opacity: idx === imgIndex ? 1 : 0,
                    }}
                    transition={{
                        duration: 1,
                        ease: 'easeInOut',
                    }}
                    className="absolute inset-0 bg-cover bg-center transition-opacity"
                    style={{
                        backgroundImage: `url(${src})`,
                        zIndex: idx === imgIndex ? 10 : 0,
                        backgroundPositionX: 'center',
                        backgroundPositionY: 'center',
                        backgroundSize: 'cover',
                    }}
                />
            ))}
        </div>
    );
};
