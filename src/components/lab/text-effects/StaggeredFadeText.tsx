'use client';

import { motion } from 'framer-motion';

export default function StaggeredFadeText({ text }: { text: string }) {
    const words = text.split(" ");

    return (
        <div className="flex flex-wrap justify-center gap-[0.25em]">
            {words.map((word, i) => (
                <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{
                        duration: 0.5,
                        delay: i * 0.1,
                        ease: [0.2, 0.65, 0.3, 0.9],
                    }}
                    viewport={{ once: true }}
                    className="text-2xl md:text-4xl font-light text-neutral-200"
                >
                    {word}
                </motion.span>
            ))}
        </div>
    );
}
