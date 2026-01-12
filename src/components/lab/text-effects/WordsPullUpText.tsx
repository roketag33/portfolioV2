'use client';

import { motion } from 'framer-motion';

export default function WordsPullUpText({ text }: { text: string }) {
    const words = text.split(" ");

    return (
        <div className="flex flex-wrap justify-center gap-[0.3em] overflow-hidden">
            {words.map((word, i) => (
                <motion.span
                    key={i}
                    initial={{ y: "100%", opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{
                        delay: i * 0.1,
                        duration: 0.8,
                        ease: [0.2, 0.65, 0.3, 0.9]
                    }}
                    viewport={{ once: true }}
                    className="text-3xl md:text-5xl font-bold text-white block"
                >
                    {word}
                </motion.span>
            ))}
        </div>
    );
}
