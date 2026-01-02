import React, { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float, MeshDistortMaterial } from '@react-three/drei'
import * as THREE from 'three'
import * as Tone from 'tone'

interface ReactiveShapeProps {
    analyzer: React.MutableRefObject<Tone.Meter | null>
    activeInst: React.MutableRefObject<boolean[]>
}

export function ReactiveShape({ analyzer, activeInst }: ReactiveShapeProps) {
    const meshRef = useRef<THREE.Mesh>(null)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const materialRef = useRef<any>(null)

    useFrame(() => {
        if (!meshRef.current || !analyzer.current || !materialRef.current) return

        const db = analyzer.current.getValue() as number
        const normalizedLevel = THREE.MathUtils.clamp((db + 60) / 60, 0, 1)

        const [isLead, isBass, isSnare, isKick] = activeInst.current

        let targetScale = 1 + normalizedLevel * 0.5
        if (isKick) targetScale += 0.4

        meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.15)

        let rotSpeed = 0.005
        if (isBass) rotSpeed += 0.02
        if (isLead) rotSpeed += 0.01

        meshRef.current.rotation.x += rotSpeed
        meshRef.current.rotation.y += rotSpeed

        let targetDistort = 0.3
        let targetSpeed = 2

        if (isSnare) {
            targetDistort = 1.0
            targetSpeed = 10
        } else if (normalizedLevel > 0.8) {
            targetDistort = 0.6
        }

        materialRef.current.distort = THREE.MathUtils.lerp(materialRef.current.distort, targetDistort, 0.1)
        materialRef.current.speed = THREE.MathUtils.lerp(materialRef.current.speed, targetSpeed, 0.1)

        const baseColor = new THREE.Color("#1e1b4b")
        const kickColor = new THREE.Color("#4c1d95")
        const snareColor = new THREE.Color("#be185d")
        const leadColor = new THREE.Color("#06b6d4")

        let targetColor = baseColor
        if (isKick) targetColor = kickColor
        if (isSnare) targetColor = snareColor
        if (isLead) targetColor = leadColor

        materialRef.current.color.lerp(targetColor, 0.1)
        materialRef.current.emissive.lerp(targetColor, 0.1)
        materialRef.current.emissiveIntensity = THREE.MathUtils.lerp(materialRef.current.emissiveIntensity, (isKick || isSnare ? 1 : normalizedLevel) * 2, 0.1)
    })

    return (
        <Float speed={2} rotationIntensity={1} floatIntensity={1}>
            <mesh ref={meshRef}>
                <icosahedronGeometry args={[1.5, 4]} />
                <MeshDistortMaterial
                    ref={materialRef}
                    color="#1e1b4b"
                    roughness={0.2}
                    metalness={0.9}
                    bumpScale={0.005}
                    clearcoat={1}
                    clearcoatRoughness={0.1}
                    radius={1}
                    distort={0.4}
                />
            </mesh>
        </Float>
    )
}
