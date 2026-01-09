'use client'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Badge } from '@/components/ui/badge'
import { TIMELINE_DATA } from '@/data/experience'
import { Briefcase, Zap, Trophy } from 'lucide-react'
import { useRef } from 'react'
import React from 'react'
import ShimmerText from '@/components/ui/shimmer-text'
import PassionsSection from '@/components/features/PassionsSection'
import StackSection from '@/components/features/StackSection'
import GlitchText from '@/components/ui/glitch-text'
import TextRevealByWord from '@/components/ui/text-reveal-by-word'
import { useTranslations } from 'next-intl'
import { cn } from "@/lib/utils"



export default function AboutPage() {
    const t = useTranslations('About')
    const containerRef = useRef<HTMLDivElement>(null)
    const timelineRef = useRef<HTMLDivElement>(null)

    // Data prep for Freelance Branch logic
    const timeline = TIMELINE_DATA
    const bobyIndex = timeline.findIndex(item => item.work.company === 'Boby')


    return (
        <div ref={containerRef} className="relative min-h-screen bg-black text-white selection:bg-primary/30">
            {/* Scroll Progress Bar (Removed or fixed if needed, here removing broken scaleX) */}


            <div className="container mx-auto px-6 py-32 md:py-48 relative z-10">
                {/* HEADER - REVEAL ANIMATION */}
                <div className="mb-32">
                    <div className="text-center overflow-hidden">
                        <motion.h1
                            initial={{ y: "100%" }}
                            animate={{ y: 0 }}
                            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                            className="text-6xl md:text-9xl font-black uppercase tracking-tighter mb-8 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/50 inline-block"
                        >
                            {t('title')}
                        </motion.h1>
                    </div>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="max-w-2xl mx-auto"
                    >
                        <p className="text-2xl md:text-3xl font-light text-muted-foreground mb-4 leading-relaxed">
                            {t.rich('subtitle', {
                                role: (chunks) => <span className="text-purple-400 font-medium">{chunks}</span>,
                                newLine: (chunks) => <><br />{chunks}</>
                            })}
                        </p>
                    </motion.div>
                </div>

                {/* TIMELINE SECTION */}
                <div className="mb-40" ref={timelineRef}>
                    <div className="text-center mb-16 flex flex-col items-center">
                        <h2 className="text-4xl md:text-5xl font-black uppercase mb-6 flex items-center justify-center gap-3">
                            <Briefcase className="text-primary w-8 h-8 md:w-12 md:h-12" />
                            <GlitchText text={t('experience')} />
                        </h2>
                        <TextRevealByWord
                            text={t('xp_desc')}
                            className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto"
                        />
                    </div>

                    <div className="relative max-w-5xl mx-auto">


                        {timeline.map((item, index) => (
                            <SpotlightCard key={index} className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-8 md:gap-24 items-center mb-16 md:mb-24 last:mb-0 group rounded-3xl p-6 md:p-0 bg-white/[0.02] md:bg-transparent border border-white/5 md:border-none">

                                {/* LEFT COLUMN: Work Experience */}
                                <motion.div
                                    initial={{ opacity: 0, x: -50 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true, margin: "-100px" }}
                                    transition={{ duration: 0.6, delay: index * 0.1 }}
                                    className="md:text-right relative z-20"
                                >
                                    <div className="flex flex-col md:flex-row-reverse md:items-baseline gap-2 mb-2 justify-end">
                                        <h3 className="text-2xl font-bold text-white group-hover:text-purple-400 transition-colors duration-300">{item.work.role}</h3>
                                        <span className="text-sm font-mono text-neutral-400 whitespace-nowrap">@ {item.work.company}</span>
                                    </div>
                                    <p className="text-neutral-300 leading-relaxed mb-4 ml-auto max-w-lg">
                                        {item.work.desc}
                                    </p>
                                    <motion.div
                                        initial="hidden"
                                        whileInView="visible"
                                        viewport={{ once: true }}
                                        variants={{
                                            visible: { transition: { staggerChildren: 0.05 } }
                                        }}
                                        className="flex flex-wrap gap-2 justify-start md:justify-end"
                                    >
                                        {item.work.stack.map((skill: string) => (
                                            <motion.div key={skill} variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}>
                                                <Badge variant="outline" className="text-xs bg-white/10 text-neutral-200 border-white/20 hover:bg-white/20 transition-colors">
                                                    {skill}
                                                </Badge>
                                            </motion.div>
                                        ))}
                                    </motion.div>
                                </motion.div>

                                {/* CENTER: Timeline Point */}
                                <div className="hidden md:flex flex-col items-center justify-center relative z-20 h-full">

                                    {/* --- DYNAMIC LINES (Split Segment Logic) --- */}

                                    {/* UPPER SEGMENT (From Top/Arrow to Center) */}
                                    <div
                                        className={cn(
                                            "absolute left-1/2 -translate-x-1/2 z-0",
                                            index <= bobyIndex
                                                ? "w-[3px] border-x border-purple-500/60 bg-purple-500/20 shadow-[0_0_15px_rgba(168,85,247,0.4)]"
                                                : "w-px bg-white/10"
                                        )}
                                        style={{
                                            top: index === 0 ? 'calc(50% - 24rem)' : '-3rem', // -24rem from Center for Arrow, -3rem for Gap overlap
                                            bottom: '50%'
                                        }}
                                    />

                                    {/* LOWER SEGMENT (From Center to Bottom) */}
                                    <div
                                        className={cn(
                                            "absolute left-1/2 -translate-x-1/2 z-0",
                                            index < bobyIndex
                                                ? "w-[3px] border-x border-purple-500/60 bg-purple-500/20 shadow-[0_0_15px_rgba(168,85,247,0.4)]"
                                                : "w-px bg-white/10" // Boby and older get Gray down-line
                                        )}
                                        style={{
                                            top: '50%',
                                            bottom: index === timeline.length - 1 ? '50%' : '-3rem'
                                        }}
                                    />

                                    {/* ARROW HEAD (Index 0 Only) */}
                                    {index === 0 && (
                                        <div className="absolute left-1/2 -translate-x-1/2 z-50" style={{ bottom: 'calc(50% + 24rem)' }}>
                                            <div className="w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-b-[10px] border-b-purple-500 drop-shadow-[0_0_8px_rgba(168,85,247,1)]" />
                                        </div>
                                    )}

                                    {/* NODE RENDERING: Special Freelance Icon or Standard Dot */}
                                    {index === bobyIndex ? (
                                        <div className="relative flex items-center justify-center group/node z-40 w-8 h-8">
                                            {/* Glowing Pulse Halo */}
                                            <div className="absolute inset-0 bg-purple-500/50 rounded-full blur-md animate-pulse" />

                                            {/* LEFT WING: Start Year (Absolute) */}
                                            <div className="absolute right-[calc(100%-10px)] bg-neutral-900 border border-purple-500/30 px-3 py-1 rounded-l-full border-r-0 text-[10px] font-mono font-bold text-purple-200 z-10 pr-4 whitespace-nowrap">
                                                {item.year.split(' - ')[0]}
                                            </div>

                                            {/* CENTER: Zap Icon Orb */}
                                            <div className="w-8 h-8 flex items-center justify-center bg-purple-900 rounded-full border border-purple-400/50 relative shadow-[0_0_15px_rgba(168,85,247,0.5)] transition-transform duration-300 group-hover/node:scale-110 z-30">
                                                <Zap size={14} className="text-purple-300 fill-purple-300" />
                                            </div>

                                            {/* RIGHT WING: End Year (Absolute) */}
                                            <div className="absolute left-[calc(100%-10px)] bg-neutral-900 border border-purple-500/30 px-3 py-1 rounded-r-full border-l-0 text-[10px] font-mono font-bold text-purple-200 z-10 pl-4 whitespace-nowrap">
                                                {item.year.split(' - ')[1]}
                                            </div>

                                            {/* Tooltip Label */}
                                            <div className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-neutral-900/90 text-purple-300 text-[10px] font-bold uppercase tracking-wider rounded-lg border border-purple-500/30 whitespace-nowrap opacity-0 group-hover/node:opacity-100 transition-all duration-300 pointer-events-none translate-y-2 group-hover/node:translate-y-0 shadow-lg backdrop-blur-sm z-30 origin-bottom">
                                                Start Freelance 🚀
                                                <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-neutral-900/90" />
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="flex items-center justify-center relative z-20 group/node w-6 h-6">
                                            {/* LEFT WING: Start Year (Absolute) */}
                                            <div className="absolute right-[calc(100%-10px)] bg-neutral-900 border border-white/10 px-3 py-1 rounded-l-full border-r-0 text-[10px] font-mono text-neutral-400 z-10 pr-4 whitespace-nowrap group-hover/node:border-primary/50 group-hover/node:text-white transition-colors">
                                                {item.year.split(' - ')[0]}
                                            </div>

                                            {/* CENTER: Standard Dot */}
                                            <motion.div
                                                initial={{ scale: 0 }}
                                                whileInView={{ scale: 1 }}
                                                viewport={{ once: true }}
                                                transition={{ type: "spring", stiffness: 300, damping: 20, delay: index * 0.1 }}
                                                className="w-6 h-6 rounded-full bg-neutral-900 border-2 border-white/20 group-hover/node:border-primary group-hover/node:scale-125 transition-all duration-300 z-30 shadow-[0_0_10px_rgba(255,255,255,0.1)] relative"
                                            />

                                            {/* RIGHT WING: End Year (Absolute) */}
                                            <div className="absolute left-[calc(100%-10px)] bg-neutral-900 border border-white/10 px-3 py-1 rounded-r-full border-l-0 text-[10px] font-mono text-neutral-400 z-10 pl-4 whitespace-nowrap group-hover/node:border-primary/50 group-hover/node:text-white transition-colors">
                                                {item.year.split(' - ')[1]}
                                            </div>
                                        </div>
                                    )}

                                </div>

                                {/* RIGHT COLUMN: Education */}
                                <motion.div
                                    initial={{ opacity: 0, x: 50 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true, margin: "-100px" }}
                                    transition={{ duration: 0.6, delay: index * 0.1 + 0.1 }}
                                    className="relative pl-8 md:pl-0 border-l md:border-l-0 border-white/10 md:border-none z-20"
                                >
                                    {/* Mobile Timeline Dot & Arrow */}
                                    <div className="md:hidden absolute -left-[5px] top-6 flex flex-col items-center overflow-visible">
                                        {index === 0 && (
                                            <div className="absolute bottom-4 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[8px] border-b-purple-500 drop-shadow-[0_0_8px_rgba(168,85,247,1)]" />
                                        )}
                                        <div className={cn(
                                            "w-2.5 h-2.5 rounded-full transition-colors",
                                            index <= bobyIndex ? "bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.5)]" : "bg-neutral-800 group-hover:bg-primary"
                                        )} />
                                    </div>

                                    <div className="flex flex-col gap-1 mb-2">
                                        <h3 className="text-xl font-bold text-white group-hover:text-purple-400 transition-colors">{item.school.name}</h3>
                                        <span className="text-sm font-mono text-purple-300">{item.school.degree}</span>
                                    </div>
                                    <p className="text-neutral-300 text-sm leading-relaxed mb-3 opacity-90 max-w-lg">
                                        {item.school.desc}
                                    </p>
                                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-white/10 text-[10px] font-bold uppercase tracking-wider text-white border border-white/10">
                                        {item.school.status}
                                    </div>
                                </motion.div>
                            </SpotlightCard>
                        ))}
                    </div>
                </div>

                {/* SKILLS SECTION (Only Tech Stack as standalone) */}
                <div className="mt-32">
                    <StackSection />
                </div>

                {/* FREELANCE SECTION */}
                <div className="mb-40 mt-32 border-y border-white/10 py-24 bg-white/[0.02]">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div className="pl-4 lg:pl-0">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 text-green-500 text-xs font-bold uppercase tracking-widest mb-8 animate-pulse border border-green-500/20">
                                <span className="w-2 h-2 rounded-full bg-green-500" /> Open to Work
                            </div>
                            <h2 className="text-4xl md:text-5xl font-black uppercase mb-8 leading-tight">
                                {t('freelance_title')}
                            </h2>
                            <p className="text-lg text-neutral-300 leading-relaxed mb-10 max-w-lg">
                                {t('freelance_desc')}
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12">
                                {[
                                    { title: "Fullstack Dev", desc: "React, Next.js, Node.js" },
                                    { title: "App. Mobile", desc: "React Native, Expo" },
                                    { title: "IoT & Embarqué", desc: "C++, Python, Arduino" },
                                    { title: "Tech Consulting", desc: "Audit & Architecture" }
                                ].map((service, i) => (
                                    <div key={i} className="flex flex-col group">
                                        <h4 className="font-bold text-white flex items-center gap-3 text-lg mb-2 group-hover:text-primary transition-colors">
                                            <Zap size={18} className="text-yellow-500" />
                                            <ShimmerText text={service.title} />
                                        </h4>
                                        <p className="text-sm text-neutral-400 pl-8 leading-relaxed">{service.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* 6B - Border Flow Card */}
                        <div className="relative group overflow-hidden rounded-[2rem]">
                            {/* Rotating Border Background */}
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary to-purple-600 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500" />
                            <div className="absolute -inset-[100%] bg-[conic-gradient(from_0deg_at_50%_50%,transparent_0deg,transparent_180deg,#a855f7_270deg,transparent_360deg)] animate-border-spin opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                            <div className="relative h-full min-h-[400px] rounded-[1.9rem] bg-black border border-white/10 p-10 flex items-center justify-center overflow-hidden m-[1px]">
                                <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20" />
                                <div className="absolute inset-0 bg-gradient-to-br from-neutral-900/50 to-black pointer-events-none" />

                                <div className="relative z-10 text-center">
                                    <h3 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-400">{t('freelance_cta_title')}</h3>
                                    <p className="text-neutral-400 mb-10 max-w-xs mx-auto text-lg">{t('freelance_cta_desc')}</p>

                                    {/* 5A - Swipe Fill Button */}
                                    <Link href="/contact" className="relative inline-flex items-center justify-center px-10 py-4 overflow-hidden font-black text-white uppercase transition-colors duration-300 bg-neutral-900 rounded-full group/btn hover:text-black border border-white/20">
                                        <span className="absolute inset-0 w-full h-full bg-white -translate-x-full transition-transform duration-300 ease-out group-hover/btn:translate-x-0"></span>
                                        <span className="relative flex items-center gap-2">
                                            {t('freelance_cta_button')} <Zap size={18} className="transition-transform group-hover/btn:translate-x-1" />
                                        </span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* PASSIONS */}
                <div className="mt-40 mb-20">
                    <h3 className="text-2xl font-black uppercase mb-12 flex items-center gap-3 justify-center md:justify-start">
                        <Trophy className="text-yellow-500" /> {t('passions')}
                    </h3>
                    <PassionsSection />
                </div>

            </div>
        </div>
    )
}

function SpotlightCard({ children, className = "" }: { children: React.ReactNode, className?: string }) {
    const divRef = useRef<HTMLDivElement>(null);
    const [position, setPosition] = React.useState({ x: 0, y: 0 });
    const [opacity, setOpacity] = React.useState(0);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!divRef.current) return;
        const div = divRef.current;
        const rect = div.getBoundingClientRect();
        setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    };

    const handleMouseEnter = () => {
        setOpacity(1);
    };

    const handleMouseLeave = () => {
        setOpacity(0);
    };

    return (
        <div
            ref={divRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className={`relative ${className}`}
        >
            {/* Clipping Container for Glow - Ensures rounded corners for glow but allows content overflow */}
            <div className="absolute inset-0 overflow-hidden rounded-[inherit] pointer-events-none z-0">
                <div
                    className="absolute -inset-px opacity-0 transition-opacity duration-300"
                    style={{
                        opacity,
                        background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(255,255,255,0.06), transparent 40%)`
                    }}
                />
            </div>

            {/* Direct Children for Grid Layout - Content must be direct descendant of grid container */}
            {children}
        </div>
    );
}
