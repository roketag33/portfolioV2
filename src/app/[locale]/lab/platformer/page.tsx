'use client'

import React, { useState } from 'react'
import { GameUI } from './components/GameUI'
import GameCanvas from './components/GameCanvas'

export default function PlatformerPage() {
    const [gameState, setGameState] = useState<'start' | 'playing' | 'won' | 'lost'>('start')
    const [levelIdx, setLevelIdx] = useState(0)
    const [key, setKey] = useState(0) // Used to force remount on reset

    const resetGame = () => {
        setGameState('playing')
        setKey(prev => prev + 1)
    }

    const handleWin = () => {
        setLevelIdx(prev => (prev + 1) % 2) // Cycle levels for now (since we have 2)
        setGameState('won')
    }

    return (
        <main className="h-screen w-full bg-black text-white font-sans overflow-hidden select-none relative touch-none">
            <GameUI gameState={gameState} resetGame={resetGame} />

            {gameState === 'playing' && (
                <div className="absolute inset-0 z-0">
                    <GameCanvas
                        key={key}
                        levelIndex={levelIdx}
                        onWin={handleWin}
                        onLose={() => setGameState('lost')}
                    />
                </div>
            )}
        </main>
    )
}
