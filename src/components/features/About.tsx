'use client'
import { motion } from 'framer-motion'
import BentoGrid from '@/components/features/BentoGrid'
import { useGamification } from '@/context/GamificationContext'
import { useVisualEffects } from '@/context/VisualEffectsContext'


import TextRevealByWord from '@/components/ui/text-reveal-by-word'

export default function About() {
    const { unlock } = useGamification()
    const { toggleXRay } = useVisualEffects()

    return (
        <section className="py-20 md:py-32 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

            <div className="container relative z-10">
                <div className="grid lg:grid-cols-12 gap-12 lg:gap-24 items-center">
                    {/* Text Content - Left 5 cols */}
                    <div className="lg:col-span-5 space-y-8">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-4xl md:text-6xl font-black uppercase tracking-tighter"
                        >
                            About <span className="text-primary">Me</span>
                        </motion.h2>

                        <div className="space-y-6 text-muted-foreground text-lg leading-relaxed">
                            <TextRevealByWord
                                text="I'm a software engineer passionate about building robust, scalable systems. My mission is to solve complex problems by bridging the gap between hardware and the cloud."
                                className="text-muted-foreground"
                            />
                            <p>
                                From low-level IoT firmware to distributed microservices and mobile apps,
                                I work as a Software <span onClick={() => { unlock('ARCHITECT_VISION'); toggleXRay() }} className="font-bold text-foreground cursor-help hover:text-blue-500 transition-colors">Architect</span> designing end-to-end systems. I obsesse over performance,
                                security, and clean code.
                            </p>
                            <p className="text-foreground font-medium">
                                Currently based in Bordeaux, working on next-gen web & IoT solutions.
                            </p>
                        </div>
                    </div>

                    {/* Bento Grid - Right 7 cols */}
                    <div className="lg:col-span-7">
                        <BentoGrid />
                    </div>
                </div>
            </div>
        </section>
    )
}
