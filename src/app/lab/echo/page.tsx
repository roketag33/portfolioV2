'use client'

import { useState, useEffect, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera, Environment } from '@react-three/drei'
import * as THREE from 'three'
import * as Tone from 'tone'
import { ArrowLeft, Play, Square, Pause } from 'lucide-react'
import Link from 'next/link'
import { Bloom, EffectComposer } from '@react-three/postprocessing'

// 16 Steps, 4 Rows (Notes)
const NOTES = ['C4', 'E4', 'G4', 'B4'] // C Major 7

function Box({
    position,
    active,
    playing,
    onClick
}: {
    position: [number, number, number]
    active: boolean
    playing: boolean
    onClick: () => void
}) {
    const meshRef = useRef<THREE.Mesh>(null)
    const [hovered, setHover] = useState(false)

    useFrame(() => {
        if (!meshRef.current) return

        // Pulse effect when playing
        const targetScale = playing ? 1.2 : hovered ? 1.1 : 1
        meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.2)

        // Color transition
        const targetColor = new THREE.Color(active ? (playing ? '#ffffff' : '#6366f1') : hovered ? '#ffffff' : '#1e1e2e')

        // Emissive Flash
        if (playing && active) {
            (meshRef.current.material as THREE.MeshStandardMaterial).emissive.setHex(0xffffff);
            (meshRef.current.material as THREE.MeshStandardMaterial).emissiveIntensity = 2;
        } else if (active) {
            (meshRef.current.material as THREE.MeshStandardMaterial).emissive.setHex(0x6366f1);
            (meshRef.current.material as THREE.MeshStandardMaterial).emissiveIntensity = 0.5;
        } else {
            (meshRef.current.material as THREE.MeshStandardMaterial).emissiveIntensity = 0
        }

        (meshRef.current.material as THREE.MeshStandardMaterial).color.lerp(targetColor, 0.1)
    })

    return (
        <mesh
            ref={meshRef}
            position={position}
            onClick={onClick}
            onPointerOver={() => setHover(true)}
            onPointerOut={() => setHover(false)}
        >
            <boxGeometry args={[0.8, 0.8, 0.8]} />
            <meshStandardMaterial
                color="#1e1e2e"
                roughness={0.2}
                metalness={0.8}
            />
        </mesh>
    )
}

function SequencerGrid({
    grid,
    toggleStep,
    currentStep
}: {
    grid: boolean[][]
    toggleStep: (row: number, col: number) => void
    currentStep: number
}) {
    return (
        <group position={[-7.5, -1.5, 0]}>
            {grid.map((row, rowIndex) =>
                row.map((active, colIndex) => (
                    <Box
                        key={`${rowIndex}-${colIndex}`}
                        position={[colIndex, rowIndex, 0]}
                        active={active}
                        playing={currentStep === colIndex}
                        onClick={() => toggleStep(rowIndex, colIndex)}
                    />
                ))
            )}
        </group>
    )
}

