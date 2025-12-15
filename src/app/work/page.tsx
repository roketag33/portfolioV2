'use client'
import { motion } from 'framer-motion'
import WorkList from '@/components/features/WorkList'

export default function WorkPage() {
    return (
        <main className="min-h-screen pt-24 pb-20 px-6 bg-background text-foreground">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-20"
                >
                    <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter">
                        Selected<br />Works
                    </h1>
                </motion.div>

                <WorkList showHeader={false} />
            </div>
        </main>
    )
}
