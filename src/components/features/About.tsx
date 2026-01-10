'use client'
import { motion } from 'framer-motion'
import BentoGrid from '@/components/features/BentoGrid'
import { useGamification } from '@/context/GamificationContext'
import { useVisualEffects } from '@/context/VisualEffectsContext'


import { useTranslations } from 'next-intl'

export default function About() {
    const { unlock } = useGamification()
    const { toggleXRay } = useVisualEffects()
    const t = useTranslations('HomePage.About')

    return (
        <section className="py-20 md:py-32 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

            <div className="w-full max-w-[1920px] mx-auto relative z-10 px-6">
                <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
                    {/* Text Content - Left 3 cols */}
                    <div className="lg:col-span-3 space-y-8">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-4xl md:text-5xl font-black uppercase tracking-tighter"
                        >
                            {t.rich('title', {
                                highlight: (chunks) => <span className="text-primary">{chunks}</span>
                            })}
                        </motion.h2>

                        <div className="space-y-6 text-muted-foreground text-base leading-relaxed">
                            {/* We use standard rich text for full control over translation styling */}
                            <p className="text-muted-foreground">
                                {t.rich('description_part1', {
                                    strong: (chunks) => <strong className="text-foreground font-bold">{chunks}</strong>,
                                    span: (chunks) => <span className="text-neutral-500">{chunks}</span>,
                                    br: () => <br />
                                })}
                            </p>

                            <p>
                                {t.rich('description_part2', {
                                    strong: (chunks) => (
                                        <span
                                            onClick={() => { unlock('ARCHITECT_VISION'); toggleXRay() }}
                                            className="font-bold text-foreground cursor-help hover:text-blue-500 transition-colors"
                                        >
                                            {chunks}
                                        </span>
                                    )
                                })}
                            </p>
                            <p className="text-foreground font-medium">
                                {t('current_location')}
                            </p>
                        </div>
                    </div>

                    {/* Bento Grid - Right 9 cols */}
                    <div className="lg:col-span-9 w-full">
                        <BentoGrid />
                    </div>
                </div>
            </div>
        </section>
    )
}
