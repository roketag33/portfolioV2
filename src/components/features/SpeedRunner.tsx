'use client'

import { useGamification } from '@/context/GamificationContext'
import { usePathname } from 'next/navigation'
import { useEffect, useRef } from 'react'

export default function SpeedRunner() {
    const { unlock } = useGamification()
    const pathname = usePathname()
    const visits = useRef<number[]>([])

    useEffect(() => {
        const now = Date.now()
        // Clean old visits (> 10s ago)
        visits.current = visits.current.filter(t => now - t < 10000)

        // Add current visit
        visits.current.push(now)

        // Check condition: 3 distinct pages in 10s? 
        // Logic: visits.length >= 3 implies 3 rapid navigations.
        // We might want to dedup the same page reload if needed, but "visiting 3 pages" usually implies 3 successful loads.
        if (visits.current.length >= 3) {
            unlock('SPEED_RUNNER')
        }
    }, [pathname, unlock])

    return null
}
