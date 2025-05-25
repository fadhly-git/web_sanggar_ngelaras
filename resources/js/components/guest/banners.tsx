import { motion } from 'framer-motion';

export const Banners = () => {
    return (
        <section className="relative h-96 w-full overflow-hidden rounded-b-lg lg:h-[600px]">
            <div className="absolute inset-0 overflow-hidden">
                <motion.div className="absolute inset-0 bg-cover bg-center transition-opacity">
                    <motion.img
                        initial={{ opacity: 0 }}
                        animate={{
                            opacity: 1,
                        }}
                        exit={{ opacity: 0 }}
                        transition={{
                            duration: 1,
                            ease: 'easeInOut',
                        }}
                        src="https://shadcnblocks.com/images/block/placeholder-dark-1.svg"
                        alt="Banner"
                        className="absolute inset-0 h-full w-full object-cover transition-opacity"
                        style={{
                            backgroundPositionX: 'center',
                            backgroundPositionY: 'center',
                            backgroundSize: 'cover',
                        }}
                    />
                </motion.div>
            </div>
        </section>
    );
};
