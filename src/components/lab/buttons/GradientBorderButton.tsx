'use client';

import { motion } from 'framer-motion';

export default function GradientBorderButton({ children = "Cosmic" }: { children?: React.ReactNode }) {
    return (
        <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative p-[2px] rounded-full overflow-hidden group"
        >
            {/* Spinning Gradient */}
            <motion.div
                className="absolute inset-0 bg-[conic-gradient(from_0deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]"
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            />

            {/* Inner Content */}
            <span className="relative block px-8 py-3 bg-neutral-950 rounded-full text-white font-medium transition-colors group-hover:bg-neutral-900">
                {children}
            </span>
        </motion.button>
    );
}
