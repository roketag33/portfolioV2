'use client'

import { useState, useEffect, useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Environment, Float, PerspectiveCamera } from '@react-three/drei'
import * as THREE from 'three'
import * as Tone from 'tone'
import { ArrowLeft, Play, Square, Pause, Volume2, VolumeX, Settings2 } from 'lucide-react'
import Link from 'next/link'
import { Bloom, EffectComposer, ChromaticAberration } from '@react-three/postprocessing'

// --- Audio Configuration ---

const SCALE = ['C5', 'A4', 'F4', 'D4', 'C4'] // Pentatonic-ish for Lead
const ROW_LABELS = ['Lead', 'Bass', 'Snare', 'Kick']
const ROW_COLORS = ['#6366f1', '#8b5cf6', '#eab308', '#ef4444']

// --- 3D Visualizer Component ---

function ReactiveShape({ analyzer }: { analyzer: React.MutableRefObject<Tone.Meter | null> }) {
    const meshRef = useRef<THREE.Mesh>(null)
    const materialRef = useRef<THREE.MeshPhysicalMaterial>(null)

    // Create specific geometry for the visualizer
    const geometry = useMemo(() => new THREE.IcosahedronGeometry(1.5, 4), [])

    useFrame((state) => {
        if (!meshRef.current || !analyzer.current || !materialRef.current) return

        // Get audio level (decibels) and convert to a normalized value (0-1 approx)
        const db = analyzer.current.getValue() as number
        // Normalize: -60dB (silence) to 0dB (max). Clamp between 0 and 1.
        const normalizedLevel = THREE.MathUtils.clamp((db + 60) / 60, 0, 1)

        // Dynamic Scale "Breathing"
        const targetScale = 1 + normalizedLevel * 0.8
        meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.15)

        // Rotation
        meshRef.current.rotation.x += 0.005 + (normalizedLevel * 0.02)
        meshRef.current.rotation.y += 0.005 + (normalizedLevel * 0.02)

        // Color / Emissive Pulse
        // Base color is dark, pulse moves towards cyan/white
        const baseColor = new THREE.Color("#2a2a2a")
        const pulseColor = new THREE.Color("#6366f1")

        // Lerp color based on level
        materialRef.current.emissive.lerp(pulseColor, normalizedLevel * 0.2)
        materialRef.current.emissiveIntensity = 0.5 + (normalizedLevel * 2)

        // Roughness change
        materialRef.current.roughness = THREE.MathUtils.lerp(0.4, 0.1, normalizedLevel)
    })

    return (
        <Float speed={2} rotationIntensity={1} floatIntensity={1}>
            <mesh ref={meshRef} geometry={geometry}>
                <meshPhysicalMaterial
                    ref={materialRef}
                    color="#1a1a1a"
                    emissive="#000000"
                    roughness={0.4}
                    metalness={0.9}
                    clearcoat={1}
                    clearcoatRoughness={0.1}
                    flatShading={true} // Low-poly / Faceted look
                />
            </mesh>
        </Float>
    )
}

// --- Main Page Component ---

