'use client'
import { Canvas } from '@react-three/fiber'
import { Environment, Float } from '@react-three/drei'
import { useState, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

// Simple mesh level for preview (lighter than full physics)
function LevelPreview() {
    return (
        <group>
            {/* Floor */}
            <mesh position={[0, -2, 0]} receiveShadow>
                <boxGeometry args={[40, 2, 20]} />
                <meshStandardMaterial color="#1a1a1a" />
            </mesh>

            {/* Platforms */}
            <mesh position={[8, 0, 0]} castShadow receiveShadow>
                <boxGeometry args={[6, 1, 4]} />
                <meshStandardMaterial color="#a855f7" emissive="#3b0764" emissiveIntensity={0.5} />
            </mesh>
            <mesh position={[-8, 2, 0]} castShadow receiveShadow>
                <boxGeometry args={[6, 1, 4]} />
                <meshStandardMaterial color="#ec4899" emissive="#831843" emissiveIntensity={0.5} />
            </mesh>
        </group>
    )
}

function RunningPlayer() {
    const ref = useRef<THREE.Group>(null)
    const [dir, setDir] = useState(1)

    useFrame((state, delta) => {
        if (!ref.current) return

        // Simple back and forth animation
        ref.current.position.x += dir * delta * 4
        if (ref.current.position.x > 10) setDir(-1)
        if (ref.current.position.x < -10) setDir(1)

        // Bobbing
        ref.current.position.y = Math.abs(Math.sin(state.clock.elapsedTime * 10)) * 0.5
    })

    return (
        <group ref={ref}>
            <mesh castShadow position={[0, 1, 0]}>
                <capsuleGeometry args={[0.5, 1, 4, 8]} />
                <meshStandardMaterial color="#2dffd4" emissive="#002b20" emissiveIntensity={0.5} />
            </mesh>
            <pointLight distance={5} intensity={2} color="#2dffd4" />
        </group>
    )
}

export default function PlatformerPreview() {
    return (
        <div className="w-full h-full bg-black">
            <Canvas shadows camera={{ position: [0, 5, 15], fov: 45 }}>
                <color attach="background" args={['#050505']} />
                <ambientLight intensity={0.2} />
                <directionalLight position={[10, 20, 10]} intensity={1} castShadow />
                <Environment preset="night" />

                <Float speed={2} rotationIntensity={0.2} floatIntensity={0}>
                    <LevelPreview />
                </Float>
                <RunningPlayer />
            </Canvas>
        </div>
    )
}
