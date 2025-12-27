'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { MapPin, Calendar, Briefcase, Database, Coffee, ArrowUpRight, CheckCircle2 } from 'lucide-react'

// --- Sub-Components ---

const BentoCard = ({ children, className, delay = 0 }: { children: React.ReactNode, className?: string, delay?: number }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay }}
        className={`group relative overflow-hidden rounded-3xl bg-secondary/50 backdrop-blur-md border border-foreground/10 hover:border-primary/50 hover:shadow-lg transition-all duration-300 ${className}`}
    >
        {children}
    </motion.div>
)

const MarqueeRow = ({ items, reverse = false }: { items: string[], reverse?: boolean }) => (
    <div className="relative flex overflow-hidden mask-linear-fade">
        <motion.div
            className="flex gap-4 whitespace-nowrap"
            animate={{ x: reverse ? [-500, 0] : [0, -500] }}
            transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
        >
            {[...items, ...items, ...items].map((tech, i) => (
                <div key={i} className="px-3 py-1.5 rounded-lg bg-background/50 border border-border/50 text-xs font-medium text-foreground/80 hover:bg-primary/10 hover:border-primary/30 transition-colors">
                    {tech}
                </div>
            ))}
        </motion.div>
    </div>
)

const StackMarquee = () => {
    const stackBack = ["Node.js", "PostgreSQL", "Docker", "AWS", "Redis", "GraphQL", "Python"]
    const stackFront = ["React", "Next.js", "TypeScript", "Tailwind", "React Native", "Framer Motion", "Three.js"]
    const stackTools = ["Git", "Linux", "Figma", "Kubernetes", "Vercel", "Jest", "CI/CD"]

    return (
        <div className="flex flex-col h-full p-6">
            <div className="flex justify-between items-start mb-6">
                <div className="p-2 rounded-xl bg-primary/10 text-primary">
                    <Database className="w-5 h-5" />
                </div>
                <span className="text-xs text-muted-foreground font-mono uppercase tracking-widest">Tech Stack</span>
            </div>

            <div className="flex flex-col justify-center flex-1 gap-4">
                <MarqueeRow items={stackBack} />
                <MarqueeRow items={stackFront} reverse />
                <MarqueeRow items={stackTools} />
            </div>
        </div>
    )
}

const LocationBlock = () => (
    <div className="h-full flex flex-col justify-between p-6 relative group">
        <motion.div
            className="absolute inset-0 opacity-40 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1000&auto=format&fit=crop')] bg-cover bg-center grayscale mix-blend-luminosity"
            animate={{ scale: [1, 1.5] }}
            transition={{ duration: 15, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />

        <div className="relative z-10 flex justify-between items-start">
            <div className="p-2 rounded-xl bg-primary/10 text-primary backdrop-blur-md">
                <MapPin className="w-5 h-5" />
            </div>
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-background/50 backdrop-blur-md border border-border/50 text-xs">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                GMT+1
            </div>
        </div>

        <div className="relative z-10">
            <h4 className="text-2xl font-bold text-foreground">Bordeaux</h4>
            <p className="text-muted-foreground text-sm">France</p>
        </div>
    </div>
)

const StatusBlock = () => (
    <div className="h-full flex items-center justify-between p-6 bg-gradient-to-br from-primary/5 to-transparent relative overflow-hidden">
        {/* Shimmer Effect */}
        <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent skew-x-12"
            animate={{ x: ['-100%', '200%'] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", repeatDelay: 1 }}
        />

        <div className="flex items-center gap-4 relative z-10">
            <div className="relative">
                <div className="w-3 h-3 rounded-full bg-emerald-500 animate-ping absolute inset-0 opacity-75" />
                <div className="w-3 h-3 rounded-full bg-emerald-500 relative" />
            </div>
            <div>
                <div className="text-sm font-bold text-emerald-500 uppercase tracking-wider">Available for Hire</div>
                <div className="text-xs text-muted-foreground">Open to new opportunities</div>
            </div>
        </div>
        <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors relative z-10" />
    </div>
)

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const StatItem = ({ label, value, icon: Icon, isElectric = false }: { label: string, value: string, icon: any, isElectric?: boolean }) => (
    <div className="h-full flex flex-col justify-between p-5 hover:bg-white/5 transition-colors group cursor-default">
        <div className="flex justify-between items-start">
            <div className="p-2 rounded-lg bg-primary/10 text-primary group-hover:scale-110 transition-transform duration-300">
                <Icon className="w-5 h-5" />
            </div>
            {isElectric && (
                <motion.div
                    animate={{ opacity: [0, 1, 0, 1, 0] }}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                >
                    <div className="text-yellow-400">⚡</div>
                </motion.div>
            )}
        </div>

        <div>
            <div className="flex items-baseline gap-1">
                <span className={`text-2xl font-bold tracking-tight ${isElectric ? 'text-transparent bg-clip-text bg-gradient-to-r from-foreground to-foreground/50' : 'text-foreground'}`}>
                    {value}
                </span>
            </div>
            <div className="text-xs text-muted-foreground uppercase tracking-wider font-medium mt-1">{label}</div>
        </div>
    </div>
)

// --- Main Grid Component ---

export default function BentoGrid() {
    return (
        <div className="grid grid-cols-2 md:grid-cols-4 grid-rows-4 md:grid-rows-3 gap-4 h-[600px] md:h-[500px]">

            {/* 1. Large Stack Block (2x2) */}
            <BentoCard className="col-span-2 row-span-2 md:col-span-2 md:row-span-2 bg-gradient-to-br from-card/30 to-card/10">
                <StackMarquee />
            </BentoCard>

            {/* 2. Location (1x2) */}
            <BentoCard className="col-span-1 row-span-2" delay={0.1}>
                <LocationBlock />
            </BentoCard>

            {/* 3. Exp & Projects (Split Vertical 1x2) */}
            <div className="col-span-1 row-span-2 flex flex-col gap-4">
                <BentoCard className="flex-1" delay={0.2}>
                    <StatItem label="Years Exp." value="5+" icon={Calendar} isElectric />
                </BentoCard>
                <BentoCard className="flex-1" delay={0.3}>
                    <StatItem label="Projects" value="15+" icon={Briefcase} isElectric />
                </BentoCard>
            </div>

            {/* 4. Status Bar (Wide 2x1) */}
            <BentoCard className="col-span-2 md:col-span-2 row-span-1" delay={0.4}>
                <StatusBlock />
            </BentoCard>

            {/* 5. Coffee & Fun (2x1 Split) */}
            <BentoCard className="col-span-1" delay={0.5}>
                <StatItem
                    label="Coffee"
                    value="∞"
                    icon={Coffee}
                />
            </BentoCard>
            <BentoCard className="col-span-1 bg-primary/10 border-primary/20" delay={0.6}>
                <div className="h-full flex flex-col justify-center items-center text-center p-4">
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    >
                        <CheckCircle2 className="w-8 h-8 text-primary mb-2" />
                    </motion.div>
                    <div className="text-xs font-bold text-primary">Clean Code</div>
                </div>
            </BentoCard>

        </div>
    )
}
