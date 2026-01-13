'use client';

import { useScroll, useTransform, motion, Variants } from 'framer-motion';
import { useRef, useState } from 'react';
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

    const fadeInUp: Variants = {
        hidden: { opacity: 0, y: 40 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                ease: "easeOut"
            }
        }
    };

    const stagger: Variants = {
        visible: { transition: { staggerChildren: 0.1 } }
    };

    return (
        <div ref={container} className="bg-[#fcfbf9] text-[#1a1a1a] min-h-[200vh] font-serif overflow-hidden">
            {/* Section 1: Hero */}
            <section className="h-screen relative flex items-center justify-center overflow-hidden">
                <motion.div
                    style={{ y: ytext }}
                    initial="hidden"
                    animate="visible"
                    variants={stagger}
                    className="z-10 text-center mix-blend-difference text-white w-full px-4"
                >
                    <motion.p variants={fadeInUp} className="text-xs md:text-sm tracking-[0.3em] md:tracking-[0.5em] uppercase mb-4">{t('collection')}</motion.p>
                    <div className="overflow-hidden">
                        <motion.h1 variants={fadeInUp} className="text-[14vw] md:text-[12vw] leading-none font-thin italic break-words">
                            {t('elegance')}
                        </motion.h1>
                    </div>
                    <div className="overflow-hidden">
                        <motion.h1 variants={fadeInUp} className="text-[14vw] md:text-[12vw] leading-none font-black -mt-[2vw] break-words">
                            {t('redefined')}
                        </motion.h1>
                    </div>
                </motion.div>

                <motion.div style={{ y: yimage }} className="absolute inset-0">
                    <div className="relative w-full h-[120%] -top-[10%]">
                        <Image
                            src="/images/fashion-hero.png"
                            alt="Fashion Model"
                            fill
                            className="object-cover brightness-50"
                            priority
                        />
                    </div>
                </motion.div>
            </section>

            {/* Section 2: Editorial */}
            <section className="h-auto md:h-screen flex items-center justify-center p-6 md:p-20">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 max-w-7xl w-full items-center">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-10%" }}
                        variants={stagger}
                        className="space-y-8 md:space-y-12 order-2 md:order-1"
                    >
                        <motion.h2 variants={fadeInUp} className="text-4xl md:text-6xl font-thin italic">
                            {t('quote')}
                        </motion.h2>
                        <motion.p variants={fadeInUp} className="text-base md:text-xl font-sans text-neutral-500 leading-relaxed max-w-md">
                            {t('subquote')}
                        </motion.p>
                        <motion.button variants={fadeInUp} className="group flex items-center gap-4 text-base md:text-lg border-b border-black pb-2 hover:border-transparent transition-colors">
                            <span className="group-hover:translate-x-4 transition-transform duration-300">{t('discover')}</span>
                        </motion.button>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true, margin: "-10%" }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="relative h-[50vh] md:h-[80vh] w-full order-1 md:order-2"
                    >
                        <Image
                            src="/images/fashion-editorial.png"
                            alt="Collection"
                            fill
                            className="object-cover"
                        />
                    </motion.div>
                </div>
            </section>
            {/* Section 2.5: Infinite Marquee */}
            <div className="py-8 md:py-12 border-y border-black/5 overflow-hidden bg-neutral-100">
                <motion.div
                    animate={{ x: ["0%", "-50%"] }}
                    transition={{ repeat: Infinity, ease: "linear", duration: 20 }}
                    className="flex whitespace-nowrap text-5xl md:text-8xl font-thin italic text-neutral-300 pointer-events-none select-none"
                >
                    <span className="mx-4 md:mx-8">{t('elegance')}</span>
                    <span className="mx-4 md:mx-8">—</span>
                    <span className="mx-4 md:mx-8">{t('redefined')}</span>
                    <span className="mx-4 md:mx-8">—</span>
                    <span className="mx-4 md:mx-8">{t('collection')}</span>
                    <span className="mx-4 md:mx-8">—</span>
                    <span className="mx-4 md:mx-8">{t('elegance')}</span>
                    <span className="mx-4 md:mx-8">—</span>
                    <span className="mx-4 md:mx-8">{t('redefined')}</span>
                    <span className="mx-4 md:mx-8">—</span>
                    <span className="mx-4 md:mx-8">{t('collection')}</span>
                    <span className="mx-4 md:mx-8">—</span>
                </motion.div>
            </div>

            {/* Section 3: Alternating Lookbook */}
            <section className="py-20 md:py-32 px-4 md:px-12 bg-[#1a1a1a] text-[#fcfbf9]">
                <div className="max-w-[1920px] mx-auto space-y-32">
                    <motion.h3
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-6xl font-thin text-center mb-20"
                    >
                        {t('lookbook')}
                    </motion.h3>

                    {/* Look 01: Image Left, Text Right */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-10%" }}
                            transition={{ duration: 0.8 }}
                            className="relative aspect-[3/4] w-full md:w-3/4 mx-auto group order-1 md:order-1"
                        >
                            <Image src="/images/fashion-look-dawn.png" alt="Look 01" fill className="object-cover grayscale hover:grayscale-0 transition-all duration-700" />
                        </motion.div>
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-10%" }}
                            variants={stagger}
                            className="space-y-6 text-center md:text-left order-2 md:order-2"
                        >
                            <motion.span variants={fadeInUp} className="block text-xs tracking-widest uppercase opacity-60">01 / {t('look_dawn')}</motion.span>
                            <motion.h4 variants={fadeInUp} className="text-3xl md:text-5xl font-serif italic">{t('chapter1')}</motion.h4>
                            <motion.p variants={fadeInUp} className="text-neutral-400 max-w-md mx-auto md:mx-0 leading-relaxed">
                                {t('look_dawn')} embodies the softness of morning light. A study in delicate textures and ethereal forms.
                            </motion.p>
                            <motion.button variants={fadeInUp} className="text-sm tracking-widest border-b border-white/30 pb-2 hover:border-white transition-colors">
                                {t('discover')}
                            </motion.button>
                        </motion.div>
                    </div>

                    {/* Look 02: Text Left, Image Right */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-10%" }}
                            variants={stagger}
                            className="space-y-6 text-center md:text-right order-2 md:order-1"
                        >
                            <motion.span variants={fadeInUp} className="block text-xs tracking-widest uppercase opacity-60">02 / {t('look_dusk')}</motion.span>
                            <motion.h4 variants={fadeInUp} className="text-3xl md:text-5xl font-serif italic">{t('chapter2')}</motion.h4>
                            <motion.p variants={fadeInUp} className="text-neutral-400 max-w-md mx-auto md:ml-auto leading-relaxed">
                                {t('look_dusk')} captures the mystery of the evening. Bold silhouettes meeting the fading light.
                            </motion.p>
                            <motion.button variants={fadeInUp} className="text-sm tracking-widest border-b border-white/30 pb-2 hover:border-white transition-colors">
                                {t('discover')}
                            </motion.button>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-10%" }}
                            transition={{ duration: 0.8 }}
                            className="relative aspect-[3/4] w-full md:w-3/4 mx-auto group order-1 md:order-2"
                        >
                            <Image src="/images/fashion-look-dusk.png" alt="Look 02" fill className="object-cover grayscale hover:grayscale-0 transition-all duration-700" />
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Section 4: Manifesto & Magnetic CTA */}
            <section className="py-40 px-8 flex flex-col items-center justify-center text-center bg-[#fcfbf9]">
                <motion.h3
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-sm font-sans tracking-[0.4em] uppercase mb-8 text-neutral-400"
                >
                    {t('manifesto_title')}
                </motion.h3>
                <motion.p
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="text-3xl md:text-5xl font-thin italic max-w-4xl leading-snug mb-20 text-neutral-800"
                >
                    {t('manifesto_text')}
                </motion.p>
                <MagneticButton>
                    {t('magnetic_cta')}
                </MagneticButton>
            </section>

            {/* Footer */}
            <footer className="bg-neutral-900 text-white py-12 text-center text-xs tracking-[0.2em]">
                {t('footer_contact')} — PARIS / MILAN / TOKYO
            </footer>
        </div>
    )
}

function MagneticButton({ children }: { children: React.ReactNode }) {
    const ref = useRef<HTMLButtonElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouse = (e: React.MouseEvent<HTMLButtonElement>) => {
        const { clientX, clientY } = e;
        const { height, width, left, top } = ref.current!.getBoundingClientRect();
        const middleX = clientX - (left + width / 2);
        const middleY = clientY - (top + height / 2);
        setPosition({ x: middleX, y: middleY });
    };

    const reset = () => {
        setPosition({ x: 0, y: 0 });
    };

    const { x, y } = position;

    return (
        <motion.button
            ref={ref}
            onMouseMove={handleMouse}
            onMouseLeave={reset}
            animate={{ x, y }}
            transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
            className="px-12 py-6 rounded-full border border-neutral-900 text-neutral-900 uppercase tracking-widest text-sm hover:bg-neutral-900 hover:text-white transition-colors duration-300"
        >
            {children}
        </motion.button>
    )
}
