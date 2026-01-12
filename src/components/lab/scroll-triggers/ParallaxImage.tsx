'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';

export default function ParallaxImage({ src, alt }: { src: string; alt: string }) {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);

    return (
        <div ref={ref} className="relative w-full h-[60vh] overflow-hidden rounded-3xl my-12 group">
            <motion.div style={{ y }} className="absolute inset-0 w-full h-[120%] -top-[10%]">
                {/* Using a standard div with background image for simpler parallax handling or Next Image with styling */}
                <div className="relative w-full h-full">
                    <Image
                        src={src}
                        alt={alt}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                </div>
            </motion.div>
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
        </div>
    );
}
