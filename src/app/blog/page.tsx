'use client'
import { motion } from 'framer-motion'
import BlogList from '@/components/features/BlogList'

export default function BlogPage() {
    return (
        <main className="min-h-screen pt-24 pb-20 px-6 bg-background text-foreground">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-16"
                >
                    <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter mb-4">
                        Thoughts &<br />Insights
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-2xl">
                        Partage d'expériences sur le développement web, le design et l'architecture logicielle.
                    </p>
                </motion.div>

                <BlogList />
            </div>
        </main>
    )
}
