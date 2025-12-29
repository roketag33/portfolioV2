"use client"
import { cn } from "@/lib/utils"
import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"

interface TextRevealByWordProps {
    text: string
    className?: string
}

export default function TextRevealByWord({
    text,
    className,
}: TextRevealByWordProps) {
    const targetRef = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ["start 0.9", "end 0.6"], // Starts revealing when top of text hits 90% viewport, fully revealed when bottom hits 60%
    })

    // Split text into words
    const words = text.split(" ")

    return (
        <div ref={targetRef} className={cn("relative z-0 min-h-[100px]", className)}>
            <div className={"sticky top-0 mx-auto max-w-4xl"}>
                <p className={"flex flex-wrap p-5 text-2xl font-bold text-black/20 dark:text-white/20 md:text-3xl lg:p-10 lg:text-4xl xl:text-5xl"}>
                    {words.map((word, i) => {
                        const start = i / words.length
                        const end = start + 1 / words.length
                        return (
                            <Word key={i} progress={scrollYProgress} range={[start, end]}>
                                {word}
                            </Word>
                        )
                    })}
                </p>
            </div>
        </div>
    )
}

interface WordProps {
    children: React.ReactNode
    progress: any
    range: [number, number]
}

const Word = ({ children, progress, range }: WordProps) => {
    const opacity = useTransform(progress, range, [0, 1])

    return (
        <span className="relative mx-1 lg:mx-2.5">
            <span className={"absolute opacity-30"}>{children}</span>
            <motion.span style={{ opacity: opacity }} className={"text-black dark:text-white"}>
                {children}
            </motion.span>
        </span>
    )
}
