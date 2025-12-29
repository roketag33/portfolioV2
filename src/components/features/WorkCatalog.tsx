'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { PROJECTS, Project } from '@/data/projects'
import { useRef, useState, useEffect } from 'react'
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

    // Split projects into 3 columns
    const [columns, setColumns] = useState<Project[][]>([[], [], []])

    useEffect(() => {
        const cols: Project[][] = [[], [], []]
        PROJECTS.forEach((project, i) => {
            cols[i % 3].push(project)
        })
        setColumns(cols)
    }, [])

    return (
        <div ref={containerRef} className="pb-40">
            {/* Desktop Grid (3 Cols) */}
            <div className="hidden md:flex gap-8 group/grid">
                <Column projects={columns[0]} y={y1} className="mt-0" />
                <Column projects={columns[1]} y={y2} className="-mt-12" />
                <Column projects={columns[2]} y={y3} className="mt-12" />
            </div>

            {/* Mobile/Tablet Grid (1 Col) - No Parallax/Complexity */}
            <div className="md:hidden flex flex-col gap-8">
                {PROJECTS.map((project) => (
                    <ProjectCard key={project.id} project={project} />
                ))}
            </div>
        </div>
    )
}

function Column({ projects, y, className }: { projects: Project[], y: any, className?: string }) {
    return (
        <motion.div style={{ y }} className={cn("flex flex-col gap-8 w-1/3", className)}>
            {projects.map((project) => (
                <ProjectCard key={project.id} project={project} />
            ))}
        </motion.div>
    )
}

function ProjectCard({ project }: { project: Project }) {
    return (
        <Link
            href={project.link || project.github || '#'}
            target="_blank"
            className="block group/card relative aspect-[3/4] overflow-hidden bg-neutral-900 transition-all duration-500 group-hover/grid:contrast-50 group-hover/grid:brightness-50 group-hover/grid:hover:contrast-100 group-hover/grid:hover:brightness-100 group-hover/grid:hover:scale-[1.02] group-hover/grid:hover:z-10 shadow-2xl"
        >
            <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover transition-transform duration-700 group-hover/card:scale-110"
            />

            {/* Overlay Info */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <div className="transform translate-y-4 group-hover/card:translate-y-0 transition-transform duration-300">
                    <div className="flex justify-between items-end mb-2">
                        <h3 className="text-xl font-bold text-white uppercase tracking-tight">{project.title}</h3>
                        <ArrowUpRight className="text-emerald-500 w-5 h-5 mb-1 opacity-0 group-hover/card:opacity-100 transition-opacity delay-100" />
                    </div>

                    <div className="flex flex-wrap gap-2 mb-3">
                        {project.tags.slice(0, 3).map((tag) => (
                            <span key={tag} className="text-[10px] font-mono uppercase tracking-wider text-neutral-300 bg-white/10 px-2 py-1 rounded">
                                {tag}
                            </span>
                        ))}
                    </div>

                    <p className="text-xs text-neutral-400 line-clamp-2 leading-relaxed">
                        {project.desc}
                    </p>
                </div>
            </div>
        </Link>
    )
}
