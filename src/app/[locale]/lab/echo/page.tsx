'use client'

import React, { useState, useEffect, useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment, PerspectiveCamera } from '@react-three/drei'
import * as THREE from 'three'
import * as Tone from 'tone'
import { Bloom, EffectComposer, ChromaticAberration } from '@react-three/postprocessing'
import { ReactiveShape } from './components/EchoVisualizer'
import { EchoControls } from './components/EchoControls'

const SCALE = ['C5', 'A4', 'F4', 'D4', 'C4']

export default function EchoGridPage() {
    const [isPlaying, setIsPlaying] = useState(false)
    const [currentStep, setCurrentStep] = useState(0)
    const [volume, setVolume] = useState(-6)
    const [bpm, setBpm] = useState(120)

    const [grid, setGrid] = useState<boolean[][]>(
        Array(4).fill(null).map(() => Array(16).fill(false))
    )

    const instruments = useRef<{
        lead: Tone.PolySynth | null,
        bass: Tone.MembraneSynth | null,
        snare: Tone.NoiseSynth | null,
        kick: Tone.MembraneSynth | null
    }>({ lead: null, bass: null, snare: null, kick: null })

    const meter = useRef<Tone.Meter | null>(null)
    const seqRef = useRef<Tone.Sequence | null>(null)
    const gridRef = useRef(grid)
    const activeInstrumentsRef = useRef<boolean[]>([false, false, false, false])

    useEffect(() => {
        gridRef.current = grid
    }, [grid])

    useEffect(() => {
        const limiter = new Tone.Limiter(-1).toDestination();
        const mainReverb = new Tone.Reverb({ decay: 4, wet: 0.2 }).connect(limiter);
        const mainMeter = new Tone.Meter({ smoothing: 0.8 });
        meter.current = mainMeter;
        mainMeter.connect(mainReverb);

        Tone.Destination.volume.value = volume;

        const kick = new Tone.MembraneSynth({
            pitchDecay: 0.05,
            octaves: 10,
            oscillator: { type: "sine" },
            envelope: { attack: 0.001, decay: 0.4, sustain: 0.01, release: 1.4, attackCurve: "exponential" }
        }).connect(mainMeter);

        const snare = new Tone.NoiseSynth({
            volume: -10,
            noise: { type: 'pink', playbackRate: 3 },
            envelope: { attack: 0.001, decay: 0.2, sustain: 0 }
        }).connect(mainMeter);

        const bass = new Tone.MembraneSynth({
            volume: -5,
            pitchDecay: 0.1,
            octaves: 4,
            oscillator: { type: "fmsine" },
            envelope: { attack: 0.01, decay: 0.4, sustain: 0, release: 0.4 }
        }).connect(mainMeter);

        const lead = new Tone.PolySynth(Tone.Synth, {
            volume: -8,
            oscillator: { type: "fatsawtooth", count: 3, spread: 30 },
            envelope: { attack: 0.01, decay: 0.1, sustain: 0.5, release: 0.4 }
        }).connect(mainMeter);

        instruments.current = { lead, bass, snare, kick };

        const sequence = new Tone.Sequence((time, step) => {
            Tone.Draw.schedule(() => {
                setCurrentStep(step)
            }, time)

            const currentGrid = gridRef.current

            activeInstrumentsRef.current = [
                currentGrid[0][step],
                currentGrid[1][step],
                currentGrid[2][step],
                currentGrid[3][step]
            ];

            if (currentGrid[0][step]) instruments.current.lead?.triggerAttackRelease(SCALE[0], '16n', time);
            if (currentGrid[1][step]) instruments.current.bass?.triggerAttackRelease("C2", '16n', time);
            if (currentGrid[2][step]) instruments.current.snare?.triggerAttackRelease('16n', time);
            if (currentGrid[3][step]) instruments.current.kick?.triggerAttackRelease("C1", '16n', time);
        }, Array.from({ length: 16 }, (_, i) => i), "16n").start(0)

        seqRef.current = sequence

        return () => {
            sequence.dispose();
            lead.dispose();
            bass.dispose();
            snare.dispose();
            kick.dispose();
            mainReverb.dispose();
            limiter.dispose();
            mainMeter.dispose();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        Tone.Destination.volume.rampTo(volume, 0.1);
    }, [volume]);

    useEffect(() => {
        Tone.Transport.bpm.value = bpm;
    }, [bpm])

    const toggleStep = (row: number, col: number, isRightClick = false) => {
        const newGrid = [...grid]

        if (isRightClick) {
            newGrid[row][col] = false
        } else {
            newGrid[row][col] = !newGrid[row][col]
        }

        setGrid(newGrid)

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
            Tone.Transport.start()
        } else {
            Tone.Transport.stop()
            setCurrentStep(0)
            activeInstrumentsRef.current = [false, false, false, false]
        }
        setIsPlaying(!isPlaying)
    }

    return (
        <main className="h-screen w-full bg-neutral-950 text-white overflow-hidden relative flex flex-col font-mono" onContextMenu={(e) => e.preventDefault()}>
            <div className="flex-grow relative w-full h-[50vh] md:h-[60vh]">
                <Canvas>
                    <PerspectiveCamera makeDefault position={[0, 0, 6]} fov={45} />
                    <color attach="background" args={['#050505']} />

                    <ambientLight intensity={0.2} />
                    <pointLight position={[5, 5, 5]} intensity={0.5} color="#4338ca" />
                    <pointLight position={[-5, -5, -5]} intensity={0.5} color="#ef4444" />

                    <ReactiveShape analyzer={meter} activeInst={activeInstrumentsRef} />

                    <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
                    <Environment preset="city" />
                    <EffectComposer>
                        <Bloom luminanceThreshold={0.2} mipmapBlur intensity={1.5} radius={0.4} />
                        <ChromaticAberration offset={new THREE.Vector2(0.002, 0.002)} />
                    </EffectComposer>
                </Canvas>
            </div>

            <EchoControls
                isPlaying={isPlaying}
                handlePlay={handlePlay}
                setGrid={setGrid}
                bpm={bpm}
                setBpm={setBpm}
                volume={volume}
                setVolume={setVolume}
                grid={grid}
                toggleStep={toggleStep}
                currentStep={currentStep}
            />

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
