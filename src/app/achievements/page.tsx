'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { useGamification } from '@/context/GamificationContext'
import { ACHIEVEMENTS } from '@/lib/achievements'
import { Badge } from '@/components/ui/badge'
import { Trophy, Lock } from 'lucide-react'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function AchievementsPage() {
    const { unlocked, score } = useGamification()
    const allAchievements = Object.values(ACHIEVEMENTS)

    return (
        <main className="min-h-screen pt-32 pb-20 px-6 bg-background text-foreground flex flex-col items-center">

            <div className="w-full max-w-4xl mb-12 flex items-center justify-between">
                <Link href="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                    <ArrowLeft size={20} />
                    Home
                </Link>
                <div className="flex items-center gap-2">
                    <Trophy className="text-yellow-500" />
                    <span className="text-2xl font-bold">{score} XP</span>
                </div>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-16"
            >
                <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-4">
                    Trophy Room
                </h1>
                <p className="text-xl text-muted-foreground">
                    Your collection of digital milestones.
                </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-4xl">
                {allAchievements.map((achievement, index) => {
                    const isUnlocked = unlocked.includes(achievement.id)
                    const isSecret = achievement.secret && !isUnlocked

                    return (
                        <motion.div
                            key={achievement.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className={`
                                relative p-6 rounded-xl border flex items-center gap-6 overflow-hidden
                                ${isUnlocked
                                    ? 'bg-card border-primary/20 shadow-[0_0_30px_-10px_var(--primary)]'
                                    : 'bg-card/50 border-white/5 opacity-50'
                                }
                            `}
                        >
                            {/* Icon */}
                            <div className={`
                                text-4xl w-16 h-16 flex items-center justify-center rounded-full bg-background border
                                ${isUnlocked ? 'border-primary/50' : 'border-white/10 grayscale'}
                            `}>
                                {isUnlocked ? achievement.icon : <Lock size={20} />}
                            </div>

                            {/* Content */}
                            <div className="flex-1">
                                <div className="flex justify-between items-start mb-1">
                                    <h3 className={`font-bold text-lg ${isSecret ? 'blur-sm select-none' : ''}`}>
                                        {isSecret ? 'Hidden Achievement' : achievement.title}
                                    </h3>
                                    {isUnlocked && (
                                        <Badge variant="outline" className="border-primary/50 text-primary">
                                            +{achievement.xp} XP
                                        </Badge>
                                    )}
                                </div>
                                <p className={`text-sm text-muted-foreground ${isSecret ? 'blur-sm select-none' : ''}`}>
                                    {isSecret ? '???' : achievement.description}
                                </p>
                            </div>

                            {/* Unlocked Glow Effect */}
                            {isUnlocked && (
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent pointer-events-none" />
                            )}
                        </motion.div>
                    )
                })}
            </div>
        </main>
    )
}
