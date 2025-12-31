'use client'

import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

export default function ClientPortal({ children }: { children: React.ReactNode }) {
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        // eslint-disable-next-line
        setMounted(true)
        // Cleanup function not needed for simple body portal usually, 
        // but explicit removal is handled by React Portal.
    }, [])

    if (!mounted) return null

    return createPortal(children, document.body)
}
