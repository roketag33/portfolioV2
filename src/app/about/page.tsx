'use client'
import { motion, useScroll, useSpring, useTransform } from 'framer-motion'
import { Badge } from '@/components/ui/badge'
import { TIMELINE_DATA } from '@/data/experience'
import { useGamification } from '@/context/GamificationContext'
import { cn } from '@/lib/utils'
import { Briefcase, GraduationCap, Gamepad2, Code, Trophy, Star, Zap, Dumbbell, UtensilsCrossed, Atom, Cpu } from 'lucide-react'
import { useRef } from 'react'

const SKILLS_CATEGORIES = [
    { name: "Frontend", skills: ["Next.js", "React", "TypeScript", "TailwindCSS", "GSAP", "Three.js"] },
    { name: "Mobile", skills: ["React Native", "Flutter"] },
    { name: "Backend", skills: ["Node.js", "NestJS", "Symfony", "PHP", "Go", "Rust", "C/C++", "PostgreSQL", "GraphQL"] },
    { name: "DevOps & Cloud", skills: ["Docker", "Podman", "Kubernetes", "Portainer", "GitHub/GitLab Actions", "Git"] },
    { name: "AI & Innovation", skills: ["LLMs", "Transformers", "MCP", "RAG", "Chainlit"] }
]

