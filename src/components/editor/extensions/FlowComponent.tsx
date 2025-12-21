'use client'

import { useCallback, useState, useEffect, useMemo } from 'react'
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
    useReactFlow,
    ConnectionMode
} from '@xyflow/react'
import '@xyflow/react/dist/style.css'
import { Button } from '@/components/ui/button'
import { Trash, Square, Circle, Diamond, Slash, Database, FileText } from 'lucide-react'
import { NodeViewWrapper } from '@tiptap/react'
import { Card } from '@/components/ui/card'
import CustomNode from './CustomNode'

const initialNodesProp: Node[] = [
    { id: '1', type: 'custom', position: { x: 0, y: 0 }, data: { label: 'Start', bg: '#10b981', shape: 'rounded' } },
];
const initialEdgesProp: Edge[] = [];

const FlowEditor = ({ node, updateAttributes }: any) => {
    // Define custom node types
    const nodeTypes = useMemo(() => ({ custom: CustomNode }), [])

    // Load from attributes
    const [nodes, setNodes, onNodesChange] = useNodesState<Node>(
        node.attrs.nodes?.length ? node.attrs.nodes : initialNodesProp
    );
    const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>(
        node.attrs.edges?.length ? node.attrs.edges : initialEdgesProp
    );

    const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null)
    const [selectedEdgeId, setSelectedEdgeId] = useState<string | null>(null)
    const [bgColor, setBgColor] = useState('#fafafa')
    const [bgVariant, setBgVariant] = useState<any>('dots')

    const onConnect = useCallback(
        (params: Connection) => setEdges((eds) => addEdge({ ...params, type: 'smoothstep', animated: true }, eds)),
        [setEdges],
    );

    const onNodeClick = (_: any, node: Node) => {
        setSelectedNodeId(node.id)
        setSelectedEdgeId(null)
    }

    const onEdgeClick = (_: any, edge: Edge) => {
        setSelectedEdgeId(edge.id)
        setSelectedNodeId(null)
    }

    const onPaneClick = () => {
        setSelectedNodeId(null)
        setSelectedEdgeId(null)
    }

    // Sync back to Tiptap whenever nodes or edges change
    useEffect(() => {
        // Debounce to avoid "flushSync" error and frequent updates
        const timeout = setTimeout(() => {
            updateAttributes({ nodes, edges })
        }, 500)
        return () => clearTimeout(timeout)
    }, [nodes, edges, updateAttributes])

    const addNode = (type: 'rounded' | 'circle' | 'diamond' | 'parallelogram' | 'database' | 'file' = 'rounded') => {
        const id = `node-${Date.now()}`
        const newNode: Node = {
            id,
            type: 'custom',
            // Simple random position around center-ish
            position: { x: Math.random() * 200 + 50, y: Math.random() * 200 + 50 },
            data: {
                label: type === 'diamond' ? 'Wait' : type === 'database' ? 'DB' : 'Node',
                bg: '#ffffff',
                shape: type
            },
        }
        setNodes((nds) => [...nds, newNode])
    }

    const updateNodeColor = (color: string) => {
        if (!selectedNodeId) return
        setNodes((nds) =>
            nds.map((n) => {
                if (n.id === selectedNodeId) {
                    return { ...n, data: { ...n.data, bg: color } }
                }
                return n
            })
        )
    }

    const updateEdgeType = (type: string) => {
        if (!selectedEdgeId) return
        setEdges((eds) =>
            eds.map((e) => {
                if (e.id === selectedEdgeId) return { ...e, type }
                return e
            })
        )
    }

    const updateEdgeAnimated = () => {
        if (!selectedEdgeId) return
        setEdges((eds) =>
            eds.map((e) => {
                if (e.id === selectedEdgeId) return { ...e, animated: !e.animated }
                return e
            })
        )
    }

    const deleteSelected = () => {
        if (selectedNodeId) {
            setNodes((nds) => nds.filter((n) => n.id !== selectedNodeId))
            setSelectedNodeId(null)
        }
        if (selectedEdgeId) {
            setEdges((eds) => eds.filter((e) => e.id !== selectedEdgeId))
            setSelectedEdgeId(null)
        }
    }

    return (
        <NodeViewWrapper className="my-8">
            <Card className="h-[600px] w-full border-2 border-dashed relative overflow-hidden group flex flex-col">
                {/* Toolbar */}
                <div className="p-2 border-b bg-muted/20 flex flex-wrap gap-2 items-center justify-between z-10 min-h-[50px]">
                    <div className="flex gap-2">
                        {/* Shape Adder */}
                        <div className="flex gap-1 border-r pr-2 mr-2">
                            <Button variant="ghost" size="sm" onClick={() => addNode('rounded')} className="h-8 w-8 p-0" title="Box">
                                <Square className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm" onClick={() => addNode('circle')} className="h-8 w-8 p-0" title="Circle">
                                <Circle className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm" onClick={() => addNode('diamond')} className="h-8 w-8 p-0" title="Decision">
                                <Diamond className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm" onClick={() => addNode('parallelogram')} className="h-8 w-8 p-0" title="Input/Output">
                                <Slash className="w-4 h-4 transform -rotate-45" />
                            </Button>
                            <Button variant="ghost" size="sm" onClick={() => addNode('database')} className="h-8 w-8 p-0" title="Database">
                                <Database className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm" onClick={() => addNode('file')} className="h-8 w-8 p-0" title="File">
                                <FileText className="w-4 h-4" />
                            </Button>
                        </div>
                    </div>

                    {/* Contextual Options */}
                    <div className="flex gap-2 items-center">
                        {selectedNodeId && (
                            <div className="flex gap-2 items-center animate-in fade-in">
                                <div className="text-xs text-muted-foreground mr-1">Node:</div>
                                {['#ffffff', '#ef4444', '#3b82f6', '#10b981', '#f59e0b', '#8b5cf6'].map(color => (
                                    <button
                                        key={color}
                                        className="w-5 h-5 rounded-full border border-border transition-transform hover:scale-110 focus:ring-1 ring-offset-1"
                                        style={{ backgroundColor: color }}
                                        onClick={() => updateNodeColor(color)}
                                    />
                                ))}
                            </div>
                        )}

                        {selectedEdgeId && (
                            <div className="flex gap-2 items-center animate-in fade-in">
                                <div className="text-xs text-muted-foreground mr-1">Link:</div>
                                <select
                                    className="h-8 text-xs border rounded bg-background text-foreground"
                                    onChange={(e) => updateEdgeType(e.target.value)}
                                >
                                    <option value="smoothstep"> Smooth</option>
                                    <option value="step">Step</option>
                                    <option value="straight">Straight</option>
                                    <option value="bezier">Bezier</option>
                                </select>
                                <Button variant="outline" size="sm" onClick={updateEdgeAnimated} className="h-8 text-xs">
                                    Anim
                                </Button>
                            </div>
                        )}

                        {!selectedNodeId && !selectedEdgeId && (
                            <div className="flex gap-2 items-center animate-in fade-in">
                                <div className="text-xs text-muted-foreground mr-1">Bg:</div>
                                <select
                                    className="h-8 text-xs border rounded bg-background text-foreground w-20"
                                    onChange={(e) => setBgVariant(e.target.value)}
                                    value={bgVariant}
                                >
                                    <option value="dots">Dots</option>
                                    <option value="lines">Lines</option>
                                    <option value="cross">Cross</option>
                                </select>
                            </div>
                        )}

                        {(selectedNodeId || selectedEdgeId) && (
                            <Button variant="destructive" size="sm" onClick={deleteSelected} className="h-8 w-8 p-0 ml-2">
                                <Trash className="w-4 h-4" />
                            </Button>
                        )}
                    </div>
                </div>

                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    nodeTypes={nodeTypes}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    onConnect={onConnect}
                    onNodeClick={onNodeClick}
                    onEdgeClick={onEdgeClick}
                    onPaneClick={onPaneClick}
                    fitView
                    connectionMode={ConnectionMode.Loose}
                    className="bg-background/50 flex-1"
                >
                    <Controls />
                    <MiniMap />
                    <Background gap={16} size={1} color={bgColor === '#000' ? '#333' : '#ddd'} variant={bgVariant} />
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
