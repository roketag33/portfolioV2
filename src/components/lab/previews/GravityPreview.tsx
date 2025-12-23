'use client'
import { Canvas } from '@react-three/fiber'
import { Physics, useBox, usePlane } from '@react-three/cannon'
import { Environment } from '@react-three/drei'
import { useState, useEffect } from 'react'

function Plane() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [ref] = usePlane(() => ({ rotation: [-Math.PI / 2, 0, 0] })) as any
    return (
        <mesh ref={ref} receiveShadow>
            <planeGeometry args={[100, 100]} />
            <meshStandardMaterial color="#0a0a0a" roughness={0.8} />
        </mesh>
    )
}

function FallingCube({ position, color }: { position: [number, number, number], color: string }) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [ref] = useBox(() => ({ mass: 1, position, args: [1, 1, 1], rotation: [Math.random(), Math.random(), Math.random()] })) as any
    return (
        <mesh ref={ref} castShadow>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color={color} roughness={0.2} metalness={0.5} />
        </mesh>
    )
}

function GravityScene() {
    const [cubes, setCubes] = useState<{ id: number, pos: [number, number, number], color: string }[]>([])

    useEffect(() => {
        const colors = ['#f97316', '#ef4444', '#eab308', '#fff']
        const interval = setInterval(() => {
            setCubes(prev => [
                ...prev.slice(-15), // Keep limited count
                {
                    id: Date.now(),
                    pos: [(Math.random() - 0.5) * 8, 12, (Math.random() - 0.5) * 8],
                    color: colors[Math.floor(Math.random() * colors.length)]
                }
            ])
        }, 600)
        return () => clearInterval(interval)
    }, [])

    return (
        <>
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 20, 10]} intensity={1} castShadow />
            <Environment preset="city" />
            <Plane />
            {cubes.map(c => <FallingCube key={c.id} position={c.pos} color={c.color} />)}
        </>
    )
}

export default function GravityPreview() {
    return (
        <div className="w-full h-full bg-neutral-900">
            <Canvas shadows camera={{ position: [10, 10, 10], fov: 35 }}>
                <Physics gravity={[0, -5, 0]}>
                    <GravityScene />
                </Physics>
            </Canvas>
        </div>
    )
}
