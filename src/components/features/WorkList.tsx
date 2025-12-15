'use client'
import { motion } from 'framer-motion'
import { Badge } from '@/components/ui/badge'
import { ArrowUpRight } from 'lucide-react'

const PROJECTS = [
    {
        title: 'Lootopia',
        category: 'Augmented Reality / Mobile',
        desc: 'Plateforme de chasses au trésor en réalité augmentée. Intègre la géolocalisation et la gamification pour une expérience immersive.',
        stack: ['React Native', 'Node.js', 'AR Kit', 'PostgreSQL'],
        year: '2024'
    },
    {
        title: 'Freelance Solutions',
        category: 'Fullstack / Architecture',
        desc: 'Développement de solutions sur mesure pour divers clients. Applications Web performantes et Architectures Cloud.',
        stack: ['NestJS', 'Next.js', 'Docker', 'Flutter'],
        year: '2024-2025'
    },
    {
        title: 'Wild Projects',
        category: 'Hackathons / Innovation',
        desc: 'Participation à des compétitions de code. Création de prototypes innovants en équipe agile.',
        stack: ['React', 'Express', 'Agile'],
        year: '2023'
    }
]

export default function WorkList() {
    return (
        <div className="grid grid-cols-1 gap-12">
            {PROJECTS.map((project, i) => (
                <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                    className="group relative border-t border-white/10 pt-12"
                >
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                        <div className="space-y-4 max-w-2xl">
                            <div className="flex items-center gap-4 text-sm uppercase tracking-widest text-muted-foreground">
                                <span>{project.year}</span>
                                <span>•</span>
                                <span>{project.category}</span>
                            </div>

                            <h3 className="text-4xl md:text-5xl font-black uppercase group-hover:text-primary transition-colors">
                                {project.title}
                            </h3>

                            <p className="text-lg opacity-80 leading-relaxed">
                                {project.desc}
                            </p>

                            <div className="flex flex-wrap gap-2 pt-4">
                                {project.stack.map(tech => (
                                    <Badge key={tech} variant="outline" className="border-white/10 text-white/60">
                                        {tech}
                                    </Badge>
                                ))}
                            </div>
                        </div>

                        <motion.div
                            whileHover={{ scale: 1.1, rotate: 45 }}
                            className="h-16 w-16 rounded-full border border-white/20 flex items-center justify-center cursor-pointer group-hover:bg-primary group-hover:border-primary transition-colors"
                        >
                            <ArrowUpRight className="w-8 h-8 group-hover:text-black transition-colors" />
                        </motion.div>
                    </div>
                </motion.div>
            ))}
        </div>
    )
}
