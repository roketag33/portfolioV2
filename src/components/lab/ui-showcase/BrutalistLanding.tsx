'use client';

import { motion, useScroll, useTransform, useVelocity, useSpring } from 'framer-motion';
import { useRef } from 'react';
import { useTranslations } from 'next-intl';

export default function BrutalistLanding() {
    const t = useTranslations('Lab.ui-showcase.agency');

    return (
        <div className="bg-yellow-400 min-h-screen text-black font-mono selection:bg-black selection:text-yellow-400 overflow-x-hidden">
            {/* Massive Header */}
            <header className="p-8 border-b-4 border-black flex justify-between items-center sticky top-0 bg-yellow-400 z-50">
                <h1 className="text-4xl font-black uppercase tracking-tighter">AGENCY®</h1>
                <nav className="hidden md:flex gap-8 text-xl font-bold uppercase">
                    <a href="#" className="hover:underline decoration-4 underline-offset-4">{t('menu.work')}</a>
                    <a href="#" className="hover:underline decoration-4 underline-offset-4">{t('menu.manifesto')}</a>
                    <a href="#" className="hover:underline decoration-4 underline-offset-4">{t('menu.contact')}</a>
                </nav>
                <div className="w-8 h-8 bg-black rounded-full" />
            </header>

            {/* Marquee Section */}
            <div className="border-b-4 border-black overflow-hidden py-12 bg-white">
                <motion.div
                    animate={{ x: ["0%", "-50%"] }}
                    transition={{ repeat: Infinity, ease: "linear", duration: 10 }}
                    className="flex whitespace-nowrap"
                >
                    <span className="text-9xl font-black mx-8">{t('marquee_break')}</span>
                    <span className="text-9xl font-black mx-8 stroke-text text-transparent" style={{ WebkitTextStroke: '4px black' }}>{t('marquee_build')}</span>
                    <span className="text-9xl font-black mx-8">{t('marquee_break')}</span>
                    <span className="text-9xl font-black mx-8 stroke-text text-transparent" style={{ WebkitTextStroke: '4px black' }}>{t('marquee_build')}</span>
                </motion.div>
            </div>

            {/* Grid Layout */}
            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-b-4 border-black">
                {/* Cell 1 */}
                <div className="aspect-square border-r-4 border-black p-8 flex flex-col justify-between hover:bg-black hover:text-white transition-colors group cursor-pointer relative overflow-hidden">
                    <h3 className="text-4xl font-bold uppercase relative z-10">Strategy</h3>
                    <p className="text-xl font-bold relative z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                        Defining the chaos before it defines you.
                    </p>
                    <Arrow className="absolute top-8 right-8 w-12 h-12 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>

                {/* Cell 2 */}
                <div className="aspect-square border-r-4 border-black p-8 flex flex-col justify-between hover:bg-black hover:text-white transition-colors group cursor-pointer relative overflow-hidden">
                    <h3 className="text-4xl font-bold uppercase relative z-10">Design</h3>
                    <p className="text-xl font-bold relative z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                        Making it pop, crackle, and snap.
                    </p>
                    <div className="absolute inset-0 bg-[url('/images/noise.png')] opacity-20" />
                </div>

                {/* Cell 3 */}
                <div className="aspect-square p-8 flex flex-col justify-between hover:bg-black hover:text-white transition-colors group cursor-pointer lg:border-r-0 border-r-4 border-black">
                    <h3 className="text-4xl font-bold uppercase relative z-10">Development</h3>
                    <p className="text-xl font-bold relative z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                        Code that compiles with your soul.
                    </p>
                </div>
            </section>

            {/* Footer */}
            <footer className="p-20 text-center bg-black text-white">
                <h2 className="text-[15vw] leading-none font-black uppercase hover:text-yellow-400 transition-colors cursor-pointer">
                    LET'S TALK
                </h2>
            </footer>
        </div>
    )
}

function Arrow({ className }: { className?: string }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M7 17L17 7M17 7H7M17 7V17" />
        </svg>
    )
}
