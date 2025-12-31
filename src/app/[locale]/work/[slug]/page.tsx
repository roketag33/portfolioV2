'use client'

import { useParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowLeft, Github, ExternalLink, Code2, Tag } from 'lucide-react'
import { PROJECTS } from '@/data/projects'
// import { cn } from '@/lib/utils'
import MagneticButton from '@/components/ui/magnetic-button'

export default function ProjectDetail() {
    const params = useParams()
    // const router = useRouter()
    const slug = params.slug as string

    const project = PROJECTS.find(p => p.id === slug)

    const { scrollYProgress } = useScroll()
    const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.2])
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.5])

    if (!project) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground">
                <h1 className="text-4xl font-bold mb-4">Project Not Found</h1>
                <Link href="/work" className="text-primary hover:underline">
                    Back to Works
                </Link>
            </div>
        )
    }

    const nextProjectIndex = (PROJECTS.findIndex(p => p.id === slug) + 1) % PROJECTS.length
    const nextProject = PROJECTS[nextProjectIndex]

    return (
        <main className="min-h-screen bg-background text-foreground selection:bg-emerald-500/30">
            {/* Navigation */}
            <nav className="fixed top-0 left-0 right-0 z-50 p-6 flex justify-between items-center mix-blend-difference text-white">
                <Link href="/work" className="flex items-center gap-2 group">
                    <div className="bg-white/10 backdrop-blur-md p-2 rounded-full group-hover:bg-white/20 transition-colors">
                        <ArrowLeft className="w-5 h-5" />
                    </div>
                    <span className="font-mono text-sm uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0 duration-300">
                        Back to Works
                    </span>
                </Link>
            </nav>

            {/* Hero Section */}
            <div className="relative h-[80vh] w-full overflow-hidden">
                <motion.div
                    style={{ scale, opacity }}
                    className="absolute inset-0"
                >
                    <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />
                </motion.div>

                <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 lg:p-24 pb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="max-w-6xl mx-auto"
                    >
                        <div className="flex flex-wrap gap-4 mb-6">
                            <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-full text-xs font-mono uppercase tracking-widest">
                                {project.category}
                            </span>
                            <span className="px-3 py-1 bg-white/10 text-neutral-300 border border-white/10 rounded-full text-xs font-mono uppercase tracking-widest">
                                {project.year}
                            </span>
                        </div>
                        <h1 className="text-5xl md:text-7xl lg:text-9xl font-black uppercase tracking-tighter text-white mb-8">
                            {project.title}
                        </h1>
                    </motion.div>
                </div>
            </div>

            {/* Content Container */}
            <div className="max-w-7xl mx-auto px-6 md:px-12 py-20">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">

                    {/* Sidebar / Info */}
                    <div className="lg:col-span-4 space-y-12">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 p-8 rounded-2xl"
                        >
                            <h3 className="text-sm font-mono uppercase tracking-widest text-neutral-500 mb-6">Project Info</h3>

                            <div className="space-y-6">
                                <div>
                                    <div className="flex items-center gap-2 text-primary mb-2">
                                        <Code2 className="w-4 h-4" />
                                        <span className="font-bold">Tech Stack</span>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {project.tags.map(tag => (
                                            <span key={tag} className="text-xs bg-background border rounded px-2 py-1 text-neutral-600">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {project.features && (
                                    <div>
                                        <div className="flex items-center gap-2 text-primary mb-2">
                                            <Tag className="w-4 h-4" />
                                            <span className="font-bold">Key Features</span>
                                        </div>
                                        <ul className="list-disc list-inside space-y-1 text-sm text-neutral-600">
                                            {project.features.map((feat, i) => (
                                                <li key={i}>{feat}</li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>

                            <div className="h-px w-full bg-neutral-200 dark:bg-neutral-800 my-8" />

                            <div className="flex flex-col gap-4">
                                {project.link && (
                                    <a href={project.link} target="_blank" rel="noopener noreferrer" className="block">
                                        <MagneticButton variant="primary" className="w-full justify-center">
                                            <ExternalLink className="w-4 h-4 mr-2" /> Live Demo
                                        </MagneticButton>
                                    </a>
                                )}
                                {project.github && (
                                    <a href={project.github} target="_blank" rel="noopener noreferrer" className="block">
                                        <MagneticButton variant="secondary" className="w-full justify-center">
                                            <Github className="w-4 h-4 mr-2" /> Source Code
                                        </MagneticButton>
                                    </a>
                                )}
                            </div>
                        </motion.div>
                    </div>

                    {/* Main Content */}
                    <div className="lg:col-span-8 space-y-16">
                        {/* Description */}
                        <div>
                            <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                                <span className="w-8 h-1 bg-emerald-500 rounded-full" />
                                About the project
                            </h3>
                            <div
                                className="prose prose-lg dark:prose-invert max-w-none text-neutral-600 dark:text-neutral-300 leading-relaxed"
                                dangerouslySetInnerHTML={{ __html: project.content || `<p>${project.desc}</p>` }}
                            />
                        </div>

                        {/* Gallery */}
                        {project.gallery && project.gallery.length > 0 && (
                            <div className="space-y-8">
                                <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                                    <span className="w-8 h-1 bg-emerald-500 rounded-full" />
                                    Gallery
                                </h3>
                                <div className="grid grid-cols-1 gap-8">
                                    {project.gallery.map((img, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ opacity: 0, y: 50 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            transition={{ delay: i * 0.1 }}
                                            viewport={{ once: true }}
                                            className="relative aspect-video rounded-xl overflow-hidden shadow-2xl border border-neutral-200 dark:border-neutral-800"
                                        >
                                            <Image
                                                src={img}
                                                alt={`${project.title} screenshot ${i + 1}`}
                                                fill
                                                className="object-cover hover:scale-105 transition-transform duration-700"
                                            />
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Next Project */}
            <Link href={`/work/${nextProject.id}`} className="block group relative h-[40vh] overflow-hidden border-t-8 border-background">
                <Image
                    src={nextProject.image}
                    alt={nextProject.title}
                    fill
                    className="object-cover opacity-40 group-hover:opacity-60 group-hover:scale-105 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-black/60 group-hover:bg-black/40 transition-colors" />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-6">
                    <span className="text-sm font-mono uppercase tracking-widest mb-4 opacity-70">Next Project</span>
                    <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-center group-hover:-translate-y-2 transition-transform duration-500">
                        {nextProject.title}
                    </h2>
                    <div className="mt-6 flex items-center gap-2 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                        <span className="font-bold text-emerald-400">View Case Study</span>
                        <ArrowLeft className="w-4 h-4 rotate-180 text-emerald-400" />
                    </div>
                </div>
            </Link>
        </main>
    )
}
