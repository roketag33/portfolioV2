'use client';

import { motion } from 'framer-motion';

export default function GlowButton({ children = "Neon Glow" }: { children?: React.ReactNode }) {
    return (
        <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative px-8 py-3 rounded-lg bg-neutral-900 border border-cyan-500/50 text-cyan-400 font-bold uppercase tracking-wider group overflow-hidden"
        >
            <span className="relative z-10 drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]">
                {children}
            </span>

            {/* Base Glow */}
            <div className="absolute inset-0 bg-cyan-500/10 blur-md rounded-lg" />

            {/* Moving Light Beam */}
            <div className="absolute top-0 -left-[100%] w-full h-full bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent skew-x-12 group-hover:animate-shine" />

            {/* Border Glow on Hover */}
            <div className="absolute inset-0 rounded-lg border-2 border-cyan-400 opacity-0 group-hover:opacity-100 group-hover:shadow-[0_0_20px_rgba(34,211,238,0.6)] transition-all duration-300" />

            <style jsx global>{`
                @keyframes shine {
                    0% { left: -100%; }
                    100% { left: 100%; }
                }
                .group:hover .animate-shine {
                    animation: shine 1s;
                }
            `}</style>
        </motion.button>
    );
}
