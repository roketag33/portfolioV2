'use client'

import { motion } from 'framer-motion'
import { Link } from '@/i18n/routingConfig'
import { useTranslations } from 'next-intl'
import { Calendar, Briefcase, Coffee, ArrowUpRight } from 'lucide-react'
import { useState } from 'react'
import { useGamification } from '@/context/GamificationContext'
import { useVisualEffects } from '@/context/VisualEffectsContext'
import { SKILLS } from '@/data/skills'
import TextReveal from '@/components/ui/text-reveal'
import TiltCard from '@/components/ui/tilt-card'
import { BorderBeam } from '@/components/ui/border-beam'

// --- Design System: Swiss Minimalist ---
// Principles: Grid based, High Contrast, Typography biased, geometric.

const BentoCard = ({ children, className, delay = 0 }: { children: React.ReactNode, className?: string, delay?: number }) => (
    <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }} // Exponential easing for "Swiss" feel
        className={`group relative overflow-hidden rounded-none bg-black border border-white/10 hover:border-white/20 transition-colors duration-500 ${className}`}
    >
        {children}
    </motion.div>
)

const MarqueeRow = ({ items, reverse = false }: { items: string[], reverse?: boolean }) => (
    <div className="relative flex overflow-hidden mask-linear-fade py-2">
        <motion.div
            className="flex gap-8 whitespace-nowrap"
            animate={{ x: reverse ? [-500, 0] : [0, -500] }}
            transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
        >
            {[...items, ...items, ...items].map((tech, i) => (
                <div key={i} className="text-sm font-mono text-neutral-300 uppercase tracking-widest hover:text-white transition-colors">
                    {tech}
                </div>
            ))}
        </motion.div>
    </div>
)



// ... (previous code)

const StackMarquee = ({ t }: { t: (key: string) => string }) => {
    // Map categories from SKILLS to the marquee rows
    // Row 1: Backend (Index 1)
    const stackBack = SKILLS[1]?.skills || []
    // Row 2: Frontend (Index 0)
    const stackFront = SKILLS[0]?.skills || []
    // Row 3: Tools/DevOps (Index 2)
    const stackTools = SKILLS[2]?.skills || []

    return (
        <div className="flex flex-col h-full p-8 justify-between">
            <div className="flex items-center gap-3 mb-6">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                <span className="text-xs text-neutral-400 font-mono uppercase tracking-[0.2em]">{t('tech')}</span>
            </div>

            <div className="flex flex-col justify-center flex-1 gap-6 opacity-80 group-hover:opacity-100 transition-opacity">
                <MarqueeRow items={stackBack} />
                <MarqueeRow items={stackFront} reverse />
                <MarqueeRow items={stackTools} />
            </div>
        </div>
    )
}

const MinimalMap = () => (
    <div className="h-full flex flex-col justify-between p-6 md:p-8 relative">
        {/* Abstract Dot Grid Map */}
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff1a_1px,transparent_1px)] [background-size:20px_20px] opacity-30 group-hover:opacity-50 transition-opacity duration-700" />

        <div className="relative z-10 flex justify-between items-start">
            <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center bg-black/50 overflow-hidden">
                <div className="w-full h-full bg-white/5 rounded-full flex items-center justify-center">
                    <div className="w-1.5 h-1.5 bg-white rounded-full animate-ping absolute" />
                    <div className="w-1.5 h-1.5 bg-white rounded-full relative" />
                </div>
            </div>
            <div className="text-xs font-mono text-neutral-500 uppercase tracking-widest px-2 py-1 border border-white/5 rounded">
                GMT+1
            </div>
        </div>

        <div className="relative z-10 pt-8">
            <h4 className="text-2xl md:text-3xl font-light tracking-tighter text-white">Bordeaux</h4>
            <div className="w-8 h-[1px] bg-white/20 my-3" />
            <p className="text-neutral-400 text-xs font-mono uppercase tracking-widest">France</p>
        </div>
    </div>
)

const StatusBlock = () => {
    const t = useTranslations('HomePage.Bento')
    return (
        <Link href="/contact" className="h-full flex items-center justify-between p-8 group cursor-pointer">
            <div className="flex items-center gap-6">
                <div className="relative flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <div className="absolute w-8 h-8 border border-emerald-500/20 rounded-full animate-[spin_4s_linear_infinite]" />
                </div>
                <BorderBeam size={100} duration={10} delay={0} colorFrom="#10b981" colorTo="#34d399" />

                <div className="relative z-10">
                    <div className="text-sm font-medium text-white tracking-wide group-hover:text-emerald-400 transition-colors">
                        <TextReveal text={t('available_status')} className="bg-transparent" />
                    </div>
                    <div className="text-xs text-neutral-400 font-mono uppercase tracking-widest mt-1">{t('open_to_work')}</div>
                </div>
            </div>
            <ArrowUpRight className="w-5 h-5 text-neutral-600 group-hover:text-emerald-400 transition-colors duration-500 transform group-hover:translate-x-1 group-hover:-translate-y-1" />
        </Link>
    )
}

