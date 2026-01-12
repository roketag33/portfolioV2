'use client';

import { motion } from 'framer-motion';

export default function GlitchText({ text }: { text: string }) {
    return (
        <div className="relative inline-block font-mono font-black text-4xl md:text-6xl text-white uppercase tracking-widest">
            {/* Main Layer */}
            <motion.span
                className="relative z-10 block"
                animate={{
                    skewX: [0, 5, -5, 0],
                    x: [0, 2, -2, 0]
                }}
                transition={{
                    repeat: Infinity,
                    duration: 0.2,
                    repeatDelay: 1.5 // Occasional main shake
                }}
            >
                {text}
            </motion.span>

            {/* Red Layer - Fast & Chaotic */}
            <motion.span
                className="absolute top-0 left-0 z-0 text-red-500 opacity-80 select-none pointer-events-none"
                animate={{
                    x: [-3, 3, -5, 5, 0],
                    y: [2, -2, 0],
                    opacity: [0, 1, 0.5, 1, 0]
                }}
                transition={{
                    repeat: Infinity,
                    duration: 0.1,
                    repeatType: "loop",
                    ease: "linear"
                }}
            >
                {text}
            </motion.span>

            {/* Cyan Layer - Offset Timing */}
            <motion.span
                className="absolute top-0 left-0 z-0 text-cyan-500 opacity-80 select-none pointer-events-none"
                animate={{
                    x: [3, -3, 5, -5, 0],
                    y: [-2, 2, 0],
                    opacity: [0, 1, 0.5, 1, 0]
                }}
                transition={{
                    repeat: Infinity,
                    duration: 0.1,
                    repeatType: "loop",
                    delay: 0.05,
                    ease: "linear"
                }}
            >
                {text}
            </motion.span>
        </div>
    );
}
