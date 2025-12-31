'use client'
import { motion } from 'framer-motion'
import BlogList from '@/components/features/BlogList'
import { useGamification } from '@/context/GamificationContext'
import { useState, useRef } from 'react'
import { cn } from '@/lib/utils'

import { useTranslations } from 'next-intl'

export default function BlogPage() {
    const t = useTranslations('Blog')
    const { unlock } = useGamification()
    const [neonColor, setNeonColor] = useState<string>('')

    const [isFlickering, setIsFlickering] = useState(false)
    const timeoutRef = useRef<NodeJS.Timeout>(null)

    const handleAmpersandClick = () => {
        setIsFlickering(true)
        const colors = [
            'text-pink-500 drop-shadow-[0_0_15px_rgba(236,72,153,1)]',
            'text-cyan-500 drop-shadow-[0_0_15px_rgba(6,182,212,1)]',
            'text-green-500 drop-shadow-[0_0_15px_rgba(34,197,94,1)]',
            'text-yellow-500 drop-shadow-[0_0_15px_rgba(234,179,8,1)]',
            'text-purple-500 drop-shadow-[0_0_15px_rgba(168,85,247,1)]'
        ]
        const randomColor = colors[Math.floor(Math.random() * colors.length)]

        // Flicker effect logic
        setTimeout(() => setNeonColor(randomColor), 100)
        setTimeout(() => setNeonColor(''), 200)
        setTimeout(() => setNeonColor(randomColor), 300)
        setTimeout(() => setNeonColor(''), 350)
        setTimeout(() => {
            setNeonColor(randomColor)
            setIsFlickering(false)
        }, 500)

        unlock('NEON_VIBES')

        // Auto-off after 3 seconds
        if (timeoutRef.current) clearTimeout(timeoutRef.current)
        timeoutRef.current = setTimeout(() => {
            setNeonColor('')
        }, 3500) // 500ms flicker + 3000ms on
    }

    return (
        <main className="min-h-screen pt-24 pb-20 px-6 bg-background text-foreground">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-16"
                >
                    <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter mb-4 group relative">
                        {neonColor && (
                            <div
                                className="absolute -inset-10 bg-current opacity-5 blur-[80px] pointer-events-none transition-colors duration-1000 z-0"
                                style={{ color: neonColor.includes('pink') ? '#ec4899' : neonColor.includes('cyan') ? '#06b6d4' : neonColor.includes('green') ? '#22c55e' : neonColor.includes('yellow') ? '#eab308' : '#a855f7' }}
                            />
                        )}

                        <span className="relative z-10">{t('header_thoughts')}</span> <br className="md:hidden" />
                        <span
                            onClick={handleAmpersandClick}
                            className={cn(
                                "cursor-pointer transition-all duration-300 inline-block hover:scale-110 select-none relative z-10",
                                neonColor || "text-foreground hover:text-primary",
                                isFlickering && "animate-flicker"
                            )}
                            style={neonColor ? {
                                textShadow: '0 0 5px currentColor, 0 0 10px currentColor'
                            } : undefined}
                        >
                            <span className={neonColor}>&</span>
                        </span>
                        <br /><span className="relative z-10">{t('header_insights')}</span>
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
