'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const CHARS = '-_~`!@#$%^&*()+=[]{}|;:,.<>?';

export default function ScrambleText({ text = "SCRAMBLE" }: { text: string }) {
    const [displayText, setDisplayText] = useState('');
    const [isHovered, setIsHovered] = useState(false);

    const scramble = () => {
        let iteration = 0;
        const interval = setInterval(() => {
            setDisplayText(prev =>
                text
                    .split('')
                    .map((char, index) => {
                        if (index < iteration) {
                            return text[index];
                        }
                        return CHARS[Math.floor(Math.random() * CHARS.length)];
                    })
                    .join('')
            );

            if (iteration >= text.length) {
                clearInterval(interval);
            }

            iteration += 1 / 3;
        }, 30);
    };

    useEffect(() => {
        scramble();
    }, [text]);

    return (
        <motion.h1
            className="text-4xl md:text-6xl font-mono font-bold text-emerald-400 cursor-default"
            onHoverStart={scramble}
        >
            {displayText}
        </motion.h1>
    );
}
