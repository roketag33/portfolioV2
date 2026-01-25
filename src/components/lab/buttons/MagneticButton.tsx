'use client';

import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useRef } from 'react';

export default function MagneticButton({ children = "Hover Me" }: { children?: React.ReactNode }) {
    const ref = useRef<HTMLButtonElement>(null);

    // Mouse position relative to the button center
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    // Smooth spring physics
    const springConfig = { damping: 15, stiffness: 150, mass: 0.1 };
    const springX = useSpring(x, springConfig);
    const springY = useSpring(y, springConfig);

    const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
        const { clientX, clientY } = e;
        const { height, width, left, top } = ref.current!.getBoundingClientRect();

        const middleX = clientX - (left + width / 2);
        const middleY = clientY - (top + height / 2);

        x.set(middleX);
        y.set(middleY);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.button
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ x: springX, y: springY }}
            className="relative px-8 py-4 rounded-full bg-white text-black font-medium text-lg overflow-hidden group"
        >
            <span className="relative z-10 flex items-center gap-2">
                {children}
            </span>
            {/* Hover Fill Effect */}
            <motion.div
                className="absolute inset-0 bg-indigo-500 z-0 origin-center scale-0 rounded-full transition-transform duration-300 ease-out group-hover:scale-150"
            />
            {/* Text Color Change on Hover */}
            <style jsx>{`
                button:hover span {
                    color: white;
                    transition: color 0.2s;
                }
            `}</style>
        </motion.button>
    );
}
