'use client'

import { useRef, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface Point {
    x: number
    y: number
}

interface GameCanvasProps {
    onScoreCalculated: (score: number) => void
    isResetting: boolean
}

export default function GameCanvas({ onScoreCalculated, isResetting }: GameCanvasProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const [isDrawing, setIsDrawing] = useState(false)
    const [points, setPoints] = useState<Point[]>([])
    const [feedback, setFeedback] = useState<string>('')
    const [center, setCenter] = useState<Point | null>(null)
    const [radius, setRadius] = useState<number | null>(null)

    // Reset canvas when parent requests it
    useEffect(() => {
        if (isResetting) {
            // Push reset to next tick to avoid synchronous setState warning
            const timer = setTimeout(() => {
                const canvas = canvasRef.current
                const ctx = canvas?.getContext('2d')
                if (canvas && ctx) {
                    ctx.clearRect(0, 0, canvas.width, canvas.height)
                    setPoints([])
                    setFeedback('')
                    setCenter(null)
                    setRadius(null)
                }
            }, 0)
            return () => clearTimeout(timer)
        }
    }, [isResetting])

    // Handle Resize
    useEffect(() => {
        const handleResize = () => {
            const canvas = canvasRef.current
            if (canvas) {
                canvas.width = window.innerWidth
                canvas.height = window.innerHeight
            }
        }
        window.addEventListener('resize', handleResize)
        handleResize()
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
        setIsDrawing(true)
        setPoints([])
        setFeedback('')
        setCenter(null)
        setRadius(null)

        const canvas = canvasRef.current
        if (canvas) {
            const ctx = canvas.getContext('2d')
            ctx?.clearRect(0, 0, canvas.width, canvas.height)
        }
    }

    const draw = (e: React.MouseEvent | React.TouchEvent) => {
        if (!isDrawing) return

        let clientX, clientY
        if ('touches' in e) {
            clientX = e.touches[0].clientX
            clientY = e.touches[0].clientY
        } else {
            clientX = (e as React.MouseEvent).clientX
            clientY = (e as React.MouseEvent).clientY
        }

        const newPoint = { x: clientX, y: clientY }
        setPoints(prev => [...prev, newPoint])

        const canvas = canvasRef.current
        const ctx = canvas?.getContext('2d')

        if (ctx && canvas) {
            ctx.lineCap = 'round'
            ctx.lineJoin = 'round'
            ctx.strokeStyle = '#a8a29e' // stone-400
            ctx.lineWidth = 4

            if (points.length > 0) {
                ctx.beginPath()
                ctx.moveTo(points[points.length - 1].x, points[points.length - 1].y)
                ctx.lineTo(newPoint.x, newPoint.y)
                ctx.stroke()
            }
        }
    }

    const finishDrawing = () => {
        if (!isDrawing) return
        setIsDrawing(false)

        if (points.length < 20) {
            setFeedback('Too small!')
            return
        }

        calculateScore()
    }

    const calculateScore = () => {
        // 1. Calculate Centroid
        let sumX = 0, sumY = 0
        points.forEach(p => {
            sumX += p.x
            sumY += p.y
        })
        const centerX = sumX / points.length
        const centerY = sumY / points.length
        setCenter({ x: centerX, y: centerY })

        // 2. Calculate Mean Radius
        let sumRadius = 0
        const radii = points.map(p => {
            const r = Math.sqrt(Math.pow(p.x - centerX, 2) + Math.pow(p.y - centerY, 2))
            sumRadius += r
            return r
        })
        const meanRadius = sumRadius / points.length
        setRadius(meanRadius)

        // 3. Calculate Deviation (Variance from perfect circle)
        let sumDeviation = 0
        radii.forEach(r => {
            sumDeviation += Math.abs(r - meanRadius)
        })
        const avgDeviation = sumDeviation / points.length

        // 4. Circularity Score (0 to 100)
        // A perfect circle has 0 deviation.
        // We normalize using the radius to make it size-independent.
        const deviationRatio = avgDeviation / meanRadius
        let score = 100 * (1 - deviationRatio)

        // 5. Closure check (Start vs End point)
        const start = points[0]
        const end = points[points.length - 1]
        const closureDist = Math.sqrt(Math.pow(start.x - end.x, 2) + Math.pow(start.y - end.y, 2))
        const closurePenalty = (closureDist / meanRadius) * 20 // Penalty if gap is large relative to size

        score = Math.max(0, score - closurePenalty)

        // Enhance high scores to make it "fun" but hard to get 100
        // Sigmoid-ish curve or simple boost for nearly perfect circles
        if (score > 90) score = 90 + (score - 90) // Linear

        // Draw the perfect circle helper in green
        const canvas = canvasRef.current
        const ctx = canvas?.getContext('2d')
        if (ctx) {
            // Ghost ideal circle
            ctx.beginPath()
            ctx.arc(centerX, centerY, meanRadius, 0, 2 * Math.PI)
            ctx.strokeStyle = 'rgba(34, 197, 94, 0.3)' // green-500 optimized
            ctx.lineWidth = 2
            ctx.stroke()

            // Center point
            ctx.beginPath()
            ctx.arc(centerX, centerY, 3, 0, 2 * Math.PI)
            ctx.fillStyle = '#ef4444'
            ctx.fill()
        }

        onScoreCalculated(score)
    }

    return (
        <div className="fixed inset-0 cursor-crosshair touch-none">
            <canvas
                ref={canvasRef}
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={finishDrawing}
                onMouseLeave={finishDrawing}
                onTouchStart={startDrawing}
                onTouchMove={draw}
                onTouchEnd={finishDrawing}
                className="w-full h-full block"
            />
            {feedback && (
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground animate-pulse">
                    {feedback}
                </div>
            )}
        </div>
    )
}
