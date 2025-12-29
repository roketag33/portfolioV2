'use client'
import { useRef, useState, ReactNode } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

import Link from 'next/link'

interface MagneticButtonProps {
    children: ReactNode
    className?: string
    onClick?: () => void
    variant?: 'primary' | 'secondary'
    href?: string
    external?: boolean
}

export default function MagneticButton({ children, className, onClick, variant = 'primary', href, external }: MagneticButtonProps) {
    const ref = useRef<HTMLDivElement>(null)
    const [position, setPosition] = useState({ x: 0, y: 0 })
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

    const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
        const { clientX, clientY } = e
        const { height, width, left, top } = ref.current!.getBoundingClientRect()
        const middleX = clientX - (left + width / 2)
        const middleY = clientY - (top + height / 2)

        // Magnetic pull strength
        setPosition({ x: middleX * 0.3, y: middleY * 0.3 })

        // Spotlight position relative to the element
        setMousePosition({ x: clientX - left, y: clientY - top })
    }

    const reset = () => {
        setPosition({ x: 0, y: 0 })
        setMousePosition({ x: 0, y: 0 })
    }

    const ButtonContent = (
        <>
            {/* Spotlight Effect */}
            <div className="pointer-events-none absolute -inset-px rounded-full opacity-0 transition duration-300 group-hover:opacity-100"
                style={{
                    background: `radial-gradient(150px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,255,255,0.15), transparent 80%)`
                }}
            />
            <span className="relative z-10">{children}</span>
        </>
    )

    const baseClasses = cn(
        "relative overflow-hidden rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background flex items-center justify-center",
        variant === 'primary'
            ? "bg-foreground text-background hover:bg-foreground/90"
            : "border border-white/10 bg-white/10 hover:bg-white/20 text-white",
        "px-8 py-4 text-lg font-medium",
        className
    )

    return (
        <motion.div
            className="relative group w-fit"
            style={{ position: 'relative' }}
            ref={ref}
            onMouseMove={handleMouse}
            onMouseLeave={reset}
            animate={{ x: position.x, y: position.y }}
            transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
        >
            {href ? (
                external ? (
                    <a href={href} target="_blank" rel="noopener noreferrer" onClick={onClick} className={baseClasses}>
                        {ButtonContent}
                    </a>
                ) : (
                    <Link href={href} onClick={onClick} className={baseClasses}>
                        {ButtonContent}
                    </Link>
                )
            ) : (
                <button onClick={onClick} className={baseClasses}>
                    {ButtonContent}
                </button>
            )}
        </motion.div>
    )
}
