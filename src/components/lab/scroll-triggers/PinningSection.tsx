'use client';

import { useScroll, useTransform, motion, MotionValue } from 'framer-motion';
import { useRef } from 'react';
import { useTranslations } from 'next-intl';

export default function PinningSection() {
    const t = useTranslations('Lab.scroll-triggers.pinning');
    const container = useRef(null);
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ['start start', 'end end']
    });

    return (
        <section ref={container} className="relative h-[300vh] bg-black">
            <div className="sticky top-0 h-screen flex items-center overflow-hidden">
                <div className="w-1/2 h-full flex items-center justify-center p-12 custom-border-r border-white/10">
                    <div className="space-y-6">
                        <h2 className="text-5xl font-bold bg-gradient-to-r from-teal-400 to-emerald-400 bg-clip-text text-transparent">
                            {t('title')}
                        </h2>
                        <p className="text-xl text-neutral-400 max-w-md">
                            {t('desc')}
                        </p>
                    </div>
                </div>
                <div className="w-1/2 h-full relative">
                    <div className="absolute inset-0 flex flex-col justify-center items-center gap-32 p-12">
                        <ScrollCard progress={scrollYProgress} range={[0, 0.3]} text={t('step1')} color="bg-teal-900/50" />
                        <ScrollCard progress={scrollYProgress} range={[0.3, 0.6]} text={t('step2')} color="bg-emerald-900/50" />
                        <ScrollCard progress={scrollYProgress} range={[0.6, 0.9]} text={t('step3')} color="bg-green-900/50" />
                    </div>
                </div>
            </div>
        </section>
    )
}

interface ScrollCardProps {
    text: string;
    color: string;
    progress: MotionValue<number>; // Now available
    range: [number, number];
}

function ScrollCard({ text, color, progress, range }: ScrollCardProps) {
    const opacity = useTransform(progress, [range[0], range[0] + 0.1, range[1] - 0.1, range[1]], [0, 1, 1, 0]);
    const y = useTransform(progress, [range[0], range[1]], [100, -100]);

    return (
        <motion.div
            style={{ opacity, y }}
            className={`w-full max-w-sm aspect-video ${color} rounded-2xl border border-white/10 flex items-center justify-center`}
        >
            <h3 className="text-2xl font-bold">{text}</h3>
        </motion.div>
    )
}
