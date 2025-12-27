'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Line, Box, Html, Float, Stars } from '@react-three/drei'
import { Suspense, useRef, useMemo, useState } from 'react'
import * as THREE from 'three'

// Un nœud du système (Serveur, Mobile, etc.)
function SystemNode({ position, label, icon }: { position: [number, number, number], label: string, icon: string }) {
    const meshRef = useRef<THREE.Mesh>(null)
    const [hovered, setHover] = useState(false)

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.y += 0.01
            meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime + position[0]) * 0.1
        }
    })

    return (
        <group position={position}>
            <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
                {/* Core Cube represented as Wireframe */}
                <Box args={[1, 1, 1]} ref={meshRef} onPointerOver={() => setHover(true)} onPointerOut={() => setHover(false)}>
                    <meshBasicMaterial color={hovered ? "#3b82f6" : "#ffffff"} wireframe transparent opacity={0.3} />
                </Box>

                {/* Inner Core */}
                <Box args={[0.6, 0.6, 0.6]}>
                    <meshBasicMaterial color={hovered ? "#60a5fa" : "#94a3b8"} wireframe transparent opacity={0.1} />
                </Box>

                {/* Floating Label */}
                <Html position={[0, 1.2, 0]} center distanceFactor={10} className="pointer-events-none">
                    <div className={`px-2 py-1 rounded border backdrop-blur-md transition-colors duration-300 whitespace-nowrap text-center
                        ${hovered ? 'border-blue-500 bg-blue-500/20 text-blue-200' : 'border-white/10 bg-black/50 text-white/50'}`}>
                        <div className="text-[8px] font-mono tracking-widest uppercase mb-0.5">{icon}</div>
                        <div className="text-xs font-bold font-mono">{label}</div>
                    </div>
                </Html>
            </Float>
        </group>
    )
}

// Une connexion de données entre deux points
function DataConnection({ start, end }: { start: [number, number, number], end: [number, number, number] }) {
    const points = useMemo(() => [new THREE.Vector3(...start), new THREE.Vector3(...end)], [start, end])

    // Packet de données qui voyage
    const packetRef = useRef<THREE.Mesh>(null)
    useFrame((state) => {
        if (packetRef.current) {
            const time = state.clock.elapsedTime
            // Simple interpolation 0 -> 1 looping
            const t = (time % 2) / 2
            packetRef.current.position.lerpVectors(points[0], points[1], t)
        }
    })

    return (
        <group>
            {/* Ligne statique */}
            <Line points={points} color="#ffffff" transparent opacity={0.1} lineWidth={1} />

            {/* Packet de données mobile */}
            <mesh ref={packetRef}>
                <boxGeometry args={[0.1, 0.1, 0.1]} />
                <meshBasicMaterial color="#3b82f6" />
            </mesh>
        </group>
    )
}

function ArchitectureScene() {
    // Définition des nœuds
    const nodes = [
        { id: 'cloud', pos: [0, 2, 0] as [number, number, number], label: 'CLOUD / API', icon: '☁️' },
        { id: 'iot', pos: [-2.5, -1, 1] as [number, number, number], label: 'IoT DEVICE', icon: '🤖' },
        { id: 'mobile', pos: [2.5, -1, 1] as [number, number, number], label: 'MOBILE APP', icon: '📱' },
        { id: 'db', pos: [0, -2, -1] as [number, number, number], label: 'DATABASE', icon: '🗄️' },
    ]

    return (
        <group>
            {/* Render Nodes */}
            {nodes.map(node => (
                <SystemNode key={node.id} position={node.pos} label={node.label} icon={node.icon} />
            ))}

            {/* Render Connections */}
            {/* Cloud to everyone */}
            <DataConnection start={nodes[0].pos} end={nodes[1].pos} /> {/* Cloud -> IoT */}
            <DataConnection start={nodes[0].pos} end={nodes[2].pos} /> {/* Cloud -> Mobile */}
            <DataConnection start={nodes[0].pos} end={nodes[3].pos} /> {/* Cloud -> DB */}

            {/* IoT to Mobile (Direct or via BLE logic represented) */}
            <DataConnection start={nodes[1].pos} end={nodes[2].pos} />

            {/* Ambient Particles */}
            <Stars radius={40} depth={50} count={1000} factor={3} saturation={0} fade speed={1} />
        </group>
    )
}

export default function SystemBlueprint() {
    return (
        <div className="w-full h-full min-h-[400px] relative">
            <Canvas camera={{ position: [0, 0, 8], fov: 40 }}>
                <Suspense fallback={null}>
                    <ArchitectureScene />
                    <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
                </Suspense>
            </Canvas>

            {/* Overlay Info */}
            <div className="absolute bottom-6 left-6 pointer-events-none select-none">
                <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-mono text-blue-400 uppercase tracking-widest border border-blue-500/30 bg-blue-500/10 px-2 py-1 rounded w-fit backdrop-blur-sm animate-pulse">
                        SYSTEM_STATUS: ONLINE
                    </span>
                    <span className="text-white/30 text-xs font-mono">
                        Architecture View v2.4
                    </span>
                </div>
            </div>

            {/* Decorative Grid overlay */}
            <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_80%)]" />
        </div>
    )
}
