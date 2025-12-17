'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ProjectCard3D } from '@/components/ui/project-card-3d'

const EXPERIMENTS = [
    {
        id: 'snake',
        title: 'Retro Snake',
        category: 'Mini Game',
        image: 'https://images.unsplash.com/photo-1628260412297-a3377e45006f?w=800&q=80', // Arcade/Retro vibe placeholder
        href: '/lab/snake',
        description: 'Classic Snake game with achievements and arcade mode.',
        year: '2025'
    },
    {
        id: 'fractal',
        title: 'Mandelbrot',
        category: 'WebGL Shader',
        image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80', // Abstract/Fractal vibe placeholder
        href: '/lab/fractal',
        description: 'Real-time infinite zoom exploration of the Mandelbrot set.',
        year: '2025'
    }
]

export default function LabPage() {
    return (
        <main className="min-h-screen pt-32 pb-20 px-6 bg-background text-foreground flex flex-col items-center">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-20"
            >
                <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter mb-4">
                    The Lab
                </h1>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                    Digital playground for experiments, visuals, and interactive concepts.
                </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl">
                {EXPERIMENTS.map((exp, index) => (
                    <motion.div
                        key={exp.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 + 0.2 }}
                    >
                        <div className="h-[400px] w-full">
                            <ProjectCard3D
                                title={exp.title}
                                category={exp.category}
                                image={exp.image}
                                year={exp.year}
                                href={exp.href}
                                desc={exp.description}
                            />
                        </div>
                    </motion.div>
                ))}
            </div>
        </main>
    )
}
