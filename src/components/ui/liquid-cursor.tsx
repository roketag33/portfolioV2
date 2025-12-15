'use client'
import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function LiquidCursor() {
    const cursorX = useMotionValue(-100)
    const cursorY = useMotionValue(-100)

    const springConfig = { damping: 25, stiffness: 700 }
    const cursorXSpring = useSpring(cursorX, springConfig)
    const cursorYSpring = useSpring(cursorY, springConfig)

    useEffect(() => {
        const moveCursor = (e: MouseEvent) => {
            cursorX.set(e.clientX - 16)
            cursorY.set(e.clientY - 16)
        }
        window.addEventListener('mousemove', moveCursor)
        return () => window.removeEventListener('mousemove', moveCursor)
    }, [])

    return (
        <>
            {/* SVG Filter for Distortion */}
            <svg style={{ position: 'absolute', width: 0, height: 0 }}>
                <defs>
                    <filter id="liquid">
                        <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="3" result="noise" />
                        <feDisplacementMap in="SourceGraphic" in2="noise" scale="30" />
                    </filter>
                </defs>
            </svg>

            {/* The Cursor */}
            <motion.div
                className="fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-[9999] mix-blend-difference"
                style={{
                    x: cursorXSpring,
                    y: cursorYSpring,
                    backgroundColor: 'white',
                    filter: "url(#liquid)", // Apply filter directly to cursor for wobble effect or use backdrop-filter for liquid lens
                }}
            />

            {/* Liquid Lens Effect (Optional - Distorts background) */}
            <motion.div
                className="fixed top-0 left-0 w-32 h-32 rounded-full pointer-events-none z-[9998] opacity-20"
                style={{
                    x: cursorXSpring,
                    y: cursorYSpring,
                    left: -48, // Adjust center
                    top: -48,
                    background: 'radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 70%)',
                    mixBlendMode: 'overlay'
                }}
            />
        </>
    )
}
