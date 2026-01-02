'use client'

import React from 'react'
import FractalGenerator from './components/FractalGenerator'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function FractalPage() {
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

            {/* Full Screen Generator */}
            <div className="w-full h-full flex items-center justify-center">
                <FractalGenerator />
            </div>
        </main>
    )
}
