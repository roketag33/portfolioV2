'use client'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ArrowRight, Code, Trophy, Coffee, Calendar } from 'lucide-react'

const STATS = [
    { label: "Years Exp.", value: "5+", icon: Calendar },
    { label: "Projects", value: "15+", icon: Trophy },
    { label: "Stack", value: "Full", icon: Code },
    { label: "Coffee", value: "∞", icon: Coffee },
]

export default function About() {
    return (
        <section id="about" className="py-32 px-6 relative flex flex-col justify-center overflow-hidden bg-secondary/5 border-y border-border/40">
            {/* Background Decor */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] translate-x-1/2 -translate-y-1/2 pointer-events-none" />
             
            <div className="max-w-6xl mx-auto w-full grid md:grid-cols-2 gap-16 items-center relative z-10">
                
                {/* Left: Text & CTA */}
                <div className="text-center md:text-left">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mb-8"
                    >
                        <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tight mb-6">
                            About Me
                        </h2>
                        <p className="text-xl text-muted-foreground leading-relaxed">
                            Développeur Full Stack passionné par l'UI Design et l'expérience utilisateur. 
                            J'aime construire des applications web modernes, performantes et esthétiques.
                            Toujours à la recherche de la prochaîne technologie émergente.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                    >
                        <Link href="/about">
                            <Button size="lg" className="rounded-full text-lg px-8 py-6 bg-foreground text-background hover:bg-primary hover:text-primary-foreground transition-all duration-300 shadow-xl hover:shadow-2xl group">
                                Découvrir mon parcours
                                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </Link>
                    </motion.div>
                </div>

                {/* Right: Stats Grid */}
                <div className="grid grid-cols-2 gap-4">
                    {STATS.map((stat, i) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 + 0.3 }}
                            className="bg-background/40 backdrop-blur-sm border border-white/10 p-6 rounded-2xl flex flex-col items-center justify-center gap-2 hover:bg-background/60 hover:border-primary/20 transition-colors"
                        >
                            <stat.icon className="text-primary opacity-80 mb-2" size={32} />
                            <span className="text-4xl font-black">{stat.value}</span>
                            <span className="text-sm font-mono text-muted-foreground uppercase tracking-widest">{stat.label}</span>
                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    )
}
