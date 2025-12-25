'use client'
import { motion } from 'framer-motion'
import BlogList from '@/components/features/BlogList'
import { useGamification } from '@/context/GamificationContext'
import { useState } from 'react'
import { cn } from '@/lib/utils'

export default function BlogPage() {
    const { unlock } = useGamification()
    const [neonColor, setNeonColor] = useState<string>('')

    const handleAmpersandClick = () => {
        const colors = [
            'text-pink-500 drop-shadow-[0_0_10px_rgba(236,72,153,0.8)]',
            'text-cyan-500 drop-shadow-[0_0_10px_rgba(6,182,212,0.8)]',
            'text-green-500 drop-shadow-[0_0_10px_rgba(34,197,94,0.8)]',
            'text-yellow-500 drop-shadow-[0_0_10px_rgba(234,179,8,0.8)]',
            'text-purple-500 drop-shadow-[0_0_10px_rgba(168,85,247,0.8)]'
        ]
        const randomColor = colors[Math.floor(Math.random() * colors.length)]
        setNeonColor(randomColor)
        unlock('NEON_VIBES')
    }

    return (
        <main className="min-h-screen pt-24 pb-20 px-6 bg-background text-foreground">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-16"
                >
                    <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter mb-4">
                        Thoughts <br className="md:hidden" />
                        <span
                            onClick={handleAmpersandClick}
                            className={cn(
                                "cursor-pointer transition-all duration-300 inline-block hover:scale-110 select-none",
                                neonColor || "text-foreground hover:text-primary"
                            )}
                            style={neonColor ? { textShadow: '0 0 20px currentColor' } : undefined}
                        >
                            <span className={neonColor}>&</span>
                        </span>
                        <br />Insights
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
