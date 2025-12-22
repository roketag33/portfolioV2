'use client'

import { useState, useEffect, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera, Environment } from '@react-three/drei'
import * as THREE from 'three'
import * as Tone from 'tone'
import { ArrowLeft, Play, Square, Pause, Volume2, VolumeX } from 'lucide-react'
import Link from 'next/link'
import { Bloom, EffectComposer } from '@react-three/postprocessing'

// Instrument Configuration
// Row 0: Lead (Pulls from scale)
// Row 1: Bass
// Row 2: Snare
// Row 3: Kick
const SCALE = ['C5', 'A4', 'F4', 'D4', 'C4'] // Pentatonic-ish for Lead

function Box({
    position,
    active,
    playing,
    row,
    onClick,
    onRightClick
}: {
    position: [number, number, number]
    active: boolean
    playing: boolean
    row: number
    onClick: () => void
    onRightClick: (e: React.MouseEvent) => void
}) {
    const meshRef = useRef<THREE.Mesh>(null)
    const [hovered, setHover] = useState(false)

    // Row-based colors
    const getRowColor = (r: number) => {
        switch (r) {
            case 0: return '#6366f1' // Lead - Indigo
            case 1: return '#8b5cf6' // Bass - Violet
            case 2: return '#eab308' // Snare - Yellow
            case 3: return '#ef4444' // Kick - Red
            default: return '#ffffff'
        }
    }

    const baseColor = getRowColor(row)

    useFrame(() => {
        if (!meshRef.current) return

        // Pulse effect when playing
        const targetScale = playing ? 1.2 : hovered ? 1.1 : 1
        meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.2)

        // Color transition
        const targetColor = new THREE.Color(active ? (playing ? '#ffffff' : baseColor) : hovered ? '#ffffff' : '#1e1e2e')

        // Emissive Flash
        if (playing && active) {
            (meshRef.current.material as THREE.MeshStandardMaterial).emissive.setHex(0xffffff);
            (meshRef.current.material as THREE.MeshStandardMaterial).emissiveIntensity = 2;
        } else if (active) {
            (meshRef.current.material as THREE.MeshStandardMaterial).emissive.set(baseColor);
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
            onClick={(e) => { e.stopPropagation(); onClick(); }}
            onContextMenu={(e) => { e.stopPropagation(); onRightClick(e); }}
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
    toggleStep: (row: number, col: number, isRightClick?: boolean) => void
    currentStep: number
}) {
    return (
        <group position={[-7.5, -1.5, 0]}>
            {grid.map((row, rowIndex) =>
                row.map((active, colIndex) => (
                    <Box
                        key={`${rowIndex}-${colIndex}`}
                        position={[colIndex, 3 - rowIndex, 0]} // Visual inversion so row 0 is top
                        active={active}
                        playing={currentStep === colIndex}
                        row={rowIndex}
                        onClick={() => toggleStep(rowIndex, colIndex)}
                        onRightClick={(e) => { e.preventDefault(); toggleStep(rowIndex, colIndex, true); }}
                    />
                ))
            )}
        </group>
    )
}

export default function EchoGridPage() {
    const [isPlaying, setIsPlaying] = useState(false)
    const [currentStep, setCurrentStep] = useState(0)
    const [volume, setVolume] = useState(-6) // dB
    // 4 rows x 16 cols
    const [grid, setGrid] = useState<boolean[][]>(
        Array(4).fill(null).map(() => Array(16).fill(false))
    )

    // Audio Refs
    const instruments = useRef<{
        lead: Tone.PolySynth | null,
        bass: Tone.MembraneSynth | null, // Simulating FM Bass
        snare: Tone.NoiseSynth | null,
        kick: Tone.MembraneSynth | null
    }>({ lead: null, bass: null, snare: null, kick: null })

    // Setup Tone.js
    useEffect(() => {
        // Master Effects
        const limiter = new Tone.Limiter(-1).toDestination();
        const reverb = new Tone.Reverb({ decay: 2, wet: 0.2 }).connect(limiter);
        Tone.Destination.volume.value = volume;

        // 1. Kick (Row 3)
        const kick = new Tone.MembraneSynth({
            pitchDecay: 0.05,
            octaves: 10,
            oscillator: { type: "sine" },
            envelope: { attack: 0.001, decay: 0.4, sustain: 0.01, release: 1.4, attackCurve: "exponential" }
        }).connect(limiter);

        // 2. Snare (Row 2)
        const snare = new Tone.NoiseSynth({
            volume: -10,
            noise: { type: 'pink', playbackRate: 3 },
            envelope: { attack: 0.001, decay: 0.2, sustain: 0 }
        }).connect(reverb);

        // 3. Bass (Row 1)
        const bass = new Tone.MembraneSynth({
            volume: -5,
            pitchDecay: 0.1,
            octaves: 4,
            oscillator: { type: "fmsine" },
            envelope: { attack: 0.01, decay: 0.4, sustain: 0, release: 0.4 }
        }).connect(limiter);

        // 4. Lead (Row 0)
        const lead = new Tone.PolySynth(Tone.Synth, {
            volume: -8,
            oscillator: { type: "fatsawtooth", count: 3, spread: 30 },
            envelope: { attack: 0.01, decay: 0.1, sustain: 0.5, release: 0.4 }
        }).connect(reverb);

        instruments.current = { lead, bass, snare, kick };

        return () => {
            lead.dispose();
            bass.dispose();
            snare.dispose();
            kick.dispose();
            reverb.dispose();
            limiter.dispose();
        }
    }, [])

    // Update Volume
    useEffect(() => {
        Tone.Destination.volume.rampTo(volume, 0.1);
    }, [volume]);

    // Sequencer Loop
    useEffect(() => {
        if (!isPlaying) return

        const interval = setInterval(() => {
            setCurrentStep(prev => {
                const nextStep = (prev + 1) % 16

                // Play notes for the next step
                // Row 0: Lead
                if (grid[0][nextStep] && instruments.current.lead) {
                    instruments.current.lead.triggerAttackRelease(SCALE[0], '16n');
                }
                // Row 1: Bass
                if (grid[1][nextStep] && instruments.current.bass) {
                    instruments.current.bass.triggerAttackRelease("C2", '16n');
                }
                // Row 2: Snare
                if (grid[2][nextStep] && instruments.current.snare) {
                    instruments.current.snare.triggerAttackRelease('16n');
                }
                // Row 3: Kick
                if (grid[3][nextStep] && instruments.current.kick) {
                    instruments.current.kick.triggerAttackRelease("C1", '16n');
                }

                return nextStep
            })
        }, 125) // ~120 BPM (16th notes) -> 125ms

        return () => clearInterval(interval)
    }, [isPlaying, grid])

    const toggleStep = (row: number, col: number, isRightClick = false) => {
        const newGrid = [...grid]

        if (isRightClick) {
            newGrid[row][col] = false
        } else {
            // Toggle logic for left click, but if it was false, we make it true.
            // If it was true, we could make it false, but FL style usually adds on left click.
            // Let's keep toggle for left click for now, but valid requirement is simple toggle.
            // Actually user asked for right click to remove. So left click should predominantly Add?
            // Let's stick to toggle on left click for simplicity, but right click explicitly removes.
            newGrid[row][col] = !newGrid[row][col]
        }

        setGrid(newGrid)

        // Preview sound if adding
        if (newGrid[row][col] && !isRightClick && !isPlaying) {
            if (row === 0) instruments.current.lead?.triggerAttackRelease(SCALE[0], '16n');
            if (row === 1) instruments.current.bass?.triggerAttackRelease("C2", '16n');
            if (row === 2) instruments.current.snare?.triggerAttackRelease('16n');
            if (row === 3) instruments.current.kick?.triggerAttackRelease("C1", '16n');
        }
    }

    const handlePlay = async () => {
        if (!isPlaying) {
            await Tone.start()
        }
        setIsPlaying(!isPlaying)
    }

    return (
        <main className="h-screen w-full bg-neutral-950 text-white overflow-hidden relative" onContextMenu={(e) => e.preventDefault()}>
            {/* Header */}
            <nav className="absolute top-0 left-0 right-0 p-6 z-10 flex justify-between items-center bg-gradient-to-b from-black/80 to-transparent pointer-events-none">
                <Link href="/lab" className="flex items-center gap-2 text-sm text-neutral-400 hover:text-white transition-colors pointer-events-auto">
                    <ArrowLeft className="w-4 h-4" />
                    Back (Demo Mode)
                </Link>
                <div className="font-mono text-xs text-neutral-500 uppercase tracking-widest">Echo Grid v2.0</div>
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
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-6 bg-black/40 backdrop-blur-xl border border-white/10 p-4 rounded-2xl z-10">
                <button
                    onClick={handlePlay}
                    className={`w-14 h-14 rounded-full flex items-center justify-center transition-all ${isPlaying ? 'bg-indigo-500 text-white scale-110 shadow-[0_0_20px_rgba(99,102,241,0.5)]' : 'bg-white/10 text-white hover:bg-white/20'}`}
                >
                    {isPlaying ? <Pause className="w-6 h-6 fill-current" /> : <Play className="w-6 h-6 ml-1 fill-current" />}
                </button>

                <div className="h-8 w-px bg-white/10" />

                <div className="flex flex-col items-center min-w-[60px]">
                    <span className="text-[10px] text-neutral-500 font-mono uppercase tracking-wider mb-1">Tempo</span>
                    <span className="font-bold text-indigo-400">120 BPM</span>
                </div>

                <div className="h-8 w-px bg-white/10" />

                {/* Volume Control */}
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => setVolume(volume === -60 ? -6 : -60)}
                        className="text-neutral-400 hover:text-white"
                    >
                        {volume === -60 ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                    </button>
                    <input
                        type="range"
                        min="-60"
                        max="0"
                        value={volume}
                        onChange={(e) => setVolume(parseFloat(e.target.value))}
                        className="w-24 h-1 bg-white/10 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white"
                    />
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
