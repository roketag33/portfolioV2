import React, { useState } from 'react'
import { usePlane, useBox, useSphere } from '@react-three/cannon'

export function Plane(props: Record<string, unknown>) {
    const [ref] = usePlane(() => ({ rotation: [-Math.PI / 2, 0, 0], ...props }))
    return (
        <mesh ref={ref} receiveShadow>
            <planeGeometry args={[100, 100]} />
            <meshStandardMaterial color="#1a1a1a" roughness={0.8} metalness={0.2} />
        </mesh>
    )
}

export function Cube({ position, type = 'dynamic' }: { position: [number, number, number], type?: 'dynamic' | 'static' | 'kinematic' }) {
    const [ref] = useBox(() => ({ mass: type === 'dynamic' ? 1 : 0, position, args: [1, 1, 1] }))
    const [color] = useState(() => ['#ef4444', '#f97316', '#eab308', '#22c55e', '#3b82f6', '#8b5cf6'][Math.floor(Math.random() * 6)])

    return (
        <mesh ref={ref} castShadow receiveShadow>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color={color} roughness={0.4} />
        </mesh>
    )
}

export function Sphere({ position }: { position: [number, number, number] }) {
    const [ref] = useSphere(() => ({ mass: 1, position, args: [0.7] }))
    const [color] = useState(() => ['#06b6d4', '#ec4899', '#14b8a6', '#f43f5e'][Math.floor(Math.random() * 4)])

    return (
        <mesh ref={ref} castShadow receiveShadow>
            <sphereGeometry args={[0.7, 32, 32]} />
            <meshStandardMaterial color={color} roughness={0.1} metalness={0.5} />
        </mesh>
    )
}
