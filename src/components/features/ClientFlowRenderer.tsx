'use client'

import { ReactFlow, Background, Controls } from '@xyflow/react'
import '@xyflow/react/dist/style.css'
import { useEffect, useState, useMemo } from 'react'
import CustomNode from '@/components/editor/extensions/CustomNode'

interface ClientFlowRendererProps {
    nodes: any[]
    edges: any[]
}

export default function ClientFlowRenderer({ nodes: initialNodes, edges: initialEdges }: ClientFlowRendererProps) {
    // We need to ensure this only renders on client to avoid hydration mismatch
    const [isMounted, setIsMounted] = useState(false)
    const nodeTypes = useMemo(() => ({ custom: CustomNode }), [])

    useEffect(() => {
        setIsMounted(true)
    }, [])

    if (!isMounted) return <div className="h-[400px] w-full bg-muted/20 animate-pulse rounded-lg" />

    // Read-only view
    return (
        <div className="h-[400px] w-full border rounded-lg bg-background/50 backdrop-blur-sm overflow-hidden my-8">
            <ReactFlow
                nodes={initialNodes}
                edges={initialEdges}
                nodeTypes={nodeTypes}
                fitView
                proOptions={{ hideAttribution: true }}
                nodesDraggable={false}
                nodesConnectable={false}
                elementsSelectable={false}
            >
                <Background color="#555" gap={16} />
                <Controls showInteractive={false} />
            </ReactFlow>
        </div>
    )
}
