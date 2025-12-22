'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import { Project } from './types';

interface LabListProps {
    projects: Project[];
    setHoveredProject: (project: Project | null) => void;
}

export default function LabList({ projects, setHoveredProject }: LabListProps) {
    return (
        <div className="relative z-10 flex flex-col justify-center min-h-screen container mx-auto px-6 py-24">
            <div className="mb-12">
                <span className="font-mono text-xs text-neutral-500 uppercase tracking-widest block mb-2">
                    The Archive
                </span>
                <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
                    Experiments_
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
                        onMouseEnter={() => setHoveredProject(project)}
                        onMouseLeave={() => setHoveredProject(null)}
                        className="group relative"
                    >
                        <motion.div
                            className="grid grid-cols-12 gap-4 py-8 border-b border-white/5 items-center group-hover:border-white/20 transition-colors"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <div className="col-span-1 font-mono text-sm text-neutral-600 group-hover:text-white transition-colors">
                                {String(index + 1).padStart(2, '0')}
                            </div>
                            <div className="col-span-5 md:col-span-6">
                                <h3 className="text-2xl md:text-4xl font-light text-neutral-300 group-hover:text-white transition-colors tracking-tight flex items-center gap-4">
                                    {project.title}
                                    <ArrowUpRight className="w-5 h-5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-neutral-400" />
                                </h3>
                            </div>
                            <div className="col-span-3 md:col-span-2 text-right hidden md:block">
                                <div className="flex flex-col items-end gap-1">
                                    {project.tech.map((t) => (
                                        <span key={t} className="text-xs font-mono text-neutral-500 bg-neutral-900/50 px-2 py-1 rounded-sm border border-white/5 group-hover:border-white/10 transition-colors">
                                            {t}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <div className="col-span-3 text-right font-mono text-sm text-neutral-500 group-hover:text-white transition-colors">
                                {project.year}
                            </div>
                        </motion.div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
