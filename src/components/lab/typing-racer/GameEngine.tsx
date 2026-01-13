'use client'

import React, { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { getRandomText } from './TextGenerator'
import { RotateCcw } from 'lucide-react'

export default function GameEngine() {
    const [currentSample, setCurrentSample] = useState<ReturnType<typeof getRandomText> | null>(null)
    const [input, setInput] = useState('')
    const [startTime, setStartTime] = useState<number | null>(null)
    const [wpm, setWpm] = useState(0)
    const [accuracy, setAccuracy] = useState(100)
    const [isFinished, setIsFinished] = useState(false)
    const [shake, setShake] = useState(false)

    // Focus management
    const inputRef = useRef<HTMLInputElement>(null)
    const [isFocused, setIsFocused] = useState(false)

    // Handle initial load
    useEffect(() => {
        if (!currentSample) {
            setTimeout(() => setCurrentSample(getRandomText()), 0)
        }
    }, [currentSample])

    // Focus on load
    useEffect(() => {
        if (currentSample && inputRef.current && !isFocused) {
            inputRef.current.focus()
            // We don't necessarily need to track focus state in state if it causes issues,
            // but if we do, we should check if it's already focused to avoid loop.
            // However, the error is likely about the sync setState.
            // Let's use a timeout to push it to the next tick, breaking the sync cycle.
            const timer = setTimeout(() => setIsFocused(true), 0)
            return () => clearTimeout(timer)
        }
    }, [currentSample])

    // Reset game
    const resetGame = useCallback(() => {
        setCurrentSample(getRandomText())
        setInput('')
        setStartTime(null)
        setWpm(0)
        setAccuracy(100)
        setIsFinished(false)
        if (inputRef.current) {
            inputRef.current.focus()
            setIsFocused(true)
        }
    }, [])

    // Handle typing
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!currentSample) return
        const val = e.target.value

        // Start timer on first char
        if (!startTime) {
            setStartTime(Date.now())
        }

        // Prevent deleting correct chars in strict mode? No, let user delete.
        // Check for error logic
        const expected = currentSample.text.slice(0, val.length)
        if (val !== expected) {
            // Error detected
            setShake(true)
            setTimeout(() => setShake(false), 200)
        }

        setInput(val)

        // Game Over Check
        if (val === currentSample.text) {
            setIsFinished(true)
            const durationMin = (Date.now() - (startTime || Date.now())) / 60000
            const words = val.length / 5
            setWpm(Math.round(words / durationMin))
            if (inputRef.current) inputRef.current.blur()
        }
    }

    // Calculate live stats
    useEffect(() => {
        if (startTime && !isFinished) {
            const interval = setInterval(() => {
                if (!currentSample) return
                const durationMin = (Date.now() - startTime) / 60000
                // Standard WPM = (all typed entries / 5) / time
                const words = input.length / 5
                setWpm(Math.round(words / durationMin) || 0)

                // Accuracy logic
                // Simple version: matches / total typed
                // Actually usually it's (Correct chars) / (Total Chars typed including backspaces)
                // For now simple:
                let errors = 0
                for (let i = 0; i < input.length; i++) {
                    if (input[i] !== currentSample.text[i]) errors++
                }
                const acc = input.length > 0 ? ((input.length - errors) / input.length) * 100 : 100
                setAccuracy(Math.round(acc))

            }, 500)
            return () => clearInterval(interval)
        }
    }, [startTime, isFinished, input, currentSample])

    // Render text with highlighting
    const renderText = () => {
        if (!currentSample) return null

        return currentSample.text.split('').map((char, index) => {
            let color = 'text-white/20' // pending
            let extraClass = ''

            if (index < input.length) {
                if (input[index] === char) {
                    color = 'text-white' // correct (Minimalist black/white theme -> White on Black)
                } else {
                    color = 'text-red-500' // error
                    extraClass = 'bg-red-500/20'
                    // Show what was actually typed instead of expected char
                    // Use input[index] but escape space if needed
                }
            } else if (index === input.length) {
                // Caret position
                extraClass = 'animate-pulse bg-indigo-500/50'
            }

            return (
                <span key={index} className={`${color} ${extraClass} transition-colors duration-100 ease-out font-mono text-xl sm:text-2xl md:text-3xl lg:text-4xl leading-relaxed relative`}>
                    {/* If error, show what user typed. If space, show underscore */}
                    {(index < input.length && input[index] !== char) ? (
                        input[index] === ' ' ? '_' : input[index]
                    ) : char}
                </span>
            )
        })
    }

    if (!currentSample) {
        return (
            <div className="w-full flex justify-center items-center min-h-[60vh]">
                <div className="text-white/20 animate-pulse font-mono">LOADING ENGINE...</div>
            </div>
        )
    }

    return (
        <div className="w-full max-w-4xl mx-auto flex flex-col items-center justify-center min-h-[60vh] relative">
            {/* Hidden Input for Mobile/Desktop Unified Handling */}
            <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={handleChange}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                className="absolute opacity-0 top-0 left-0 w-full h-full cursor-default"
                autoFocus
                disabled={isFinished}
            />

            {/* Focus Prompt */}
            {!isFocused && !isFinished && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/80 backdrop-blur-sm z-20 transition-opacity">
                    <p className="text-white/50 animate-pulse font-mono">Click or Press any key to focus</p>
                </div>
            )}

            {/* Motion Blur Wrapper based on Speed */}
            <motion.div
                className={`w-full p-8 text-center break-words select-none ${shake ? 'translate-x-[-2px]' : ''}`}
                animate={shake ? { x: [-5, 5, -5, 5, 0] } : {}}
                style={{
                    filter: wpm > 80 ? `blur(${Math.min(2, (wpm - 80) / 20)}px)` : 'none',
                    transition: 'filter 0.2s ease'
                }}
            >
                {renderText()}
            </motion.div>

            {/* Stats Overlay - Minimalist */}
            <div className="fixed bottom-12 left-0 w-full flex justify-center gap-12 font-mono text-xs sm:text-sm text-white/40 pointer-events-none">
                <div className="flex flex-col items-center">
                    <span className="text-2xl text-white font-bold">{wpm}</span>
                    <span>WPM</span>
                </div>
                <div className="flex flex-col items-center">
                    <span className="text-2xl text-white font-bold">{accuracy}%</span>
                    <span>ACC</span>
                </div>
            </div>

            {/* Results Modal */}
            <AnimatePresence>
                {isFinished && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="absolute inset-0 bg-black/90 flex flex-col items-center justify-center z-30 pointer-events-auto"
                    >
                        <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500 mb-8">
                            Finished
                        </h2>

                        <div className="flex gap-12 mb-12">
                            <div className="text-center">
                                <div className="text-6xl font-bold text-white mb-2">{wpm}</div>
                                <div className="text-white/40 font-mono text-sm">WPM</div>
                            </div>
                            <div className="text-center">
                                <div className="text-6xl font-bold text-white mb-2">{accuracy}%</div>
                                <div className="text-white/40 font-mono text-sm">Accuracy</div>
                            </div>
                        </div>

                        <button
                            onClick={resetGame}
                            className="flex items-center gap-2 px-6 py-3 bg-white text-black rounded-full hover:bg-gray-200 transition-transform active:scale-95 font-medium"
                        >
                            <RotateCcw className="w-4 h-4" /> Restart
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Dynamic Caret (Floating) could be implemented if we tracked cursor position in pixels, 
                 but simple span highlighting is robust for MVP. 
             */}
        </div>
    )
}
