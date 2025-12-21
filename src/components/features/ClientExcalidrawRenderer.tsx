'use client'

import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'

// Lazy load Excalidraw reader/viewer
const Excalidraw = dynamic(
    () => import('@excalidraw/excalidraw').then((mod) => mod.Excalidraw),
    { ssr: false }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
) as React.ComponentType<any>


// This component hydrates the server-rendered placeholder
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function ClientExcalidrawRenderer({ elements, appState }: { elements: any[], appState: any }) {

    if (!elements || elements.length === 0) return null

    return (
        <div className="w-full h-[500px] border-2 rounded-lg overflow-hidden my-8 relative">
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                <Excalidraw
                    initialData={{
                        elements,
                        appState: {
                            ...appState,
                            viewModeEnabled: true,
                            zenModeEnabled: true,
                            gridModeEnabled: false,
                            theme: 'light' // Force light or make dynamic
                        },
                        scrollToContent: true
                    }}
                    viewModeEnabled={true}
                    zenModeEnabled={true}
                    gridModeEnabled={false}
                />
            </div>
            {/* Overlay to prevent interaction if desired, or allow pan/zoom */}
        </div>
    )
}
