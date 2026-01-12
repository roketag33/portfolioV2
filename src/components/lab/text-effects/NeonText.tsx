'use client';

import { motion } from 'framer-motion';

export default function NeonText({ text }: { text: string }) {
    return (
        <motion.h1
            initial={{ textShadow: "0 0 0px #fff" }}
            animate={{
                textShadow: [
                    "0 0 4px #fff, 0 0 11px #fff, 0 0 19px #fff, 0 0 40px #f09",
                    "0 0 2px #fff, 0 0 10px #fff, 0 0 18px #fff, 0 0 30px #f09",
                    "0 0 4px #fff, 0 0 11px #fff, 0 0 19px #fff, 0 0 40px #f09"
                ]
            }}
            transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
            className="text-4xl md:text-7xl font-bold text-white mix-blend-screen"
        >
            {text}
        </motion.h1>
    );
}
