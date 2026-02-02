'use client'

import { useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'

export default function LazyView({ children, className }: { children: React.ReactNode, className?: string }) {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: "200px" })
    const [shouldRender, setShouldRender] = useState(false)

    useEffect(() => {
        if (isInView) setShouldRender(true)
    }, [isInView])

    return (
        <div ref={ref} className={className}>
            {shouldRender ? children : <div className="h-96 w-full animate-pulse bg-neutral-100/5 rounded-xl" />}
        </div>
    )
}
