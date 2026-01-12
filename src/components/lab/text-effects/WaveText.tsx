'use client';

import { motion } from 'framer-motion';

export default function WaveText({ text }: { text: string }) {
    return (
        <div className="flex overflow-hidden text-4xl md:text-6xl font-bold text-white">
            {text.split('').map((char, index) => (
                <motion.span
                    key={index}
                    animate={{ y: [0, -20, 0] }}
                    transition={{
                        duration: 1,
                        repeat: Infinity,
                        delay: index * 0.1,
                        ease: "easeInOut"
                    }}
                    className={char === ' ' ? "w-4" : ""}
                >
                    {char}
                </motion.span>
            ))}
        </div>
    );
}