export default function EchoGridPage() {
    const [isPlaying, setIsPlaying] = useState(false)
    const [currentStep, setCurrentStep] = useState(0)
    // 4 rows x 16 cols
    const [grid, setGrid] = useState<boolean[][]>(
        Array(4).fill(null).map(() => Array(16).fill(false))
    )
    const synth = useRef<Tone.PolySynth | null>(null)

    // Setup Tone.js
    useEffect(() => {
        synth.current = new Tone.PolySynth(Tone.Synth, {
            oscillator: { type: 'fmsquare' },
            envelope: { attack: 0.001, decay: 0.2, sustain: 0.1, release: 1 }
        }).toDestination()

        return () => {
            synth.current?.dispose()
        }
    }, [])

    // Sequencer Loop
    useEffect(() => {
        if (!isPlaying) return

        const interval = setInterval(() => {
            setCurrentStep(prev => {
                const nextStep = (prev + 1) % 16

                // Play notes for the next step
                grid.forEach((row, rowIndex) => {
                    if (row[nextStep] && synth.current) {
                        synth.current.triggerAttackRelease(NOTES[rowIndex], '16n')
                    }
                })

                return nextStep
            })
        }, 200) // ~300 BPM (Fast) or 150 BPM 8th notes

        return () => clearInterval(interval)
    }, [isPlaying, grid])

    const toggleStep = (row: number, col: number) => {
        const newGrid = [...grid]
        newGrid[row][col] = !newGrid[row][col]
        setGrid(newGrid)

        // Preview note
        if (newGrid[row][col] && synth.current && !isPlaying) {
            synth.current.triggerAttackRelease(NOTES[row], '16n')
        }
    }

    const handlePlay = async () => {
        if (!isPlaying) {
            await Tone.start()
        }
        setIsPlaying(!isPlaying)
    }

    return (
        <main className="h-screen w-full bg-neutral-950 text-white overflow-hidden relative">
            {/* Header */}
            <nav className="absolute top-0 left-0 right-0 p-6 z-10 flex justify-between items-center bg-gradient-to-b from-black/80 to-transparent pointer-events-none">
                <Link href="/lab" className="flex items-center gap-2 text-sm text-neutral-400 hover:text-white transition-colors pointer-events-auto">
                    <ArrowLeft className="w-4 h-4" />
                    Back to Lab
                </Link>
                <div className="font-mono text-xs text-neutral-500 uppercase tracking-widest">Echo Grid v1.0</div>
            </nav>

            {/* Canvas */}
            <div className="absolute inset-0">
                <Canvas>
                    <PerspectiveCamera makeDefault position={[0, 0, 12]} fov={50} />
                    <color attach="background" args={['#050505']} />
                    <ambientLight intensity={0.5} />
                    <spotLight position={[10, 10, 10]} angle={0.3} penumbra={1} intensity={1} castShadow />
                    <pointLight position={[-10, -10, -10]} intensity={0.5} color="#6366f1" />

                    <group rotation={[Math.PI / 6, -Math.PI / 12, 0]}>
                        <SequencerGrid grid={grid} toggleStep={toggleStep} currentStep={currentStep} />
                    </group>

                    <OrbitControls maxPolarAngle={Math.PI / 2} minPolarAngle={0} enableZoom={true} />
                    <Environment preset="city" />
                    <EffectComposer>
                        <Bloom luminanceThreshold={0.5} mipmapBlur intensity={1.2} radius={0.6} />
                    </EffectComposer>
                </Canvas>
            </div>

            {/* Controls */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-6 bg-black/40 backdrop-blur-xl border border-white/10 p-4 rounded-full z-10">
                <button
                    onClick={handlePlay}
                    className={`w-14 h-14 rounded-full flex items-center justify-center transition-all ${isPlaying ? 'bg-indigo-500 text-white scale-110 shadow-[0_0_20px_rgba(99,102,241,0.5)]' : 'bg-white/10 text-white hover:bg-white/20'}`}
                >
                    {isPlaying ? <Pause className="w-6 h-6 fill-current" /> : <Play className="w-6 h-6 ml-1 fill-current" />}
                </button>

                <div className="h-8 w-px bg-white/10" />

                <div className="flex flex-col items-center">
                    <span className="text-[10px] text-neutral-500 font-mono uppercase tracking-wider">Tempo</span>
                    <span className="font-bold text-indigo-400">150 BPM</span>
                </div>

                <div className="h-8 w-px bg-white/10" />

                <button
                    onClick={() => setGrid(Array(4).fill(null).map(() => Array(16).fill(false)))}
                    className="p-2 rounded-full hover:bg-white/10 text-neutral-400 hover:text-white transition-colors"
                    title="Clear Grid"
                >
                    <Square className="w-5 h-5" />
                </button>
            </div>
        </main>
    )
}
