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
    const { unlocked, score, unlock } = useGamification()
    const allAchievements = Object.values(ACHIEVEMENTS)

    React.useEffect(() => {
        const handleSelection = () => {
            const selection = window.getSelection()?.toString()
            if (selection && (selection.includes('Hidden Achievement') || selection.includes('???'))) {
                unlock('DECODER')
            }
        }

        document.addEventListener('selectionchange', handleSelection)
        return () => document.removeEventListener('selectionchange', handleSelection)
    }, [unlock])

    return (
        <main className="min-h-screen pt-32 pb-20 px-6 bg-background text-foreground flex flex-col items-center">

            <div className="w-full max-w-4xl mb-12 flex items-center justify-between">
                <Link href="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                    <ArrowLeft size={20} />
                    Home
                </Link>
                <div
                    className="flex items-center gap-2 cursor-pointer select-none active:scale-95 transition-transform"
                    onClick={() => {
                        // Magpie Logic
                        const newClicks = (Number(sessionStorage.getItem('trophyClicks') || 0)) + 1
                        sessionStorage.setItem('trophyClicks', String(newClicks))

                        // Visual feedback: SUPER SPECTACULAR SPIN
                        const icon = document.getElementById('header-trophy')
                        if (icon) {
                            icon.animate([
                                { transform: 'scale(1) rotate(0deg)', filter: 'brightness(1) drop-shadow(0 0 0 rgba(234, 179, 8, 0))' },
                                { transform: 'scale(1.5) rotate(-20deg)', offset: 0.2 },
                                { transform: 'scale(1.5) rotate(360deg)', filter: 'brightness(2) drop-shadow(0 0 20px rgba(234, 179, 8, 0.8))', offset: 0.6 },
                                { transform: 'scale(1.2) rotate(380deg)', offset: 0.8 },
                                { transform: 'scale(1) rotate(0deg)', filter: 'brightness(1) drop-shadow(0 0 0 rgba(234, 179, 8, 0))' }
                            ], {
                                duration: 800,
                                easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)' // BackOut casing
                            })
                        }

                        if (newClicks >= 5) {
                            unlock('MAGPIE')
                            sessionStorage.removeItem('trophyClicks')
                        }
                    }}
                >
                    <Trophy id="header-trophy" className="text-yellow-500 transition-transform" />
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
                            onClick={() => {
                                if (!isUnlocked) {
                                    // Locksmith Logic
                                    const newClicks = (Number(sessionStorage.getItem('lockClicks') || 0)) + 1
                                    sessionStorage.setItem('lockClicks', String(newClicks))

                                    // Visual feedback: VIOLENT SHAKE & ERROR
                                    const card = document.getElementById(`achievement-${achievement.id}`)
                                    if (card) {
                                        // Reset style first just in case
                                        card.style.transform = 'none'

                                        card.animate([
                                            { transform: 'translateX(0) rotate(0)', borderColor: 'rgba(255,255,255,0.05)', backgroundColor: 'transparent' },
                                            { transform: 'translateX(-10px) rotate(-5deg)', borderColor: 'rgba(239, 68, 68, 0.8)', backgroundColor: 'rgba(239, 68, 68, 0.1)', offset: 0.1 },
                                            { transform: 'translateX(10px) rotate(5deg)', offset: 0.2 },
                                            { transform: 'translateX(-10px) rotate(-5deg)', offset: 0.3 },
                                            { transform: 'translateX(10px) rotate(5deg)', offset: 0.4 },
                                            { transform: 'translateX(-5px) rotate(-2deg)', offset: 0.5 },
                                            { transform: 'translateX(5px) rotate(2deg)', offset: 0.6 },
                                            { transform: 'translateX(0) rotate(0)', borderColor: 'rgba(255,255,255,0.05)', backgroundColor: 'transparent' }
                                        ], {
                                            duration: 500,
                                            easing: 'ease-in-out'
                                        })
                                    }

                                    if (newClicks >= 10) {
                                        unlock('LOCKSMITH')
                                        sessionStorage.removeItem('lockClicks')
                                    }
                                }
                            }}
                            id={`achievement-${achievement.id}`}
                            className={`
                                relative p-6 rounded-xl border flex items-center gap-6 overflow-hidden transition-all
                                ${isUnlocked
                                    ? 'bg-card border-primary/20 shadow-[0_0_30px_-10px_var(--primary)]'
                                    : 'bg-card/50 border-white/5 opacity-50 cursor-not-allowed hover:bg-red-500/10 hover:border-red-500/30'
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
                                    <h3 className={`font-bold text-lg ${isSecret ? 'blur-sm' : ''}`}>
                                        {isSecret ? 'Hidden Achievement' : achievement.title}
                                    </h3>
                                    {isUnlocked && (
                                        <Badge variant="outline" className="border-primary/50 text-primary">
                                            +{achievement.xp} XP
                                        </Badge>
                                    )}
                                </div>
                                <p className={`text-sm text-muted-foreground ${isSecret ? 'blur-sm' : ''}`}>
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
