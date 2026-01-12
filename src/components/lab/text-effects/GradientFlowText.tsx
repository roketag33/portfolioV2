'use client';

import { motion } from 'framer-motion';

export default function GradientFlowText({ text }: { text: string }) {
    return (
        <motion.h1
            className="text-4xl md:text-6xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-purple-500 to-teal-400 bg-[length:200%_auto]"
            animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
            }}
            transition={{
                duration: 3,
                ease: "linear",
                repeat: Infinity
            }}
        >
            {text}
        </motion.h1>
    );
}