export default function EchoGridPage() {
    const [isPlaying, setIsPlaying] = useState(false)
    const [currentStep, setCurrentStep] = useState(0)
    const [volume, setVolume] = useState(-6) // dB
    const [bpm, setBpm] = useState(120)

    // 4 rows x 16 cols
    const [grid, setGrid] = useState<boolean[][]>(
        Array(4).fill(null).map(() => Array(16).fill(false))
    )

    // Audio Refs
    const instruments = useRef<{
        lead: Tone.PolySynth | null,
        bass: Tone.MembraneSynth | null,
        snare: Tone.NoiseSynth | null,
        kick: Tone.MembraneSynth | null
    }>({ lead: null, bass: null, snare: null, kick: null })

    const meter = useRef<Tone.Meter | null>(null)

    // Setup Tone.js
    useEffect(() => {
        // Master Bus
        const limiter = new Tone.Limiter(-1).toDestination();
        const mainReverb = new Tone.Reverb({ decay: 4, wet: 0.2 }).connect(limiter);

        // Analyzer for Visuals
        const mainMeter = new Tone.Meter({ smoothing: 0.8 });
        meter.current = mainMeter;

        // Connect Master Volume -> Meter -> Reverb -> Limiter
        Tone.Destination.volume.value = volume;
        Tone.Destination.chain(mainMeter, mainReverb, limiter);

        // 1. Kick (Row 3)
        const kick = new Tone.MembraneSynth({
            pitchDecay: 0.05,
            octaves: 10,
            oscillator: { type: "sine" },
            envelope: { attack: 0.001, decay: 0.4, sustain: 0.01, release: 1.4, attackCurve: "exponential" }
        }).connect(mainMeter);

        // 2. Snare (Row 2)
        const snare = new Tone.NoiseSynth({
            volume: -10,
            noise: { type: 'pink', playbackRate: 3 },
            envelope: { attack: 0.001, decay: 0.2, sustain: 0 }
        }).connect(mainMeter);

        // 3. Bass (Row 1)
        const bass = new Tone.MembraneSynth({
            volume: -5,
            pitchDecay: 0.1,
            octaves: 4,
            oscillator: { type: "fmsine" },
            envelope: { attack: 0.01, decay: 0.4, sustain: 0, release: 0.4 }
        }).connect(mainMeter);

        // 4. Lead (Row 0)
        const lead = new Tone.PolySynth(Tone.Synth, {
            volume: -8,
            oscillator: { type: "fatsawtooth", count: 3, spread: 30 },
            envelope: { attack: 0.01, decay: 0.1, sustain: 0.5, release: 0.4 }
        }).connect(mainMeter);

        instruments.current = { lead, bass, snare, kick };

        return () => {
            lead.dispose();
            bass.dispose();
            snare.dispose();
            kick.dispose();
            mainReverb.dispose();
            limiter.dispose();
            mainMeter.dispose();
        }
    }, [])

    // Update Volume
    useEffect(() => {
        Tone.Destination.volume.rampTo(volume, 0.1);
    }, [volume]);

    // Sequencer Loop
    useEffect(() => {
        if (!isPlaying) return

        const intervalMs = (60000 / bpm) / 4; // 16th notes
        const interval = setInterval(() => {
            setCurrentStep(prev => {
                const nextStep = (prev + 1) % 16

                // Play notes (Immediate scheduling)
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
        }, intervalMs)

        return () => clearInterval(interval)
    }, [isPlaying, grid, bpm])

    const toggleStep = (row: number, col: number, isRightClick = false) => {
        const newGrid = [...grid]

        if (isRightClick) {
            newGrid[row][col] = false
        } else {
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
        <main className="h-screen w-full bg-neutral-950 text-white overflow-hidden relative flex flex-col font-mono" onContextMenu={(e) => e.preventDefault()}>
            {/* Header */}
            <nav className="absolute top-0 left-0 right-0 p-6 z-20 flex justify-between items-center bg-transparent pointer-events-none">
                <Link href="/lab" className="flex items-center gap-2 text-sm text-neutral-400 hover:text-white transition-colors pointer-events-auto">
                    <ArrowLeft className="w-4 h-4" />
                    Back (DAW Mode)
                </Link>
                <div className="flex items-center gap-4">
                    <div className="text-[10px] text-neutral-500 uppercase tracking-widest hidden md:block">Echo Grid v3.0</div>
                </div>
            </nav>

            {/* 3D Visualizer Area */}
            <div className="flex-grow relative w-full h-[50vh] md:h-[60vh]">
                <Canvas>
                    <PerspectiveCamera makeDefault position={[0, 0, 6]} fov={45} />
                    <color attach="background" args={['#050505']} />

                    <ambientLight intensity={0.2} />
                    <pointLight position={[5, 5, 5]} intensity={0.5} color="#4338ca" />
                    <pointLight position={[-5, -5, -5]} intensity={0.5} color="#ef4444" />

                    <ReactiveShape analyzer={meter} />

                    <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
                    <Environment preset="city" />
                    <EffectComposer>
                        <Bloom luminanceThreshold={0.2} mipmapBlur intensity={1.5} radius={0.4} />
                        <ChromaticAberration offset={new THREE.Vector2(0.002, 0.002)} />
                    </EffectComposer>
                </Canvas>
            </div>

            {/* DAW UI Interface (Bottom Half) */}
            <div className="w-full h-[50vh] md:h-[40vh] bg-[#0a0a0a] border-t border-neutral-800 flex flex-col z-10 shadow-[0_-10px_40px_rgba(0,0,0,0.5)]">
                {/* Transport Bar */}
                <div className="h-14 border-b border-neutral-800 flex items-center px-6 gap-6 bg-neutral-900/50">
                    <button
                        onClick={handlePlay}
                        className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${isPlaying ? 'bg-indigo-500 text-white shadow-[0_0_15px_rgba(99,102,241,0.5)]' : 'bg-neutral-800 text-neutral-400 hover:text-white'}`}
                    >
                        {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 ml-1 fill-current" />}
                    </button>

                    <button
                        onClick={() => setGrid(Array(4).fill(null).map(() => Array(16).fill(false)))}
                        className="w-10 h-10 rounded-full flex items-center justify-center bg-neutral-800 text-neutral-400 hover:text-white hover:bg-red-900/50 transition-colors"
                        title="Clear Pattern"
                    >
                        <Square className="w-4 h-4 fill-current" />
                    </button>

                    <div className="h-6 w-px bg-neutral-800" />

                    <div className="flex flex-col">
                        <span className="text-[10px] text-neutral-600 uppercase tracking-wider">BPM</span>
                        <div className="flex items-center gap-2">
                            <span className="text-xl font-bold text-indigo-400 leading-none">{bpm}</span>
                            <div className="flex flex-col gap-0.5">
                                <button onClick={() => setBpm(b => Math.min(b + 5, 200))} className="w-4 h-2 bg-neutral-800 hover:bg-neutral-700 rounded-sm" />
                                <button onClick={() => setBpm(b => Math.max(b - 5, 60))} className="w-4 h-2 bg-neutral-800 hover:bg-neutral-700 rounded-sm" />
                            </div>
                        </div>
                    </div>

                    <div className="flex-grow" />

                    {/* Volume Control */}
                    <div className="flex items-center gap-3">
                        <Volume2 className="w-4 h-4 text-neutral-500" />
                        <input
                            type="range"
                            min="-60"
                            max="0"
                            step="1"
                            value={volume}
                            onChange={(e) => setVolume(parseFloat(e.target.value))}
                            className="w-32 h-1 bg-neutral-800 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-indigo-500 hover:[&::-webkit-slider-thumb]:scale-125 transition-all"
                        />
                        <span className="text-xs text-neutral-500 w-8 text-right">{volume}dB</span>
                    </div>
                </div>

                {/* Sequencer Grid */}
                <div className="flex-grow p-4 overflow-x-auto overflow-y-hidden custom-scrollbar">
                    <div className="min-w-[800px] h-full flex flex-col justify-between gap-1">
                        {grid.map((row, rowIndex) => (
                            <div key={`row-${rowIndex}`} className="flex items-center gap-2 h-full">
                                {/* Track Header */}
                                <div className="w-24 flex items-center gap-2 px-2 border-r border-neutral-800 h-full">
                                    <div className="w-1.5 h-full rounded-full" style={{ backgroundColor: ROW_COLORS[rowIndex] }} />
                                    <span className="text-xs font-bold text-neutral-400">{ROW_LABELS[rowIndex]}</span>
                                </div>

                                {/* Steps */}
                                <div className="flex-grow grid grid-cols-16 gap-1 h-full">
                                    {row.map((active, colIndex) => (
                                        <button
                                            key={`${rowIndex}-${colIndex}`}
                                            onMouseDown={(e) => {
                                                if (e.button === 2) toggleStep(rowIndex, colIndex, true)
                                                else toggleStep(rowIndex, colIndex)
                                            }}
                                            onContextMenu={(e) => e.preventDefault()}
                                            className={`rounded-sm transition-all duration-75 relative
                                                ${active
                                                    ? 'bg-opacity-100 shadow-[0_0_10px_currentColor]'
                                                    : 'bg-neutral-900 hover:bg-neutral-800'
                                                }
                                                ${currentStep === colIndex ? 'brightness-150 ring-1 ring-white/50 z-10' : ''}
                                                ${(colIndex % 4 === 0) && !active ? 'bg-neutral-800/50' : ''} // Beat markers
                                            `}
                                            style={{
                                                backgroundColor: active ? ROW_COLORS[rowIndex] : undefined,
                                                color: ROW_COLORS[rowIndex]
                                            }}
                                        />
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <style jsx global>{`
                .custom-scrollbar::-webkit-scrollbar {
                    height: 8px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: #171717;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: #404040;
                    border-radius: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: #525252;
                }
            `}</style>
        </main>
    )
}
