'use client'

import { useGamification } from '@/context/GamificationContext'
import { useEffect } from 'react'

export default function BookwormTracker() {
    const { unlock } = useGamification()

    useEffect(() => {
        const timer = setTimeout(() => {
            unlock('BOOKWORM')
        }, 30000) // 30 seconds

        return () => clearTimeout(timer)
    }, [unlock])

    return null
}
