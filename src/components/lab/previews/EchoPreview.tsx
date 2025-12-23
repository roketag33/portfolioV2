'use client'
import { useEffect, useState } from 'react'

const ROWS = 4
const COLS = 16
const COLORS = ['#6366f1', '#8b5cf6', '#eab308', '#ef4444']

export default function EchoPreview() {
    const [step, setStep] = useState(0)
    // Static random pattern
    const [grid] = useState(() =>
        Array(ROWS).fill(null).map(() =>
            Array(COLS).fill(false).map((_, i) => Math.random() > 0.7 || i % 4 === 0)
        )
    )

    useEffect(() => {
        const interval = setInterval(() => {
            setStep(s => (s + 1) % COLS)
        }, 120)
        return () => clearInterval(interval)
    }, [])

    return (
        <div className="w-full h-full bg-neutral-950 flex items-center justify-center p-12">
            <div className="grid grid-rows-4 gap-3 w-full max-w-3xl aspect-[2/1] rotate-x-12 transform-gpu perspective-1000">
                {grid.map((row, r) => (
                    <div key={r} className="grid grid-cols-16 gap-1.5">
                        {row.map((active, c) => (
                            <div
                                key={c}
                                className={`rounded-sm transition-all duration-200
                                    ${active ? 'opacity-100 shadow-[0_0_10px_currentColor]' : 'opacity-10 bg-white/10'}
                                    ${c === step ? 'brightness-200 scale-125 z-10' : ''}
                                `}
                                style={{
                                    backgroundColor: active ? COLORS[r] : undefined,
                                    color: COLORS[r]
                                }}
                            />
                        ))}
                    </div>
                ))}
            </div>
        </div>
    )
}
