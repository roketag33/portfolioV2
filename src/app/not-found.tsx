'use client'

import { useGamification } from '@/context/GamificationContext'
import { useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function NotFound() {
    const { unlock } = useGamification()

    useEffect(() => {
        unlock('NOT_FOUND')
    }, [unlock])

    return (
        <div className="h-screen w-full flex flex-col items-center justify-center bg-background text-foreground relative overflow-hidden">
            {/* Background Glitch Effect */}
            {/* Background Glitch Effect */}
            <div className="absolute inset-0 z-0 opacity-20 pointer-events-none select-none overflow-hidden flex items-center justify-center">
                {/* Removed duplicate 404 */}
            </div>

            <div className="z-10 text-center space-y-6 max-w-md px-6">
                <h1 className="text-8xl md:text-9xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-primary to-transparent">
                    404
                </h1>
                <h2 className="text-2xl font-bold uppercase tracking-widest">Page Not Found</h2>
                <p className="text-muted-foreground">
                    You seem lost in the void. But hey, you found a secret achievement!
                </p>

                <div className="pt-8">
                    <Link href="/">
                        <Button size="lg" className="rounded-full px-8">Return Home</Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}
