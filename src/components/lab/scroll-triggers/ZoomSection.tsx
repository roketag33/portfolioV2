'use client';

import { useRef } from 'react';
import { useScroll, useTransform, motion } from 'framer-motion';
import Image from 'next/image';

export default function ZoomSection() {
    const container = useRef(null);
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ['start start', 'end end']
    })

    const scale = useTransform(scrollYProgress, [0, 1], [1, 4]);

    return (
        <div ref={container} className="h-[300vh] relative">
            <div className="sticky top-0 h-screen overflow-hidden bg-neutral-950">
                <motion.div style={{ scale }} className="w-full h-full relative flex items-center justify-center">
                    <div className="relative w-[25vw] h-[25vh]">
                        <Image
                            src="/images/abstract-matter.webp"
                            fill
                            alt="Zooming Image"
                            className="object-cover rounded-xl shadow-2xl"
                        />
                    </div>
                </motion.div>
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none mix-blend-difference">
                    <h2 className="text-9xl font-black text-white tracking-tighter uppercase opacity-50">FOCUS</h2>
                </div>
            </div>
        </div>
    )
}
