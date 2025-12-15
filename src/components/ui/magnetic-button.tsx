'use client'
import { useRef, useState, ReactNode } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface MagneticButtonProps {
    children: ReactNode
    className?: string
    onClick?: () => void
    variant?: 'primary' | 'secondary'
}

export default function MagneticButton({ children, className, onClick, variant = 'primary' }: MagneticButtonProps) {
    const ref = useRef<HTMLDivElement>(null)
    const [position, setPosition] = useState({ x: 0, y: 0 })

    const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
        const { clientX, clientY } = e
        const { height, width, left, top } = ref.current!.getBoundingClientRect()
        const middleX = clientX - (left + width / 2)
        const middleY = clientY - (top + height / 2)

        // Magnetic pull strength
        setPosition({ x: middleX * 0.3, y: middleY * 0.3 })
    }

    const reset = () => {
        setPosition({ x: 0, y: 0 })
    }

    return (
        <motion.div
            className="relative"
            style={{ position: 'relative' }}
            ref={ref}
            onMouseMove={handleMouse}
            onMouseLeave={reset}
            animate={{ x: position.x, y: position.y }}
            transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
        >
            <button
                onClick={onClick}
                className={cn(
                    "relative overflow-hidden rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                    variant === 'primary'
                        ? "bg-foreground text-background hover:bg-foreground/90"
                        : "border border-white/10 bg-white/10 hover:bg-white/20 text-white",
                    "px-8 py-4 text-lg font-medium",
                    className
                )}
            >
                <span className="relative z-10">{children}</span>
            </button>
        </motion.div>
    )
}
