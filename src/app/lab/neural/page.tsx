'use client'

import React, { useMemo, useRef, useState, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Text, Environment, PerspectiveCamera } from '@react-three/drei'
import * as THREE from 'three'
import { ArrowLeft, Type, Info } from 'lucide-react'
import Link from 'next/link'
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing'

// --- Types ---
type GraphNode = {
    id: string
    label: string
    level: number
    position: THREE.Vector3
    velocity: THREE.Vector3
    connections: string[] // IDs of connected nodes
}

// --- default Markdown ---
const DEFAULT_MARKDOWN = `# My Second Brain
- Ideas
  - 3D Visualization
  - Knowledge Graphs
  - Interactive Art
- Technologies
  - Next.js
  - React Three Fiber
  - WebGL
- Goals
  - Build Portfolio
  - Experiment
  - Learn`

// --- Parser Logic ---
const parseMarkdown = (text: string): GraphNode[] => {
    const lines = text.split('\n')
    const nodes: GraphNode[] = []
    const stack: { node: GraphNode, indent: number }[] = []

    // Helper to find parent
    const getParent = (indent: number) => {
        // Find the nearest node in stack with strictly less indentation
        for (let i = stack.length - 1; i >= 0; i--) {
            if (stack[i].indent < indent) return stack[i].node
        }
        return null
    }

    lines.forEach((line, index) => {
        if (!line.trim()) return

        const indent = line.search(/\S/)
        const content = line.trim().replace(/^[-*#]+\s*/, '') // Remove markers

        // Determine level based on marker or indent
        let level = 0
        if (line.trim().startsWith('#')) level = 1
        else level = 2 + Math.floor(indent / 2)

        const newNode: GraphNode = {
            id: `node-${index}`,
            label: content,
            level,
            position: new THREE.Vector3((Math.random() - 0.5) * 5, (Math.random() - 0.5) * 5, (Math.random() - 0.5) * 5),
            velocity: new THREE.Vector3(0, 0, 0),
            connections: []
        }

        const parent = getParent(indent)
        if (parent) {
            // Bi-directional connection
            parent.connections.push(newNode.id)
            newNode.connections.push(parent.id)
        } else if (nodes.length > 0 && level > 1) {
            // Fallback: connect to root if orphaned but not a root itself
            nodes[0].connections.push(newNode.id)
            newNode.connections.push(nodes[0].id)
        }

        nodes.push(newNode)
        stack.push({ node: newNode, indent })
    })

    // If empty or fail, return a default root
    if (nodes.length === 0) return [{
        id: 'root', label: 'Empty', level: 1,
        position: new THREE.Vector3(0, 0, 0), velocity: new THREE.Vector3(0, 0, 0), connections: []
    }]

    return nodes
}

// --- Simulation Component ---
function GraphSimulation({ graphData }: { graphData: GraphNode[] }) {
    const meshRef = useRef<THREE.InstancedMesh>(null)
    const linesRef = useRef<THREE.LineSegments>(null)
    const [hoveredNode, setHoveredNode] = useState<string | null>(null)

    // Mutable physics state
    const physicsNodes = useRef<GraphNode[]>([])

    // Initialize physics nodes when graphData changes
    useEffect(() => {
        physicsNodes.current = graphData.map(n => ({ ...n, velocity: new THREE.Vector3(0, 0, 0) }))
    }, [graphData])

    const dummy = useMemo(() => new THREE.Object3D(), [])
    const colorAttribute = useMemo(() => new Float32Array(1000 * 3), []) // Buffer for up to 1000 nodes

    useFrame(() => {
        if (!meshRef.current || !linesRef.current) return

        const nodes = physicsNodes.current
        const count = nodes.length
        if (count === 0) return

        // 1. Physics
        for (let i = 0; i < count; i++) {
            const node = nodes[i]

            // Center Force
            node.velocity.add(node.position.clone().multiplyScalar(-0.01))

            // Repulsion
            for (let j = 0; j < count; j++) {
                if (i === j) continue
                const other = nodes[j]
                const diff = node.position.clone().sub(other.position)
                // Small random offset to prevent zero distance division
                if (diff.lengthSq() === 0) diff.set(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5).multiplyScalar(0.01)

                const dist = diff.length()
                if (dist < 4) {
                    node.velocity.add(diff.normalize().multiplyScalar(0.05 / (dist + 0.1)))
                }
            }

            // Connection Attraction (Spring)
            node.connections.forEach(connId => {
                const target = nodes.find(n => n.id === connId)
                if (target) {
                    const diff = target.position.clone().sub(node.position)
                    const dist = diff.length()
                    const restingLength = 2
                    if (dist > restingLength) {
                        node.velocity.add(diff.normalize().multiplyScalar(0.02 * (dist - restingLength)))
                    }
                }
            })

            // Apply & Damping
            node.position.add(node.velocity)
            node.velocity.multiplyScalar(0.9) // Friction

            // Render Instance
            dummy.position.copy(node.position)

            // Scale based on hierarchy and hover
            const baseScale = node.level === 1 ? 1.5 : (node.level === 2 ? 1.0 : 0.6)
            const hoverScale = hoveredNode === node.id ? 1.5 : 1
            dummy.scale.setScalar(baseScale * hoverScale * 0.5)

            dummy.updateMatrix()
            meshRef.current.setMatrixAt(i, dummy.matrix)

            // Color
            const col = new THREE.Color()
            if (node.level === 1) col.set("#ec4899") // Root: Pink
            else if (node.level === 2) col.set("#818cf8") // Level 2: Indigo
            else col.set("#2dd4bf") // Leaf: Teal

            if (hoveredNode === node.id) col.set("#ffffff")

            col.toArray(colorAttribute, i * 3)
        }

        meshRef.current.instanceMatrix.needsUpdate = true
        meshRef.current.count = count
        if (meshRef.current.geometry.attributes.color) {
            meshRef.current.geometry.attributes.color.needsUpdate = true
        }

        // 2. Lines
        const linePos: number[] = []
        // Basic unique connection tracking
        const addedConnections = new Set<string>()

        nodes.forEach(node => {
            node.connections.forEach(targetId => {
                const target = nodes.find(n => n.id === targetId)
                if (target) {
                    const key = [node.id, target.id].sort().join('-')
                    if (!addedConnections.has(key)) {
                        linePos.push(...node.position.toArray(), ...target.position.toArray())
                        addedConnections.add(key)
                    }
                }
            })
        })

        linesRef.current.geometry.setAttribute('position', new THREE.Float32BufferAttribute(linePos, 3))
    })

    return (
        <group>
            {/* Instance Mesh for Nodes */}
            <instancedMesh
                ref={meshRef}
                args={[undefined, undefined, 1000]} // Max capacity
                onPointerOver={(e) => { e.stopPropagation(); setHoveredNode(physicsNodes.current[e.instanceId!]?.id) }}
                onPointerOut={() => setHoveredNode(null)}
            >
                <sphereGeometry args={[1, 16, 16]}>
                    <instancedBufferAttribute attach="attributes-color" args={[colorAttribute, 3]} />
                </sphereGeometry>
                <meshStandardMaterial toneMapped={false} vertexColors emissive="#4f46e5" emissiveIntensity={0.2} roughness={0.4} metalness={0.6} />
            </instancedMesh>

            <Labels graphData={graphData} nodesRef={physicsNodes} />

            <lineSegments ref={linesRef}>
                <bufferGeometry />
                <lineBasicMaterial color="#4f46e5" transparent opacity={0.2} blending={THREE.AdditiveBlending} />
            </lineSegments>
        </group>
    )
}

function Labels({ graphData, nodesRef }: { graphData: GraphNode[], nodesRef: React.MutableRefObject<GraphNode[]> }) {
    const textRefs = useRef<(THREE.Object3D | null)[]>([])

    useFrame(() => {
        // We iterate through the REFS (physics state) to update positions
        // We know that graphData matches physicsNodes in length and order eventually
        const nodes = nodesRef.current
        if (!nodes || nodes.length === 0) return

        nodes.forEach((node, i) => {
            const textObj = textRefs.current[i]
            if (textObj) {
                textObj.position.copy(node.position)
                textObj.position.y += (node.level === 1 ? 0.8 : 0.5) // Offset
                textObj.lookAt(new THREE.Vector3(0, 0, 20)) // Face camera approximate pos
            }
        })
    })

    return (
        <group>
            {graphData.map((node, i) => (
                <Text
                    key={node.id}
                    ref={el => { textRefs.current[i] = el; }} // Manual Ref assignment
                    fontSize={node.level === 1 ? 0.4 : 0.25}
                    color={node.level === 1 ? "white" : "#a5b4fc"}
                    maxWidth={4}
                    textAlign="center"
                >
                    {node.label}
                </Text>
            ))}
        </group>
    )
}

// --- Main Page ---
export default function KnowledgeGraphPage() {
    const [markdown, setMarkdown] = useState(DEFAULT_MARKDOWN)
    const [graphData, setGraphData] = useState<GraphNode[]>([])

    useEffect(() => {
        setGraphData(parseMarkdown(markdown))
    }, [markdown])

    return (
        <main className="h-screen w-full bg-black text-white overflow-hidden flex font-sans">
            {/* LEFT: Editor Panel */}
            <div className="w-1/3 min-w-[350px] max-w-[500px] h-full bg-neutral-900 border-r border-neutral-800 flex flex-col z-10 shadow-2xl relative">
                {/* Header */}
                <div className="p-4 border-b border-neutral-800 flex items-center justify-between bg-neutral-900">
                    <Link href="/lab" className="flex items-center gap-2 text-xs text-neutral-400 hover:text-white transition-colors">
                        <ArrowLeft className="w-4 h-4" />
                        Back
                    </Link>
                    <div className="flex items-center gap-2">
                        <span className="text-xs font-bold tracking-wider text-indigo-400 uppercase">Input Data</span>
                    </div>
                </div>

                {/* Editor */}
                <textarea
                    value={markdown}
                    onChange={(e) => setMarkdown(e.target.value)}
                    className="flex-grow bg-[#0a0a0a] text-neutral-300 p-6 font-mono text-sm resize-none focus:outline-none focus:ring-1 focus:ring-indigo-500/50 leading-relaxed custom-scrollbar"
                    placeholder="# Your Title\n- Topic A\n  - Subtopic 1"
                    spellCheck={false}
                />

                {/* Toolbar */}
                <div className="p-4 border-t border-neutral-800 bg-neutral-900 text-xs text-neutral-500 flex gap-4">
                    <div className="flex items-center gap-1"><Type className="w-3 h-3" /> Markdown Support</div>
                    <div className="flex items-center gap-1"><Info className="w-3 h-3" /> Auto-updates</div>
                </div>
            </div>

            {/* RIGHT: 3D Canvas */}
            <div className="flex-grow relative bg-black">
                {/* Overlay UI */}
                <div className="absolute top-6 right-6 z-20 pointer-events-none text-right">
                    <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-pink-400">Knowledge Graph</h1>
                    <p className="text-sm text-neutral-500">Interactive 3D Visualization</p>
                </div>

                <Canvas dpr={[1, 2]}>
                    <PerspectiveCamera makeDefault position={[0, 0, 20]} fov={40} />
                    <color attach="background" args={['#030712']} />

                    <ambientLight intensity={0.5} />
                    <pointLight position={[10, 10, 10]} intensity={1} color="#4f46e5" />

                    <GraphSimulation graphData={graphData} />

                    <OrbitControls makeDefault autoRotate autoRotateSpeed={0.5} enablePan={true} maxDistance={50} minDistance={5} />
                    <Environment preset="night" />
                    <EffectComposer>
                        <Bloom luminanceThreshold={0.5} mipmapBlur intensity={1.0} />
                        <Vignette eskil={false} offset={0.1} darkness={1.1} />
                    </EffectComposer>
                </Canvas>
            </div>

            <style jsx global>{`
                .custom-scrollbar::-webkit-scrollbar { width: 6px; }
                .custom-scrollbar::-webkit-scrollbar-track { background: #171717; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: #404040; border-radius: 3px; }
            `}</style>
        </main>
    )
}
