'use client'

import React from 'react'
import GameEngine from '@/components/lab/typing-racer/GameEngine'
import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'

export default function TypingRacerPage() {
    return (
        <div className="min-h-screen bg-black text-white font-sans selection:bg-indigo-500 selection:text-white">
            {/* Header */}
            <div className="fixed top-0 left-0 w-full p-6 flex justify-between items-center z-10">
                <Link href="/lab" className="text-white/50 hover:text-white transition-colors flex items-center gap-2">
                    <ChevronLeft className="w-5 h-5" />
                    <span className="hidden sm:inline">Back</span>
                </Link>
                <div className="text-right">
                    <h1 className="text-lg font-bold tracking-tighter">TYPING RACER</h1>
                    <p className="text-[10px] text-white/40 font-mono">FLOW _01</p>
                </div>
            </div>

            {/* Game Container */}
            <div className="flex items-center justify-center min-h-screen">
                <GameEngine />
            </div>

            {/* Footer / Info */}
            <div className="fixed bottom-6 w-full text-center text-[10px] text-white/20 font-mono pointer-events-none">
                MINIMALIST MOTION EDITION
            </div>
        </div>
    )
}
