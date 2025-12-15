'use client'
import { motion } from 'framer-motion'
import ProjectCard3D from '@/components/ui/project-card-3d'

const PROJECTS = [
    {
        title: 'Lootopia',
        category: 'Augmented Reality',
        desc: 'Plateforme de chasses au trésor en réalité augmentée. Intègre la géolocalisation et la gamification.',
        image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=2070&auto=format&fit=crop', // Placeholder Cyberpunk/AR
        year: '2024'
    },
    {
        title: 'Boby Solutions',
        category: 'SaaS Architecture',
        desc: 'Architecture Cloud et développement Fullstack pour une solution SaaS B2B.',
        image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop', // Abstract Tech
        year: '2023-2024'
    },
    {
        title: 'Wild Hackathon',
        category: 'Innovation',
        desc: 'Vainqueur du Hackathon Wild Code School. Prototype fonctionnel en 48h.',
        image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2670&auto=format&fit=crop', // Retro Gaming
        year: '2023'
    }
]

export default function WorkList() {
    return (
        <section className="py-32 px-4 md:px-12 border-t border-white/5">
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="mb-16"
            >
                <h2 className="text-[10vw] font-black uppercase leading-none opacity-10">WORKS</h2>
                <div className="text-xl md:text-2xl font-light uppercase tracking-widest -mt-4 ml-2">
                    Selected Projects
                </div>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {PROJECTS.map((project, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: i * 0.2 }}
                    >
                        <ProjectCard3D
                            title={project.title}
                            category={project.category}
                            image={project.image}
                        />
                    </motion.div>
                ))}
            </div>
        </section>
    )
}
