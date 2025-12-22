'use client'

import React, { useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { Physics, usePlane, useBox, useSphere } from '@react-three/cannon'
import { OrbitControls, Environment } from '@react-three/drei'
import * as THREE from 'three'
import { ArrowLeft, Box, Circle, Trash2, Gauge } from 'lucide-react'
import Link from 'next/link'

// --- Components ---

function Plane(props: Record<string, unknown>) {
    const [ref] = usePlane(() => ({ rotation: [-Math.PI / 2, 0, 0], ...props }))
    return <mesh ref={ref} receiveShadow>
        <planeGeometry args={[100, 100]} />
        {/* Grid Texture or Shader could go here, using basic material for now */}
        <meshStandardMaterial color="#1a1a1a" roughness={0.8} metalness={0.2} />
    </mesh>
}

// Reusable Cube
function Cube({ position, type = 'dynamic' }: { position: [number, number, number], type?: 'dynamic' | 'static' | 'kinematic' }) {
    const [ref] = useBox(() => ({ mass: type === 'dynamic' ? 1 : 0, position, args: [1, 1, 1] }))
    const [color] = useState(() => ['#ef4444', '#f97316', '#eab308', '#22c55e', '#3b82f6', '#8b5cf6'][Math.floor(Math.random() * 6)])

    return <mesh ref={ref} castShadow receiveShadow>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color={color} roughness={0.4} />
    </mesh>
}

// Reusable Sphere
function Sphere({ position }: { position: [number, number, number] }) {
    const [ref] = useSphere(() => ({ mass: 1, position, args: [0.7] }))
    const [color] = useState(() => ['#06b6d4', '#ec4899', '#14b8a6', '#f43f5e'][Math.floor(Math.random() * 4)])

    return <mesh ref={ref} castShadow receiveShadow>
        <sphereGeometry args={[0.7, 32, 32]} />
        <meshStandardMaterial color={color} roughness={0.1} metalness={0.5} />
    </mesh>
}

// --- Main Page ---
export default function GravityPage() {
    const [objects, setObjects] = useState<{ id: string, type: 'box' | 'sphere', position: [number, number, number] }[]>([])
    const [gravity, setGravity] = useState<[number, number, number]>([0, -9.81, 0])
    const [spawnMode, setSpawnMode] = useState<'box' | 'sphere'>('box')

    const spawnObject = (point: THREE.Vector3) => {
        const id = Math.random().toString(36).substr(2, 9)
        setObjects(prev => [...prev, { id, type: spawnMode, position: [point.x, point.y + 2, point.z] }])
    }

    const clearObjects = () => setObjects([])

    return (
        <main className="h-screen w-full bg-neutral-950 text-white font-sans overflow-hidden">
            {/* Header UI */}
            <div className="absolute top-0 left-0 p-6 z-20 flex gap-6 items-center pointer-events-none">
                <Link href="/lab" className="flex items-center gap-2 text-neutral-400 hover:text-white transition-colors pointer-events-auto">
                    <ArrowLeft className="w-5 h-5" />
                    <span className="font-bold tracking-wider">BACK TO LAB</span>
                </Link>
            </div>

            {/* HUD / Controls */}
            <div className="absolute bottom-8 left-8 z-20 bg-black/50 backdrop-blur-md border border-white/10 p-6 rounded-2xl w-[320px]">
                <div className="flex items-center gap-2 mb-4 text-indigo-400">
                    <Gauge className="w-5 h-5" />
                    <h2 className="font-bold text-lg">Gravity Control</h2>
                </div>

                {/* Gravity Sliders */}
                <div className="space-y-4 mb-6">
                    {['X', 'Y', 'Z'].map((axis, i) => (
                        <div key={axis} className="flex gap-4 items-center text-sm">
                            <span className="w-4 font-mono text-neutral-500">{axis}</span>
                            <input
                                type="range"
                                min="-20" max="20" step="0.5"
                                value={gravity[i]}
                                onChange={(e) => {
                                    const newG = [...gravity] as [number, number, number]
                                    newG[i] = parseFloat(e.target.value)
                                    setGravity(newG)
                                }}
                                className="flex-grow h-1 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                            />
                            <span className="w-10 font-mono text-right">{gravity[i].toFixed(1)}</span>
                        </div>
                    ))}
                </div>

                <div className="border-t border-white/10 my-4" />

                <div className="flex justify-between items-center">
                    <div className="flex gap-2 bg-neutral-900/50 p-1 rounded-lg border border-white/10">
                        <button
                            onClick={() => setSpawnMode('box')}
                            className={`p-2 rounded-md transition-all ${spawnMode === 'box' ? 'bg-indigo-600 text-white shadow-lg' : 'hover:bg-white/10 text-neutral-400'}`}
                        >
                            <Box className="w-5 h-5" />
                        </button>
                        <button
                            onClick={() => setSpawnMode('sphere')}
                            className={`p-2 rounded-md transition-all ${spawnMode === 'sphere' ? 'bg-pink-600 text-white shadow-lg' : 'hover:bg-white/10 text-neutral-400'}`}
                        >
                            <Circle className="w-5 h-5" />
                        </button>
                    </div>

                    <button
                        onClick={clearObjects}
                        className="p-3 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors border border-transparent hover:border-red-500/20"
                        title="Clear All"
                    >
                        <Trash2 className="w-5 h-5" />
                    </button>
                </div>

                <p className="mt-4 text-xs text-neutral-500 text-center">Click on the floor to spawn objects</p>
            </div>

            <div className="h-full w-full bg-gradient-to-br from-gray-900 to-black">
                <Canvas shadows dpr={[1, 2]} camera={{ position: [10, 10, 10], fov: 45 }}>
                    <Physics gravity={gravity}>
                        <ambientLight intensity={0.4} />
                        <directionalLight position={[10, 20, 10]} intensity={1} castShadow shadow-mapSize={[1024, 1024]} />
                        <Environment preset="city" />

                        {/* Interactive Plane */}
                        {/* We use a specific onClick handler on this mesh to act as spawner */}
                        <group onClick={(e) => { e.stopPropagation(); spawnObject(e.point) }}>
                            <Plane />
                        </group>

                        {objects.map(obj => (
                            obj.type === 'box'
                                ? <Cube key={obj.id} position={obj.position} />
                                : <Sphere key={obj.id} position={obj.position} />
                        ))}
                    </Physics>
                    <OrbitControls makeDefault />
                </Canvas>
            </div>
        </main>
    )
}
