'use client'

import { createPortal } from 'react-dom'
import { Link } from '@/i18n/routingConfig'
import { ArrowLeft } from 'lucide-react'
import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

interface LabExitButtonProps {
    className?: string
}

export default function LabExitButton({ className }: LabExitButtonProps) {
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
        return () => setMounted(false)
    }, [])

    if (!mounted) return null

    return createPortal(
        <nav className={cn(
            "fixed bottom-6 left-6 z-[99999] flex items-center pointer-events-none pb-[env(safe-area-inset-bottom)]",
            className
        )}>
            <Link
                href="/lab"
                className="flex items-center gap-2 text-white hover:text-purple-400 transition-colors pointer-events-auto bg-black/80 backdrop-blur-md px-4 py-3 rounded-full border border-white/20 shadow-2xl hover:border-purple-500/50 group"
            >
                <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
                <span className="font-bold tracking-wider text-sm">EXIT LAB</span>
            </Link>
        </nav>,
        document.body
    )
}
