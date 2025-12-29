import React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

export default function ShimmerText({
    text,
    className
}: {
    text: string
    className?: string
}) {
    const [transition, setTransition] = React.useState<any>({
        repeat: Infinity,
        duration: 2,
        ease: "linear",
        repeatType: "loop",
        repeatDelay: 0,
        delay: 0
    })

    React.useEffect(() => {
        setTransition({
            repeat: Infinity,
            duration: 2 + Math.random(), // Duration between 2s and 3s
            ease: "linear",
            repeatType: "loop",
            repeatDelay: Math.random() * 5, // Random delay between loops (0-5s)
            delay: Math.random() * 2 // Random start delay (0-2s)
        })
    }, [])

    return (
        <motion.span
            className={cn(
                "relative inline-block bg-[linear-gradient(110deg,#9ca3af,45%,#ffffff,55%,#9ca3af)] bg-[length:250%_100%] bg-clip-text text-transparent transform translate-z-0",
                className
            )}
            initial={{ backgroundPosition: "100% 0" }}
            animate={{ backgroundPosition: "-100% 0" }}
            transition={transition}
        >
            {text}
        </motion.span>
    )
}
