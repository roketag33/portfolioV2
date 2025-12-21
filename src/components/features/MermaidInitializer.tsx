'use client'

import { useEffect } from 'react'
import mermaid from 'mermaid'

export default function MermaidInitializer() {
    useEffect(() => {
        mermaid.initialize({
            startOnLoad: true,
            theme: 'dark',
            securityLevel: 'loose',
        })
        mermaid.run({
            querySelector: '.mermaid'
        })
    }, [])

    return null
}
