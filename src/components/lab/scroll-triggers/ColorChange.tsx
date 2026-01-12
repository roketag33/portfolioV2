'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { useTranslations } from 'next-intl';

export default function ColorChange() {
    const t = useTranslations('Lab.scroll-triggers.colorShift');
    const container = useRef(null);
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ["start end", "end start"]
    });

    const backgroundColor = useTransform(
        scrollYProgress,
        [0, 0.5, 1],
        ["#0a0a0a", "#4f46e5", "#0a0a0a"]
    );

    return (
        <motion.section
            ref={container}
            style={{ backgroundColor }}
            className="min-h-screen flex items-center justify-center relative py-24"
        >
            <div className="text-center mix-blend-difference text-white">
                <h2 className="text-6xl md:text-9xl font-black mb-8">{t('title')}</h2>
                <p className="text-xl max-w-2xl mx-auto">
                    {t('desc')}
                </p>
            </div>
        </motion.section>
    )
}
