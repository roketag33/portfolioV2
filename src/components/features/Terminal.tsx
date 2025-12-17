'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useGamification } from '@/context/GamificationContext'
import { X, Terminal as TerminalIcon } from 'lucide-react'

type HistoryLine = {
    text: string
    type: 'input' | 'output' | 'error' | 'success'
}

export default function Terminal() {
    const { unlock, score } = useGamification()
    const [isOpen, setIsOpen] = useState(false)
    const [input, setInput] = useState('')
    const [history, setHistory] = useState<HistoryLine[]>([
        { text: 'Welcome to PortfolioOS v2.0. Type "help" for commands.', type: 'success' }
    ])
    const inputRef = useRef<HTMLInputElement>(null)
    const endRef = useRef<HTMLDivElement>(null)

    // Toggle Listener
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.ctrlKey && e.key === 'k') {
                e.preventDefault()
                setIsOpen(prev => !prev)
                unlock('HACKERMAN')
            }
        }
        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [unlock])

    // Auto-focus input
    useEffect(() => {
        if (isOpen) {
            setTimeout(() => inputRef.current?.focus(), 100)
        }
    }, [isOpen])

    // Scroll to bottom
    useEffect(() => {
        endRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [history])

    const handleCommand = (cmd: string) => {
        const args = cmd.trim().toLowerCase().split(' ')
        const command = args[0]

        let output: HistoryLine[] = []

        switch (command) {
            case 'help':
                output = [
                    { text: 'Available commands:', type: 'success' },
                    { text: '  help       - Show this menu', type: 'output' },
                    { text: '  whoami     - Current user info', type: 'output' },
                    { text: '  clear      - Clear terminal', type: 'output' },
                    { text: '  score      - Show current XP', type: 'output' },
                    { text: '  sudo       - Execute admin commands', type: 'output' },
                    { text: '  rm         - Remove files', type: 'output' }
                ]
                break
            case 'whoami':
                output = [{ text: 'Guest User (Portfolio Visitor)', type: 'output' }]
                break
            case 'clear':
                setHistory([])
                return
            case 'score':
                output = [{ text: `Current XP: ${score}`, type: 'success' }]
                break
            case 'sudo':
                unlock('SCRIPT_KIDDIE')
                output = [{ text: 'Permission denied: Nice try script kiddie.', type: 'error' }]
                break
            case 'rm':
                if (args[1] === '-rf' && args[2] === '/') {
                    unlock('DANGEROUS')
                    output = [{ text: 'CRITICAL ERROR: SYSTEM DELETION IMMINENT...', type: 'error' }]
                    // Add shake effect to body temporarily
                    document.body.classList.add('animate-shake')
                    setTimeout(() => document.body.classList.remove('animate-shake'), 1000)
                } else {
                    output = [{ text: 'Usage: rm [-rf] [path]', type: 'output' }]
                }
                break
            case 'matrix':
                output = [{ text: 'Knock, knock, Neo.', type: 'success' }]
                // We could toggle a global class here if we implemented a Matrix rain canvas
                break
            default:
                if (cmd.trim()) {
                    output = [{ text: `Command not found: ${command}`, type: 'error' }]
                }
        }

        setHistory(prev => [
            ...prev,
            { text: `> ${cmd}`, type: 'input' },
            ...output
        ])
        setInput('')
    }

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        handleCommand(input)
    }

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 20, scale: 0.95 }}
                    className="fixed inset-0 z-[100] flex items-center justify-center pointer-events-none p-4"
                >
                    <div className="w-full max-w-2xl bg-black/90 backdrop-blur-md rounded-xl border border-green-500/30 font-mono shadow-2xl overflow-hidden pointer-events-auto flex flex-col max-h-[60vh]">
                        {/* Header */}
                        <div className="bg-white/5 p-2 px-4 border-b border-white/10 flex justify-between items-center text-xs text-muted-foreground uppercase tracking-widest">
                            <div className="flex items-center gap-2">
                                <TerminalIcon size={14} className="text-green-500" />
                                <span>Portfolio_Terminal.exe</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="animate-pulse text-green-500">● </span>
                                <span>Connected</span>
                                <button onClick={() => setIsOpen(false)} className="hover:text-white ml-2">
                                    <X size={14} />
                                </button>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="flex-1 p-4 overflow-y-auto space-y-2 text-sm text-green-500/80 custom-scrollbar">
                            {history.map((line, i) => (
                                <div key={i} className={`
                                    ${line.type === 'input' ? 'text-white/60' : ''}
                                    ${line.type === 'error' ? 'text-red-500' : ''}
                                    ${line.type === 'success' ? 'text-green-400 font-bold' : ''}
                                    break-words
                                `}>
                                    {line.text}
                                </div>
                            ))}
                            <div ref={endRef} />
                        </div>

                        {/* Input */}
                        <form onSubmit={onSubmit} className="p-4 border-t border-white/10 bg-black/50 flex gap-2">
                            <span className="text-green-500">{'>'}</span>
                            <input
                                ref={inputRef}
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                className="flex-1 bg-transparent border-none outline-none text-white focus:ring-0 placeholder-white/20"
                                placeholder="Type a command..."
                                autoFocus
                            />
                        </form>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
