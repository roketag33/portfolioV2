"use client"
import * as React from "react"
import { cn } from "@/lib/utils"

export interface InputProps
    extends React.InputHTMLAttributes<HTMLInputElement> { }

const SpotlightInput = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, type, ...props }, ref) => {
        return (
            <div className="group relative">
                <input
                    type={type}
                    className={cn(
                        "flex h-12 w-full rounded-lg bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/20",
                        "border border-white/10 transition-all duration-300 ease-out",
                        "focus:outline-none focus:bg-black/40 focus:border-white/20 focus:shadow-[inset_0_2px_10px_rgba(0,0,0,0.5)]",
                        "hover:bg-white/10",
                        "disabled:cursor-not-allowed disabled:opacity-50",
                        className
                    )}
                    ref={ref}
                    {...props}
                />
                {/* Subtle bottom highlight to enhance depth on focus */}
                <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 transition-opacity duration-300 group-focus-within:opacity-100 pointer-events-none" />
            </div>
        )
    }
)
SpotlightInput.displayName = "SpotlightInput"

const SpotlightTextarea = React.forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(
    ({ className, ...props }, ref) => {
        return (
            <div className="group relative">
                <textarea
                    className={cn(
                        "flex min-h-[120px] w-full rounded-lg bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/20 resize-none",
                        "border border-white/10 transition-all duration-300 ease-out",
                        "focus:outline-none focus:bg-black/40 focus:border-white/20 focus:shadow-[inset_0_2px_10px_rgba(0,0,0,0.5)]",
                        "hover:bg-white/10",
                        "disabled:cursor-not-allowed disabled:opacity-50",
                        className
                    )}
                    ref={ref}
                    {...props}
                />
                <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 transition-opacity duration-300 group-focus-within:opacity-100 pointer-events-none" />
            </div>
        )
    }
)
SpotlightTextarea.displayName = "SpotlightTextarea"

export { SpotlightInput, SpotlightTextarea }
