'use client'

import React, { useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { Physics } from '@react-three/rapier'
import { KeyboardControls, Environment } from '@react-three/drei'
import { GameUI } from './components/GameUI'
import { GameState, Level, Lights, Player } from './components/GameComponents'

// Map keys to controls
const keyboardMap = [
    { name: 'forward', keys: ['ArrowUp', 'KeyW'] },
    { name: 'backward', keys: ['ArrowDown', 'KeyS'] },
    { name: 'left', keys: ['ArrowLeft', 'KeyA'] },
    { name: 'right', keys: ['ArrowRight', 'KeyD'] },
    { name: 'jump', keys: ['Space'] },
    { name: 'run', keys: ['Shift'] },
]

export default function PlatformerPage() {
    const [gameState, setGameState] = useState<'start' | 'playing' | 'won' | 'lost'>('start')

    const resetGame = () => {
        setGameState('playing')
        // In a real app, we'd reset the Ecctrl position here, possibly by remounting it
        // For now, simple state toggle works if we conditionally render
    }

    return (
        <main className="h-screen w-full bg-black text-white font-sans overflow-hidden select-none">
            <GameUI gameState={gameState} resetGame={resetGame} />

            <KeyboardControls map={keyboardMap}>
                <Canvas shadows camera={{ position: [0, 5, 10], fov: 60 }} className={gameState === 'playing' ? 'cursor-none' : ''}>
                    <color attach="background" args={['#050505']} />
                    <Lights />
                    <Environment preset="night" />

                    <Physics timeStep="vary">
                        {gameState === 'playing' && (
                            <>
                                <Player />
                                <GameState setGameState={setGameState} />
                            </>
                        )}
                        <Level onWin={() => setGameState('won')} />
                    </Physics>
                </Canvas>
            </KeyboardControls>
        </main>
    )
}
