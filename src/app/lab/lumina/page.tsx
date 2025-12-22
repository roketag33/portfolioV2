'use client'

import { useRef, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, Save, Trash2, Settings2, Palette } from 'lucide-react'
import Link from 'next/link'

interface Particle {
    x: number
    y: number
    vx: number
    vy: number
    size: number
    color: string
    life: number
    maxLife: number
}

export default function LuminaPage() {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const [color, setColor] = useState('#6366f1')
    const [particleSize, setParticleSize] = useState(2)
    const [speed, setSpeed] = useState(1)
    const [isMenuOpen, setIsMenuOpen] = useState(true)

    const particles = useRef<Particle[]>([])
    const mouse = useRef({ x: 0, y: 0, active: false })
    const rafId = useRef<number>(0) // Initialize with 0

    // Initialize Canvas
    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext('2d')
        if (!ctx) return

        const resize = () => {
            canvas.width = window.innerWidth
            canvas.height = window.innerHeight
        }
        window.addEventListener('resize', resize)
        resize()

        const createParticle = (x: number, y: number) => {
            const angle = Math.random() * Math.PI * 2
            const velocity = Math.random() * 2 * speed

            particles.current.push({
                x,
                y,
                vx: Math.cos(angle) * velocity,
                vy: Math.sin(angle) * velocity,
                size: Math.random() * particleSize + 1,
                color: color,
                life: 1,
                maxLife: Math.random() * 0.5 + 0.5 // Random life between 0.5 and 1.0
            })
        }

        const animate = () => {
            // Trail effect
            ctx.fillStyle = 'rgba(0, 0, 0, 0.1)'
            ctx.fillRect(0, 0, canvas.width, canvas.height)

            // Neon effect
            ctx.globalCompositeOperation = 'lighter'

            // Mouse interaction
            if (mouse.current.active) {
                for (let i = 0; i < 5; i++) {
                    createParticle(mouse.current.x, mouse.current.y)
                }
            }

            // Update and draw particles
            for (let i = particles.current.length - 1; i >= 0; i--) {
                const p = particles.current[i]

                p.x += p.vx
                p.y += p.vy
                p.life -= 0.01

                ctx.beginPath()
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
                ctx.fillStyle = p.color
                ctx.globalAlpha = p.life
                ctx.fill()

                if (p.life <= 0) {
                    particles.current.splice(i, 1)
                }
            }

            ctx.globalAlpha = 1.0
            ctx.globalCompositeOperation = 'source-over'
            rafId.current = requestAnimationFrame(animate)
        }

        animate()

        return () => {
            window.removeEventListener('resize', resize)
            cancelAnimationFrame(rafId.current)
        }
    }, [color, particleSize, speed]) // Re-run effect when controls change

    const handleMouseMove = (e: React.MouseEvent) => {
        mouse.current.x = e.clientX
        mouse.current.y = e.clientY
        mouse.current.active = true
    }

    const handleMouseUp = () => {
        mouse.current.active = false
    }

    // Added clear canvas function
    const clearCanvas = () => {
        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext('2d')
        if (!ctx) return
        ctx.fillStyle = '#000000'
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        particles.current = [] // Clear particles
    }

    const saveImage = () => {
        const canvas = canvasRef.current
        if (!canvas) return
        const link = document.createElement('a')
        link.download = `lumina-art-${Date.now()}.png`
        link.href = canvas.toDataURL()
        link.click()
    }

    return (
        <main className="min-h-screen w-full relative bg-black overflow-hidden cursor-crosshair z-0">
            <canvas
                ref={canvasRef}
                onMouseMove={handleMouseMove}
                onMouseDown={handleMouseMove} // Allow create on click too
                onMouseUp={handleMouseUp}
                className="absolute inset-0 z-0 h-full w-full"
            />

            {/* Header */}
            <nav className="absolute top-0 left-0 right-0 p-6 z-10 flex justify-between items-center bg-gradient-to-b from-black/80 to-transparent pointer-events-none">
                <Link href="/lab" className="flex items-center gap-2 text-sm text-neutral-400 hover:text-white transition-colors pointer-events-auto">
                    <ArrowLeft className="w-4 h-4" />
                    Back to Lab
                </Link>
                <div className="font-mono text-xs text-neutral-500 uppercase tracking-widest">Lumina Canvas v1.0</div>
            </nav>

            {/* Open Button (Visible when menu is closed) */}
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
        </main>
    )
}