const SwissStat = ({ label, value, icon: Icon }: { label: string, value: string, icon: React.ComponentType<{ className?: string }> }) => (
    <div className="h-full flex flex-col justify-between p-6 hover:bg-white/[0.02] transition-colors cursor-default">
        <div>
            <div className="flex items-baseline gap-1 overflow-hidden">
                <motion.span
                    initial={{ y: "100%" }}
                    whileInView={{ y: 0 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                    className="block text-4xl font-light tracking-tighter text-white group-hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.5)] transition-all duration-300"
                >
                    {value}
                </motion.span>
            </div>
            <div className="w-4 h-[1px] bg-white/20 my-3 group-hover:w-full transition-all duration-700 delay-100" />
            <div className="text-xs text-neutral-300 font-mono uppercase tracking-widest">{label}</div>
        </div>
        <Icon className="w-4 h-4 text-neutral-700 group-hover:text-white/50 transition-colors self-end" />
    </div>
)

const CleanCodeBlock = ({ t }: { t: (key: string) => string }) => {
    const { unlock } = useGamification()
    const { toggleDebug } = useVisualEffects()
    const [clicks, setClicks] = useState(0)

    const handleClick = () => {
        const newClicks = clicks + 1
        setClicks(newClicks)
        if (newClicks === 5) {
            unlock('DEBUG_MASTER')
            toggleDebug()
            setClicks(0)
        }
    }

    return (
        <TiltCard className="h-full">
            <div
                onClick={handleClick}
                className="h-full flex flex-col justify-center items-center text-center p-4 group hover:bg-white/[0.02] transition-colors cursor-pointer select-none"
            >
                <div className="relative w-8 h-8 mb-4">
                    {/* Abstract Code Lines - Self Correcting */}
                    <motion.div
                        className="absolute inset-0 flex flex-col justify-center gap-1.5"
                    >
                        <motion.div
                            className="h-0.5 bg-neutral-600 rounded-full"
                            animate={{ width: ["60%", "100%", "100%"], backgroundColor: ["#525252", "#ffffff", "#525252"] }}
                            transition={{ duration: 4, repeat: Infinity, repeatDelay: 1 }}
                        />
                        <motion.div
                            className="h-0.5 bg-neutral-600 rounded-full"
                            animate={{ width: ["40%", "70%", "70%"], backgroundColor: ["#525252", "#ffffff", "#525252"] }}
                            transition={{ duration: 4, repeat: Infinity, delay: 0.2, repeatDelay: 1 }}
                        />
                        <motion.div
                            className="h-0.5 bg-neutral-600 rounded-full"
                            animate={{ width: ["80%", "40%", "40%"], backgroundColor: ["#525252", "#ffffff", "#525252"] }}
                            transition={{ duration: 4, repeat: Infinity, delay: 0.4, repeatDelay: 1 }}
                        />
                    </motion.div>
                    {/* Scan Line */}
                    <motion.div
                        className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-white/10 to-transparent"
                        animate={{ y: [-10, 32] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    />
                </div>
                <div className="text-xs font-mono text-neutral-400 uppercase tracking-widest group-hover:text-white transition-colors">{t('clean_code')}</div>
            </div>
        </TiltCard>
    )
}

// --- Main Grid Component ---

export default function BentoGrid() {
    const t = useTranslations('HomePage.Bento')

    return (
        <div className="grid grid-cols-2 md:grid-cols-4 grid-rows-4 md:grid-rows-3 gap-3 h-auto min-h-[800px] md:h-[500px]">

            {/* 1. Large Stack Block (2x2) */}
            <BentoCard className="col-span-2 row-span-2 md:col-span-2 md:row-span-2">
                <StackMarquee t={t} />
            </BentoCard>

            {/* 2. Minimal Map (1x2) */}
            <BentoCard className="col-span-1 row-span-2" delay={0.1}>
                <MinimalMap />
            </BentoCard>

            {/* 3. Exp & Projects (Split Vertical 1x2) */}
            <div className="col-span-1 row-span-2 flex flex-col gap-3">
                <BentoCard className="flex-1" delay={0.2}>
                    <SwissStat label={t('years')} value="5+" icon={Calendar} />
                </BentoCard>
                <BentoCard className="flex-1" delay={0.3}>
                    <SwissStat label={t('projects')} value="15+" icon={Briefcase} />
                </BentoCard>
            </div>

            {/* 4. Status Bar (Wide 2x1) */}
            <BentoCard className="col-span-2 md:col-span-2 row-span-1" delay={0.4}>
                <StatusBlock />
            </BentoCard>

            {/* 5. Minimal Coffee (2x1 Split) */}
            <BentoCard className="col-span-1" delay={0.5}>
                <div className="h-full flex flex-col justify-between p-6 relative group hover:bg-white/[0.02] transition-colors">
                    <Coffee className="w-5 h-5 text-neutral-600 group-hover:text-white transition-colors" />
                    {/* Steam Animation */}
                    <motion.div
                        className="absolute top-4 left-7 w-px h-3 bg-white/50 blur-[1px]"
                        animate={{ opacity: [0, 1, 0], y: -5 }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    />
                    <div>
                        <div className="text-2xl font-light text-white">∞</div>
                        <div className="text-xs text-neutral-500 font-mono uppercase tracking-widest mt-1">{t('refills')}</div>
                    </div>
                </div>
            </BentoCard>

            <BentoCard className="col-span-1" delay={0.6}>
                <CleanCodeBlock t={t} />
            </BentoCard>

        </div>
    )
}
