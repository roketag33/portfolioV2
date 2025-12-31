'use client'

import React from 'react'
import FractalGenerator from '@/components/features/FractalGenerator'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'


import ClientPortal from '@/components/ui/client-portal'
// ... imports

export default function FractalPage() {
    return (
        <ClientPortal>
            <main className="fixed inset-0 z-[100] bg-black">
                {/* Floating Back Button */}
                <div className="absolute top-6 left-6 z-20">
                    <Link href="/lab">
                        {/* Use div mimicking button or just accessible button that navigates? 
                             Better: Link with button styling. Button component usually renders a button tag. 
                             If using customized Button component that accepts 'asChild', we can use that. 
                             But standard Shadcn Button renders <button>. 
                             So we can't wrap <Button> in <Link>. 
                             We can place Button inside Link ONLY if we change Link to NOT be <a>? No.
                             We should use router.push or simple <Link> with classes.
                         */}
                        <div className="bg-black/50 backdrop-blur border border-white/10 hover:bg-white/10 text-white flex items-center gap-2 rounded-full px-6 py-2 transition-colors cursor-pointer">
                            <ArrowLeft className="w-4 h-4" />
                            Back to Lab
                        </div>
                    </Link>
                </div>

                {/* Full Screen Generator */}
                <div className="w-full h-full">
                    <FractalGenerator />
                </div>
            </main>
        </ClientPortal>
    )
}
