'use client'

import React, { useRef } from 'react'
import Link from 'next/link'
import GlitchText from '@/components/ui/glitch-text'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { MapPin, Briefcase, Layers, Cpu, Globe, Server, Database } from 'lucide-react'

export default function TechProfileCard() {
    const cardRef = useRef<HTMLDivElement>(null)

    // Mouse position state
    const x = useMotionValue(0)
    const y = useMotionValue(0)

    // Spring physics for smooth rotation (subtle)
    const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [10, -10]), { stiffness: 150, damping: 20 })
    const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-10, 10]), { stiffness: 150, damping: 20 })

    // Holographic shine
    const shineX = useSpring(useTransform(x, [-0.5, 0.5], [0, 100]), { stiffness: 150, damping: 20 })
    const shineY = useSpring(useTransform(y, [-0.5, 0.5], [0, 100]), { stiffness: 150, damping: 20 })

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return

        const rect = cardRef.current.getBoundingClientRect()
        const width = rect.width
        const height = rect.height

        const mouseX = e.clientX - rect.left
        const mouseY = e.clientY - rect.top

        const xPct = (mouseX / width) - 0.5
        const yPct = (mouseY / height) - 0.5

        x.set(xPct)
        y.set(yPct)
    }

    const handleMouseLeave = () => {
        x.set(0)
        y.set(0)
    }

    return (
        <motion.div
            ref={cardRef}
            style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="relative w-full aspect-[4/5] md:aspect-square rounded-3xl bg-card/30 backdrop-blur-xl border border-border/50 shadow-2xl cursor-pointer group"
        >
            {/* Ambient Glow */}
            <div className="absolute -inset-4 bg-primary/20 rounded-[2rem] blur-3xl -z-10 opacity-50 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Holographic Gradient Overlay */}
            <motion.div
                className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-40 transition-opacity duration-500 pointer-events-none z-10"
                style={{
                    background: `radial-gradient(circle at ${shineX}% ${shineY}%, var(--primary), transparent 60%)`
                }}
            />

            {/* Noise Texture */}
            <div className="absolute inset-0 opacity-[0.03] bg-[url('/noise.png')] pointer-events-none rounded-3xl" />

            {/* Content Container */}
            <div style={{ transform: 'translateZ(20px)' }} className="relative z-20 h-full p-8 flex flex-col justify-between">


                {/* Header */}
                <div className="flex justify-between items-start">
                    <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-2xl font-bold text-primary shadow-sm border border-primary/20">
                        AS
                    </div>
                    <div className="flex flex-col items-end">
                        <Link href="/contact" className="bg-primary/10 border border-primary/20 text-primary px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase flex items-center gap-1.5 hover:bg-primary/20 transition-colors cursor-pointer">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                            </span>
                            Selected for Hire
                        </Link>
                    </div>
                </div>

                {/* Identity Info */}
                <div className="space-y-4 my-auto">
                    <div>
                        <h3 className="text-3xl font-black text-foreground tracking-tighter uppercase">
                            <GlitchText text="Alexandre" /><br />
                            <GlitchText text="Sarrazin" />
                        </h3>
                        <p className="text-muted-foreground font-medium text-lg">
                            <GlitchText text="Software Engineer" className="text-muted-foreground" /><br />
                            & <GlitchText text="Architect" className="text-muted-foreground" />
                        </p>
                    </div>

                    <div className="space-y-2 pt-4 border-t border-border/50">
                        <div className="flex items-center gap-3 text-sm text-foreground/80">
                            <MapPin className="w-4 h-4 text-primary" />
                            <span>Bordeaux, France</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm text-foreground/80">
                            <Briefcase className="w-4 h-4 text-primary" />
                            <span>Senior Fullstack (5+ Years)</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm text-foreground/80">
                            <Globe className="w-4 h-4 text-primary" />
                            <span>English & French</span>
                        </div>
                    </div>
                </div>

                {/* Tech Stack Footer */}
                <div className="space-y-3">
                    <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">Core Architecture Stack</p>
                    <div className="flex gap-3">
                        <div className="p-3 rounded-xl bg-background/50 border border-border/50 shadow-sm group-hover:border-primary/50 transition-colors" title="React / Next.js">
                            <Cpu className="w-5 h-5 text-foreground/80 group-hover:text-primary transition-colors" />
                        </div>
                        <div className="p-3 rounded-xl bg-background/50 border border-border/50 shadow-sm group-hover:border-primary/50 transition-colors" title="Node.js">
                            <Server className="w-5 h-5 text-foreground/80 group-hover:text-primary transition-colors" />
                        </div>
                        <div className="p-3 rounded-xl bg-background/50 border border-border/50 shadow-sm group-hover:border-primary/50 transition-colors" title="Cloud / Database">
                            <Database className="w-5 h-5 text-foreground/80 group-hover:text-primary transition-colors" />
                        </div>
                        <div className="p-3 rounded-xl bg-background/50 border border-border/50 shadow-sm group-hover:border-primary/50 transition-colors" title="Architecture">
                            <Layers className="w-5 h-5 text-foreground/80 group-hover:text-primary transition-colors" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Glossy Border */}
            <div className="absolute inset-0 rounded-3xl border border-white/20 pointer-events-none group-hover:border-primary/50 transition-colors" />
        </motion.div>
    )
}
