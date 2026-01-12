'use client';

import { useScroll, useTransform, motion, MotionValue } from 'framer-motion';
import { useRef } from 'react';
import { useTranslations } from 'next-intl';

const projects = [
    {
        title: "Matisse",
        description: "A digital exploration of form and color.",
        src: "bg-red-500",
    },
    {
        title: "Picasso",
        description: "Cubism in the modern web era.",
        src: "bg-blue-500",
    },
    {
        title: "Dali",
        description: "Surrealism through code.",
        src: "bg-orange-500",
    },
    {
        title: "Van Gogh",
        description: "Post-impressionist shader art.",
        src: "bg-yellow-500",
    }
]

export default function CardStack() {
    const t = useTranslations('Lab.scroll-triggers.cards');
    const projects = [
        {
            title: t('p1.title'),
            description: t('p1.desc'),
            src: "bg-red-500",
        },
        {
            title: t('p2.title'),
            description: t('p2.desc'),
            src: "bg-blue-500",
        },
        {
            title: t('p3.title'),
            description: t('p3.desc'),
            src: "bg-orange-500",
        },
        {
            title: t('p4.title'),
            description: t('p4.desc'),
            src: "bg-yellow-500",
        }
    ]

    const container = useRef(null);
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ['start start', 'end end']
    })

    return (
        <div ref={container} className="mt-[50vh] mb-[50vh]">
            <div className="h-[50vh] flex items-center justify-center mb-12">
                <h2 className="text-4xl font-mono text-neutral-500">{t('title')}</h2>
            </div>
            {projects.map((project, i) => {
                const targetScale = 1 - ((projects.length - i) * 0.05);
                return (
                    <Card key={i} i={i} {...project} progress={scrollYProgress} range={[i * 0.25, 1]} targetScale={targetScale} />
                )
            })}
        </div>
    )
}

const Card = ({ i, title, description, src, progress, range, targetScale }: any) => {
    const container = useRef(null);
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ['start end', 'start start']
    });

    const imageScale = useTransform(scrollYProgress, [0, 1], [2, 1]);
    const scale = useTransform(progress, range, [1, targetScale]);

    return (
        <div ref={container} className="h-screen flex items-center justify-center sticky top-0">
            <motion.div
                style={{ scale, top: `calc(-5vh + ${i * 25}px)` }}
                className={`relative w-[1000px] h-[500px] rounded-[25px] p-12 origin-top bg-neutral-900 border border-white/10 flex flex-col justify-between`}
            >
                <div className="flex justify-between items-center z-10">
                    <h2 className="text-4xl font-bold">{title}</h2>
                    <span className="text-xl font-mono opacity-50">0{i + 1}</span>
                </div>

                <div className="flex gap-12 z-10 w-full h-full pt-12">
                    <div className="w-1/2 text-xl text-neutral-400">
                        {description}
                    </div>
                    <div className={`w-1/2 h-full rounded-xl overflow-hidden ${src} relative`}>
                        <motion.div style={{ scale: imageScale }} className="w-full h-full bg-black/20" />
                    </div>
                </div>
            </motion.div>
        </div>
    )
}
