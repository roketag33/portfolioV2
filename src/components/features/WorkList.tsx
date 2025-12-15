'use client'
import { motion } from 'framer-motion'
import ProjectCard3D from '@/components/ui/project-card-3d'
import { PROJECTS } from '@/data/projects'
import { cn } from '@/lib/utils'

import Link from 'next/link'
import { Button } from '@/components/ui/button'

interface WorkListProps {
    limit?: number
    className?: string
    title?: string
}

export default function WorkList({ limit, className, title = "Selected Projects" }: WorkListProps) {
    const displayedProjects = limit ? PROJECTS.slice(0, limit) : PROJECTS

    return (
        <section className={cn("py-32 px-4 md:px-12 border-t border-white/5", className)}>
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="mb-16"
            >
                <h2 className="text-[10vw] font-black uppercase leading-none opacity-10">WORKS</h2>
                <div className="text-xl md:text-2xl font-light uppercase tracking-widest -mt-4 ml-2">
                    {title}
                </div>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {displayedProjects.map((project, i) => (
                    <motion.div
                        key={i}
                        key={index}
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.2 }}
                    >
                        <ProjectCard3D
                            title={project.title}
                            category={project.category}
                            image={project.image}
                            year={project.year}
                            desc={project.desc}
                            tags={project.tags}
                            href={project.github}
                            priority={index < 2}
                        />
                    </motion.div>
                ))}
            </div>

            {limit && (
                <div className="mt-16 flex justify-center">
                    <Link href="/work">
                        <Button variant="outline" size="lg" className="rounded-full px-8 text-lg border-white/20 hover:bg-white/10 hover:scale-105 transition-all">
                            View All Projects
                        </Button>
                    </Link>
                </div>
            )}
        </section>
    )
}
