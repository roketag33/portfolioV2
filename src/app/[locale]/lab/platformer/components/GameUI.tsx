import React from 'react'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

interface GameUIProps {
    gameState: 'start' | 'playing' | 'won' | 'lost'
    resetGame: () => void
}

export function GameUI({ gameState, resetGame }: GameUIProps) {
    return (
        <>
            {/* Header UI */}
            <div className="absolute top-0 left-0 p-6 z-20 flex gap-6 items-center pointer-events-none">
                <Link href="/lab" className="flex items-center gap-2 text-neutral-400 hover:text-white transition-colors pointer-events-auto">
                    <ArrowLeft className="w-5 h-5" />
                    <span className="font-bold tracking-wider">BACK TO LAB</span>
                </Link>
            </div>

            {/* UI Overlays */}
            {gameState !== 'playing' && (
                <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-black/80 backdrop-blur-sm">
                    <h1 className="text-5xl font-black italic tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 drop-shadow-[0_0_15px_rgba(34,211,238,0.5)] mb-8">
                        {gameState === 'start' && 'NEON RUNNER'}
                        {gameState === 'won' && 'LEVEL COMPLETE'}
                        {gameState === 'lost' && 'WASTED'}
                    </h1>
                    <button
                        onClick={resetGame}
                        className="px-8 py-3 bg-white text-black font-bold text-xl rounded-full hover:scale-105 active:scale-95 transition-transform"
                    >
                        {gameState === 'start' ? 'START GAME' : 'TRY AGAIN'}
                    </button>
                    <p className="mt-4 text-neutral-400">WASD / Arrows to Move • Space to Jump • Shift to Run</p>
                </div>
            )}
        </>
    )
}
