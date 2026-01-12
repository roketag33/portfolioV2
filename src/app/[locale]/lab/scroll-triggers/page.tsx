'use client';

import { useTranslations } from 'next-intl';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { motion, useScroll, useSpring } from 'framer-motion';

import ParallaxImage from '@/components/lab/scroll-triggers/ParallaxImage';
import HorizontalScroll from '@/components/lab/scroll-triggers/HorizontalScroll';
import ZoomSection from '@/components/lab/scroll-triggers/ZoomSection';
import ScrollRevealText from '@/components/lab/scroll-triggers/ScrollRevealText';
import VelocityScroll from '@/components/lab/scroll-triggers/VelocityScroll';
import PinningSection from '@/components/lab/scroll-triggers/PinningSection';
import CardStack from '@/components/lab/scroll-triggers/CardStack';
import ColorChange from '@/components/lab/scroll-triggers/ColorChange';
import MaskReveal from '@/components/lab/scroll-triggers/MaskReveal';

export default function ScrollTriggersPage() {
    const t = useTranslations('Lab.scroll-triggers');
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    return (
        <main className="min-h-screen bg-neutral-950 text-white selection:bg-indigo-500/30">
            {/* Custom Scroll Progress Bar */}
            <motion.div
                className="fixed top-0 left-0 right-0 h-1 bg-indigo-500 origin-left z-50"
                style={{ scaleX }}
            />

            {/* Header */}
            <div className="fixed top-0 left-0 w-full p-6 z-40 flex justify-between items-center mix-blend-difference">
                <Link href="/lab" className="text-white/50 hover:text-white transition-colors flex items-center gap-2">
                    <ArrowLeft className="w-5 h-5" />
                    <span>{t('back')}</span>
                </Link>
                <h1 className="text-xl font-bold text-white hidden md:block">SCROLL TRIGGERS</h1>
            </div>

            {/* Intro Section */}
            <section className="h-screen flex items-center justify-center p-8 sticky top-0 z-0 bg-neutral-950">
                <div className="max-w-4xl space-y-8">
                    <motion.h1
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                        className="text-6xl md:text-9xl font-black tracking-tighter"
                    >
                        SCROLL
                        <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500">
                            TRIGGERS
                        </span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5, duration: 1 }}
                        className="text-xl text-neutral-400 max-w-lg"
                    >
                        {t('intro')}
                    </motion.p>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1, duration: 1 }}
                        className="animate-bounce pt-10"
                    >
                        ↓
                    </motion.div>
                </div>
            </section>

            {/* Velocity Scroll (New) */}
            <VelocityScroll />

            {/* Parallax Section */}
            <section className="relative z-10 bg-neutral-950 py-24 px-4 md:px-8">
                <div className="max-w-6xl mx-auto mb-24">
                    <h2 className="text-sm font-mono text-indigo-500 mb-8">01. PARALLAX</h2>
                    <ScrollRevealText text={t('parallaxDescription')} />
                </div>
                <div className="max-w-5xl mx-auto space-y-24">
                    <ParallaxImage src="/images/projects/galaxy-chaos.webp" alt="Galaxy" />
                    <div className="grid md:grid-cols-2 gap-8">
                        <ParallaxImage src="/images/projects/buttons.webp" alt="Buttons" />
                        <div className="pt-24">
                            <ParallaxImage src="/images/projects/perfect-circle.webp" alt="Circle" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Pinning Section (New) */}
            <PinningSection />

            {/* Horizontal Scroll Section */}
            <HorizontalScroll title={t('process')} />

            {/* Mask Reveal (New) */}
            <MaskReveal />

            {/* Zoom Section */}
            <ZoomSection />

            {/* Color Change (New) */}
            <ColorChange />

            {/* Card Stack (New) */}
            <CardStack />

            {/* Outro */}
            <section className="h-[50vh] flex items-center justify-center bg-black text-center z-10 relative">
                <div>
                    <h2 className="text-4xl font-bold mb-4">{t('outro')}</h2>
                    <Link href="/lab" className="text-indigo-500 hover:text-indigo-400 underline underline-offset-4">
                        {t('back')}
                    </Link>
                </div>
            </section>
        </main>
    );
}
