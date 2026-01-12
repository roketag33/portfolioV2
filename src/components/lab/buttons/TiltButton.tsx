'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

export default function TiltButton({ children = "3D Tilt" }: { children?: React.ReactNode }) {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseX = useSpring(x, { stiffness: 150, damping: 10 });
    const mouseY = useSpring(y, { stiffness: 150, damping: 10 });

    const rotateX = useTransform(mouseY, [-0.5, 0.5], ["15deg", "-15deg"]);
    const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-15deg", "15deg"]);

    const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;

        const mouseXFromCenter = e.clientX - rect.left - width / 2;
        const mouseYFromCenter = e.clientY - rect.top - height / 2;

        x.set(mouseXFromCenter / width);
        y.set(mouseYFromCenter / height);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.button
            style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
            }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="relative px-10 py-4 bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl text-white font-bold shadow-xl transition-shadow hover:shadow-2xl hover:shadow-purple-500/20"
        >
            <span
                style={{ transform: "translateZ(20px)" }}
                className="block drop-shadow-md"
            >
                {children}
            </span>
        </motion.button>
    );
}
