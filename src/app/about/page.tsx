'use client'
import { motion } from 'framer-motion'
import { Badge } from '@/components/ui/badge'
import { GraduationCap, Briefcase, Code, Terminal, Gamepad2, Award, Calendar } from 'lucide-react'

// Split Timeline Data
const TIMELINE_DATA = [
    {
        year: '2025 - Present',
        work: {
            company: 'BPCE Solutions',
            role: 'Alternant Expert SI',
            desc: 'Architecture SI, Dev Fullstack & Intégration dans une grande structure bancaire.',
            stack: ['Java', 'Angular', 'Architecture']
        },
        school: {
            name: 'Sup de Vinci',
            degree: 'Master Expert SI (M2)',
            desc: 'Architecture logicielle, Management & Stratégie SI. (Année 2/2)',
            status: 'En cours'
        }
    },
    {
        year: '2024 - 2025',
        work: {
            company: 'Elemate',
            role: 'Développeur Full Stack',
            desc: 'Maintenance & Évolution d\'applications web complexes. Stack legacy & moderne.',
            stack: ['Vue.js', 'Symfony', 'jQuery']
        },
        school: {
            name: 'Sup de Vinci',
            degree: 'Master Expert SI (M1)',
            desc: 'Début du Cycle Master. Approfondissement Technique & Chef de projet.',
            status: 'Validé'
        }
    },
    {
        year: '2023 - 2024',
        work: {
            company: 'Boby',
            role: 'Développeur Full Stack',
            desc: 'Immersion start-up. Développement produit intensif, tests E2E et CI/CD.',
            stack: ['Symfony', 'PHP', 'Docker', 'Jest']
        },
        school: {
            name: 'Wild Code School',
            degree: 'Concepteur d\'Application',
            desc: 'Formation intensive "Concepteur Développeur d\'Application" (Bac+3/4).',
            status: 'Diplômé'
        }
    },
    {
        year: '2021 - 2022',
        work: {
            company: 'AQUITEM',
            role: 'Développeur Logiciels',
            desc: 'Support & Maintenance applicative. Rigueur et gestion de la dette technique.',
            stack: ['WinDev', 'SQL']
        },
        school: {
            name: 'CESI',
            degree: 'Développeur Informatique',
            desc: 'Titre RNCP Niv 5. Bases solides en algorithmique et développement web.',
            status: 'Diplômé'
        }
    },
    {
        year: '2018 - 2021',
        work: {
            company: 'Hôtel de Police',
            role: 'Électrotechnicien',
            desc: 'Maintenance systèmes connectés & sécurité. La genèse de mon intérêt pour l\'IoT.',
            stack: ['Hardware', 'Réseau']
        },
        school: {
            name: 'Compagnons du Devoir',
            degree: 'Bac Pro MELEC',
            desc: 'Excellence, Rigueur et Apprentissage par la pratique.',
            status: 'Diplômé'
        }
    }
]

const SKILL_CATS = [
    {
        title: "Core Stack",
        skills: ["React", "Next.js", "TypeScript", "Node.js", "NestJS"]
    },
    {
        title: "Backend & Ops",
        skills: ["Docker", "PostgreSQL", "Symfony", "GraphQL", "Git"]
    },
    {
        title: "Creative & UI",
        skills: ["TailwindCSS", "GSAP", "Framer Motion", "Three.js (Learning)"]
    }
]

