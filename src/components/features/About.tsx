'use client'
import { motion } from 'framer-motion'
import { Badge } from '@/components/ui/badge'

const EXPERIENCES = [
    {
        year: '2025 - Present',
        title: 'Alternant Expert SI',
        company: 'BPCE Solutions',
        desc: 'Développement Fullstack & Architecture SI. Master Expert en Systèmes d\'information (Sup de Vinci).'
    },
    {
        year: '2024 - Present',
        title: 'Développeur Freelance',
        company: 'Indépendant',
        desc: 'Missions NestJS, Next.js, Flutter, Docker. Création de solutions sur mesure.'
    },
    {
        year: '2024 - 2025',
        title: 'Développeur Full Stack',
        company: 'Elemate Technologies',
        desc: 'Stack: Vue.js, Symfony, jQuery. Maintenance et évolution d\'applications web.'
    },
    {
        year: '2023 - 2024',
        title: 'Développeur Full Stack',
        company: 'Boby',
        desc: 'Stack: Symfony, PHP, Docker, Materialize CSS. Développement orienté objet et tests (Jest/Cypress).'
    },
    {
        year: '2021 - 2022',
        title: 'Développeur Logiciels',
        company: 'AQUITEM',
        desc: 'Support client Back Office, correction de bugs et développement de fonctionnalités (WinDev).'
    },
    {
        year: '2018 - 2021',
        title: 'Électrotechnicien',
        company: 'Compagnons du Devoir',
        desc: 'Maintenance systèmes connectés (Hôtel de Police Bordeaux). Vision hardware/software précieuse pour l\'IoT.'
    }
]

const SKILLS = [
    "Next.js", "React", "TypeScript", "Node.js", "NestJS", "Docker", "Flutter", "Symfony", "PostgreSQL", "GraphQL", "TailwindCSS", "GSAP"
]

export default function About() {
    return (
        <section id="about" className="min-h-screen py-20 px-6 bg-foreground text-background relative flex flex-col justify-center">
            <div className="max-w-7xl mx-auto w-full grid md:grid-cols-2 gap-16">

                {/* BIO & TIMELINE */}
                <div>
                    <motion.h2
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="text-6xl font-black mb-12 uppercase tracking-tighter"
                    >
                        About Me
                    </motion.h2>

                    <div className="space-y-12">
                        {EXPERIENCES.map((exp, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.2 }}
                                className="border-l-2 border-background/20 pl-6 relative"
                            >
                                <div className="absolute top-0 left-[-5px] w-2 h-2 bg-background rounded-full" />
                                <span className="text-sm font-bold opacity-50">{exp.year}</span>
                                <h3 className="text-2xl font-bold mt-1">{exp.title} @ {exp.company}</h3>
                                <p className="mt-2 opacity-80 max-w-sm">{exp.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* SKILLS */}
                <div className="flex flex-col justify-center">
                    <motion.h3
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="text-4xl font-bold mb-8 uppercase"
                    >
                        Tech Stack
                    </motion.h3>

                    <div className="flex flex-wrap gap-3">
                        {SKILLS.map((skill, i) => (
                            <motion.div
                                key={skill}
                                initial={{ opacity: 0, scale: 0 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.05 }}
                            >
                                <Badge variant="outline" className="text-lg py-2 px-4 border-background/30 text-background hover:bg-background hover:text-foreground transition-colors cursor-default">
                                    {skill}
                                </Badge>
                            </motion.div>
                        ))}
                    </div>

                    <div className="mt-12 bg-background/5 p-8 rounded-2xl">
                        <h4 className="text-2xl font-bold mb-4">Passions & Interests</h4>
                        <p className="opacity-80 leading-relaxed">
                            Au-delà du code, je suis passionné par l&apos;UI Design, les nouvelles technologies, et le monde du Gaming.
                            J&apos;aime créer des expériences qui marquent les esprits.
                        </p>
                    </div>
                </div>

            </div>
        </section>
    )
}
