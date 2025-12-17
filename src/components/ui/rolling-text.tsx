'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface RollingTextProps {
    children: string
    className?: string
    textClassName?: string
}

export const RollingText = ({ children, className, textClassName }: RollingTextProps) => {
    return (
        <motion.div
            initial="initial"
            whileHover="hover"
            className={cn("relative overflow-hidden flex flex-col h-[1.2em] cursor-pointer", className)}
            style={{ lineHeight: '1.2em' }} // Ensure consistent height
        >
            <motion.div
                variants={{
                    initial: { y: 0 },
                    hover: { y: "-100%" }
                }}
                transition={{ duration: 0.4, ease: [0.33, 1, 0.68, 1] }} // "Power3.out" feel like Holy
                className="flex flex-col"
            >
                <span className={cn("block h-[1.2em] leading-[1.2em]", textClassName)}>{children}</span>
                <span className={cn("block h-[1.2em] leading-[1.2em]", textClassName)}>{children}</span>
            </motion.div>
        </motion.div>
    )
}
