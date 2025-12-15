'use client'
import React, { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { cn } from '@/lib/utils'

interface ProjectCard3DProps {
    title: string
    category: string
    image?: string
    className?: string
}

export default function ProjectCard3D({ title, category, image, className }: ProjectCard3DProps) {
    const ref = useRef<HTMLDivElement>(null)

    // Motion values
    const x = useMotionValue(0)
    const y = useMotionValue(0)

    // Spring smoothing
    const mouseX = useSpring(x, { stiffness: 150, damping: 15 })
    const mouseY = useSpring(y, { stiffness: 150, damping: 15 })

    // Transform for rotation (Outer container remains static, inner rotates)
    const rotateX = useTransform(mouseY, [-0.5, 0.5], ["20deg", "-20deg"])
    const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-20deg", "20deg"])

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return
        const rect = ref.current.getBoundingClientRect()
        const width = rect.width
        const height = rect.height
        // Normalized coordinates -0.5 to 0.5
        const normalizedX = (e.clientX - rect.left) / width - 0.5
        const normalizedY = (e.clientY - rect.top) / height - 0.5

        x.set(normalizedX)
        y.set(normalizedY)
    }

    const handleMouseLeave = () => {
        x.set(0)
        y.set(0)
    }

    return (
        <div
            className={cn(
                "group relative w-full aspect-[4/3] perspective-1000", // Perspective on PARENT
                className
            )}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            ref={ref}
        >
            <motion.div
                style={{
                    rotateX,
                    rotateY,
                    transformStyle: "preserve-3d",
                }}
                className="w-full h-full relative rounded-xl transition-all duration-200 ease-linear"
            >
                {/* THICKNESS / SHADOW LAYER */}
                {/* Creates a fake volume by placing a dark layer slightly behind */}
                <div
                    className="absolute inset-0 bg-black/50 rounded-xl translate-z-[-20px] blur-xl"
                    style={{ transform: "translateZ(-40px)" }}
                />

                {/* MAIN CARD FACE */}
                <div className="absolute inset-0 bg-card rounded-xl overflow-hidden border border-white/10 shadow-2xl">

                    {/* Background Image Layer */}
                    <div
                        style={{ transform: "translateZ(-50px) scale(1.2)" }}
                        className="absolute inset-0 bg-neutral-900"
                    >
                        {image && (
                            <img
                                src={image}
                                alt={title}
                                className="w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-opacity duration-500"
                            />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />
                    </div>

                    {/* Content Layer (Parallax Pop) */}
                    <div
                        style={{ transform: "translateZ(50px)" }}
                        className="absolute inset-x-0 bottom-0 p-8 z-20 pointer-events-none"
                    >
                        <h3 className="text-3xl font-black uppercase tracking-tighter text-white mb-2 leading-none drop-shadow-lg">
                            {title}
                        </h3>
                        <p className="text-sm font-medium text-white/70 uppercase tracking-widest drop-shadow-md">
                            {category}
                        </p>
                    </div>

                    {/* Badge (Extreme Pop) */}
                    <div
                        style={{ transform: "translateZ(75px)" }}
                        className="absolute top-6 right-6 z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                    >
                        <div className="bg-white/10 backdrop-blur-md px-3 py-1 rounded-full border border-white/20 text-xs font-bold text-white uppercase shadow-lg">
                            View Case
                        </div>
                    </div>

                    {/* Lighting/Glare */}
                    <div
                        className="absolute inset-0 z-40 bg-gradient-to-tr from-white/0 via-white/10 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 mix-blend-overlay pointer-events-none"
                        style={{ transform: "translateZ(1px)" }}
                    />
                </div>
            </motion.div>
        </div>
    )
}
