'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

export default function CyberButton({ children = "CYBER::PUNK" }: { children?: React.ReactNode }) {
    // const controls = useAnimation();
    const [isHovered, setIsHovered] = useState(false);

    // Glitch animation variants
    const glitchVariants = {
        idle: { x: 0, y: 0 },
        hover: {
            x: [0, -2, 2, -1, 1, 0],
            y: [0, 1, -1, 0],
            transition: {
                repeat: Infinity,
                duration: 0.2,
                repeatType: "mirror" as const
            }
        }
    };

    // const skewVariants = {
    //     idle: { skewX: 0 },
    //     hover: {
    //         skewX: [0, 10, -10, 0],
    //         transition: { duration: 0.2 }
    //     }
    // }

    return (
        <motion.button
            className="relative px-8 py-3 font-mono font-bold text-yellow-400 bg-transparent border-2 border-yellow-400 uppercase tracking-widest group"
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            whileTap={{ scale: 0.95 }}
        >
            {/* Background Slice Effect */}
            <motion.div
                className="absolute inset-0 bg-yellow-400 mix-blend-difference"
                initial={{ scaleX: 0, originX: 0 }}
                animate={{ scaleX: isHovered ? 1 : 0 }}
                transition={{ duration: 0.3, ease: 'circInOut' }}
            />

            {/* Main Text */}
            <span className="relative z-10 group-hover:text-black transition-colors duration-200">
                {children}
            </span>

            {/* Glitch Layer 1 (Red) */}
            <motion.div
                className="absolute inset-0 flex items-center justify-center text-red-500 opacity-0 group-hover:opacity-70 z-0 select-none pointer-events-none"
                variants={glitchVariants}
                animate={isHovered ? "hover" : "idle"}
                style={{ clipPath: 'inset(50% 0 0 0)' }}
            >
                {children}
            </motion.div>

            {/* Glitch Layer 2 (Blue) */}
            <motion.div
                className="absolute inset-0 flex items-center justify-center text-blue-500 opacity-0 group-hover:opacity-70 z-0 select-none pointer-events-none"
                variants={glitchVariants}
                animate={isHovered ? "hover" : "idle"}
                style={{ clipPath: 'inset(0 0 50% 0)' }}
            >
                {children}
            </motion.div>

            {/* Decorative Corners */}
            <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-yellow-400 -translate-x-1 -translate-y-1 transition-transform group-hover:-translate-x-2 group-hover:-translate-y-2" />
            <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-yellow-400 translate-x-1 translate-y-1 transition-transform group-hover:translate-x-2 group-hover:translate-y-2" />
        </motion.button>
    );
}
