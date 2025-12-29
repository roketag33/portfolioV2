'use client'

import { motion, useScroll, useTransform, MotionValue } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { PROJECTS, Project } from '@/data/projects'
import { useRef, useMemo } from 'react'
import { cn } from '@/lib/utils'

export default function WorkCatalog() {
    const containerRef = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    })

    // Parallax transforms for columns
    const y1 = useTransform(scrollYProgress, [0, 1], [0, 0])
    const y2 = useTransform(scrollYProgress, [0, 1], [0, -100])
    const y3 = useTransform(scrollYProgress, [0, 1], [0, -50])

    // Split projects into 3 columns using useMemo
    const columns = useMemo(() => {
        const cols: Project[][] = [[], [], []]
        PROJECTS.forEach((project, i) => {
            cols[i % 3].push(project)
        })
        return cols
    }, [])

    return (
        <div ref={containerRef} className="pb-40">
            {/* Desktop Grid (3 Cols) */}
            <div className="hidden md:flex gap-8 group/grid px-8 md:px-12 lg:px-20 -mt-20">
                <Column projects={columns[0]} y={y1} className="mt-0" delay={0} />
                <Column projects={columns[1]} y={y2} className="-mt-12" delay={0.1} />
                <Column projects={columns[2]} y={y3} className="mt-12" delay={0.2} />
            </div>

            {/* Mobile/Tablet Grid (1 Col) */}
            <div className="md:hidden flex flex-col gap-8 px-8">
                {PROJECTS.map((project, i) => (
                    <ProjectCard key={project.id} project={project} index={i} />
                ))}
            </div>
        </div>
    )
}

function Column({ projects, y, className, delay }: { projects: Project[], y: MotionValue<number>, className?: string, delay: number }) {
    return (
        <motion.div style={{ y }} className={cn("flex flex-col gap-8 w-1/3", className)}>
            {projects.map((project, i) => (
                <ProjectCard key={project.id} project={project} index={i} columnDelay={delay} />
            ))}
        </motion.div>
    )
}

function ProjectCard({ project, index, columnDelay = 0 }: { project: Project, index: number, columnDelay?: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: columnDelay + (index * 0.1), ease: "easeOut" }}
        >
            <Link
                href={project.link || project.github || '#'}
                target="_blank"
                className="block group/card relative aspect-[3/4] overflow-hidden bg-neutral-900 transition-all duration-500 group-hover/grid:contrast-50 group-hover/grid:brightness-50 group-hover/grid:hover:contrast-100 group-hover/grid:hover:brightness-100 group-hover/grid:hover:scale-[1.02] group-hover/grid:hover:z-10 shadow-2xl rounded-sm"
            >
                <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover/card:scale-110"
                />

                {/* Overlay Info - High Contrast */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                    <div className="transform translate-y-4 group-hover/card:translate-y-0 transition-transform duration-300">
                        <div className="flex justify-between items-end mb-2">
                            <h3 className="text-xl font-bold text-white uppercase tracking-tight">{project.title}</h3>
                            <ArrowUpRight className="text-emerald-400 w-5 h-5 mb-1 opacity-0 group-hover/card:opacity-100 transition-opacity delay-100" />
                        </div>

                        <div className="flex flex-wrap gap-2 mb-3">
                            {project.tags.slice(0, 3).map((tag) => (
                                <span key={tag} className="text-[10px] font-mono uppercase tracking-wider text-black bg-white px-2 py-1 rounded font-bold">
                                    {tag}
                                </span>
                            ))}
                        </div>

                        <p className="text-xs text-neutral-200 line-clamp-3 leading-relaxed font-medium">
                            {project.desc}
                        </p>
                    </div>
                </div>
            </Link>
        </motion.div>
    )
}
