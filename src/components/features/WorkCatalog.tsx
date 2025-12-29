'use client'

import { useRef, useMemo, useEffect, useState } from 'react'
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { ArrowUpRight } from 'lucide-react'
import { PROJECTS, Project } from '@/data/projects'
import { useGamification } from '@/context/GamificationContext'

export default function WorkCatalog() {
    const containerRef = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    })
    const { unlock } = useGamification()
    const lastBottomReach = useRef<number>(0)

    // Parallax transforms for columns
    const y1 = useTransform(scrollYProgress, [0, 1], [0, 0])
    const y2 = useTransform(scrollYProgress, [0, 1], [0, -100])
    const y3 = useTransform(scrollYProgress, [0, 1], [0, -50])

    // Visionary & Art Critic Logic
    useEffect(() => {
        // Art Critic: Time on page
        const timer = setTimeout(() => {
            unlock('ART_CRITIC')
        }, 120000) // 2 minutes

        // Visionary: Fast Scroll Loop
        const handleScroll = () => {
            const isBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 100
            const isTop = window.scrollY < 100

            if (isBottom) {
                lastBottomReach.current = Date.now()
            }

            if (isTop && lastBottomReach.current > 0) {
                const timeDiff = Date.now() - lastBottomReach.current
                if (timeDiff < 5000) { // < 5 seconds round trip
                    unlock('THE_VISIONARY')
                    lastBottomReach.current = 0 // Reset
                }
            }
        }

        window.addEventListener('scroll', handleScroll)
        return () => {
            window.removeEventListener('scroll', handleScroll)
            clearTimeout(timer)
        }
    }, [unlock])

    // Filter Logic
    const [activeCategory, setActiveCategory] = useState<string>("All")
    const categories = ["All", "Web Apps", "Dev Tools", "Games & Creative", "Web Design", "Mobile"]

    const filteredProjects = useMemo(() => {
        if (activeCategory === "All") return PROJECTS
        return PROJECTS.filter(p => p.category === activeCategory)
    }, [activeCategory])

    // Distribute projects into 3 columns for desktop (using filtered projects)
    const columns = useMemo(() => {
        const cols: Project[][] = [[], [], []]
        filteredProjects.forEach((project, i) => {
            cols[i % 3].push(project)
        })
        return cols
    }, [filteredProjects])

    return (
        <div ref={containerRef} className="pb-40">
            {/* Filter Bar - Premium Minimal Design */}
            <div className="flex flex-wrap justify-center gap-6 mb-20 px-6">
                {categories.map((cat) => (
                    <button
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        className={cn(
                            "relative px-2 py-1 text-sm font-mono uppercase tracking-wider transition-colors duration-300",
                            activeCategory === cat
                                ? "text-black font-bold"
                                : "text-neutral-400 hover:text-neutral-600"
                        )}
                    >
                        {cat}
                        {activeCategory === cat && (
                            <motion.div
                                layoutId="activeFilter"
                                className="absolute -bottom-2 left-0 right-0 h-0.5 bg-black"
                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            />
                        )}
                    </button>
                ))}
            </div>

            {/* Desktop Grid (3 Cols) */}
            <div className="hidden md:flex gap-8 group/grid px-8 md:px-12 lg:px-20 mt-12 min-h-[50vh]">
                <Column projects={columns[0]} y={y1} className="mt-0" colIndex={0} />
                <Column projects={columns[1]} y={y2} className="-mt-12" colIndex={1} />
                <Column projects={columns[2]} y={y3} className="mt-12" colIndex={2} />
            </div>

            {/* Mobile/Tablet Grid (1 Col) */}
            <div className="md:hidden flex flex-col gap-8 px-8 mt-12">
                {filteredProjects.map((project, i) => (
                    <ProjectCard key={project.id} project={project} index={i} variant={i % 4} />
                ))}
            </div>
        </div>
    )
}

function Column({ projects, y, className, colIndex }: { projects: Project[], y: MotionValue<number>, className?: string, colIndex: number }) {
    return (
        <motion.div style={{ y }} className={cn("flex flex-col gap-8 w-1/3", className)}>
            {projects.map((project, i) => (
                <ProjectCard
                    key={project.id}
                    project={project}
                    index={i}
                    variant={(i + colIndex) % 4}
                />
            ))}
        </motion.div>
    )
}

function ProjectCard({ project, index, variant = 0 }: { project: Project, index: number, variant?: number }) {
    const variants = [
        { initial: { opacity: 0, y: 100 }, whileInView: { opacity: 1, y: 0 } },
        { initial: { opacity: 0, x: -50, y: 50 }, whileInView: { opacity: 1, x: 0, y: 0 } },
        { initial: { opacity: 0, scale: 0.8 }, whileInView: { opacity: 1, scale: 1 } },
        { initial: { opacity: 0, x: 50, y: 50 }, whileInView: { opacity: 1, x: 0, y: 0 } },
    ]
    const selectedVariant = variants[variant]

    return (
        <motion.div
            layout // Enable layout animation for shuffling
            initial={selectedVariant.initial}
            whileInView={selectedVariant.whileInView}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: index * 0.05, ease: [0.21, 0.47, 0.32, 0.98] }}
        >
            <Link
                href={project.link || project.github || '#'}
                target="_blank"
                className="block group/card relative"
            >
                {/* Image Container - Colors Restored, Clean Shadow */}
                <div className="relative aspect-[3/4] overflow-hidden bg-neutral-100 transition-all duration-700 shadow-sm group-hover/card:shadow-xl rounded-sm">
                    <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-1000 group-hover/card:scale-105"
                    />

                    {/* Desktop Overlay - Dark Gradient for Text Contrast */}
                    <div className="hidden md:flex absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 flex-col justify-end p-8">
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
                </div>

                {/* Mobile Content */}
                <div className="md:hidden flex flex-col pt-4 space-y-3">
                    <div className="flex justify-between items-center">
                        <h3 className="text-2xl font-black text-white uppercase tracking-tighter">{project.title}</h3>
                        <ArrowUpRight className="text-emerald-500 w-5 h-5" />
                    </div>

                    <div className="flex flex-wrap gap-2">
                        {project.tags.slice(0, 3).map((tag) => (
                            <span key={tag} className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 border border-emerald-400/20 bg-emerald-400/10 px-2 py-1 rounded">
                                {tag}
                            </span>
                        ))}
                    </div>

                    <p className="text-sm text-neutral-400 leading-relaxed line-clamp-3">
                        {project.desc}
                    </p>
                </div>
            </Link>
        </motion.div>
    )
}
