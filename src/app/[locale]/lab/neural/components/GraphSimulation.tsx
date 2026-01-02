import React, { useRef, useMemo, useEffect, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text } from '@react-three/drei'
import * as THREE from 'three'

export type GraphNode = {
    id: string
    label: string
    level: number
    position: THREE.Vector3
    velocity: THREE.Vector3
    connections: string[] // IDs of connected nodes
}

interface GraphSimulationProps {
    graphData: GraphNode[]
}

function Labels({ graphData, nodesRef }: { graphData: GraphNode[], nodesRef: React.MutableRefObject<GraphNode[]> }) {
    const textRefs = useRef<(THREE.Object3D | null)[]>([])

    useFrame(() => {
        // We iterate through the REFS (physics state) to update positions
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
                    ref={el => { textRefs.current[i] = el; }}
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

export default function GraphSimulation({ graphData }: GraphSimulationProps) {
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
            <instancedMesh
                ref={meshRef}
                args={[undefined, undefined, 1000]}
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
