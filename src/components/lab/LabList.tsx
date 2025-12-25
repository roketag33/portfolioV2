'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import { Project } from './types';
import { useGamification } from '@/context/GamificationContext';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface LabListProps {
    projects: Project[];
    setHoveredProject: (project: Project | null) => void;
}

export default function LabList({ projects, setHoveredProject }: LabListProps) {
    const { unlock, unlocked } = useGamification()

    // Check for LAB_MASTER
    useEffect(() => {
        if (
            unlocked.includes('MAD_SCIENTIST') &&
            unlocked.includes('SYSTEM_MELTDOWN') &&
            unlocked.includes('THE_ARCHIVIST')
        ) {
            unlock('LAB_MASTER')
        }
    }, [unlocked, unlock])

    // --- MAD SCIENTIST STATE ---
    const [viewedProjects, setViewedProjects] = useState<Set<string>>(new Set())

    // --- SYSTEM MELTDOWN STATE ---
    const [titleClicks, setTitleClicks] = useState(0)
    const [glitchText, setGlitchText] = useState("Experiments_")

    // --- THE ARCHIVIST STATE ---
    const [isClassified, setIsClassified] = useState(false)

    // Handle Project Hover
    const handleProjectHover = (project: Project) => {
        setHoveredProject(project)

        if (!viewedProjects.has(project.id)) {
            const newSet = new Set(viewedProjects)
            newSet.add(project.id)
            setViewedProjects(newSet)

            if (newSet.size === projects.length) {
                unlock('MAD_SCIENTIST')
            }
        }
    }

    // Handle Title Click (Meltdown)
    const handleTitleClick = () => {
        const newClicks = titleClicks + 1
        setTitleClicks(newClicks)

        // Glitch effect logic
        const chars = "!@#$%^&*()_+-=[]{}|;':,./<>?"
        const original = "Experiments_"

        if (newClicks < 5) {
            // Light glitch
            const glitched = original.split('').map((char, _) => {
                if (Math.random() < (newClicks * 0.1)) {
                    return chars[Math.floor(Math.random() * chars.length)]
                }
                return char
            }).join('')
            setGlitchText(glitched)
        } else if (newClicks === 5) {
            // CRASH
            unlock('SYSTEM_MELTDOWN')
            setGlitchText("S_Y_S_T_E_M___F_A_I_L_U_R_E")
            document.body.classList.add('animate-shake') // Assumes global shake utility or we add inline style
            setTimeout(() => {
                setGlitchText(original)
                setTitleClicks(0)
                document.body.classList.remove('animate-shake')
            }, 2000)
        }
    }

    // Handle Archive Double Click (Archivist)
    const handleArchiveDbClick = () => {
        if (!isClassified) {
            setIsClassified(true)
            unlock('THE_ARCHIVIST')
        }
    }

    return (
        <div className="relative z-10 flex flex-col container mx-auto px-6 pt-32 pb-24">
            <div className="mb-12 relative">
                <div className="flex items-center justify-between">
                    <motion.span
                        onDoubleClick={handleArchiveDbClick}
                        className={cn(
                            "font-mono text-xs uppercase tracking-widest block mb-2 cursor-pointer select-none transition-colors",
                            isClassified ? "text-red-500 animate-pulse font-bold" : "text-neutral-500 hover:text-neutral-300"
                        )}
                    >
                        {isClassified ? "⚠️ TOP SECRET // CLASSIFIED FILES" : "The Archive"}
                    </motion.span>

                    {isClassified && (
                        <motion.button
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            onClick={() => setIsClassified(false)}
                            className="text-xs font-mono bg-red-500/10 text-red-500 border border-red-500/20 px-3 py-1 rounded hover:bg-red-500 hover:text-black transition-colors"
                        >
                            DECLASSIFY
                        </motion.button>
                    )}
                </div>

                <h1
                    onClick={handleTitleClick}
                    className={cn(
                        "text-4xl md:text-5xl font-bold text-white tracking-tight cursor-default select-none transition-colors",
                        titleClicks > 0 && "text-red-500/80 font-mono"
                    )}
                >
                    {glitchText}
                </h1>
            </div>

            <div className="flex flex-col">
                <div className="grid grid-cols-12 gap-4 pb-4 border-b border-white/10 text-xs font-mono text-neutral-500 uppercase tracking-wider mb-2">
                    <div className="col-span-1">Idx</div>
                    <div className="col-span-5 md:col-span-6">Project</div>
                    <div className="col-span-3 md:col-span-2 text-right">Tech</div>
                    <div className="col-span-3 text-right">Year</div>
                </div>

                {projects.map((project, index) => (
                    <Link
                        key={project.id}
                        href={project.link}
                        onMouseEnter={() => handleProjectHover(project)}
                        onMouseLeave={() => setHoveredProject(null)}
                        className="group relative"
                    >
                        <motion.div
                            className={cn(
                                "grid grid-cols-12 gap-4 py-8 border-b items-center transition-colors",
                                isClassified ? "border-red-500/20 bg-red-950/10" : "border-white/5 group-hover:border-white/20"
                            )}
                            initial={{
                                opacity: 0,
                                x: index % 2 === 0 ? -50 : 50,
                                filter: 'blur(10px)'
                            }}
                            animate={{
                                opacity: 1,
                                x: 0,
                                filter: isClassified ? 'blur(4px)' : 'blur(0px)' // Blur effect when classified
                            }}
                            whileHover={isClassified ? { filter: 'blur(0px)' } : undefined}
                            transition={{
                                duration: 0.8,
                                delay: index * 0.15,
                                ease: [0.22, 1, 0.36, 1]
                            }}
                        >
                            <div className={cn("col-span-1 font-mono text-sm transition-colors", isClassified ? "text-red-500" : "text-neutral-600 group-hover:text-white")}>
                                {isClassified ? ((index + 13) * 7919).toString(16).slice(-4).toUpperCase() : String(index + 1).padStart(2, '0')}
                            </div>
                            <div className="col-span-5 md:col-span-6">
                                <h3 className={cn(
                                    "text-2xl md:text-4xl font-light tracking-tight flex items-center gap-4 transition-colors",
                                    isClassified ? "text-red-400 font-mono" : "text-neutral-300 group-hover:text-white"
                                )}>
                                    {isClassified ? "REDACTED" : project.title}
                                    {!isClassified && <ArrowUpRight className="w-5 h-5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-neutral-400" />}
                                </h3>
                            </div>
                            <div className="col-span-3 md:col-span-2 text-right hidden md:block">
                                <div className="flex flex-col items-end gap-1">
                                    {project.tech.map((t) => (
                                        <span key={t} className={cn(
                                            "text-xs font-mono px-2 py-1 rounded-sm border transition-colors",
                                            isClassified ? "bg-red-900/20 text-red-500 border-red-500/20" : "text-neutral-500 bg-neutral-900/50 border-white/5 group-hover:border-white/10"
                                        )}>
                                            {isClassified ? "ERR" : t}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <div className="col-span-3 text-right font-mono text-sm transition-colors text-neutral-500 group-hover:text-white">
                                {isClassified ? "Unknown" : project.year}
                            </div>
                        </motion.div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
