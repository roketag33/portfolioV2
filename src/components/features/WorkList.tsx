'use client'
import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ProjectCard3D } from '@/components/ui/project-card-3d'
import { PROJECTS, Project } from '@/data/projects'
import { cn } from '@/lib/utils'

import Link from 'next/link'
import { Button } from '@/components/ui/button'

interface WorkListProps {
    limit?: number
    className?: string
    title?: string
    showHeader?: boolean
}

export default function WorkList({ limit, className, title = "Selected Projects", showHeader = true }: WorkListProps) {
    const [activeCategory, setActiveCategory] = useState('All')

    const categories = useMemo(() => {
        const cats = ['All', ...Array.from(new Set(PROJECTS.map(p => p.category)))]
        return cats
    }, [])

    const filteredProjects = useMemo(() => {
        if (activeCategory === 'All') return PROJECTS
        return PROJECTS.filter(p => p.category === activeCategory)
    }, [activeCategory])

    const displayedProjects = limit ? filteredProjects.slice(0, limit) : filteredProjects

    return (
        <section className={cn("py-32 px-4 md:px-12 border-t border-border/40", className)}>
            {showHeader && (
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="mb-16"
                >
                    <h2 className="text-[10vw] font-black uppercase leading-none opacity-5 text-foreground">WORKS</h2>
                    <div className="text-xl md:text-2xl font-light uppercase tracking-widest -mt-4 ml-2 text-foreground">
                        {title}
                    </div>
                </motion.div>
            )}

            {/* Category Filter */}
            {!limit && (
                <div className="flex flex-wrap gap-2 mb-12 justify-center">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={cn(
                                "px-4 py-2 rounded-full text-sm uppercase tracking-wider transition-all duration-300 border",
                                activeCategory === cat
                                    ? "bg-foreground text-background border-foreground font-bold"
                                    : "bg-transparent text-muted-foreground border-border hover:border-foreground/50 hover:text-foreground"
                            )}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            )}

            <motion.div
                layout
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
                <AnimatePresence mode="popLayout">
                    {displayedProjects.map((project, i) => (
                        <motion.div
                            key={project.id}
                            layout
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.3 }}
                        >
                            <ProjectCard3D
                                title={project.title}
                                category={project.category}
                                image={project.image}
                                year={project.year}
                                desc={project.desc}
                                tags={project.tags}
                                href={project.github}
                                priority={i < 2}
                            />
                        </motion.div>
                    ))}
                </AnimatePresence>
            </motion.div>

            {limit && (
                <div className="mt-16 flex justify-center">
                    <Link href="/work">
                        <Button variant="outline" size="lg" className="rounded-full px-8 text-lg border-border hover:bg-secondary hover:scale-105 transition-all text-foreground">
                            View All Projects
                        </Button>
                    </Link>
                </div>
            )}
        </section>
    )
}
