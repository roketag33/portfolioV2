'use client';

import { useScroll, useTransform, motion } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

export default function MaskReveal() {
    const t = useTranslations('Lab.scroll-triggers.mask');
    const container = useRef(null);
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ["start end", "end end"]
    });

    // const clipPathSize = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
    // Using a circle mask that grows
    const maskSize = useTransform(scrollYProgress, [0, 0.8], [0, 1500]);

    return (
        <div ref={container} className="h-[200vh] relative bg-neutral-950">
            <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                    <h2 className="text-[10vw] font-black leading-none text-neutral-800">{t('hidden')}</h2>
                </div>

                <motion.div
                    className="absolute inset-0 z-10 flex items-center justify-center bg-white"
                    style={{
                        maskImage: "url('/images/mask.svg')", // Fallback or SVG shape
                        WebkitMaskImage: "radial-gradient(circle, black 50%, transparent 50%)", // CSS Mask
                        maskSize: maskSize, // Animate size? No, complex. use Scale.
                        WebkitMaskSize: maskSize,
                        maskRepeat: "no-repeat",
                        WebkitMaskRepeat: "no-repeat",
                        maskPosition: "center",
                        WebkitMaskPosition: "center"
                    }}
                >
                    <div className="relative w-full h-full bg-indigo-600 flex items-center justify-center">
                        <h2 className="text-[10vw] font-black leading-none text-white">{t('reveal')}</h2>
                        <Image
                            src="/images/projects/galaxy-chaos.webp"
                            alt="Reveal"
                            fill
                            className="object-cover opacity-50 mix-blend-overlay"
                        />
                    </div>
                </motion.div>
            </div>
        </div>
    )
}
