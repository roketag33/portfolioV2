'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence, useSpring, useMotionValue } from 'framer-motion'
import { PROJECTS } from '@/data/projects'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'

interface WorkListProps {
    limit?: number
    className?: string
    title?: string
    showHeader?: boolean
}

const ProjectRow = ({
    project,
    index,
    onHover,
    onLeave
}: {
    project: typeof PROJECTS[0],
    index: number,
    onHover: (img: string) => void,
    onLeave: () => void
}) => {
    const href = project.github || project.link || '#'

    return (
        <Link
            href={href}
            target="_blank"
            className="group w-full border-t border-white/10 last:border-b py-12 flex items-center justify-between relative z-10 hover:bg-white/[0.02] transition-colors duration-500 px-4 md:px-8"
            onMouseEnter={() => onHover(project.image)}
            onMouseLeave={onLeave}
        >
            <div className="flex items-baseline gap-8 md:gap-16">
                <span className="font-mono text-neutral-500 text-sm">{(index + 1).toString().padStart(2, '0')}</span>
                <h3 className="text-3xl md:text-5xl font-light tracking-tighter text-white group-hover:translate-x-4 transition-transform duration-500">
                    {project.title}
                </h3>
            </div>

            <div className="flex items-center gap-8 md:gap-16">
                <div className="hidden md:flex flex-col items-end">
                    <span className="text-sm font-medium text-white">{project.category}</span>
                    <span className="text-xs text-neutral-500 font-mono mt-1">{project.year}</span>
                </div>
                <div className="p-3 rounded-full border border-white/10 group-hover:bg-white group-hover:text-black transition-all duration-500">
                    <ArrowUpRight className="w-5 h-5" />
                </div>
            </div>
        </Link>
    )
}

export default function WorkList({ limit, className, title = "Selected Projects", showHeader = true }: WorkListProps) {
    const displayedProjects = limit ? PROJECTS.slice(0, limit) : PROJECTS

    // Cursor Image State
    const [activeImage, setActiveImage] = useState<string | null>(null)
    const cursorX = useMotionValue(0)
    const cursorY = useMotionValue(0)

    // Smooth physics for image follower
    const springConfig = { damping: 20, stiffness: 150, mass: 0.8 }
    const x = useSpring(cursorX, springConfig)
    const y = useSpring(cursorY, springConfig)

    useEffect(() => {
        const moveCursor = (e: MouseEvent) => {
            cursorX.set(e.clientX)
            cursorY.set(e.clientY)
        }
        window.addEventListener('mousemove', moveCursor)
        return () => window.removeEventListener('mousemove', moveCursor)
    }, [cursorX, cursorY])

    return (
        <section className={cn("py-32 px-4 md:px-0 relative", className)}>
            {/* Cursor Image Reveal */}
            <motion.div
                style={{
                    x,
                    y,
                    top: -150, // Offset to center on cursor
                    left: -200
                }}
                className="pointer-events-none fixed z-0 hidden md:block w-[400px] h-[300px] rounded-lg overflow-hidden mix-blend-difference opacity-0 data-[active=true]:opacity-100 transition-opacity duration-500"
                data-active={!!activeImage}
            >
                <AnimatePresence mode='wait'>
                    {activeImage && (
                        <motion.img
                            key={activeImage}
                            src={activeImage}
                            alt="Project Preview"
                            initial={{ scale: 1.2, opacity: 0 }}
                            animate={{ scale: 1, opacity: 0.6 }}
                            exit={{ scale: 1.2, opacity: 0 }}
                            transition={{ duration: 0.5 }}
                            className="w-full h-full object-cover grayscale"
                        />
                    )}
                </AnimatePresence>
            </motion.div>

            <div className="container mx-auto">
                {showHeader && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mb-20 px-4 md:px-8"
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                            <span className="text-xs text-neutral-400 font-mono uppercase tracking-[0.2em]">Portfolio</span>
                        </div>
                        <h2 className="text-4xl md:text-6xl font-light tracking-tighter text-white">
                            {title}
                        </h2>
                    </motion.div>
                )}

                <div className="w-full">
                    {displayedProjects.map((project, i) => (
                        <ProjectRow
                            key={project.id}
                            project={project}
                            index={i}
                            onHover={setActiveImage}
                            onLeave={() => setActiveImage(null)}
                        />
                    ))}
                </div>

                {limit && (
                    <div className="mt-20 flex justify-center">
                        <Link href="/work" className="group flex items-center gap-2 text-neutral-400 hover:text-white transition-colors duration-300">
                            <span className="text-sm font-mono uppercase tracking-widest">View All Works</span>
                            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                        </Link>
                    </div>
                )}
            </div>
        </section>
    )
}
