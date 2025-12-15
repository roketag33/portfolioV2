'use client'

import React from 'react'
import SnakeGame from '@/components/features/SnakeGame'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function SnakePage() {
    return (
        <main className="min-h-screen w-full flex flex-col items-center justify-center bg-black relative p-6">
            {/* Back Button */}
            <div className="absolute top-24 left-6 z-20">
                <Link href="/lab">
                    <Button variant="ghost" className="text-white/60 hover:text-white flex items-center gap-2">
                        <ArrowLeft className="w-4 h-4" />
                        Back to Lab
                    </Button>
                </Link>
            </div>

            <div className="w-full max-w-4xl">
                <div className="mb-6 text-center">
                    <h1 className="text-4xl font-black uppercase text-white tracking-widest mb-2">Retro Snake</h1>
                    <p className="text-white/50">Collect pixels, unlock achievements.</p>
                </div>
                <SnakeGame />
            </div>
        </main>
    )
}
