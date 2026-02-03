'use client'

import { NodeViewWrapper, ReactNodeViewRenderer } from '@tiptap/react'
import { MermaidDefinition } from './definitions/Mermaid'
import { useState, useEffect, useRef } from 'react'
import mermaid from 'mermaid'
import { Textarea } from '@/components/ui/textarea'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

import { Button } from '@/components/ui/button'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const MermaidComponent = ({ node, updateAttributes, editor }: any) => {
    const [code, setCode] = useState(node.attrs.code)
    const [showCode, setShowCode] = useState(false)
    const [rendered, setRendered] = useState('')
    const [error, setError] = useState('')
    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
        // Initialize mermaid only once or when needed
        mermaid.initialize({
            startOnLoad: false,
            theme: 'dark',
            securityLevel: 'loose'
        })
    }, [])

    useEffect(() => {
        const renderDiagram = async () => {
            if (!ref.current) return

            try {
                const id = `mermaid-${Date.now()}`
                const { svg } = await mermaid.render(id, code)
                setRendered(svg)
                setError('')
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } catch (e: any) {
                // Mermaid throws error for invalid syntax
                console.error('Mermaid render error:', e)
                setError('Invalid Syntax')
                // Keep previous rendering if possible? Or clear it? 
                // For now, let's leave it or set simple error text.
            }
        }

        const timeout = setTimeout(() => {
            renderDiagram()
        }, 500) // Debounce

        return () => clearTimeout(timeout)
    }, [code])

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newCode = e.target.value
        setCode(newCode)
        updateAttributes({ code: newCode })
    }

    return (
        <NodeViewWrapper className="my-8">
            <Card className="p-4 bg-card border-2 border-dashed relative group">
                <Badge className="absolute top-2 right-2 bg-blue-600">Mermaid Diagram</Badge>

                {/* Render Preview */}
                <div
                    ref={ref}
                    className="flex justify-center p-6 bg-white/5 rounded-lg min-h-[100px] mb-4 overflow-x-auto"
                    dangerouslySetInnerHTML={{ __html: rendered }}
                />

                {error && <div className="text-red-400 text-sm mb-2 font-mono">{error}</div>}

                {/* Code Editor Toggle */}
                {editor.isEditable && (
                    <div className="flex justify-end mb-2">
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setShowCode(!showCode)}
                            className="text-xs text-muted-foreground h-6"
                        >
                            {showCode ? 'Hide Code' : 'Edit Diagram'}
                        </Button>
                    </div>
                )}

                {/* Code Editor */}
                {editor.isEditable && showCode && (
                    <Textarea
                        value={code}
                        onChange={handleChange}
                        className="font-mono text-sm bg-black/50 border-none resize-y"
                        placeholder="Enter Mermaid syntax (e.g. graph TD; A-->B;)"
                        rows={5}
                    />
                )}
            </Card>
        </NodeViewWrapper>
    )
}

export const MermaidExtension = MermaidDefinition.extend({
    addNodeView() {
        return ReactNodeViewRenderer(MermaidComponent)
    },
})
