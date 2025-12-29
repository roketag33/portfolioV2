"use client"
import { cn } from "@/lib/utils"

export default function NeonChip({
    children,
    className,
    colorClass = "border-white/20 text-white"
}: {
    children: React.ReactNode
    className?: string
    colorClass?: string
}) {
    // Extract the base color from the border class if possible, or default to a white glow
    // This is a naive implementation, relies on the consumer passing standard tailwind classes

    return (
        <div className={cn(
            "relative inline-flex items-center justify-center px-3 py-1.5 rounded-lg bg-black transition-all duration-300 group hover:-translate-y-0.5",
            // Base styles
            "border",
            colorClass, // e.g. "border-blue-500 text-blue-400"
            // Hover Glow Effect
            "hover:shadow-[0_0_12px_-3px_currentColor]",
            className
        )}>
            <span className="text-[10px] md:text-xs font-bold tracking-wider uppercase">
                {children}
            </span>
        </div>
    )
}
