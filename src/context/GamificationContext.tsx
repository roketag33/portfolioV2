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
    const [isLoaded, setIsLoaded] = useState(false)

    // Load from local storage
    useEffect(() => {
        const saved = localStorage.getItem('achievements')
        if (saved) {
            setUnlocked(prev => {
                const parsed = JSON.parse(saved)
                // Merge with any achievements triggered before load
                return Array.from(new Set([...prev, ...parsed]))
            })
        }
        setIsLoaded(true)
    }, [])

    // ... (KONAMI and other effects unchanged) ...

    const unlock = (id: string) => {
        // If not loaded yet, retry shortly to avoid overwriting or missing checks
        if (!isLoaded) {
            setTimeout(() => unlock(id), 100)
            return
        }

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
    }, [unlocked])

    // CLICK_FRENZY Logic
    useEffect(() => {
        let clicks = 0
        let timeout: NodeJS.Timeout

        const clickHandler = () => {
            clicks++
            if (clicks === 1) {
                timeout = setTimeout(() => {
                    clicks = 0
                }, 2000) // Reset after 2s
            }
            if (clicks >= 10) { // 10 clicks in 2s
                unlock('CLICK_FRENZY')
                clicks = 0
                clearTimeout(timeout)
            }
        }
        window.addEventListener('click', clickHandler)
        return () => {
            window.removeEventListener('click', clickHandler)
            clearTimeout(timeout)
        }
    }, [unlocked])

    // NIGHT_OWL Logic
    useEffect(() => {
        const hour = new Date().getHours()
        if (hour >= 1 && hour < 5) {
            unlock('NIGHT_OWL')
        }
    }, [])

    // QA_TESTER Logic
    useEffect(() => {
        let resizeCount = 0
        let timeout: NodeJS.Timeout
        const handleResize = () => {
            resizeCount++
            clearTimeout(timeout)
            timeout = setTimeout(() => { resizeCount = 0 }, 2000)

            if (resizeCount > 20) { // Aggressive resizing
                unlock('QA_TESTER')
            }
        }
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    // SPEED_RUNNER Logic
    // We need to track page visits. Since we are in a Provider, we need access to pathname changes.
    // However, usePathname usage here might trigger re-renders. 
    // Ideally this logic sits in a component that uses usePathname and calls unlock.
    // For now, let's keep it simple here if possible, but Context usually doesn't know about router unless imported.




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
