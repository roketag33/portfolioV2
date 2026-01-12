'use client';

import { motion } from 'framer-motion';

export default function PulseButton({ children = "Pulse" }: { children?: React.ReactNode }) {
    return (
        <div className="relative">
            <motion.div
                className="absolute inset-0 bg-red-500 rounded-full opacity-0"
                animate={{
                    scale: [1, 2],
                    opacity: [0.5, 0]
                }}
                transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeOut"
                }}
            />
            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="relative px-8 py-4 bg-red-600 text-white font-bold rounded-full shadow-[0_0_20px_rgba(220,38,38,0.5)] z-10"
            >
                {children}
            </motion.button>
        </div>
    );
}
