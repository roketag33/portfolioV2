'use client';

import { useScroll, motion, useTransform, MotionValue } from 'framer-motion';
import { useRef } from 'react';

export default function ScrollRevealText({ text }: { text: string }) {
    const element = useRef(null);
    const { scrollYProgress } = useScroll({
        target: element,
        offset: ['start 0.9', 'start 0.25']
    })

    const words = text.split(" ");

    return (
        <p
            ref={element}
            className="text-2xl md:text-5xl font-bold flex flex-wrap gap-x-3 gap-y-2 leading-tight p-4"
        >
            {words.map((word, i) => {
                const start = i / words.length;
                const end = start + (1 / words.length);
                return <Word key={i} range={[start, end]} progress={scrollYProgress}>{word}</Word>
            })}
        </p>
    )
}

const Word = ({ children, range, progress }: { children: string, range: [number, number], progress: MotionValue<number> }) => {
    const opacity = useTransform(progress, range, [0.1, 1]);
    return (
        <motion.span style={{ opacity }} className="transition-colors text-white">
            {children}
        </motion.span>
    )
}
