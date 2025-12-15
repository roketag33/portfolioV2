'use client'
import React, { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import Image from 'next/image';
import Link from 'next/link';

interface ProjectCard3DProps {
    title: string;
    category: string;
    image: string;
    year: string;
    desc?: string;
    tags?: string[];
    priority?: boolean;
    href?: string;
}

export const ProjectCard3D = ({ title, category, image, year, desc, tags, priority = false, href }: ProjectCard3DProps) => {
    const cardRef = useRef<HTMLDivElement>(null);

    // Mouse position state
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    // Spring physics for smooth rotation
    const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [25, -25]), { stiffness: 150, damping: 20 });
    const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-25, 25]), { stiffness: 150, damping: 20 });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;

        const rect = cardRef.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;

        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        const xPct = (mouseX / width) - 0.5;
        const yPct = (mouseY / height) - 0.5;

        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    const CardContent = (
        <motion.div
            ref={cardRef}
            style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="relative group w-full aspect-[4/5] md:aspect-[3/4] rounded-xl bg-secondary/20 backdrop-blur-sm border border-white/5 cursor-pointer perspective-1000"
            initial="initial"
            whileHover="hover"
            whileTap="hover"
        >
            {/* Background Image Layer - Depth 1 */}
            <div
                style={{ transform: 'translateZ(-50px)' }}
                className="absolute inset-0 rounded-xl overflow-hidden"
            >
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent z-10" />

                {/* Image Scale and Blur on Hover */}
                <motion.div
                    className="w-full h-full"
                    variants={{
                        initial: { scale: 1, filter: 'blur(0px)' },
                        hover: { scale: 1.1, filter: 'blur(4px)' }
                    }}
                    transition={{ duration: 0.4 }}
                >
                    <Image
                        src={image}
                        alt={title}
                        fill
                        className="object-cover transition-transform duration-500 will-change-transform"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        priority={priority}
                    />
                </motion.div>
            </div>

            {/* Reflection/Glare - Depth 2 */}
            <div
                style={{ transform: 'translateZ(20px)' }}
                className="absolute inset-0 rounded-xl bg-gradient-to-tr from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-20 mix-blend-overlay"
            />

            {/* Content Layer - Depth 3 (Floating) */}
            <div
                style={{ transform: 'translateZ(60px)' }}
                className="absolute inset-0 p-6 flex flex-col justify-end z-30"
            >
                <motion.div
                    variants={{
                        initial: { y: 0 },
                        hover: { y: -20 }
                    }}
                    transition={{ duration: 0.3 }}
                >
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-white/80 text-sm font-mono tracking-wider uppercase">{category}</span>
                        <span className="text-white/60 text-xs font-mono border border-white/20 px-2 py-1 rounded-full">{year}</span>
                    </div>

                    <h3 className="text-2xl font-bold text-white mb-2 leading-tight group-hover:text-white transition-colors">
                        {title}
                    </h3>

                    {/* Description and Tags Reveal on Hover */}
                    {(desc || tags) && (
                        <motion.div
                            variants={{
                                initial: { opacity: 0, height: 0, marginTop: 0 },
                                hover: { opacity: 1, height: 'auto', marginTop: 8 }
                            }}
                            transition={{ duration: 0.3, delay: 0.1 }}
                            className="overflow-hidden"
                        >
                            {desc && (
                                <p className="text-sm text-gray-300 line-clamp-3 mb-3">
                                    {desc}
                                </p>
                            )}

                            {tags && tags.length > 0 && (
                                <div className="flex flex-wrap gap-2">
                                    {tags.slice(0, 3).map((tag, i) => (
                                        <span key={i} className="text-[10px] uppercase tracking-wider text-white bg-white/10 px-2 py-1 rounded border border-white/20">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </motion.div>
                    )}
                </motion.div>
            </div>

            {/* Border Glow - Depth 4 */}
            <div
                style={{ transform: 'translateZ(40px)' }}
                className="absolute inset-0 rounded-xl ring-1 ring-white/10 group-hover:ring-primary/50 transition-all duration-300 pointer-events-none"
            />
        </motion.div>
    );

    if (href) {
        return (
            <Link href={href} className="block w-full h-full focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background rounded-xl">
                {CardContent}
            </Link>
        )
    }

    return CardContent;
};
