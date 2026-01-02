'use client'

import React from 'react'
import SnakeGame from './components/SnakeGame'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

// Simple Client Portal alternative for standalone compatibility if needed, 
// but for cleaner code we can try to render directly or use a local portal if defined.
// Assuming ClientPortal might be missing in standalone, we'll strip it for the page wrapping 
// but wait, Next.js allows Portals. 
// For now, let's keep it simple: Just render the main content. 
// The original page used ClientPortal to escape layout?
// If so, we can simulate fixed positioning.

export default function SnakePage() {
    return (
        <main className="fixed inset-0 z-[100] bg-black w-full h-full">
            {/* Floating Back Button */}
            <div className="absolute top-6 left-6 z-20">
                <Link href="/lab">
                    <div className="bg-black/50 backdrop-blur border border-white/10 hover:bg-white/10 text-white flex items-center gap-2 rounded-full px-6 py-2 transition-colors cursor-pointer">
                        <ArrowLeft className="w-4 h-4" />
                        Back to Lab
                    </div>
                </Link>
            </div>

            {/* Game Container */}
            <div className="w-full h-full flex items-center justify-center">
                <SnakeGame fullScreen={true} />
            </div>
        </main>
    )
}
