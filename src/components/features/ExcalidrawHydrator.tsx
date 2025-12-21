'use client'

import { useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import ClientExcalidrawRenderer from './ClientExcalidrawRenderer'

export default function ExcalidrawHydrator() {
    useEffect(() => {
        const containers = document.querySelectorAll('div[data-type="excalidraw"]')
        containers.forEach((container) => {
            if (container.getAttribute('data-hydrated') === 'true') return

            try {
                const elementsStr = container.getAttribute('data-elements')
                const appStateStr = container.getAttribute('data-app-state')

                const elements = elementsStr ? JSON.parse(elementsStr) : []
                const appState = appStateStr ? JSON.parse(appStateStr) : {}

                container.setAttribute('data-hydrated', 'true')

                // Clear the container (it's empty anyway usually, maybe just text)
                container.innerHTML = ''

                const root = createRoot(container)
                root.render(<ClientExcalidrawRenderer elements={elements} appState={appState} />)

            } catch (e) {
                console.error("Failed to hydrate Excalidraw", e)
            }
        })
    }, [])

    return null
}
