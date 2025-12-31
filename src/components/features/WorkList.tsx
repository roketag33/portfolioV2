'use client'
import { useState } from 'react'
import { PROJECTS } from '@/data/projects'
import { cn } from '@/lib/utils'
import { Link } from '@/i18n/routingConfig'
import { ArrowUpRight } from 'lucide-react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'

interface WorkListProps {
    limit?: number
    className?: string
    title?: string
    showHeader?: boolean
}

export default function WorkList({ limit, className, title = "Selected Projects", showHeader = true }: WorkListProps) {
    const t = useTranslations('Work')
    const displayedProjects = limit ? PROJECTS.slice(0, limit) : PROJECTS
    const [focusedIndex, setFocusedIndex] = useState<number | null>(null)

    return (
        <section className={cn("py-32 px-4 md:px-12", className)}>
            {showHeader && (
                <div className="mb-16 container mx-auto">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                        <span className="text-xs text-neutral-400 font-mono uppercase tracking-[0.2em]">Portfolio</span>
                    </div>
                    <h2 className="text-4xl md:text-6xl font-light tracking-tighter text-white">
                        {title}
                    </h2>
                </div>
            )}

            <div className="w-full md:h-[600px] flex flex-col md:flex-row gap-6 md:gap-2 container mx-auto">
                {displayedProjects.map((project, index) => {
                    const href = project.github || project.link || '#'

                    return (
                        <Link
                            key={project.id}
                            href={href}
                            target="_blank"
                            className={cn(
                                "relative overflow-hidden rounded-2xl transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] cursor-pointer group isolation-auto",
                                // Mobile: Fixed height stack
                                "w-full h-[450px]",
                                // Desktop: Accordion logic
                                "md:w-auto md:h-full md:flex-1",
                                // Desktop Expansion
                                focusedIndex === index ? "md:flex-[3.5]" : "md:flex-1",
                                // Dim others on interaction (Desktop only)
                                focusedIndex !== null && focusedIndex !== index && "md:opacity-40 md:grayscale hover:opacity-100 hover:grayscale-0"
                            )}
                            onMouseEnter={() => setFocusedIndex(index)}
                            onMouseLeave={() => setFocusedIndex(null)}
                        >
                            {/* Background Image */}
                            <div className="absolute inset-0 z-0">
                                <Image
                                    src={project.image}
                                    alt={project.title}
                                    fill
                                    className="object-cover transition-transform duration-1000 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-90" />
                            </div>

                            {/* Content */}
                            <div className="relative z-10 h-full flex flex-col justify-end p-8 md:p-10">
                                <div className="flex justify-between items-end transform translate-y-0 transition-transform duration-500">
                                    <div className="flex-1 min-w-0 pr-4">
                                        <div className="font-mono text-xs text-emerald-400 mb-3 overflow-hidden whitespace-nowrap opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 delay-100">
                                            {(index + 1).toString().padStart(2, '0')} — {project.category}
                                        </div>
                                        <h3 className={cn(
                                            "text-3xl md:text-5xl font-bold text-white tracking-tight leading-tight",
                                            "md:whitespace-nowrap"
                                        )}>
                                            {project.title}
                                        </h3>
                                    </div>

                                    <div className={cn(
                                        "p-4 rounded-full border border-white/20 bg-white/5 backdrop-blur-md transition-all duration-500 group-hover:bg-white group-hover:text-black",
                                        // Rotate arrow on hover
                                        "group-hover:rotate-45"
                                    )}>
                                        <ArrowUpRight className="w-6 h-6" />
                                    </div>
                                </div>

                                {/* Expanded Details */}
                                <div className={cn(
                                    "overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]",
                                    // Mobile: Always visible
                                    "max-h-[200px] opacity-100 mt-6",
                                    // Desktop: Only visible when expanded
                                    "md:max-h-0 md:opacity-0",
                                    focusedIndex === index && "md:max-h-[200px] md:opacity-100 md:mt-6"
                                )}>
                                    <p className="text-neutral-300 text-sm md:text-base leading-relaxed max-w-lg line-clamp-3 mb-6">
                                        {project.desc}
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        {project.tags.slice(0, 3).map(tag => (
                                            <span key={tag} className="text-[10px] uppercase tracking-wider px-3 py-1.5 rounded-full bg-white/10 text-white border border-white/5 backdrop-blur-sm">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </Link>
                    )
                })}
                {limit && (
                    <div className="md:hidden mt-8 flex justify-center w-full">
                        <Link href="/work" className="group flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
                            <span className="text-sm font-mono uppercase tracking-widest">{t('view_archives')}</span>
                            <ArrowUpRight className="w-4 h-4" />
                        </Link>
                    </div>
                )}
            </div>
            {limit && (
                <div className="hidden md:flex mt-12 justify-end container mx-auto">
                    <Link href="/work" className="group flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
                        <span className="text-xs font-mono uppercase tracking-widest">{t('view_all')}</span>
                        <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </Link>
                </div>
            )}
        </section>
    )
}
