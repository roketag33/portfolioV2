'use client'

import { useState } from 'react'
import GameCanvas from '@/components/lab/perfect-circle/GameCanvas'
import ScoreBoard from '@/components/lab/perfect-circle/ScoreBoard'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'

export default function PerfectCirclePage() {
    const [score, setScore] = useState<number | null>(null)
    const [resetCounter, setResetCounter] = useState(0)

    const [showInfo, setShowInfo] = useState(false)

    const handleScore = (newScore: number) => {
        setScore(newScore)
    }

    const handleReset = () => {
        setScore(null)
        setResetCounter(prev => prev + 1)
    }

    return (
        <main className="relative w-screen h-screen overflow-hidden bg-stone-50 dark:bg-stone-950">
            {/* Header / UI Layer */}
            <div className="absolute top-24 left-6 z-40 pointer-events-none">
                <Link href="/fr/lab" className="pointer-events-auto">
                    <Button variant="ghost" size="icon" className="group">
                        <ChevronLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
                    </Button>
                </Link>
            </div>

            <div className="absolute top-24 right-6 z-40 pointer-events-none">
                <Button
                    variant="ghost"
                    size="icon"
                    className="pointer-events-auto rounded-full hover:bg-stone-200 dark:hover:bg-stone-800"
                    onClick={() => setShowInfo(true)}
                >
                    <span className="font-serif font-bold italic text-xl">i</span>
                </Button>
            </div>

            <div className="absolute top-8 left-1/2 -translate-x-1/2 z-30 pointer-events-none text-center select-none opacity-50">
                <h1 className="text-xl font-bold font-sans tracking-widest uppercase text-muted-foreground">
                    The Perfect Circle
                </h1>
                <p className="text-sm">Draw a circle. Get judged.</p>
            </div>

            {/* Info Modal */}
            {showInfo && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/60 backdrop-blur-sm" onClick={() => setShowInfo(false)}>
                    <div className="bg-card border-2 shadow-xl p-8 max-w-md w-full rounded-xl space-y-4" onClick={e => e.stopPropagation()}>
                        <h3 className="text-2xl font-bold font-newsreader">How it works</h3>
                        <div className="space-y-4 text-muted-foreground">
                            <p>
                                Unlike simple shape matchers, we use a <strong>statistical approach</strong>:
                            </p>
                            <ol className="list-decimal pl-5 space-y-2 text-sm">
                                <li>We calculate the <strong>centroid</strong> (center of gravity) of your points.</li>
                                <li>We find the <strong>average radius</strong> from that center.</li>
                                <li>We measure the <strong>standard deviation</strong> (variance) of every point against that perfect radius.</li>
                            </ol>
                            <div className="p-4 bg-muted/50 rounded-lg text-xs font-mono">
                                Score = 100 * (1 - (Deviation / AvgRadius))
                            </div>
                            <p className="text-xs italic pt-2">
                                * We also penalize if you don't close the loop!
                            </p>
                        </div>
                        <Button className="w-full mt-4" onClick={() => setShowInfo(false)}>
                            Got it, let me draw
                        </Button>
                    </div>
                </div>
            )}

            {/* Game Canvas */}
            <GameCanvas
                onScoreCalculated={handleScore}
                isResetting={resetCounter > 0 && score === null}
            />

            {/* Score Overlay */}
            <ScoreBoard score={score} onReset={handleReset} />
        </main>
    )
}
