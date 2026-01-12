'use client';

import { motion } from 'framer-motion';

export default function BlurInText({ text }: { text: string }) {
    return (
        <motion.h1
            initial={{ filter: 'blur(20px)', opacity: 0 }}
            whileInView={{ filter: 'blur(0px)', opacity: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            viewport={{ once: true }}
            className="text-4xl md:text-7xl font-bold text-white text-center"
        >
            {text}
        </motion.h1>
    );
}
