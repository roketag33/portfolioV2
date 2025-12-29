"use client"
import React, { useRef } from "react"
import { motion, useMotionTemplate, useMotionValue } from "framer-motion"
import { cn } from "@/lib/utils"

export default function SpotlightCard({
    children,
    className,
    spotlightColor = "rgba(255, 255, 255, 0.25)",
    onClick
}: {
    children: React.ReactNode
    className?: string
    spotlightColor?: string
    onClick?: () => void
}) {
    const divRef = useRef<HTMLDivElement>(null)
    const mouseX = useMotionValue(0)
    const mouseY = useMotionValue(0)

    const handleMouseMove = ({ currentTarget, clientX, clientY }: React.MouseEvent) => {
        const { left, top } = currentTarget.getBoundingClientRect()
        mouseX.set(clientX - left)
        mouseY.set(clientY - top)
    }

    return (
        <motion.div
            ref={divRef}
            onMouseMove={handleMouseMove}
            onClick={onClick}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={cn(
                "relative h-full rounded-3xl group border border-neutral-800 bg-neutral-900 cursor-pointer shadow-none hover:shadow-2xl hover:shadow-primary/10 transition-shadow duration-300",
                className
            )}
        >
            {/* Border Spotlight Layer (Behind content, slightly larger/inset-px) */}
            <motion.div
                className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition duration-300 group-hover:opacity-100 z-0"
                style={{
                    background: useMotionTemplate`
                        radial-gradient(
                            600px circle at ${mouseX}px ${mouseY}px,
                            ${spotlightColor.replace('0.2', '0.6').replace('0.15', '0.4')},
                            transparent 40%
                        )
                    `
                }}
            />

            {/* Content Container (Masks the border layer to create the rim effect) */}
            <div className="relative h-full rounded-[23px] bg-neutral-900 overflow-hidden z-10 m-[1px]">
                {/* Background Spotlight (Inside the card) */}
                <motion.div
                    className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100"
                    style={{
                        background: useMotionTemplate`
                            radial-gradient(
                                600px circle at ${mouseX}px ${mouseY}px,
                                ${spotlightColor},
                                transparent 80%
                            )
                        `
                    }}
                />

                <div className="relative h-full z-20">
                    {children}
                </div>
            </div>
        </motion.div>
    )
}
