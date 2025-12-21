'use client'

import { NodeViewWrapper } from '@tiptap/react'
import { useEffect, useState, useCallback } from 'react'
import dynamic from 'next/dynamic'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button' // Assuming you have a button component

// Lazy load Excalidraw to reduce bundle size
const Excalidraw = dynamic(
    () => import('@excalidraw/excalidraw').then((mod) => mod.Excalidraw),
    { ssr: false }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
) as React.ComponentType<any>

import "@excalidraw/excalidraw/index.css";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function ExcalidrawComponent({ node, updateAttributes }: any) {
    const [elements, setElements] = useState(node.attrs.elements || [])
    const [appState, setAppState] = useState(node.attrs.appState || {})
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [excalidrawAPI, setExcalidrawAPI] = useState<any>(null)

    // Debounce updates to avoid performance issues
    const updateTimeoutRef = useState<NodeJS.Timeout | null>(null)

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const onChange = (els: any[], state: any) => {
        setElements(els)
        setAppState(state)

        // Debounce updateAttributes
        /*
        if (updateTimeoutRef.current) {
            clearTimeout(updateTimeoutRef.current)
        }
        
        // Use a ref for timeout in a real component, here simplistic
        // Actually better to just use a timeout directly in useEffect if we had one depending on elements
        // But onChange fires frequently. Let's debounce here.
        */
    }

    // Effect to sync back to Tiptap
    useEffect(() => {
        const timeout = setTimeout(() => {
            updateAttributes({
                elements, appState: {
                    ...appState,
                    collaborators: [] // Remove collaborators to avoid circular/large data
                }
            })
        }, 1000)

        return () => clearTimeout(timeout)
    }, [elements, appState, updateAttributes])

    return (
        <NodeViewWrapper className="my-8 not-prose">
            <Card className="h-[600px] w-full border-2 border-dashed relative overflow-hidden bg-white dark:bg-zinc-900">
                <div className="absolute top-0 left-0 w-full h-full" style={{ isolation: 'isolate' }}>
                    {/*  Excalidraw needs an explicit width/height container usually */}
                    <Excalidraw
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        excalidrawAPI={(api: any) => setExcalidrawAPI(api)}
                        initialData={{
                            elements: elements,
                            appState: {
                                ...appState,
                                isLoading: false,
                                viewBackgroundColor: '#ffffff'
                            },
                            scrollToContent: true
                        }}
                        onChange={onChange}
                        UIOptions={{
                            canvasActions: {
                                loadScene: false,
                                saveToActiveFile: false,
                                saveAsImage: true
                            }
                        }}
                        theme="light"
                    />
                </div>
            </Card>
        </NodeViewWrapper>
    )
}
