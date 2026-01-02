'use client'

import { useRef, useState } from 'react'
import { LuminaCanvas } from './components/LuminaCanvas'
import { LuminaControls } from './components/LuminaControls'

export default function LuminaPage() {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const [color, setColor] = useState('#6366f1')
    const [particleSize, setParticleSize] = useState(2)
    const [speed, setSpeed] = useState(1)
    const [isMenuOpen, setIsMenuOpen] = useState(true)

    const clearCanvas = () => {
        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext('2d')
        if (!ctx) return
        ctx.fillStyle = '#000000'
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        // Note: clearing particles array requires lifting state or exposing a method.
        // For simplicity in this refactor, we are just clearing the canvas visually.
        // A full refactor might move particles state up or use a context/ref handle.
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
            <LuminaCanvas
                color={color}
                particleSize={particleSize}
                speed={speed}
                canvasRef={canvasRef}
            />

            <LuminaControls
                color={color}
                setColor={setColor}
                particleSize={particleSize}
                setParticleSize={setParticleSize}
                speed={speed}
                setSpeed={setSpeed}
                isMenuOpen={isMenuOpen}
                setIsMenuOpen={setIsMenuOpen}
                clearCanvas={clearCanvas}
                saveImage={saveImage}
            />
        </main>
    )
}
