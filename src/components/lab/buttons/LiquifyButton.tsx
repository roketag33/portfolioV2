'use client';

import { motion } from 'framer-motion';

import { useState, useEffect } from 'react';

export default function LiquifyButton({ children = "Liquify" }: { children?: React.ReactNode }) {
    const [bubbles, setBubbles] = useState<Array<{ x: number, y: number }>>([])

    useEffect(() => {
        setTimeout(() => {
            setBubbles([...Array(5)].map(() => ({
                x: Math.random() * 100 - 50,
                y: Math.random() * 50 - 25
            })))
        }, 0)
    }, [])
    return (
        <motion.button
            className="relative px-8 py-4 bg-indigo-600 text-white font-bold rounded-lg overflow-hidden group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
        >
            <span className="relative z-10">{children}</span>
            <div className="absolute inset-0 z-0">
                {bubbles.map((bubble, i) => (
                    <motion.div
                        key={i}
                        className="absolute bg-white/20 rounded-full"
                        initial={{ width: 0, height: 0, opacity: 0 }}
                        variants={{
                            hover: {
                                width: [0, 100 + i * 50],
                                height: [0, 100 + i * 50],
                                opacity: [0.5, 0],
                                x: bubble.x,
                                y: bubble.y,
                                transition: {
                                    duration: 0.8,
                                    repeat: Infinity,
                                    delay: i * 0.1,
                                    ease: "easeOut"
                                }
                            }
                        }}
                        style={{
                            left: '50%',
                            top: '50%',
                            translateX: '-50%',
                            translateY: '-50%',
                        }}
                    />
                ))}
            </div>
            <motion.div
                className="absolute inset-0 bg-indigo-400 mix-blend-overlay"
                whileHover={{
                    filter: "url(#liquid)",
                    opacity: 0.5
                }}
            />
            {/* SVG Filter for distortion if we wanted true liquid, but for now using motion bubbles */}
        </motion.button>
    );
}
