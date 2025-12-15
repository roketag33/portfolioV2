'use client'
import { motion } from 'framer-motion'
import SnakeGame from '@/components/features/SnakeGame'

export default function LabPage() {
    return (
        <main className="min-h-screen pt-24 pb-20 px-6 bg-background text-foreground flex flex-col items-center">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-12"
            >
                <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter mb-4">
                    The Lab
                </h1>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                    Expérimentations, mini-jeux et concepts interactifs.
                </p>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
            >
                <SnakeGame />
            </motion.div>
        </main>
    )
}
