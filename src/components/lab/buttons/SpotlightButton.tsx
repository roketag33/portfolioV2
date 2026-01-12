'use client';

import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';

export default function SpotlightButton({ children = "Spotlight" }: { children?: React.ReactNode }) {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const handleMouseMove = ({ currentTarget, clientX, clientY }: React.MouseEvent) => {
        const { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    };

    return (
        <div
            className="group relative max-w-md rounded-xl border border-white/10 bg-neutral-900 px-8 py-4 cursor-pointer overflow-hidden"
            onMouseMove={handleMouseMove}
        >
            <motion.div
                className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100"
                style={{
                    background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              rgba(99, 102, 241, 0.15),
              transparent 80%
            )
          `,
                }}
            />
            <motion.div
                className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100"
                style={{
                    background: useMotionTemplate`
            radial-gradient(
              150px circle at ${mouseX}px ${mouseY}px,
              rgba(99, 102, 241, 0.5),
              transparent 80%
            )
          `,
                }}
            />
            <span className="relative z-10 font-medium text-indigo-100">{children}</span>
        </div>
    );
}
