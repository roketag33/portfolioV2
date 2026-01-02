'use client'
import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Gamepad2 } from 'lucide-react'

const GRID_SIZE = 20
const CELL_SIZE = 25
const SPEED = 100

type Point = { x: number, y: number }

interface SnakeGameProps {
    fullScreen?: boolean
}

export default function SnakeGame({ fullScreen = false }: SnakeGameProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    // Game State
    const [isArcadeOpen, setIsArcadeOpen] = useState(fullScreen)
    const [snake, setSnake] = useState<Point[]>([{ x: 10, y: 10 }])
    const [food, setFood] = useState<Point>({ x: 15, y: 15 })
    const [direction, setDirection] = useState<Point>({ x: 1, y: 0 })
    const [gameOver, setGameOver] = useState(false)
    const [score, setScore] = useState(0)
    const [isPlaying, setIsPlaying] = useState(false)
    const [highScore, setHighScore] = useState(0)

    // Init High Score
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem('snake_highscore')
            if (saved) setHighScore(parseInt(saved))
        }

        if (fullScreen) {
            setIsPlaying(true)
            setIsArcadeOpen(true)
        }
    }, [fullScreen])

    const generateFood = useCallback(() => {
        return {
            x: Math.floor(Math.random() * GRID_SIZE),
            y: Math.floor(Math.random() * GRID_SIZE)
        }
    }, [])

    const resetGame = () => {
        setSnake([{ x: 10, y: 10 }])
        setFood(generateFood())
        setDirection({ x: 1, y: 0 })
        setGameOver(false)
        setScore(0)
        setIsPlaying(true)
    }

    // Game Loop
    useEffect(() => {
        const active = isPlaying && (isArcadeOpen || fullScreen)
        if (!active || gameOver) return

        const moveSnake = () => {
            setSnake(prev => {
                const newHead = {
                    x: (prev[0].x + direction.x + GRID_SIZE) % GRID_SIZE,
                    y: (prev[0].y + direction.y + GRID_SIZE) % GRID_SIZE
                }

                if (prev.some(segment => segment.x === newHead.x && segment.y === newHead.y)) {
                    setGameOver(true)
                    if (score > highScore) {
                        setHighScore(score)
                        localStorage.setItem('snake_highscore', score.toString())
                    }
                    return prev
                }

                const newSnake = [newHead, ...prev]

                if (newHead.x === food.x && newHead.y === food.y) {
                    setScore(s => s + 1)
                    setFood(generateFood())
                } else {
                    newSnake.pop()
                }

                return newSnake
            })
        }

        const interval = setInterval(moveSnake, SPEED)
        return () => clearInterval(interval)
    }, [isPlaying, gameOver, direction, food, score, highScore, generateFood, isArcadeOpen, fullScreen])

    // Controls
    useEffect(() => {
        const active = isArcadeOpen || fullScreen
        if (!active) return

        const handleKey = (e: KeyboardEvent) => {
            if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' '].includes(e.key)) {
                e.preventDefault()
            }

            if (e.key === 'Escape' && !fullScreen) {
                setIsArcadeOpen(false)
                setIsPlaying(false)
            }

            switch (e.key) {
                case 'ArrowUp': if (direction.y === 0) setDirection({ x: 0, y: -1 }); break;
                case 'ArrowDown': if (direction.y === 0) setDirection({ x: 0, y: 1 }); break;
                case 'ArrowLeft': if (direction.x === 0) setDirection({ x: -1, y: 0 }); break;
                case 'ArrowRight': if (direction.x === 0) setDirection({ x: 1, y: 0 }); break;
            }
        }
        window.addEventListener('keydown', handleKey)
        return () => window.removeEventListener('keydown', handleKey)
    }, [direction, isArcadeOpen, fullScreen])

    // Draw Canvas
    useEffect(() => {
        const active = isArcadeOpen || fullScreen
        if (!active) return

        const ctx = canvasRef.current?.getContext('2d')
        if (!ctx) return

        ctx.fillStyle = '#111'
        ctx.fillRect(0, 0, GRID_SIZE * CELL_SIZE, GRID_SIZE * CELL_SIZE)

        ctx.strokeStyle = '#222'
        ctx.lineWidth = 1
        for (let i = 0; i <= GRID_SIZE; i++) {
            ctx.beginPath()
            ctx.moveTo(i * CELL_SIZE, 0)
            ctx.lineTo(i * CELL_SIZE, GRID_SIZE * CELL_SIZE)
            ctx.stroke()
            ctx.beginPath()
            ctx.moveTo(0, i * CELL_SIZE)
            ctx.lineTo(GRID_SIZE * CELL_SIZE, i * CELL_SIZE)
            ctx.stroke()
        }

        ctx.fillStyle = '#ef4444'
        ctx.fillRect(food.x * CELL_SIZE + 2, food.y * CELL_SIZE + 2, CELL_SIZE - 4, CELL_SIZE - 4)

        snake.forEach((segment, i) => {
            ctx.fillStyle = i === 0 ? '#4ade80' : '#22c55e'
            ctx.fillRect(segment.x * CELL_SIZE + 1, segment.y * CELL_SIZE + 1, CELL_SIZE - 2, CELL_SIZE - 2)
        })

    }, [snake, food, isArcadeOpen, fullScreen])

    const openArcade = () => {
        setIsArcadeOpen(true)
        resetGame()
    }

    const GameInterface = (
        <div className="flex flex-col items-center gap-8 max-w-lg w-full font-sans">
            <div className="flex w-full justify-between items-end border-b border-white/10 pb-4">
                <div>
                    <h2 className="text-4xl font-black italic text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-purple-500">ARCADE MODE</h2>
                    <p className="text-xs font-mono text-neutral-400 mt-1">Use Arrow Keys to Move • ESC to Quit</p>
                </div>
                <div className="text-right">
                    <p className="text-xs font-mono text-neutral-400">SCORE</p>
                    <p className="text-4xl font-mono font-bold text-white tabular-nums">{score.toString().padStart(3, '0')}</p>
                </div>
            </div>

            <div className="relative p-2 bg-[#222] rounded-xl shadow-2xl ring-4 ring-white/10">
                <canvas
                    ref={canvasRef}
                    width={GRID_SIZE * CELL_SIZE}
                    height={GRID_SIZE * CELL_SIZE}
                    className="rounded-lg bg-black"
                />

                {gameOver && (
                    <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-black/80 backdrop-blur-sm rounded-lg">
                        <p className="text-red-500 text-5xl font-black italic mb-2 tracking-tighter">GAME OVER</p>
                        <p className="text-white mb-8 font-mono">Score: {score}</p>
                        <button
                            onClick={resetGame}
                            className="h-14 px-8 text-xl font-bold uppercase tracking-widest hover:scale-105 transition-transform bg-white text-black rounded-md"
                        >
                            Retry
                        </button>
                    </div>
                )}
            </div>
        </div>
    )

    if (fullScreen) {
        return (
            <div className="w-full h-full flex items-center justify-center p-6">
                {GameInterface}
            </div>
        )
    }

    return (
        <>
            <div
                onClick={openArcade}
                className="cursor-pointer group relative flex flex-col items-center justify-center p-12 border border-white/10 rounded-3xl bg-white/5 hover:bg-white/10 transition-all hover:scale-[1.02] border-dashed"
            >
                <Gamepad2 size={48} className="mb-4 text-neutral-400 group-hover:text-green-400 transition-colors" />
                <h3 className="text-2xl font-black uppercase tracking-widest mb-2 text-white">Retro Snake</h3>
                <p className="text-sm font-mono text-neutral-400 mb-6">High Score: {highScore}</p>
                <button className="pointer-events-none uppercase tracking-widest font-bold bg-white/10 text-white py-2 px-4 rounded-md">
                    Insert Coin / Click to Play
                </button>
            </div>

            <AnimatePresence>
                {isArcadeOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[9999] bg-black/90 backdrop-blur-xl flex items-center justify-center p-6"
                    >
                        <button
                            onClick={() => setIsArcadeOpen(false)}
                            className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors"
                        >
                            <X size={32} />
                            <span className="sr-only">Close Arcade</span>
                        </button>

                        {GameInterface}
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}
