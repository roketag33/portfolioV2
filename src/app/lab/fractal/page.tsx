'use client'

import React from 'react'
import FractalGenerator from '@/components/features/FractalGenerator'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function FractalPage() {
    return (
        <main className="fixed inset-0 z-[60] bg-black">
            {/* Floating Back Button */}
            <div className="absolute top-6 left-6 z-20">
                <Link href="/lab">
                    <Button variant="outline" className="bg-black/50 backdrop-blur border-white/10 hover:bg-white/10 text-white flex items-center gap-2 rounded-full px-6">
                        <ArrowLeft className="w-4 h-4" />
                        Back to Lab
                    </Button>
                </Link>
            </div>

            {/* Full Screen Generator */}
            <div className="w-full h-full">
                <FractalGenerator />
            </div>
        </main>
    )
}
