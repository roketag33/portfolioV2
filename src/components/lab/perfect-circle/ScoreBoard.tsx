'use client'

import { motion } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { RefreshCw } from 'lucide-react'
import confetti from 'canvas-confetti'
import { useEffect } from 'react'

interface ScoreBoardProps {
    score: number | null
    onReset: () => void
}

export default function ScoreBoard({ score, onReset }: ScoreBoardProps) {
    useEffect(() => {
        if (score && score > 90) {
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 },
                colors: ['#22c55e', '#ffffff', '#000000']
            })
        }
    }, [score])

    if (score === null) return null

    let message = "Keep trying!"
    let color = "text-muted-foreground"

    if (score > 98) {
        message = "UNBELIEVABLE! 🏆"
        color = "text-emerald-500"
    } else if (score > 95) {
        message = "Masterpiece! 🎨"
        color = "text-emerald-500"
    } else if (score > 90) {
        message = "Excellent! 🔥"
        color = "text-green-500"
    } else if (score > 80) {
        message = "Great job! 👍"
        color = "text-blue-500"
    } else if (score > 50) {
        message = "Getting there..."
        color = "text-orange-500"
    } else {
        message = "Is that a potato? 🥔"
        color = "text-red-500"
    }

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm pointer-events-none"
        >
            <Card className="p-8 max-w-sm w-full text-center space-y-6 pointer-events-auto border-2 shadow-2xl">
                <div className="space-y-2">
                    <h2 className="text-2xl font-bold">Your Circle Score</h2>
                    <motion.div
                        className={`text-6xl font-black font-sans ${color}`}
                        initial={{ scale: 0.5 }}
                        animate={{ scale: 1.1 }}
                        transition={{ type: "spring", stiffness: 200, damping: 10 }}
                    >
                        {score.toFixed(1)}%
                    </motion.div>
                    <p className="text-xl font-medium pt-2">{message}</p>
                </div>

                <Button onClick={onReset} size="lg" className="w-full text-lg gap-2">
                    <RefreshCw className="w-5 h-5" />
                    Try Again
                </Button>
            </Card>
        </motion.div>
    )
}
