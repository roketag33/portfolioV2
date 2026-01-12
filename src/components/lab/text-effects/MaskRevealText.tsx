'use client';

import { motion } from 'framer-motion';

export default function MaskRevealText({ text }: { text: string }) {
    return (
        <div className="overflow-hidden">
            <motion.h1
                initial={{ y: "110%", skewY: 10 }}
                whileInView={{ y: 0, skewY: 0 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                viewport={{ once: true }}
                className="text-4xl md:text-7xl font-bold tracking-tighter text-white"
            >
                {text}
            </motion.h1>
        </div>
    );
}
