'use client';

import { useScroll, useTransform, motion } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

export default function FashionConcept() {
    const t = useTranslations('Lab.ui-showcase.fashion');
    const container = useRef(null);
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ['start start', 'end end']
    });

    const ytext = useTransform(scrollYProgress, [0, 1], [0, 200]);
    const yimage = useTransform(scrollYProgress, [0, 1], [0, -100]);

    return (
        <div ref={container} className="bg-[#fcfbf9] text-[#1a1a1a] min-h-[200vh] font-serif overflow-hidden">
            {/* Section 1: Hero */}
            <section className="h-screen relative flex items-center justify-center overflow-hidden">
                <motion.div style={{ y: ytext }} className="z-10 text-center mix-blend-difference text-white">
                    <p className="text-sm tracking-[0.5em] uppercase mb-4">Collection 2026</p>
                    <h1 className="text-[12vw] leading-none font-thin italic">
                        ELEGANCE
                    </h1>
                    <h1 className="text-[12vw] leading-none font-black -mt-[2vw]">
                        REDEFINED
                    </h1>
                </motion.div>

                <motion.div style={{ y: yimage }} className="absolute inset-0">
                    <div className="relative w-full h-[120%] -top-[10%]">
                        <Image
                            src="/images/fashion-placeholder.jpg" // Need a real image here or generate one? I'll use a placeholder logic or generate later.
                            alt="Fashion Model"
                            fill
                            className="object-cover brightness-50"
                        />
                        {/* Fallback until image exists */}
                        <div className="absolute inset-0 bg-neutral-800" />
                    </div>
                </motion.div>
            </section>

            {/* Section 2: Editorial */}
            <section className="h-screen flex items-center justify-center p-20">
                <div className="grid grid-cols-2 gap-20 max-w-7xl w-full items-center">
                    <div className="space-y-12">
                        <h2 className="text-6xl font-thin italic">
                            "La mode n'est pas quelque chose qui existe uniquement dans les vêtements."
                        </h2>
                        <p className="text-xl font-sans text-neutral-500 leading-relaxed max-w-md">
                            Style is a simple way of saying complicated things. It is about elegance, projection, and the absolute refusal of the mundane.
                        </p>
                        <button className="group flex items-center gap-4 text-lg border-b border-black pb-2 hover:border-transparent transition-colors">
                            <span className="group-hover:translate-x-4 transition-transform duration-300">DISCOVER THE SEASON</span>
                        </button>
                    </div>
                    <div className="relative h-[80vh] w-full">
                        <Image
                            src="/images/fashion-2.jpg"
                            alt="Collection"
                            fill
                            className="object-cover"
                        />
                        <div className="absolute inset-0 bg-neutral-200" />
                    </div>
                </div>
            </section>
        </div>
    )
}
