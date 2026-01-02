'use client'

import React, { useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { Physics } from '@react-three/cannon'
import { OrbitControls, Environment } from '@react-three/drei'
import * as THREE from 'three'
import { GravityControls } from './components/GravityControls'
import { Cube, Plane, Sphere } from './components/SceneObjects'

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
            <GravityControls
                gravity={gravity}
                setGravity={setGravity}
                spawnMode={spawnMode}
                setSpawnMode={setSpawnMode}
                clearObjects={clearObjects}
            />

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
