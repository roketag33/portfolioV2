import { useRef, useEffect } from 'react'

interface LuminaCanvasProps {
    color: string
    particleSize: number
    speed: number
    canvasRef: React.RefObject<HTMLCanvasElement>
}

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

export function LuminaCanvas({ color, particleSize, speed, canvasRef }: LuminaCanvasProps) {
    const particles = useRef<Particle[]>([])
    const mouse = useRef({ x: 0, y: 0, active: false })
    const rafId = useRef<number>(0)

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
                maxLife: Math.random() * 0.5 + 0.5
            })
        }

        const animate = () => {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.1)'
            ctx.fillRect(0, 0, canvas.width, canvas.height)

            ctx.globalCompositeOperation = 'lighter'

            if (mouse.current.active) {
                for (let i = 0; i < 5; i++) {
                    createParticle(mouse.current.x, mouse.current.y)
                }
            }

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
    }, [color, particleSize, speed, canvasRef])

    const handleMouseMove = (e: React.MouseEvent) => {
        mouse.current.x = e.clientX
        mouse.current.y = e.clientY
        mouse.current.active = true
    }

    const handleMouseUp = () => {
        mouse.current.active = false
    }

    return (
        <canvas
            ref={canvasRef}
            onMouseMove={handleMouseMove}
            onMouseDown={handleMouseMove}
            onMouseUp={handleMouseUp}
            className="absolute inset-0 z-0 h-full w-full"
        />
    )
}
