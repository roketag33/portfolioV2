'use client'

import { useCallback, useState, useEffect } from 'react'
import {
    ReactFlow,
    MiniMap,
    Controls,
    Background,
    useNodesState,
    useEdgesState,
    addEdge,
    Node,
    Edge,
    Connection,
    ReactFlowProvider,
} from '@xyflow/react'
import '@xyflow/react/dist/style.css'
import { Button } from '@/components/ui/button'
import { PlusCircle, Save } from 'lucide-react'
import { NodeViewWrapper } from '@tiptap/react'
import { Card } from '@/components/ui/card'

const initialNodesProp: Node[] = [
    { id: '1', position: { x: 0, y: 0 }, data: { label: 'Start' } },
    { id: '2', position: { x: 0, y: 100 }, data: { label: 'Process' } },
];
const initialEdgesProp: Edge[] = [{ id: 'e1-2', source: '1', target: '2' }];

const FlowEditor = ({ node, updateAttributes }: any) => {
    // Ideally we load from node attributes, defaulting to initial if empty
    const [nodes, setNodes, onNodesChange] = useNodesState<Node>(
        node.attrs.nodes?.length ? node.attrs.nodes : initialNodesProp
    );
    const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>(
        node.attrs.edges?.length ? node.attrs.edges : initialEdgesProp
    );

    const onConnect = useCallback(
        (params: Connection) => setEdges((eds) => addEdge(params, eds)),
        [setEdges],
    );

    // Sync back to Tiptap whenever nodes or edges change
    useEffect(() => {
        // Debounce to avoid "flushSync" error and frequent updates
        const timeout = setTimeout(() => {
            updateAttributes({ nodes, edges })
        }, 500)

        return () => clearTimeout(timeout)
    }, [nodes, edges, updateAttributes])

    const addNode = () => {
        const id = `node-${Date.now()}` // Unique ID based on timestamp
        const newNode: Node = {
            id,
            position: { x: Math.random() * 300, y: Math.random() * 300 },
            // Default node has input (top) and output (bottom) handles
            data: { label: `Node ${nodes.length + 1}` },
        }
        setNodes((nds) => [...nds, newNode])
    }

    return (
        <NodeViewWrapper className="my-8">
            <Card className="h-[500px] w-full border-2 border-dashed relative overflow-hidden group">
                <div className="absolute top-4 right-4 z-10 flex gap-2">
                    <Button size="sm" onClick={addNode} className="gap-2">
                        <PlusCircle className="w-4 h-4" /> Add Node
                    </Button>
                </div>

                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    onConnect={onConnect}
                    fitView
                    className="bg-background/50"
                >
                    <Controls />
                    <MiniMap />
                    <Background gap={12} size={1} />
                </ReactFlow>
            </Card>
        </NodeViewWrapper>
    )
}

export default function FlowComponent(props: any) {
    return (
        <ReactFlowProvider>
            <FlowEditor {...props} />
        </ReactFlowProvider>
    )
}
