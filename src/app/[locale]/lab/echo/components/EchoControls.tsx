import React from 'react'
import { Play, Square, Pause, Volume2 } from 'lucide-react'
import LabExitButton from '@/components/lab/LabExitButton'

const ROW_LABELS = ['Lead', 'Bass', 'Snare', 'Kick']
const ROW_COLORS = ['#6366f1', '#8b5cf6', '#eab308', '#ef4444']

interface EchoControlsProps {
    isPlaying: boolean
    handlePlay: () => void
    setGrid: (grid: boolean[][]) => void
    bpm: number
    setBpm: (b: number | ((prev: number) => number)) => void
    volume: number
    setVolume: (v: number) => void
    grid: boolean[][]
    toggleStep: (row: number, col: number, isRightClick?: boolean) => void
    currentStep: number
}

export function EchoControls({
    isPlaying,
    handlePlay,
    setGrid,
    bpm,
    setBpm,
    volume,
    setVolume,
    grid,
    toggleStep,
    currentStep
}: EchoControlsProps) {
    return (
        <>
            <LabExitButton />

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

                    <div className="flex items-center gap-3">
                        <Volume2 className="w-4 h-4 text-neutral-500" />
                        <input
                            type="range"
                            min="-60"
                            max="0"
                            step="1"
                            value={volume}
                            onChange={(e) => setVolume(parseFloat(e.target.value))}
                            className="w-32 h-1 bg-neutral-800 rounded-full appearance-none cursor-pointer accent-indigo-500"
                        />
                        <span className="text-xs text-neutral-500 w-8 text-right">{volume}dB</span>
                    </div>
                </div>

                {/* Sequencer Grid */}
                <div className="flex-grow p-4 overflow-x-auto overflow-y-hidden custom-scrollbar">
                    <div className="min-w-[800px] h-full flex flex-col justify-between gap-1">
                        {grid.map((row, rowIndex) => (
                            <div key={`row-${rowIndex}`} className="flex items-center gap-2 h-full">
                                <div className="w-24 flex items-center gap-2 px-2 border-r border-neutral-800 h-full">
                                    <div className="w-1.5 h-full rounded-full" style={{ backgroundColor: ROW_COLORS[rowIndex] }} />
                                    <span className="text-xs font-bold text-neutral-400">{ROW_LABELS[rowIndex]}</span>
                                </div>

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
                                                ${(colIndex % 4 === 0) && !active ? 'bg-neutral-800/50' : ''}
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
        </>
    )
}
