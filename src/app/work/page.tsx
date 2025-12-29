'use client'
import { motion } from 'framer-motion'
import WorkCatalog from '@/components/features/WorkCatalog'

export default function WorkPage() {
    return (
        <main className="min-h-screen bg-background text-foreground">
            {/* Introduction Section */}
            <section className="pt-32 pb-20 px-6 md:px-12 max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-12 items-end"
                >
                    <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-[0.8] relative">
                        Selected<br />
                        <span className="text-neutral-400">Works</span>
                        <span className="absolute -top-4 -right-4 md:right-auto md:left-full md:top-2 text-xs font-mono tracking-widest text-neutral-500 border border-neutral-200 rounded px-2 py-1 bg-white/50 backdrop-blur-sm -rotate-12 transform origin-bottom-left">2020—2025</span>
                    </h1>

                    <div className="space-y-6">
                        <p className="text-xl md:text-2xl font-light leading-relaxed text-neutral-600">
                            A collection of digital architectures and robust systems.
                            Engineered for <span className="text-emerald-600 font-medium">performance</span>,
                            designed for <span className="text-black font-medium">humans</span>.
                        </p>
                        <div className="h-px w-full bg-gradient-to-r from-neutral-200 to-transparent" />
                        <p className="text-sm font-mono text-neutral-400 uppercase tracking-widest flex items-center gap-2">
                            <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                            Scroll to explore the catalog
                        </p>
                    </div>
                </motion.div>
            </section>

            {/* Catalog Section */}
            <WorkCatalog />

        </main>
    )
}
