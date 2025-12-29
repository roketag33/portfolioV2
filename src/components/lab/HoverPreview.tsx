'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Project } from './types';
import Image from 'next/image';
import dynamic from 'next/dynamic';

// Dynamic imports to keep initial load light
const GravityPreview = dynamic(() => import('./previews/GravityPreview'), { ssr: false });
const PlatformerPreview = dynamic(() => import('./previews/PlatformerPreview'), { ssr: false });
const EchoPreview = dynamic(() => import('./previews/EchoPreview'), { ssr: false });

interface HoverPreviewProps {
    project: Project | null;
}

export default function HoverPreview({ project }: HoverPreviewProps) {
    return (
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-neutral-950">
            {/* Grain Overlay */}
            <div className="absolute inset-0 z-20 opacity-[0.03] pointer-events-none mix-blend-overlay"
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
            />

            <AnimatePresence mode="wait">
                {project ? (
                    <motion.div
                        key={project.id}
                        initial={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
                        animate={{ opacity: 0.4, scale: 1, filter: 'blur(0px)' }}
                        exit={{ opacity: 0, scale: 1.05, filter: 'blur(5px)' }}
                        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                        className="absolute inset-0 w-full h-full"
                    >
                        {/* Gradient Underlay based on project color */}
                        <div
                            className="absolute inset-0 z-0 opacity-40 mix-blend-color"
                            style={{ backgroundColor: project.color }}
                        />

                        <div className="relative w-full h-full">
                            {/* Dynamic Previews */}
                            {project.id === 'gravity-playground' ? (
                                <GravityPreview />
                            ) : project.id === 'neon-platformer' ? (
                                <PlatformerPreview />
                            ) : project.id === 'echo-grid' ? (
                                <EchoPreview />
                            ) : (
                                /* Default Image Fallback */
                                <Image
                                    src={project.image}
                                    alt={project.title}
                                    fill
                                    className="object-cover object-center"
                                    priority
                                />
                            )}
                        </div>

                        {/* Static Burst Transition */}
                        <motion.div
                            initial={{ opacity: 0.5 }}
                            animate={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="absolute inset-0 z-30 pointer-events-none mix-blend-overlay"
                            style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.5' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
                        />

                        {/* Radial Gradient for focus */}
                        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-neutral-950/50 z-10" />
                        <div className="absolute inset-0 bg-gradient-to-r from-neutral-950 via-transparent to-neutral-950/50 z-10" />
                    </motion.div>
                ) : (
                    <motion.div
                        key="default"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-neutral-950"
                    >
                        <div className="absolute inset-0 flex items-center justify-center opacity-5">
                            <h1 className="text-[20vw] font-bold text-white leading-none tracking-tighter select-none">
                                LAB
                            </h1>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div >
    );
}
