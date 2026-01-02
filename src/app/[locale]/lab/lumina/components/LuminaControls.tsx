import { motion } from 'framer-motion'
import { Palette, Settings2, Trash2, Save, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

interface LuminaControlsProps {
    color: string
    setColor: (c: string) => void
    particleSize: number
    setParticleSize: (s: number) => void
    speed: number
    setSpeed: (s: number) => void
    isMenuOpen: boolean
    setIsMenuOpen: (o: boolean) => void
    clearCanvas: () => void
    saveImage: () => void
}

export function LuminaControls({
    color, setColor,
    particleSize, setParticleSize,
    speed, setSpeed,
    isMenuOpen, setIsMenuOpen,
    clearCanvas, saveImage
}: LuminaControlsProps) {
    return (
        <>
            {/* Header */}
            <nav className="absolute top-0 left-0 right-0 p-6 z-10 flex justify-between items-center bg-gradient-to-b from-black/80 to-transparent pointer-events-none">
                <Link href="/lab" className="flex items-center gap-2 text-sm text-neutral-400 hover:text-white transition-colors pointer-events-auto">
                    <ArrowLeft className="w-4 h-4" />
                    Back to Lab
                </Link>
                <div className="font-mono text-xs text-neutral-500 uppercase tracking-widest">Lumina Canvas v1.0</div>
            </nav>

            {/* Open Button */}
            {!isMenuOpen && (
                <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    onClick={() => setIsMenuOpen(true)}
                    className="absolute top-20 right-6 z-10 p-3 bg-neutral-900/80 backdrop-blur-md border border-white/10 rounded-full text-white hover:bg-neutral-800 transition-all pointer-events-auto shadow-xl group"
                >
                    <Settings2 className="w-5 h-5 group-hover:rotate-45 transition-transform" />
                </motion.button>
            )}

            {/* Controls Panel */}
            <motion.div
                initial={{ x: 0 }}
                animate={{ x: isMenuOpen ? 0 : 400, opacity: isMenuOpen ? 1 : 0 }}
                transition={{ type: "spring", damping: 20, stiffness: 100 }}
                className="absolute top-20 right-6 z-10 bg-neutral-900/90 backdrop-blur-md border border-white/10 p-6 rounded-2xl w-80 text-white pointer-events-auto shadow-2xl"
            >
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold flex items-center gap-2">
                        <Palette className="w-5 h-5 text-indigo-500" />
                        Controls
                    </h2>
                    <button onClick={() => setIsMenuOpen(false)} className="p-1 hover:bg-white/10 rounded">
                        <Settings2 className="w-4 h-4 text-neutral-400" />
                    </button>
                </div>

                <div className="space-y-6">
                    {/* Color Picker */}
                    <div className="space-y-2">
                        <label className="text-xs font-mono text-neutral-400 uppercase">Pigment</label>
                        <input
                            type="color"
                            value={color}
                            onChange={(e) => setColor(e.target.value)}
                            className="w-full h-10 rounded cursor-pointer bg-neutral-800 border border-white/10 px-2"
                        />
                    </div>

                    {/* Size Slider */}
                    <div className="space-y-2">
                        <div className="flex justify-between text-xs font-mono text-neutral-400">
                            <label className="uppercase">Size</label>
                            <span>{particleSize}px</span>
                        </div>
                        <input
                            type="range"
                            min="1"
                            max="20"
                            value={particleSize}
                            onChange={(e) => setParticleSize(Number(e.target.value))}
                            className="w-full accent-indigo-500"
                        />
                    </div>

                    {/* Speed Slider */}
                    <div className="space-y-2">
                        <div className="flex justify-between text-xs font-mono text-neutral-400">
                            <label className="uppercase">Velocity</label>
                            <span>{speed}x</span>
                        </div>
                        <input
                            type="range"
                            min="0.1"
                            max="5"
                            step="0.1"
                            value={speed}
                            onChange={(e) => setSpeed(Number(e.target.value))}
                            className="w-full accent-rose-500"
                        />
                    </div>

                    {/* Actions */}
                    <div className="grid grid-cols-2 gap-3 pt-4 border-t border-white/10">
                        <button
                            onClick={clearCanvas}
                            className="flex items-center justify-center gap-2 p-3 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors text-sm font-medium"
                        >
                            <Trash2 className="w-4 h-4" /> Clear
                        </button>
                        <button
                            onClick={saveImage}
                            className="flex items-center justify-center gap-2 p-3 rounded-lg bg-indigo-500 text-white hover:bg-indigo-600 transition-colors text-sm font-medium"
                        >
                            <Save className="w-4 h-4" /> Save
                        </button>
                    </div>
                </div>
            </motion.div>
        </>
    )
}
