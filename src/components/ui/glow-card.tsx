"use client"
import React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

export default function GlowCard({
    children,
    className,
    glowColor = "from-white/20",
    onClick
}: {
    children: React.ReactNode
    className?: string
    glowColor?: string
    onClick?: () => void
}) {
    return (
        <motion.div
            onClick={onClick}
            initial="idle"
            whileHover="hover"
            className={cn(
                "relative h-full overflow-hidden rounded-3xl bg-neutral-900/40 border border-white/5 transition-colors duration-500",
                className
            )}
        >
            {/* Hover Background Tint */}
            <motion.div
                variants={{
                    idle: { opacity: 0 },
                    hover: { opacity: 1 }
                }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0 bg-neutral-900/60 z-0"
            />

            {/* Subtle Gradient Glow */}
            <motion.div
                variants={{
                    idle: { opacity: 0 },
                    hover: { opacity: 0.6 } // Increased from 0.2
                }}
                transition={{ duration: 0.5 }}
                className={cn(
                    "absolute inset-0 bg-gradient-to-br z-0",
                    glowColor,
                    "to-transparent"
                )}
            />

            {/* Glowing Border Line */}
            <motion.div
                variants={{
                    idle: { opacity: 0 },
                    hover: { opacity: 1 }
                }}
                transition={{ duration: 0.3 }}
                className={cn(
                    "absolute inset-0 border-2 z-10 pointer-events-none rounded-3xl",
                    glowColor.replace('from-', 'border-') // Removed .replace('/20', '/10') to keep full border color opacity
                )}
            />

            <div className="relative z-20 h-full">
                {children}
            </div>
        </motion.div>
    )
}
