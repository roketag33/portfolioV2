'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function TypewriterText({ text }: { text: string }) {
    const [displayedText, setDisplayedText] = useState("");

    useEffect(() => {
        let index = 0;
        const interval = setInterval(() => {
            if (index <= text.length) {
                setDisplayedText(text.slice(0, index));
                index++;
            } else {
                clearInterval(interval);
            }
        }, 100);
        return () => clearInterval(interval);
    }, [text]);

    return (
        <div className="text-3xl md:text-5xl font-mono font-medium text-white flex items-center">
            {displayedText}
            <motion.span
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                className="inline-block w-[1ch] h-[1.2em] bg-teal-500 ml-1 align-middle"
            />
        </div>
    );
}
