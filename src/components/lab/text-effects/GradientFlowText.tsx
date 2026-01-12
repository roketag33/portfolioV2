'use client';

import { motion } from 'framer-motion';

export default function GradientFlowText({ text }: { text: string }) {
    return (
        <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-purple-500 to-teal-400 animate-gradient-x bg-[length:200%_auto]">
            {text}
        </h1>
    );
}
