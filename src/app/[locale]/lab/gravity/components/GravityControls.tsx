import React from 'react'
import { ArrowLeft, Box, Circle, Trash2, Gauge } from 'lucide-react'
import Link from 'next/link'

interface GravityControlsProps {
    gravity: [number, number, number]
    setGravity: (g: [number, number, number]) => void
    spawnMode: 'box' | 'sphere'
    setSpawnMode: (mode: 'box' | 'sphere') => void
    clearObjects: () => void
}

export function GravityControls({ gravity, setGravity, spawnMode, setSpawnMode, clearObjects }: GravityControlsProps) {
    return (
        <>
            {/* Header UI */}
            <div className="absolute top-0 left-0 p-6 z-20 flex gap-6 items-center pointer-events-none">
                <Link href="/lab" className="flex items-center gap-2 text-neutral-400 hover:text-white transition-colors pointer-events-auto">
                    <ArrowLeft className="w-5 h-5" />
                    <span className="font-bold tracking-wider">BACK TO LAB</span>
                </Link>
            </div>

            {/* HUD / Controls */}
            <div className="absolute bottom-8 left-8 z-20 bg-black/50 backdrop-blur-md border border-white/10 p-6 rounded-2xl w-[320px]">
                <div className="flex items-center gap-2 mb-4 text-indigo-400">
                    <Gauge className="w-5 h-5" />
                    <h2 className="font-bold text-lg">Gravity Control</h2>
                </div>

                {/* Gravity Sliders */}
                <div className="space-y-4 mb-6">
                    {['X', 'Y', 'Z'].map((axis, i) => (
                        <div key={axis} className="flex gap-4 items-center text-sm">
                            <span className="w-4 font-mono text-neutral-500">{axis}</span>
                            <input
                                type="range"
                                min="-20" max="20" step="0.5"
                                value={gravity[i]}
                                onChange={(e) => {
                                    const newG = [...gravity] as [number, number, number]
                                    newG[i] = parseFloat(e.target.value)
                                    setGravity(newG)
                                }}
                                className="flex-grow h-1 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                            />
                            <span className="w-10 font-mono text-right">{gravity[i].toFixed(1)}</span>
                        </div>
                    ))}
                </div>

                <div className="border-t border-white/10 my-4" />

                <div className="flex justify-between items-center">
                    <div className="flex gap-2 bg-neutral-900/50 p-1 rounded-lg border border-white/10">
                        <button
                            onClick={() => setSpawnMode('box')}
                            className={`p-2 rounded-md transition-all ${spawnMode === 'box' ? 'bg-indigo-600 text-white shadow-lg' : 'hover:bg-white/10 text-neutral-400'}`}
                        >
                            <Box className="w-5 h-5" />
                        </button>
                        <button
                            onClick={() => setSpawnMode('sphere')}
                            className={`p-2 rounded-md transition-all ${spawnMode === 'sphere' ? 'bg-pink-600 text-white shadow-lg' : 'hover:bg-white/10 text-neutral-400'}`}
                        >
                            <Circle className="w-5 h-5" />
                        </button>
                    </div>

                    <button
                        onClick={clearObjects}
                        className="p-3 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors border border-transparent hover:border-red-500/20"
                        title="Clear All"
                    >
                        <Trash2 className="w-5 h-5" />
                    </button>
                </div>

                <p className="mt-4 text-xs text-neutral-500 text-center">Click on the floor to spawn objects</p>
            </div>
        </>
    )
}
