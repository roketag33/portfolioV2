'use client'
import { motion } from 'framer-motion'
import { useGamification } from '@/context/GamificationContext'
import { useState } from 'react'
import { Trophy, Code, Coffee, Calendar } from 'lucide-react'
import SystemBlueprint from '@/components/features/SystemBlueprint'

const STATS = [
    { label: "Years Exp.", value: "5+", icon: Calendar },
    { label: "Projects", value: "15+", icon: Trophy },
    { label: "Stack", value: "Full", icon: Code },
    { label: "Coffee", value: "∞", icon: Coffee },
]

export default function About() {
    const { unlock } = useGamification()
    const [coffeeClicks, setCoffeeClicks] = useState(0)

    const handleStatClick = (label: string) => {
        if (label === 'Coffee') {
            const newClicks = coffeeClicks + 1
            setCoffeeClicks(newClicks)
            if (newClicks === 5) {
                unlock('COFFEE_ADDICT')
            }
        }
    }

    return (
        <section className="py-20 md:py-32 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

            <div className="container relative z-10">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    {/* Text Content */}
                    <div className="space-y-8">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-3xl md:text-5xl font-black uppercase tracking-tighter"
                        >
                            About <span className="text-primary">Me</span>
                        </motion.h2>

                        <div className="space-y-4 text-muted-foreground text-lg leading-relaxed">
                            <p>
                                I&apos;m a software engineer passionate about building robust, scalable systems.
                                My mission is to solve complex problems by bridging the gap between
                                hardware and the cloud.
                            </p>
                            <p>
                                From low-level IoT firmware to distributed microservices and mobile apps,
                                I design end-to-end architectures. I obsesse over performance,
                                security, and clean code.
                            </p>
                        </div>

                        {/* Stats Grid */}
                        <div className="grid grid-cols-2 gap-4">
                            {STATS.map((stat, i) => (
                                <motion.div
                                    key={stat.label}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    onClick={() => handleStatClick(stat.label)}
                                    className="p-4 rounded-2xl bg-secondary/30 border border-secondary hover:bg-secondary/50 transition-colors cursor-pointer group"
                                >
                                    <stat.icon className="w-6 h-6 text-primary mb-2 group-hover:scale-110 transition-transform" />
                                    <div className="text-2xl font-bold">{stat.value}</div>
                                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Image/Visual - Placeholder for now using colors */}
                    {/* Image/Visual - System Blueprint */}
                    <div className="relative h-[500px] w-full rounded-3xl overflow-hidden bg-black/40 border border-white/5 backdrop-blur-sm">
                        <SystemBlueprint />
                    </div>
                </div>
            </div>
        </section>
    )
}
