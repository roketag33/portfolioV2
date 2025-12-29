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
                    <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-[0.8]">
                        Selected<br />
                        <span className="text-neutral-700">Works</span><br />
                        <span className="text-xs font-mono tracking-widest text-neutral-500 align-top ml-2 mt-2 block md:inline border border-neutral-800 rounded px-2 py-1 bg-neutral-950 w-fit">2020 — 2025</span>
                    </h1>

                    <div className="space-y-6">
                        <p className="text-xl md:text-2xl font-light leading-relaxed text-neutral-200">
                            A collection of digital architectures and robust systems.
                            Engineered for <span className="text-emerald-500">performance</span>,
                            designed for <span className="text-white">humans</span>.
                        </p>
                        <div className="h-px w-full bg-gradient-to-r from-white/20 to-transparent" />
                        <p className="text-sm font-mono text-neutral-500 uppercase tracking-widest">
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
