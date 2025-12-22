'use client'

import React, { useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Physics, RigidBody } from '@react-three/rapier'
import Ecctrl from 'ecctrl'
import { KeyboardControls, Environment } from '@react-three/drei'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

// --- Game Logic & Components ---

// Map keys to controls
const keyboardMap = [
    { name: 'forward', keys: ['ArrowUp', 'KeyW'] },
    { name: 'backward', keys: ['ArrowDown', 'KeyS'] },
    { name: 'left', keys: ['ArrowLeft', 'KeyA'] },
    { name: 'right', keys: ['ArrowRight', 'KeyD'] },
    { name: 'jump', keys: ['Space'] },
    { name: 'run', keys: ['Shift'] },
]

function Player() {
    return (
        <Ecctrl
            camInitDis={-10}
            camMaxDis={-10}
            camMinDis={-10}
            followLight
            maxVelLimit={5}
            jumpVel={6}
            autoBalanceSpringK={0} // Disable springing if not needed for simple platformer
            position={[0, 5, 0]}
        >
            <mesh castShadow>
                <capsuleGeometry args={[0.5, 1, 4, 8]} />
                <meshStandardMaterial color="#2dffd4" emissive="#002b20" emissiveIntensity={0.5} />
            </mesh>
        </Ecctrl>
    )
}

function Level({ onWin }: { onWin: () => void }) {
    return (
        <group>
            {/* Floor */}
            <RigidBody type="fixed" friction={2}>
                <mesh position={[0, -2, 0]} receiveShadow>
                    <boxGeometry args={[100, 2, 20]} />
                    <meshStandardMaterial color="#1a1a1a" />
                </mesh>
            </RigidBody>

            {/* Platforms */}
            <RigidBody type="fixed" position={[10, 2, 0]}>
                <mesh receiveShadow castShadow>
                    <boxGeometry args={[5, 1, 5]} />
                    <meshStandardMaterial color="#a855f7" emissive="#3b0764" emissiveIntensity={0.8} />
                </mesh>
            </RigidBody>

            <RigidBody type="fixed" position={[18, 5, 0]}>
                <mesh receiveShadow castShadow>
                    <boxGeometry args={[5, 1, 5]} />
                    <meshStandardMaterial color="#ec4899" emissive="#831843" emissiveIntensity={0.8} />
                </mesh>
            </RigidBody>

            <RigidBody type="fixed" position={[28, 8, -4]} rotation={[0, 0, 0.2]}>
                <mesh receiveShadow castShadow>
                    <boxGeometry args={[8, 1, 4]} />
                    <meshStandardMaterial color="#facc15" emissive="#713f12" emissiveIntensity={0.5} />
                </mesh>
            </RigidBody>

            {/* Win Zone */}
            <RigidBody type="fixed" sensor position={[28, 10, -4]} onIntersectionEnter={() => onWin()}>
                <mesh visible={false}>
                    <boxGeometry args={[2, 2, 2]} />
                </mesh>
                <group position={[0, 0.5, 0]}>
                    <mesh>
                        <boxGeometry args={[0.5, 0.5, 0.5]} />
                        <meshStandardMaterial color="#00ff00" emissive="#00ff00" emissiveIntensity={2} />
                    </mesh>
                    <pointLight color="#00ff00" distance={3} intensity={5} />
                </group>
            </RigidBody>
        </group>
    )
}

function Lights() {
    return (
        <>
            <ambientLight intensity={0.2} />
            <directionalLight
                position={[20, 30, 20]}
                intensity={1}
                castShadow
                shadow-bias={-0.0001}
            />
            <pointLight position={[10, 5, 0]} intensity={2} color="#a855f7" distance={10} />
            <pointLight position={[18, 8, 0]} intensity={2} color="#ec4899" distance={10} />
        </>
    )
}

function GameState({ setGameState }: { setGameState: (s: 'playing' | 'won' | 'lost') => void }) {
    useFrame((state) => {
        if (state.camera.position.y < -10) {
            setGameState('lost')
        }
    })
    return null
}

export default function PlatformerPage() {
    const [gameState, setGameState] = useState<'start' | 'playing' | 'won' | 'lost'>('start')

    const resetGame = () => {
        setGameState('playing')
        // In a real app, we'd reset the Ecctrl position here, possibly by remounting it
        // For now, simple state toggle works if we conditionally render
    }

    return (
        <main className="h-screen w-full bg-black text-white font-sans overflow-hidden select-none">
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
