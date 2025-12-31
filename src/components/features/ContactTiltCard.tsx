'use client'

import React, { useRef, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { Mail, MapPin, CheckCircle2, Copy } from 'lucide-react'
import { toast } from 'sonner'

export function ContactTiltCard() {
    const ref = useRef<HTMLDivElement>(null)
    const [copied, setCopied] = useState(false)

    // Motion values for tilt effect
    const x = useMotionValue(0)
    const y = useMotionValue(0)

    // Spring physics for smooth return
    const mouseX = useSpring(x, { stiffness: 500, damping: 100 })
    const mouseY = useSpring(y, { stiffness: 500, damping: 100 })

    function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
        const { left, top, width, height } = currentTarget.getBoundingClientRect()
        const xPct = (clientX - left) / width - 0.5
        const yPct = (clientY - top) / height - 0.5

        // Tilt intensity
        x.set(xPct)
        y.set(yPct)
    }

    function handleMouseLeave() {
        x.set(0)
        y.set(0)
    }

    // Transforms
    const rotateX = useTransform(mouseY, [-0.5, 0.5], [15, -15]) // Reverse for natural tilt
    const rotateY = useTransform(mouseX, [-0.5, 0.5], [-15, 15])
    const glareX = useTransform(mouseX, [-0.5, 0.5], [0, 100])
    const glareY = useTransform(mouseY, [-0.5, 0.5], [0, 100])

    // Copy Action
    const handleCopy = () => {
        navigator.clipboard.writeText("contact@roketag.com")
        setCopied(true)
        toast.success("Email copied to clipboard!")
        setTimeout(() => setCopied(false), 2000)
    }

    return (
        <motion.div
            ref={ref}
            style={{
                perspective: 1000,
            }}
            className="relative w-full max-w-md mx-auto aspect-[1.7/1] sm:aspect-[1.8/1]"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            <motion.div
                style={{
                    rotateX,
                    rotateY,
                    transformStyle: "preserve-3d",
                }}
                className="relative w-full h-full rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/20 backdrop-blur-xl shadow-2xl overflow-hidden group"
            >
                {/* Holographic Glare */}
                <motion.div
                    style={{
                        background: `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.3) 0%, transparent 60%)`,
                        opacity: useTransform(mouseX, [-0.5, 0.5], [0.3, 0.6])
                    }}
                    className="absolute inset-0 z-20 pointer-events-none mix-blend-overlay"
                />

                {/* Content Layer (Float Effect) */}
                <div
                    className="absolute inset-0 z-30 flex flex-col justify-between p-6 sm:p-8"
                    style={{ transform: "translateZ(50px)" }} // 3D Float
                >
                    {/* Header */}
                    <div className="flex justify-between items-start">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-blue-500 flex items-center justify-center shadow-lg shadow-primary/25">
                                <span className="font-bold text-white text-lg">A</span>
                            </div>
                            <div>
                                <h3 className="font-bold text-white leading-none">Alexandre S.</h3>
                                <p className="text-xs text-white/50 font-mono mt-1">Software Engineer</p>
                            </div>
                        </div>

                        {/* Status Badge */}
                        <div className="px-3 py-1 rounded-full bg-green-500/20 border border-green-500/30 flex items-center gap-2 backdrop-blur-md">
                            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                            <span className="text-[10px] font-bold text-green-400 uppercase tracking-wider">Available</span>
                        </div>
                    </div>

                    {/* Middle: Chip Visual (Decorative) */}
                    <div className="absolute top-1/2 right-8 -translate-y-1/2 opacity-20 hidden sm:block">
                        <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-white">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                        </svg>
                    </div>

                    {/* Footer: Contacts */}
                    <div className="space-y-4">
                        {/* Email */}
                        <button
                            onClick={handleCopy}
                            className="w-full flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/30 transition-all group/btn text-left"
                        >
                            <div className="flex items-center gap-3">
                                <div className="p-2 rounded-lg bg-neutral-900 border border-white/10">
                                    <Mail className="w-4 h-4 text-primary" />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[10px] text-white/40 uppercase tracking-widest">Email</span>
                                    <span className="text-sm font-medium text-white group-hover/btn:text-primary transition-colors">contact@roketag.com</span>
                                </div>
                            </div>
                            {copied ? <CheckCircle2 className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4 text-white/20 group-hover/btn:text-white" />}
                        </button>

                        {/* Location */}
                        <div className="flex items-center gap-3 px-3">
                            <MapPin className="w-4 h-4 text-white/40" />
                            <span className="text-xs text-white/60 font-mono">Bordeaux, France (Remote-ready)</span>
                        </div>
                    </div>
                </div>

                {/* Background Noise/Texture */}
                <div className="absolute inset-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay z-10" />
            </motion.div>
        </motion.div>
    )
}
