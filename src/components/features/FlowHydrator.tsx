'use client'

import { useEffect, useRef } from 'react'
import { createRoot } from 'react-dom/client'
import ClientFlowRenderer from './ClientFlowRenderer'

export default function FlowHydrator() {
    // Keep track of hydrated elements to avoid double-hydration
    const hydratedRef = useRef(new Set<HTMLElement>())

    useEffect(() => {
        const elements = document.querySelectorAll('.flow-diagram')
        elements.forEach((el) => {
            if (hydratedRef.current.has(el as HTMLElement)) return

            try {
                const nodes = JSON.parse(el.getAttribute('data-nodes') || '[]')
                const edges = JSON.parse(el.getAttribute('data-edges') || '[]')

                // Create a container for the React root
                const container = document.createElement('div')
                container.style.width = '100%'
                container.style.height = '100%'

                // Clear the placeholder content (though it might be empty from server)
                el.innerHTML = ''
                el.appendChild(container)

                const root = createRoot(container)
                root.render(<ClientFlowRenderer nodes={nodes} edges={edges} />)

                hydratedRef.current.add(el as HTMLElement)
            } catch (e) {
                console.error('Failed to hydrate Flow Diagram', e)
            }
        })
    }, [])

    return null
}
