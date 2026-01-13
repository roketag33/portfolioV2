'use client';

import { motion, useScroll } from 'framer-motion';
import { useRef } from 'react';
import { useTranslations } from 'next-intl';

export default function BrutalistLanding() {
    const t = useTranslations('Lab.ui-showcase.agency');
    const containerRef = useRef(null);
    useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });



    // Animation Variants
    const fadeInUp = {
        hidden: { opacity: 0, y: 40 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
    };

    const stagger = {
        visible: { transition: { staggerChildren: 0.1 } }
    };

    return (
        <div ref={containerRef} className="bg-[#E6E6E6] min-h-screen font-mono text-black selection:bg-black selection:text-white pt-32">
            {/* Hero Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border-b-4 border-black">
                {/* Title Block */}
                <div className="lg:col-span-2 border-b-4 lg:border-b-0 md:border-r-4 border-black p-8 md:p-12 flex flex-col justify-between min-h-[40vh] md:min-h-[60vh] bg-white">
                    <div className="flex justify-between items-start">
                        <div className="w-8 h-8 bg-black rounded-full animate-pulse" />
                        <span className="font-bold tracking-tighter">EST. 2024</span>
                    </div>
                    <div>
                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black leading-[0.85] tracking-tighter mb-4">
                            DIGITAL<br />
                            <span className="outline-text text-transparent bg-clip-text bg-gradient-to-r from-black to-black" style={{ WebkitTextStroke: "2px black" }}>CHAOS</span><br />
                            AGENCY
                        </h1>
                        <p className="font-bold max-w-sm ml-auto text-right mt-8 text-sm md:text-base">
                            {t('hero_desc')}
                        </p>
                    </div>
                </div>

                {/* Service Grid 1 */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeInUp}
                    className="border-b-4 md:border-b-0 md:border-r-4 border-black p-8 flex flex-col justify-between hover:bg-black hover:text-white transition-colors duration-500 group min-h-[300px]"
                >
                    <Arrow className="w-12 h-12 rotate-45 group-hover:rotate-0 transition-transform duration-500" />
                    <div>
                        <h3 className="text-4xl font-bold uppercase relative z-10">{t('strategy.title')}</h3>
                        <p className="text-xl font-bold relative z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                            {t('strategy.desc')}
                        </p>
                    </div>
                </motion.div>

                {/* Service Grid 2 */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeInUp}
                    className="p-8 flex flex-col justify-between hover:bg-[#FF00FF] transition-colors duration-500 group min-h-[300px]"
                >
                    <div className="w-full h-32 bg-black/10 rounded-full group-hover:scale-110 transition-transform" />
                    <div>
                        <h3 className="text-4xl font-bold uppercase relative z-10">{t('design.title')}</h3>
                        <p className="text-xl font-bold relative z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                            {t('design.desc')}
                        </p>
                    </div>
                </motion.div>
            </div>

            {/* Marquee Section */}
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="py-20 md:py-32 overflow-hidden border-b-4 border-black relative bg-[#FFFF00]"
            >
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-50 mix-blend-overlay" />
                <div className="bg-black text-white py-4 -rotate-2 scale-110">
                    <Marquee text={t('marquee_capabilities.top')} direction="left" />
                </div>
                <div className="bg-white text-black py-4 rotate-1 scale-110 border-y-4 border-black">
                    <Marquee text={t('marquee_capabilities.bottom')} direction="right" />
                </div>
            </motion.div>

            {/* Capabilities */}
            <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="p-12 md:p-24 border-b-4 md:border-b-0 md:border-r-4 border-black bg-black text-white">
                    <h2 className="text-4xl md:text-6xl font-black mb-12 uppercase">{t('capabilities.title')}</h2>
                    <motion.ul
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={stagger}
                        className="space-y-4 font-bold text-xl md:text-2xl"
                    >
                        {[1, 2, 3, 4, 5].map((item) => (
                            <motion.li variants={fadeInUp} key={item} className="flex items-center gap-4 group cursor-pointer">
                                <span className="w-4 h-4 bg-white transition-all group-hover:w-12 group-hover:bg-[#FFFF00]" />
                                {t(`capabilities.c${item}`)}
                            </motion.li>
                        ))}
                    </motion.ul>
                </div>
                <div className="relative group overflow-hidden">
                    <div className="absolute inset-0 bg-[url('/images/agency-office.png')] bg-cover bg-center filter grayscale group-hover:grayscale-0 transition-all duration-700" />
                    <div className="absolute inset-0 bg-black/50 group-hover:bg-transparent transition-colors duration-700" />
                </div>
            </div>

            {/* Footer / CTA */}
            <footer className="bg-[#E6E6E6] p-12 md:p-24 text-center">
                <motion.h2
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeInUp}
                    className="text-[10vw] font-black leading-none mb-12 mix-blend-difference"
                >
                    LET&apos;S TALK
                </motion.h2>
                <motion.form
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    className="max-w-2xl mx-auto relative group"
                >
                    <div className="absolute -inset-4 bg-black opacity-0 group-hover:opacity-100 transition-opacity blur-lg" />
                    <input
                        type="email"
                        placeholder={t('contact_placeholder')}
                        className="relative z-10 w-full bg-transparent border-b-4 border-black text-4xl md:text-6xl p-4 font-bold placeholder:text-black/20 focus:outline-none focus:border-white focus:text-white group-hover:text-white group-hover:placeholder:text-white/50 transition-colors uppercase text-center"
                    />
                </motion.form>
            </footer>
        </div>
    )
}

function Marquee({ text, direction = "left" }: { text: string, direction?: "left" | "right" }) {
    return (
        <motion.div
            animate={{ x: direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"] }}
            transition={{ repeat: Infinity, ease: "linear", duration: 10 }}
            className="flex whitespace-nowrap"
        >
            {[...Array(10)].map((_, i) => (
                <span key={i} className="text-6xl font-black uppercase mx-8">
                    {text}
                </span>
            ))}
        </motion.div>
    );
}

function Arrow({ className }: { className?: string }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M7 17L17 7M17 7H7M17 7V17" />
        </svg>
    )
}
