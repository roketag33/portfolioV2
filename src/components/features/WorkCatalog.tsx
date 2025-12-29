'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight, Github } from 'lucide-react'
import { PROJECTS, Project } from '@/data/projects'
import { useRef } from 'react'

export default function WorkCatalog() {
    return (
        <div className="flex flex-col gap-0 bg-background">
            {PROJECTS.map((project, index) => (
                <ProjectSection key={project.id} project={project} index={index} />
            ))}
        </div>
    )
}

function ProjectSection({ project, index }: { project: Project, index: number }) {
    const containerRef = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    })

    const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 1, 1.1])
    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.6, 1, 1, 0.6])

    return (
        <section
            ref={containerRef}
            className="relative min-h-screen flex flex-col md:flex-row w-full border-t border-white/10"
        >
            {/* --- Sticky Title Column (Left on Desktop) --- */}
            <div className="w-full md:w-1/2 h-[50vh] md:h-screen sticky top-0 flex flex-col justify-between p-8 md:p-12 lg:p-20 z-10 bg-background/80 backdrop-blur-sm md:bg-transparent md:backdrop-blur-none border-b md:border-b-0 md:border-r border-white/10">

                {/* Header Info */}
                <motion.div style={{ opacity }} className="flex justify-between items-start">
                    <span className="font-mono text-xs uppercase tracking-widest text-neutral-500">
                        0{index + 1} / {PROJECTS.length}
                    </span>
                    <span className="font-mono text-xs uppercase tracking-widest text-emerald-500">
                        {project.year}
                    </span>
                </motion.div>

                {/* Main Title */}
                <div className="flex flex-col gap-6">
                    <h2 className="text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter leading-[0.9] text-white break-words">
                        {project.title}
                    </h2>

                    <div className="flex flex-wrap gap-2 text-xs font-mono uppercase tracking-wider text-neutral-400">
                        {project.tags.map((t: string) => (
                            <span key={t} className="px-3 py-1 rounded-full border border-white/10 bg-white/5">
                                {t}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Footer / Links */}
                <motion.div style={{ opacity }} className="flex flex-col gap-4">
                    <p className="text-lg text-neutral-400 font-light leading-relaxed max-w-md">
                        {project.desc}
                    </p>

                    <div className="flex gap-6 mt-4">
                        {project.link && (
                            <Link href={project.link} target="_blank" className="group flex items-center gap-2 text-white hover:text-emerald-400 transition-colors">
                                <span className="uppercase tracking-widest text-sm font-bold border-b border-white/20 pb-1 group-hover:border-emerald-400">Live Demo</span>
                                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
                            </Link>
                        )}
                        {project.github && (
                            <Link href={project.github} target="_blank" className="group flex items-center gap-2 text-neutral-500 hover:text-white transition-colors">
                                <Github className="w-4 h-4" />
                                <span className="uppercase tracking-widest text-sm font-medium">Source</span>
                            </Link>
                        )}
                    </div>
                </motion.div>
            </div>

            {/* --- Scrolling Content Column (Right on Desktop) --- */}
            <div className="w-full md:w-1/2 flex flex-col z-0">
                {/* Featured Image (Huge) */}
                <div className="h-[60vh] md:h-[80vh] w-full relative overflow-hidden group">
                    <motion.div style={{ scale }} className="relative w-full h-full">
                        <Image
                            src={project.image}
                            alt={project.title}
                            fill
                            className="object-cover"
                        />
                    </motion.div>
                    {/* Overlay Gradient */}
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
                </div>

                {/* Editorial Details / Gallery Blocks */}
                <div className="p-8 md:p-12 lg:p-20 grid grid-cols-1 gap-12 bg-neutral-950/50">
                    <div className="space-y-4">
                        <h4 className="text-xs font-mono uppercase tracking-widest text-neutral-500 mb-4">The Challenge</h4>
                        <p className="text-neutral-300 leading-relaxed">
                            Implementing high-performance rendering for complex geometries while maintaining 60 FPS on mobile devices.
                            The architecture required a complete decouple of the physics engine from the main thread.
                        </p>
                    </div>

                    <div className="space-y-4">
                        <h4 className="text-xs font-mono uppercase tracking-widest text-neutral-500 mb-4">The Solution</h4>
                        <p className="text-neutral-300 leading-relaxed">
                            Leveraging WebWorkers for physics calculations and SharedArrayBuffers for state synchronization.
                            The result is a zero-latency interactive experience that scales to thousands of entities.
                        </p>
                    </div>

                    {/* Fake Gallery Mockup (Would be real images) */}
                    <div className="grid grid-cols-2 gap-4 mt-8 opacity-50 grayscale hover:grayscale-0 transition-all duration-700">
                        <div className="aspect-square bg-neutral-900 border border-white/5 rounded-lg overflow-hidden relative">
                            <div className="absolute inset-0 flex items-center justify-center text-xs font-mono text-neutral-700">ISO_01</div>
                        </div>
                        <div className="aspect-square bg-neutral-900 border border-white/5 rounded-lg overflow-hidden relative">
                            <div className="absolute inset-0 flex items-center justify-center text-xs font-mono text-neutral-700">ISO_02</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
