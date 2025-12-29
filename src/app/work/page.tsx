'use client'
import { motion } from 'framer-motion'
import WorkCatalog from '@/components/features/WorkCatalog'

export default function WorkPage() {
    return (
        <main className="min-h-screen bg-background text-foreground">
            {/* Introduction Section */}
            <section className="pt-32 pb-20 px-6 md:px-12 max-w-7xl mx-auto">
                <motion.div
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-1 md:grid-cols-2 gap-12 items-end"
                >
                    <div className="relative">
                        <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-[0.8]">
                            <div className="overflow-hidden mb-2">
                                <motion.span
                                    className="inline-block"
                                    variants={{
                                        hidden: { y: 100, rotateX: 90, opacity: 0 },
                                        visible: { y: 0, rotateX: 0, opacity: 1, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
                                    }}
                                >
                                    Selected
                                </motion.span>
                            </div>
                            <div className="overflow-hidden">
                                <motion.span
                                    className="inline-block text-neutral-400"
                                    variants={{
                                        hidden: { y: 100, rotateX: 90, opacity: 0 },
                                        visible: { y: 0, rotateX: 0, opacity: 1, transition: { duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] } }
                                    }}
                                >
                                    Works
                                </motion.span>
                            </div>
                        </h1>
                        <motion.span
                            variants={{
                                hidden: { opacity: 0, scale: 0.8, rotate: -45 },
                                visible: { opacity: 1, scale: 1, rotate: -12, transition: { delay: 0.6, duration: 0.5, type: "spring" } }
                            }}
                            className="absolute -top-4 -right-4 md:right-auto md:left-full md:top-2 text-xs font-mono tracking-widest text-neutral-500 border border-neutral-200 rounded px-2 py-1 bg-white/50 backdrop-blur-sm transform origin-bottom-left"
                        >
                            2020—2025
                        </motion.span>
                    </div>

                    <div className="space-y-6">
                        <motion.div
                            variants={{
                                hidden: { opacity: 0, y: 20 },
                                visible: { opacity: 1, y: 0, transition: { delay: 0.4, duration: 0.8 } }
                            }}
                        >
                            <p className="text-xl md:text-2xl font-light leading-relaxed text-neutral-600">
                                A collection of digital architectures and robust systems.
                                Engineered for <span className="text-emerald-600 font-medium">performance</span>,
                                designed for <span className="text-black font-medium">humans</span>.
                            </p>
                        </motion.div>

                        <motion.div
                            variants={{
                                hidden: { scaleX: 0, originX: 0 },
                                visible: { scaleX: 1, transition: { delay: 0.6, duration: 0.8, ease: "circOut" } }
                            }}
                            className="h-px w-full bg-gradient-to-r from-neutral-200 to-transparent"
                        />

                        <motion.p
                            variants={{
                                hidden: { opacity: 0 },
                                visible: { opacity: 1, transition: { delay: 0.8, duration: 0.8 } }
                            }}
                            className="text-sm font-mono text-neutral-400 uppercase tracking-widest flex items-center gap-2"
                        >
                            <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                            Scroll to explore the catalog
                        </motion.p>
                    </div>
                </motion.div>
            </section>

            {/* Catalog Section */}
            <WorkCatalog />

        </main>
    )
}