export default function AboutPage() {
    const { unlock } = useGamification()
    const containerRef = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end end"]
    })

    // Smooth scroll progress for the main line
    const scaleY = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    })

    // Reverse to show Oldest -> Newest 
    const orderedTimeline = [...TIMELINE_DATA].reverse()

    return (
        <main className="min-h-screen pt-32 pb-40 px-6 bg-background text-foreground overflow-hidden relative" ref={containerRef}>
            {/* Background Decoration - Subtler */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] translate-x-1/2 -translate-y-1/2 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-secondary/5 rounded-full blur-[120px] -translate-x-1/2 translate-y-1/2 pointer-events-none" />

            <div className="max-w-7xl mx-auto w-full relative z-10">

                {/* HERO */}
                <div className="mb-40 text-center relative">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/40">
                            About Me.
                        </h1>
                        <p className="text-2xl md:text-3xl font-light text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                            Le parcours d&apos;un <span className="text-primary font-medium">Alternant</span> passionné.
                            <br />
                            <span className="text-lg md:text-xl opacity-80 mt-2 block">Toujours un pied en entreprise, un pied à l&apos;école.</span>
                        </p>
                    </motion.div>
                </div>

                {/* LUMINOUS TIMELINE */}
                <div className="relative">
                    <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground/50 mb-32 text-center">Chronological Journey</h2>

                    <div className="relative">
                        {/* Central Track (Background) */}
                        <div className="absolute left-[20px] md:left-1/2 top-0 bottom-0 w-[2px] -translate-x-1/2 bg-white/5 hidden md:block" />

                        {/* Progressive Fill Line (Foreground) */}
                        <motion.div
                            className="absolute left-[20px] md:left-1/2 top-0 w-[2px] -translate-x-1/2 bg-gradient-to-b from-primary via-purple-500 to-blue-500 hidden md:block origin-top shadow-[0_0_15px_rgba(var(--primary),0.5)]"
                            style={{ scaleY, height: '100%' }}
                        />

                        {/* Mobile Line (Simple Guide) */}
                        <div className="absolute left-[20px] top-0 bottom-0 w-[2px] bg-white/10 md:hidden" />

                        <div className="space-y-24 pb-24">
                            {orderedTimeline.map((item, i) => (
                                <TimelineRow key={item.year} item={item} index={i} unlock={unlock} />
                            ))}

                            {/* Final Dot */}
                            <div className="relative grid md:grid-cols-[1fr_auto_1fr] gap-8 items-center">
                                <div className="hidden md:block" />
                                <div className="absolute left-[20px] top-0 md:static md:w-16 flex justify-center -translate-x-1/2 md:translate-x-0">
                                    <div className="w-3 h-3 rounded-full bg-white/20" />
                                </div>
                                <div className="hidden md:block" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* SKILLS & FREELANCE */}
                <div className="mt-32 grid md:grid-cols-2 gap-12 lg:gap-20 items-start">
                    {/* Skills */}
                    <div>
                        <h3 className="text-2xl font-black uppercase mb-8 flex items-center gap-3">
                            <Code className="text-primary" /> Stack
                        </h3>
                        <div className="space-y-8">
                            {SKILLS_CATEGORIES.map((category, catIndex) => (
                                <div key={category.name}>
                                    <h4 className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-4 pl-1">{category.name}</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {category.skills.map((skill, i) => (
                                            <motion.div
                                                key={skill}
                                                initial={{ opacity: 0, scale: 0.8 }}
                                                whileInView={{ opacity: 1, scale: 1 }}
                                                viewport={{ once: true }}
                                                transition={{ delay: (catIndex * 0.2) + (i * 0.05) }}
                                            >
                                                <Badge variant="secondary" className="px-3 py-1 bg-white/5 hover:bg-white/10 transition-colors text-sm font-normal text-muted-foreground hover:text-foreground cursor-default border border-white/5">
                                                    {skill}
                                                </Badge>
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Freelance & Services */}
                    <div className="bg-gradient-to-br from-white/5 to-transparent p-8 rounded-3xl border border-white/5 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-4 opacity-50">
                            <Briefcase className="w-24 h-24 text-white/5 -rotate-12 transform translate-x-8 -translate-y-8" />
                        </div>

                        <div className="flex items-center gap-3 mb-6">
                            <div className="bg-green-500/10 text-green-500 p-2 rounded-lg">
                                <Zap size={20} />
                            </div>
                            <h3 className="text-xl font-bold uppercase tracking-tight">Freelance</h3>
                            <Badge className="ml-auto bg-green-500/20 text-green-500 border-green-500/30 hover:bg-green-500/30">Open to Work</Badge>
                        </div>

                        <p className="text-muted-foreground leading-relaxed mb-8">
                            En parallèle de mon alternance, j'accompagne startups et entreprises dans leurs défis techniques.
                        </p>

                        <div className="space-y-4">
                            {[
                                { title: "Fullstack Dev", desc: "React, Next.js, Node.js" },
                                { title: "MVP & SaaS", desc: "De l'idée au produit" },
                                { title: "UI/UX Design", desc: "Interfaces modernes & fluides" },
                                { title: "Tech Consulting", desc: "Audit & Architecture" }
                            ].map((s, i) => (
                                <div key={i} className="flex items-center gap-4 p-3 rounded-xl bg-white/5 border border-white/5 hover:border-primary/30 transition-colors">
                                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                                    <div>
                                        <div className="font-bold text-sm">{s.title}</div>
                                        <div className="text-xs text-muted-foreground">{s.desc}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* PASSIONS */}
                <div className="mt-32">
                    <h3 className="text-2xl font-black uppercase mb-12 flex items-center gap-3 justify-center md:justify-start">
                        <Trophy className="text-yellow-500" /> Autres Univers
                    </h3>

                    {/* PASSIONS - Minimalist Accent Design */}
                    <div className="mt-32">
                        <h3 className="text-2xl font-black uppercase mb-16 flex items-center gap-3 justify-center md:justify-start">
                            <Trophy className="text-yellow-500" /> Autres Univers
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
                            {/* Sport */}
                            <div className="group">
                                <div className="flex items-start gap-6">
                                    <div className="hidden md:block w-px h-24 bg-gradient-to-b from-red-500 to-transparent opacity-50 group-hover:opacity-100 transition-opacity" />
                                    <div className="flex-1">
                                        <div className="flex items-center gap-4 mb-4">
                                            <Dumbbell className="text-red-500 w-6 h-6" />
                                            <h4 className="text-xl font-bold uppercase tracking-tight">Sport & Discipline</h4>
                                        </div>
                                        <div className="space-y-4 text-neutral-400">
                                            <div className="flex flex-col sm:flex-row sm:items-baseline gap-2">
                                                <span className="text-xs font-bold text-red-400 uppercase tracking-widest min-w-[100px]">Pratiquant</span>
                                                <p className="text-sm text-neutral-300">Streetlifting, Powerlifting, Calisthénie.</p>
                                            </div>
                                            <div className="flex flex-col sm:flex-row sm:items-baseline gap-2">
                                                <span className="text-xs font-bold text-red-500/60 uppercase tracking-widest min-w-[100px]">Fan</span>
                                                <p className="text-sm text-neutral-400">MMA (UFC), Boxe Anglaise.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Gaming */}
                            <div className="group">
                                <div className="flex items-start gap-6">
                                    <div className="hidden md:block w-px h-24 bg-gradient-to-b from-purple-500 to-transparent opacity-50 group-hover:opacity-100 transition-opacity" />
                                    <div className="flex-1">
                                        <div className="flex items-center gap-4 mb-4">
                                            <Gamepad2 className="text-purple-500 w-6 h-6" />
                                            <h4 className="text-xl font-bold uppercase tracking-tight">Gaming</h4>
                                        </div>
                                        <p className="text-sm text-neutral-300 leading-relaxed mb-4">
                                            Exploration de mécaniques complexes et d'univers immersifs. Le gaming affûte ma curiosité et ma résolution de problèmes.
                                        </p>
                                        <div className="flex flex-wrap gap-2">
                                            {['Rogue-like', 'RPG', 'FPS Competitif', 'Indie Gems'].map(g => (
                                                <span key={g} className="text-xs font-mono text-purple-400/80 border border-purple-500/20 px-2 py-1 rounded">
                                                    {g}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Tech */}
                            <div className="group">
                                <div className="flex items-start gap-6">
                                    <div className="hidden md:block w-px h-24 bg-gradient-to-b from-blue-500 to-transparent opacity-50 group-hover:opacity-100 transition-opacity" />
                                    <div className="flex-1">
                                        <div className="flex items-center gap-4 mb-4">
                                            <Cpu className="text-blue-500 w-6 h-6" />
                                            <h4 className="text-xl font-bold uppercase tracking-tight">Tech & Hardware</h4>
                                        </div>
                                        <ul className="text-sm text-neutral-300 space-y-2 font-light">
                                            <li className="flex items-center gap-3">
                                                <span className="w-1 h-1 bg-blue-500 rounded-full" /> Montage PC & Optimisation
                                            </li>
                                            <li className="flex items-center gap-3">
                                                <span className="w-1 h-1 bg-blue-500 rounded-full" /> IoT & Domotique (Home Assistant)
                                            </li>
                                            <li className="flex items-center gap-3">
                                                <span className="w-1 h-1 bg-blue-500 rounded-full" /> Veille IA & Ecosystème Tech
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            {/* Science & Cuisine (Merged Row for balance) */}
                            <div className="group">
                                <div className="flex items-start gap-6">
                                    <div className="hidden md:block w-px h-24 bg-gradient-to-b from-cyan-500 to-transparent opacity-50 group-hover:opacity-100 transition-opacity" />
                                    <div className="flex-1">
                                        <div className="flex items-center gap-4 mb-4">
                                            <Atom className="text-cyan-500 w-6 h-6" />
                                            <h4 className="text-xl font-bold uppercase tracking-tight">Sciences & Création</h4>
                                        </div>
                                        <div className="space-y-6">
                                            <p className="text-sm text-neutral-300 leading-relaxed">
                                                <strong className="text-white font-medium">Sciences :</strong> Fascination pour la Physique/Chimie. Comprendre le &quot;pourquoi&quot; des choses.
                                            </p>
                                            <div className="flex items-start gap-3 pt-2 text-sm text-neutral-300">
                                                <UtensilsCrossed className="text-orange-500 w-4 h-4 mt-1 shrink-0" />
                                                <p className="leading-relaxed">
                                                    <strong className="text-white font-medium">Gastronomie :</strong> Cuisiner, c'est comme coder : de la rigueur technique pour un résultat créatif.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

            </div>
        </main>
    )
}

// Sub-component for better performance & clean code
function TimelineRow({ item, index, unlock }: { item: any, index: number, unlock: any }) {
    const isFirst = index === 0
    return (
        <div className="relative grid md:grid-cols-[1fr_auto_1fr] gap-8 items-center group">

            {/* LEFT: WORK */}
            <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-20%" }}
                transition={{ duration: 0.5 }}
                className="pl-12 md:pl-0 md:text-right w-full"
            >
                <div className="relative p-6 rounded-3xl transition-all duration-300 hover:bg-white/5 border border-transparent hover:border-white/10 group-hover:translate-x-2 md:group-hover:-translate-x-2">
                    <div className="flex flex-col md:flex-row-reverse items-center md:items-start gap-4">
                        <div className="p-3 rounded-2xl bg-primary/10 text-primary shrink-0 shadow-[0_0_15px_rgba(var(--primary),0.3)]">
                            <Briefcase size={20} />
                        </div>
                        <div className="flex-1">
                            <h3 className="text-xl font-bold tracking-tight mb-1">{item.work.company}</h3>
                            <div className="text-xs font-mono text-primary uppercase tracking-wider mb-3">{item.work.role}</div>
                            <p className="text-muted-foreground text-sm leading-relaxed mb-4">{item.work.desc}</p>

                            {/* Tags */}
                            <div className="flex flex-wrap justify-center md:justify-end gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
                                {item.work.stack.map((t: string) => (
                                    <span key={t} className="px-2 py-0.5 rounded text-[10px] font-medium bg-primary/10 text-primary border border-primary/20">
                                        {t}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* CENTER: YEAR NODULE */}
            <div className="absolute left-[20px] top-0 md:static md:w-16 flex justify-center -translate-x-1/2 md:translate-x-0 h-full">
                <div className="absolute top-1/2 -translate-y-1/2 z-20" onClick={() => isFirst && unlock('TIME_TRAVELER')}>
                    <motion.div
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true, margin: "-10%" }}
                        className={cn(
                            "w-4 h-4 rounded-full border-[3px] bg-background shadow-[0_0_0_4px_rgba(0,0,0,0.5)] transition-all duration-500 cursor-pointer",
                            isFirst ? "border-primary shadow-[0_0_20px_var(--primary)] animate-pulse" : "border-muted-foreground group-hover:border-primary group-hover:scale-150"
                        )}
                    />
                    {/* Year Label - Always visible now for clarity */}
                    <div className={cn(
                        "absolute top-1/2 -translate-y-1/2 px-2 py-1 rounded border backdrop-blur text-[10px] font-mono whitespace-nowrap transition-all duration-500",
                        "left-8 md:left-auto md:right-full md:mr-6",
                        "bg-background/80 border-border text-muted-foreground group-hover:text-foreground group-hover:border-primary/50"
                    )}>
                        {item.year}
                    </div>
                </div>
            </div>

            {/* RIGHT: SCHOOL */}
            <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-20%" }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="pl-12 md:pl-0 md:text-left w-full"
            >
                <div className="relative p-6 rounded-3xl transition-all duration-300 hover:bg-white/5 border border-transparent hover:border-white/10 group-hover:translate-x-2">
                    <div className="flex flex-col md:flex-row items-center md:items-start gap-4">
                        <div className="p-3 rounded-2xl bg-purple-500/10 text-purple-500 shrink-0 shadow-[0_0_15px_rgba(168,85,247,0.3)]">
                            <GraduationCap size={20} />
                        </div>
                        <div className="flex-1">
                            <h3 className="text-xl font-bold tracking-tight mb-1">{item.school.name}</h3>
                            <div className="text-xs font-mono text-purple-400 uppercase tracking-wider mb-3">{item.school.degree}</div>
                            <p className="text-muted-foreground text-sm leading-relaxed mb-2 opacity-80">{item.school.desc}</p>
                            <div className="opacity-60 text-[10px] uppercase tracking-widest font-semibold text-purple-300 mt-2">
                                {item.school.status}
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>

        </div>
    )
}
