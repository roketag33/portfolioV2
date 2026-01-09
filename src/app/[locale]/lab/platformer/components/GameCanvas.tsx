'use client'

import React, { useRef, useEffect } from 'react'
import { LEVELS } from './levels'

// --- Config ---
const GRAVITY = 0.6
const JUMP_FORCE = -17
const TERMINAL_VELOCITY = 15

export default function GameCanvas({ levelIndex, onWin, onLose }: { levelIndex: number, onWin: () => void, onLose: () => void }) {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext('2d', { alpha: false }) // Optimize
        if (!ctx) return

        let animationFrameId: number
        const currentLevel = LEVELS[levelIndex] || LEVELS[0]

        // Game State
        const player = {
            x: 100,
            y: 400,
            w: 30,
            h: 30,
            vy: 0,
            grounded: false,
            rotation: 0
        }

        let frames = 0
        let cameraX = 0
        const particles: { x: number, y: number, vx: number, vy: number, life: number, color: string }[] = []

        // --- Input ---
        const jump = () => {
            if (player.grounded) {
                player.vy = JUMP_FORCE
                player.grounded = false
                // Spark particles
                for (let i = 0; i < 5; i++) {
                    particles.push({
                        x: player.x + player.w / 2,
                        y: player.y + player.h,
                        vx: (Math.random() - 0.5) * 5,
                        vy: (Math.random() - 0.5) * 5,
                        life: 20,
                        color: '#fff'
                    })
                }
            }
        }

        const handleInput = (e: Event) => {
            e.preventDefault()
            jump()
        }

        window.addEventListener('keydown', (e) => { if (e.code === 'Space' || e.code === 'ArrowUp') jump() })
        window.addEventListener('mousedown', handleInput)
        window.addEventListener('touchstart', handleInput)

        // --- Loop ---
        const render = () => {
            frames++

            // 1. Update Physics
            player.vy += GRAVITY
            if (player.vy > TERMINAL_VELOCITY) player.vy = TERMINAL_VELOCITY

            // Auto Run
            player.x += currentLevel.speed
            player.y += player.vy

            // Rotate player visual based on jump
            if (!player.grounded) player.rotation += 0.15
            else {
                player.rotation = Math.round(player.rotation / (Math.PI / 2)) * (Math.PI / 2) // Snap to nearest 90
                player.rotation = player.rotation * 0.8 // Lerp back to 0 ideally, but simple snap is ok
                if (Math.abs(player.rotation) < 0.1) player.rotation = 0
            }

            // 2. Collision
            player.grounded = false
            for (const ent of currentLevel.entities) {
                // Forgiving Hitbox (Padding)
                const pad = ent.type === 'hazard' ? 8 : 0
                if (
                    player.x < ent.x + ent.w - pad &&
                    player.x + player.w > ent.x + pad &&
                    player.y < ent.y + ent.h - pad &&
                    player.y + player.h > ent.y + pad
                ) {
                    if (ent.type === 'hazard') {
                        onLose()
                        return cancelAnimationFrame(animationFrameId)
                    }
                    if (ent.type === 'goal') {
                        onWin()
                        return cancelAnimationFrame(animationFrameId)
                    }

                    // Platform Logic (Floor)
                    // Only collide if falling downwards and was previously above
                    const prevY = player.y - player.vy
                    if (player.vy >= 0 && prevY + player.h <= ent.y + 10) { // Tolerance
                        player.y = ent.y - player.h
                        player.vy = 0
                        player.grounded = true
                    }
                }
            }

            // Check OOB
            if (player.y > 1000) {
                onLose()
                return cancelAnimationFrame(animationFrameId)
            }

            // Update Camera
            // Keep player at 25% of screen width
            cameraX = player.x - window.innerWidth * 0.2

            // Particles
            for (let i = particles.length - 1; i >= 0; i--) {
                const p = particles[i]
                p.x += p.vx
                p.y += p.vy
                p.life--
                if (p.life <= 0) particles.splice(i, 1)
            }


            // 3. Draw
            canvas.width = window.innerWidth
            canvas.height = window.innerHeight

            // Background (Parallax)
            ctx.fillStyle = '#0a0a0a'
            ctx.fillRect(0, 0, canvas.width, canvas.height)

            // Stars / Grid
            ctx.strokeStyle = '#222'
            ctx.lineWidth = 1
            const gridSize = 50
            const gridOffsetX = -(cameraX * 0.5) % gridSize

            ctx.beginPath()
            for (let x = gridOffsetX; x < canvas.width; x += gridSize) {
                ctx.moveTo(x, 0); ctx.lineTo(x, canvas.height)
            }
            // Horizontal lines (perspective illusion maybe? Keep simple for now)
            for (let y = 0; y < canvas.height; y += gridSize) {
                ctx.moveTo(0, y); ctx.lineTo(canvas.width, y)
            }
            ctx.stroke()


            ctx.save()
            ctx.translate(-cameraX, 0)

            // Entities Update & Draw
            // Optim: Only draw visible
            const visibleEntities = currentLevel.entities.filter(e => e.x + e.w > cameraX && e.x < cameraX + canvas.width)

            for (const ent of visibleEntities) {
                if (ent.type === 'ground' || ent.type === 'platform') {
                    ctx.shadowBlur = 10
                    ctx.shadowColor = '#818cf8' // Indigo glow
                    ctx.fillStyle = '#1e1b4b' // Dark Indigo bg
                    ctx.strokeStyle = '#818cf8'
                    ctx.lineWidth = 2
                    ctx.fillRect(ent.x, ent.y, ent.w, ent.h)
                    ctx.strokeRect(ent.x, ent.y, ent.w, ent.h)
                } else if (ent.type === 'hazard') {
                    ctx.shadowBlur = 15
                    ctx.shadowColor = '#ef4444' // Red glow
                    ctx.fillStyle = '#450a0a'
                    ctx.strokeStyle = '#ef4444'
                    ctx.beginPath()
                    // Triangle for spikes
                    ctx.moveTo(ent.x, ent.y + ent.h)
                    ctx.lineTo(ent.x + ent.w / 2, ent.y)
                    ctx.lineTo(ent.x + ent.w, ent.y + ent.h)
                    ctx.closePath()
                    ctx.fill()
                    ctx.stroke()
                } else if (ent.type === 'goal') {
                    ctx.shadowBlur = 20
                    ctx.shadowColor = '#fbbf24' // Amber
                    ctx.fillStyle = '#fbbf24'
                    ctx.fillRect(ent.x, ent.y, ent.w, ent.h)
                }
                ctx.shadowBlur = 0 // Reset
            }

            // Draw Particles
            visibleEntities.forEach(ent => {
                // Floor decoration (neon strip)
                if (ent.type === 'ground') {
                    ctx.fillStyle = '#818cf8'
                    ctx.fillRect(ent.x, ent.y, ent.w, 2)
                }
            })

            particles.forEach(p => {
                ctx.fillStyle = `rgba(255, 255, 255, ${p.life / 20})`
                ctx.fillRect(p.x, p.y, 4, 4)
            })

            // Draw Player
            ctx.translate(player.x + player.w / 2, player.y + player.h / 2)
            ctx.rotate(player.rotation)
            ctx.translate(-(player.x + player.w / 2), -(player.y + player.h / 2))

            ctx.shadowBlur = 20
            ctx.shadowColor = '#22d3ee' // Cyan
            ctx.fillStyle = '#0891b2'
            ctx.strokeStyle = '#22d3ee'
            ctx.lineWidth = 2
            ctx.fillRect(player.x, player.y, player.w, player.h)
            ctx.strokeRect(player.x, player.y, player.w, player.h)

            // Player Trail (simple)
            if (frames % 5 === 0) {
                // could add trail particles here
            }

            ctx.restore()

            // HUD
            ctx.fillStyle = '#22d3ee'
            ctx.font = 'bold 20px monospace'
            ctx.fillText(`LEVEL ${levelIndex + 1}: ${currentLevel.name}`, 20, 120)
            ctx.fillText(`SCORE: ${Math.floor(player.x / 10)}`, 20, 150)

            animationFrameId = requestAnimationFrame(render)
        }

        render()

        return () => {
            cancelAnimationFrame(animationFrameId)
            window.removeEventListener('keydown', jump)
            window.removeEventListener('mousedown', handleInput)
            window.removeEventListener('touchstart', handleInput)
        }
    }, [levelIndex, onWin, onLose])

    return <canvas ref={canvasRef} className="block w-full h-full cursor-pointer" />
}