export default function AboutPage() {
    return (
        <main className="min-h-screen pt-32 pb-20 px-6 bg-background text-foreground overflow-x-hidden">
            <div className="max-w-6xl mx-auto">

                {/* HERO */}
                <div className="mb-32 text-center md:text-left">
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-7xl md:text-9xl font-black uppercase tracking-tighter mb-8"
                    >
                        About<br />Me.
                    </motion.h1>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="text-2xl md:text-3xl font-light text-muted-foreground max-w-2xl leading-relaxed"
                    >
                        Le parcours d'un <span className="text-primary font-medium">Alternant</span> passionné.
                        <br />
                        Toujours un pied en entreprise, un pied à l'école.
                    </motion.div>
                </div>

                {/* SPLIT TIMELINE */}
                <div className="mb-40 relative">
                    <h2 className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-16 text-center">My Journey (Work / Study)</h2>

                    {/* Center Line (Hidden on mobile) */}
                    <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white/10 -translate-x-1/2 hidden md:block" />

                    <div className="space-y-24">
                        {TIMELINE_DATA.map((item, i) => (
                            <motion.div
                                key={item.year}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                className="relative grid md:grid-cols-2 gap-8 md:gap-24"
                            >
                                {/* Year Badge (Center) */}
                                <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 z-10 hidden md:flex flex-col items-center">
                                    <Badge variant="outline" className="bg-background border-primary/50 text-primary px-4 py-1 text-lg font-bold">
                                        {item.year}
                                    </Badge>
                                </div>

                                {/* Mobile Year */}
                                <div className="md:hidden flex justify-center mb-4">
                                    <Badge variant="outline" className="bg-background border-primary/50 text-primary px-4 py-1 text-lg font-bold">
                                        {item.year}
                                    </Badge>
                                </div>

                                {/* LEFT: WORK */}
                                <div className="text-center md:text-right p-6 bg-white/5 md:bg-transparent rounded-2xl md:rounded-none border md:border-none border-white/5">
                                    <div className="flex flex-col md:flex-row-reverse items-center md:items-start gap-4 mb-2">
                                        <Briefcase className="text-primary shrink-0" size={24} />
                                        <div>
                                            <h3 className="text-2xl font-bold">{item.work.company}</h3>
                                            <p className="text-sm font-mono text-muted-foreground uppercase">{item.work.role}</p>
                                        </div>
                                    </div>
                                    <p className="opacity-70 text-sm md:text-base leading-relaxed mb-4">
                                        {item.work.desc}
                                    </p>
                                    <div className="flex flex-wrap justify-center md:justify-end gap-2">
                                        {item.work.stack.map(s => (
                                            <span key={s} className="text-xs text-muted-foreground bg-white/5 px-2 py-1 rounded">
                                                {s}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* RIGHT: SCHOOL */}
                                <div className="text-center md:text-left p-6 bg-white/5 md:bg-transparent rounded-2xl md:rounded-none border md:border-none border-white/5">
                                    <div className="flex flex-col md:flex-row items-center md:items-start gap-4 mb-2">
                                        <GraduationCap className="text-purple-400 shrink-0" size={24} />
                                        <div>
                                            <h3 className="text-2xl font-bold">{item.school.name}</h3>
                                            <p className="text-sm font-mono text-muted-foreground uppercase">{item.school.degree}</p>
                                        </div>
                                    </div>
                                    <p className="opacity-70 text-sm md:text-base leading-relaxed mb-4">
                                        {item.school.desc}
                                    </p>
                                    <div className="flex justify-center md:justify-start">
                                        <Badge variant="secondary" className="text-xs bg-purple-500/10 text-purple-400 hover:bg-purple-500/20">
                                            {item.school.status}
                                        </Badge>
                                    </div>
                                </div>

                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* SKILLS */}
                <div className="grid md:grid-cols-[1fr_2fr] gap-12 mb-32">
                    <div>
                        <h2 className="text-sm font-bold uppercase tracking-widest text-muted-foreground sticky top-32">Tech Stack</h2>
                    </div>
                    <div className="grid gap-12">
                        {SKILL_CATS.map((cat, i) => (
                            <motion.div
                                key={cat.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                            >
                                <h3 className="text-xl font-bold mb-6 border-b border-white/10 pb-2">{cat.title}</h3>
                                <div className="flex flex-wrap gap-3">
                                    {cat.skills.map(skill => (
                                        <Badge key={skill} variant="secondary" className="px-4 py-2 text-md bg-white/5 hover:bg-white/10 transition-colors">
                                            {skill}
                                        </Badge>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* PERSONAL */}
                <div className="bg-white/5 rounded-3xl p-12 border border-white/10 relative overflow-hidden">
                    <div className="relative z-10 max-w-2xl">
                        <h2 className="text-4xl font-bold uppercase mb-6 flex items-center gap-4">
                            <Gamepad2 size={40} className="text-primary" />
                            Beyond Code
                        </h2>
                        <p className="text-xl opacity-80 leading-relaxed">
                            Quand je ne code pas, je suis probablement en train d'analyser l'UX d'un nouveau jeu vidéo, de bidouiller de l'électronique (merci mon passé d'électrotechnicien), ou de composer de la musique via MAO.
                        </p>
                        <div className="mt-8 flex gap-4">
                            <Badge variant="outline" className="border-primary/50 text-primary">Gaming</Badge>
                            <Badge variant="outline" className="border-primary/50 text-primary">UI Design</Badge>
                            <Badge variant="outline" className="border-primary/50 text-primary">IoT</Badge>
                        </div>
                    </div>

                    {/* Abstract Decor */}
                    <div className="absolute right-0 top-0 w-64 h-64 bg-primary/10 blur-[100px] rounded-full" />
                </div>

            </div>
        </main>
    )
}
