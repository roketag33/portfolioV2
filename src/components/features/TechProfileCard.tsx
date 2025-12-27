'use client'

import React, { useRef } from 'react'
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
            className="relative w-full aspect-[4/5] md:aspect-square max-w-sm mx-auto rounded-3xl bg-neutral-900/50 backdrop-blur-xl border border-white/10 shadow-2xl cursor-pointer group"
        >
            {/* Holographic Gradient Overlay */}
            <motion.div
                className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none z-10"
                style={{
                    background: `radial-gradient(circle at ${shineX}% ${shineY}%, rgba(255,255,255,0.8), transparent 50%)`
                }}
            />

            {/* Noise Texture */}
            <div className="absolute inset-0 opacity-[0.03] bg-[url('/noise.png')] pointer-events-none rounded-3xl" />

            {/* Content Container */}
            <div style={{ transform: 'translateZ(20px)' }} className="relative z-20 h-full p-8 flex flex-col justify-between">

                {/* Header */}
                <div className="flex justify-between items-start">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-2xl font-bold text-white shadow-lg">
                        AS
                    </div>
                    <div className="flex flex-col items-end">
                        <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase flex items-center gap-1.5">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                            </span>
                            Selected for Hire
                        </div>
                    </div>
                </div>

                {/* Identity Info */}
                <div className="space-y-4 my-auto">
                    <div>
                        <h3 className="text-2xl font-bold text-white tracking-tight">Alexandre Sarrazin</h3>
                        <p className="text-neutral-400 font-medium">Software Engineer & Architect</p>
                    </div>

                    <div className="space-y-2 pt-4 border-t border-white/5">
                        <div className="flex items-center gap-3 text-sm text-neutral-300">
                            <MapPin className="w-4 h-4 text-neutral-500" />
                            <span>Bordeaux, France</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm text-neutral-300">
                            <Briefcase className="w-4 h-4 text-neutral-500" />
                            <span>Senior Fullstack (5+ Years)</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm text-neutral-300">
                            <Globe className="w-4 h-4 text-neutral-500" />
                            <span>English & French</span>
                        </div>
                    </div>
                </div>

                {/* Tech Stack Footer */}
                <div className="space-y-3">
                    <p className="text-[10px] uppercase tracking-widest text-neutral-500 font-bold">Core Stack</p>
                    <div className="flex gap-3">
                        <div className="p-2 rounded-lg bg-white/5 border border-white/5 group-hover:bg-blue-500/20 group-hover:border-blue-500/30 transition-colors" title="React / Next.js">
                            <Cpu className="w-5 h-5 text-neutral-300 group-hover:text-blue-400 transition-colors" />
                        </div>
                        <div className="p-2 rounded-lg bg-white/5 border border-white/5 group-hover:bg-green-500/20 group-hover:border-green-500/30 transition-colors" title="Node.js">
                            <Server className="w-5 h-5 text-neutral-300 group-hover:text-green-400 transition-colors" />
                        </div>
                        <div className="p-2 rounded-lg bg-white/5 border border-white/5 group-hover:bg-purple-500/20 group-hover:border-purple-500/30 transition-colors" title="Cloud / Database">
                            <Database className="w-5 h-5 text-neutral-300 group-hover:text-purple-400 transition-colors" />
                        </div>
                        <div className="p-2 rounded-lg bg-white/5 border border-white/5 group-hover:bg-orange-500/20 group-hover:border-orange-500/30 transition-colors" title="Architecture">
                            <Layers className="w-5 h-5 text-neutral-300 group-hover:text-orange-400 transition-colors" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Glossy Border */}
            <div className="absolute inset-0 rounded-3xl border border-white/10 pointer-events-none group-hover:border-white/20 transition-colors" />
        </motion.div>
    )
}
