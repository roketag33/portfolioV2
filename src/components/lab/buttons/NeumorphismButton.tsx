'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

export default function NeumorphismButton({ children = "Soft UI" }: { children?: React.ReactNode }) {
    const [isPressed, setIsPressed] = useState(false);

    return (
        <motion.button
            onTapStart={() => setIsPressed(true)}
            onTap={() => setIsPressed(false)}
            onTapCancel={() => setIsPressed(false)}
            animate={{
                boxShadow: isPressed
                    ? "inset 5px 5px 10px #1a1a1a, inset -5px -5px 10px #323232"
                    : "5px 5px 10px #1a1a1a, -5px -5px 10px #323232"
            }}
            className="px-10 py-4 bg-[#262626] text-neutral-400 font-medium rounded-xl transition-colors hover:text-indigo-400 active:scale-95 duration-200"
        >
            {children}
        </motion.button>
    );
}
