'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useTranslations } from 'next-intl';

export default function HorizontalScroll({ title }: { title: string }) {
    const t = useTranslations('Lab.scroll-triggers.horizontal');

    const cards = [
        { title: t('c1.title'), description: t('c1.desc'), color: "bg-teal-500" },
        { title: t('c2.title'), description: t('c2.desc'), color: "bg-indigo-500" },
        { title: t('c3.title'), description: t('c3.desc'), color: "bg-purple-500" },
        { title: t('c4.title'), description: t('c4.desc'), color: "bg-rose-500" },
        { title: t('c5.title'), description: t('c5.desc'), color: "bg-amber-500" },
    ];

    const targetRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
    });

    const x = useTransform(scrollYProgress, [0, 1], ["1%", "-95%"]);

    return (
        <section ref={targetRef} className="relative h-[300vh] bg-neutral-900/50">
            <div className="sticky top-0 flex h-screen items-center overflow-hidden">
                <div className="absolute top-12 left-12 z-10">
                    <h2 className="text-4xl md:text-6xl font-bold text-white mb-4">{title}</h2>
                    <p className="text-neutral-400">Scroll down to move right →</p>
                </div>

                <motion.div style={{ x }} className="flex gap-12 pl-[30vw]">
                    {cards.map((card, i) => (
                        <div
                            key={i}
                            className={`group relative h-[400px] w-[300px] md:h-[500px] md:w-[400px] overflow-hidden rounded-3xl ${card.color} p-8 flex flex-col justify-end transition-transform hover:-translate-y-2 duration-300`}
                        >
                            <div className="relative z-10">
                                <h3 className="text-3xl font-bold text-white mb-2">{card.title}</h3>
                                <p className="text-white/80 text-lg">{card.description}</p>
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
