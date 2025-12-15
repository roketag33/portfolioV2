'use client'
import React, { createContext, useContext, useEffect, useState } from 'react'
import { ACHIEVEMENTS, Achievement } from '@/lib/achievements'
import AchievementToast from '@/components/features/AchievementToast'

type GamificationContextType = {
    unlocked: string[]
    score: number
    unlock: (id: string) => void
}

const GamificationContext = createContext<GamificationContextType>({
    unlocked: [],
    score: 0,
    unlock: () => { }
})

export const useGamification = () => useContext(GamificationContext)

export function GamificationProvider({ children }: { children: React.ReactNode }) {
    const [unlocked, setUnlocked] = useState<string[]>([])
    const [currentToast, setCurrentToast] = useState<Achievement | null>(null)

    // Load from local storage
    useEffect(() => {
        const saved = localStorage.getItem('achievements')
        if (saved) {
            setUnlocked(JSON.parse(saved))
        }
    }, [])

    useEffect(() => {
        const konami = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a']
        let cursor = 0
        const handler = (e: KeyboardEvent) => {
            if (e.key === konami[cursor]) {
                cursor++
                if (cursor === konami.length) {
                    unlock('KONAMI_CODE') // This needs to be available in scope, which it is
                    cursor = 0
                }
            } else {
                cursor = 0
                if (e.key === konami[0]) cursor = 1 // Restart if first key is correct
            }
        }
        window.addEventListener('keydown', handler)
        return () => window.removeEventListener('keydown', handler)
    }, [unlocked]) // Re-bind if unlocked changes, though unlock reference is stable usually. Safe enough.

    const unlock = (id: string) => {
        if (unlocked.includes(id)) return // Already unlocked
        if (!ACHIEVEMENTS[id]) return // Invalid ID

        const newUnlocked = [...unlocked, id]
        setUnlocked(newUnlocked)
        localStorage.setItem('achievements', JSON.stringify(newUnlocked))

        // Show toast
        setCurrentToast(ACHIEVEMENTS[id])

        // Play sound (optional)
        try {
            if (typeof window !== 'undefined') {
                const audio = new Audio('/achievement.mp3')
                audio.volume = 0.5
                audio.play().catch(e => {
                    // Ignore loading errors or autoplay policy blocks
                })
            }
        } catch (e) {
            // Ignore environment errors
        }
    }

    // Auto-hide toast
    useEffect(() => {
        if (currentToast) {
            const timer = setTimeout(() => setCurrentToast(null), 4000)
            return () => clearTimeout(timer)
        }
    }, [currentToast])

    const score = unlocked.reduce((acc, id) => acc + (ACHIEVEMENTS[id]?.xp || 0), 0)

    return (
        <GamificationContext.Provider value={{ unlocked, score, unlock }}>
            {children}
            <AchievementToast
                achievement={currentToast}
                visible={!!currentToast}
                onClose={() => setCurrentToast(null)}
            />
        </GamificationContext.Provider>
    )
}
