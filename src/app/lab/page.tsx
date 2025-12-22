'use client'
import { motion } from 'framer-motion'
import { ProjectCard3D } from '@/components/ui/project-card-3d'

const EXPERIMENTS = [
    {
        id: '3d-card',
        title: 'Abstract Matter v3',
        category: 'R3F / Material Editor',
        image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80',
        href: '/lab/3d-card',
        description: 'Interactive object with real-time PBR material physics & code export.',
        year: '2025'
    },
    {
        id: 'crypto',
        title: 'Crypto Pulse',
        category: 'Real-time / WebSocket',
        image: 'https://images.unsplash.com/photo-1642104704074-907c0698cbd9?w=800&q=80',
        href: '/lab/crypto',
        description: 'Live Bitcoin price dashboard with glassmorphism UI.',
        year: '2025'
    },
    {
        id: 'lumina',
        title: 'Lumina Canvas',
        category: 'Generative Art / Canvas',
        image: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=800&q=80',
        href: '/lab/lumina',
        description: 'Neon particle system with fluid physics and image export.',
        year: '2025'
    },
    {
        id: 'echo',
        title: 'Echo Grid',
        category: 'Audio / R3F',
        image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=800&q=80',
        href: '/lab/echo',
        description: '3D music sequencer with reactive visuals and synth engine.',
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
