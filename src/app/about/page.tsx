'use client'
import { motion, useScroll, useSpring } from 'framer-motion'
import { Badge } from '@/components/ui/badge'
import { TIMELINE_DATA } from '@/data/experience'
import { Briefcase, Zap, Trophy } from 'lucide-react'
import { useRef } from 'react'
import PassionsSection from '@/components/features/PassionsSection'



export default function AboutPage() {
    const containerRef = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({ target: containerRef })
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    })

    return (
        <div ref={containerRef} className="relative min-h-screen bg-black text-white selection:bg-primary/30">
            {/* Scroll Progress Bar */}
            <motion.div
                className="fixed top-0 left-0 right-0 h-1 bg-primary z-50 origin-left"
                style={{ scaleX }}
            />

            <div className="container mx-auto px-6 py-32 md:py-48 relative z-10">
                {/* HEADER */}
                <div className="mb-32">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center"
                    >
                        <h1 className="text-6xl md:text-9xl font-black uppercase tracking-tighter mb-8 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/50">
                            About Me.
                        </h1>
                        <p className="text-2xl md:text-3xl font-light text-muted-foreground mb-4 max-w-2xl mx-auto leading-relaxed">
                            Le parcours d&apos;un <span className="text-primary font-medium">Alternant</span> passionné.
                            <br />
                            <span className="text-lg md:text-xl opacity-80 mt-2 block">Toujours un pied en entreprise, un pied à l&apos;école.</span>
                        </p>
                    </motion.div>
                </div>

                {/* TIMELINE SECTION */}
                <div className="mb-40">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-black uppercase mb-6 flex items-center justify-center gap-3">
                            <Briefcase className="text-primary w-8 h-8 md:w-12 md:h-12" /> Expérience
                        </h2>
                        <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                            5 ans d&apos;expérience cumulée entre alternance, freelance et projets personnels. Une montée en compétence constante.
                        </p>
                    </div>

                    <div className="relative max-w-5xl mx-auto">
                        {/* Central Timeline Line (Desktop) */}
                        <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent -translate-x-1/2" />

                        {[...TIMELINE_DATA].reverse().map((item, index) => (
                            <div key={index} className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-8 md:gap-16 items-center mb-16 md:mb-24 last:mb-0 group">

                                {/* LEFT COLUMN: Work Experience */}
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true, margin: "-100px" }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    className="md:text-right"
                                >
                                    <div className="flex flex-col md:flex-row-reverse md:items-baseline gap-2 mb-2 justify-end">
                                        <h3 className="text-2xl font-bold text-white group-hover:text-primary transition-colors">{item.work.role}</h3>
                                        <span className="text-sm font-mono text-neutral-400 whitespace-nowrap">@ {item.work.company}</span>
                                    </div>
                                    <p className="text-neutral-300 leading-relaxed mb-4 ml-auto max-w-lg">
                                        {item.work.desc}
                                    </p>
                                    <div className="flex flex-wrap gap-2 justify-start md:justify-end">
                                        {item.work.stack.map((skill: string) => (
                                            <Badge key={skill} variant="outline" className="text-xs bg-white/10 text-neutral-200 border-white/20 hover:bg-white/20 transition-colors">
                                                {skill}
                                            </Badge>
                                        ))}
                                    </div>
                                </motion.div>

                                {/* CENTER: Timeline Point */}
                                <div className="hidden md:flex flex-col items-center justify-center relative">
                                    <div className="w-4 h-4 rounded-full bg-neutral-900 border-2 border-white/20 group-hover:border-primary group-hover:scale-125 transition-all duration-300 z-10 shadow-[0_0_10px_rgba(255,255,255,0.1)]" />
                                    <div className="absolute top-1/2 left-8 md:left-auto md:top-auto md:translate-y-8 font-mono text-xs text-neutral-400 whitespace-nowrap bg-neutral-900/90 px-3 py-1.5 rounded-full border border-white/10 shadow-xl">
                                        {item.year}
                                    </div>
                                </div>

                                {/* RIGHT COLUMN: Education */}
                                <motion.div
                                    initial={{ opacity: 0, x: 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true, margin: "-100px" }}
                                    transition={{ duration: 0.5, delay: index * 0.1 + 0.1 }}
                                    className="relative pl-8 md:pl-0 border-l md:border-l-0 border-white/10 md:border-none"
                                >
                                    {/* Mobile Timeline Dot */}
                                    <div className="md:hidden absolute -left-[5px] top-2 w-2.5 h-2.5 rounded-full bg-neutral-800 group-hover:bg-primary transition-colors" />

                                    <div className="flex flex-col gap-1 mb-2">
                                        <h3 className="text-xl font-bold text-white group-hover:text-purple-400 transition-colors">{item.school.name}</h3>
                                        <span className="text-sm font-mono text-purple-300">{item.school.degree}</span>
                                    </div>
                                    <p className="text-neutral-300 text-sm leading-relaxed mb-3 opacity-90 max-w-lg">
                                        {item.school.desc}
                                    </p>
                                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-white/10 text-[10px] font-bold uppercase tracking-wider text-white border border-white/10">
                                        {item.school.status}
                                    </div>
                                </motion.div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* SKILLS SECTION (Only Tech Stack as standalone) */}
                <div className="mt-32 grid grid-cols-1 lg:grid-cols-2 gap-20">
                    <div>
                        <h3 className="text-2xl font-bold uppercase mb-12 flex items-center gap-3">
                            <Zap className="text-yellow-500" /> Stack Technique
                        </h3>
                        <div className="space-y-8">
                            {[
                                { name: "Frontend & CMS", skills: ["Next.js", "React", "Vue.js", "TypeScript", "TailwindCSS", "GSAP", "Three.js", "WordPress", "Shopify"] },
                                { name: "Backend", skills: ["Node.js", "NestJS", "Express", "Rust", "Go", "PostgreSQL", "Prisma"] },
                                { name: "DevOps & Quality", skills: ["Docker", "Vercel", "Git", "Figma", "Suite Atlassian", "Linear", "CI/CD", "Testing E2E/Unit"] }
                            ].map((cat, i) => (
                                <div key={i}>
                                    <h4 className="text-sm font-mono text-neutral-500 uppercase tracking-wider mb-4">{cat.name}</h4>
                                    <div className="flex flex-wrap gap-3">
                                        {cat.skills.map(skill => (
                                            <Badge key={skill} className="bg-neutral-900 hover:bg-white hover:text-black py-2 px-4 border-white/10 transition-all cursor-default">
                                                {skill}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* FREELANCE SECTION */}
                <div className="mb-40 mt-32 border-y border-white/10 py-24 bg-white/[0.02]">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div className="pl-4 lg:pl-0">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 text-green-500 text-xs font-bold uppercase tracking-widest mb-8 animate-pulse border border-green-500/20">
                                <span className="w-2 h-2 rounded-full bg-green-500" /> Open to Work
                            </div>
                            <h2 className="text-4xl md:text-5xl font-black uppercase mb-8 leading-tight">
                                Freelance <span className="text-primary">&</span> Consulting
                            </h2>
                            <p className="text-lg text-neutral-300 leading-relaxed mb-10 max-w-lg">
                                Je mets mon expertise technique au service de vos projets. Disponible pour des missions courtes ou de l&apos;accompagnement long terme.
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12">
                                {[
                                    { title: "Fullstack Dev", desc: "React, Next.js, Node.js" },
                                    { title: "App. Mobile", desc: "React Native, Expo" },
                                    { title: "IoT & Embarqué", desc: "C++, Python, Arduino" },
                                    { title: "Tech Consulting", desc: "Audit & Architecture" }
                                ].map((service, i) => (
                                    <div key={i} className="flex flex-col group">
                                        <h4 className="font-bold text-white flex items-center gap-3 text-lg mb-2 group-hover:text-primary transition-colors">
                                            <Zap size={18} className="text-yellow-500" /> {service.title}
                                        </h4>
                                        <p className="text-sm text-neutral-400 pl-8 leading-relaxed">{service.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="relative h-full min-h-[400px] rounded-3xl bg-gradient-to-br from-neutral-900 to-black border border-white/10 p-10 flex items-center justify-center overflow-hidden group hover:border-primary/50 transition-colors duration-500">
                            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20" />
                            <div className="relative z-10 text-center">
                                <h3 className="text-4xl font-bold mb-4">Un projet en tête ?</h3>
                                <p className="text-neutral-400 mb-10 max-w-xs mx-auto text-lg">Discutons de vos besoins et construisons quelque chose d&apos;unique.</p>
                                <a href="/contact" className="inline-block bg-white text-black px-10 py-4 rounded-full font-black uppercase hover:scale-105 transition-transform hover:bg-primary shadow-lg shadow-white/10">
                                    Me contacter
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* PASSIONS */}
                <div className="mt-40 mb-20">
                    <h3 className="text-2xl font-black uppercase mb-12 flex items-center gap-3 justify-center md:justify-start">
                        <Trophy className="text-yellow-500" /> Passions & Intérêts
                    </h3>
                    <PassionsSection />
                </div>

            </div>
        </div>
    )
}
