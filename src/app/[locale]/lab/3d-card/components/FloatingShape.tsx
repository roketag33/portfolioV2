import React, { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import {
    MeshDistortMaterial,
    MeshTransmissionMaterial,
    Sphere,
    TorusKnot,
    Icosahedron,
    Torus,
    Float
} from '@react-three/drei'
import * as THREE from 'three'

export type GeometryType = 'torus' | 'sphere' | 'icosahedron' | 'knot'
export type MaterialType = 'distort' | 'glass' | 'standard' | 'wireframe'

export function FloatingShape({
    color,
    geometry,
    materialType,
    roughness,
    metalness,
    emissiveIntensity
}: {
    color: string
    geometry: GeometryType
    materialType: MaterialType
    roughness: number
    metalness: number
    emissiveIntensity: number
}) {
    const meshRef = useRef<THREE.Mesh>(null)

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.2
            meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.3
        }
    })

    const commonProps = {
        ref: meshRef,
        scale: 1.5
    }

    const renderMaterial = () => {
        switch (materialType) {
            case 'distort':
                return (
                    <MeshDistortMaterial
                        color={color}
                        envMapIntensity={1}
                        clearcoat={1}
                        clearcoatRoughness={0.1}
                        metalness={metalness}
                        roughness={roughness}
                        distort={0.4}
                        speed={2}
                    />
                )
            case 'glass':
                return (
                    <MeshTransmissionMaterial
                        backside
                        backsideThickness={0.1}
                        thickness={0.5}
                        chromaticAberration={0.05}
                        anisotropy={0.3}
                        distortion={0.5}
                        distortionScale={0.5}
                        temporalDistortion={0.5}
                        color={color}
                        background={new THREE.Color("#000000")}
                        roughness={roughness}
                        metalness={metalness}
                    />
                )
            case 'standard':
                return (
                    <meshStandardMaterial
                        color={color}
                        roughness={roughness}
                        metalness={metalness}
                        emissive={color}
                        emissiveIntensity={emissiveIntensity}
                    />
                )
            case 'wireframe':
                return (
                    <meshStandardMaterial
                        color={color}
                        wireframe
                        emissive={color}
                        emissiveIntensity={emissiveIntensity || 0.5}
                    />
                )
        }
    }

    const renderGeometry = () => {
        const Mat = renderMaterial()

        switch (geometry) {
            case 'torus':
                return (
                    <Torus args={[1, 0.4, 64, 128]} {...commonProps}>
                        {Mat}
                    </Torus>
                )
            case 'knot':
                return (
                    <TorusKnot args={[1, 0.3, 128, 32]} {...commonProps}>
                        {Mat}
                    </TorusKnot>
                )
            case 'sphere':
                return (
                    <Sphere args={[1.5, 64, 64]} {...commonProps}>
                        {Mat}
                    </Sphere>
                )
            case 'icosahedron':
                return (
                    <Icosahedron args={[1.5, 0]} {...commonProps}>
                        {Mat}
                    </Icosahedron>
                )
        }
    }

    return (
        <Float speed={2} rotationIntensity={1} floatIntensity={1}>
            {renderGeometry()}
        </Float>
    )
}
