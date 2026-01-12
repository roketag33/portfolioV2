'use client'

import React, { useRef, useMemo } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

const COUNT = 10000
const ATTRACTOR_STRENGTH = 1.6
const DAMPING = 0.96

export default function ParticleSystem() {
    // InstancedMesh is crucial for performance with 10k+ objects
    const mesh = useRef<THREE.InstancedMesh>(null)
    const light = useRef<THREE.PointLight>(null)
    const { viewport, mouse } = useThree()

    // Initialize random positions and velocities
    const dummy = useMemo(() => new THREE.Object3D(), [])
    const particles = useMemo(() => {
        const temp = []
        for (let i = 0; i < COUNT; i++) {
            const t = Math.random() * 100
            const factor = 20 + Math.random() * 100
            const speed = 0.01 + Math.random() / 200
            const x = Math.cos(t) + Math.sin(t * 1) / 10
            const y = Math.sin(t) + Math.cos(t * 2) / 10
            const z = Math.cos(t) + Math.sin(t * 3) / 10

            // Random spread
            const pX = (Math.random() - 0.5) * 100
            const pY = (Math.random() - 0.5) * 100
            const pZ = (Math.random() - 0.5) * 100

            temp.push({
                t,
                factor,
                speed,
                x: pX,
                y: pY,
                z: pZ,
                mx: 0,
                my: 0,
                mz: 0, // momentum
                // Color placeholder
                color: new THREE.Color()
            })
        }
        return temp
    }, [])

    useFrame((state) => {
        if (!mesh.current) return

        // Mouse position in 3D space (projected to z=0 or similar)
        // Simple approximation: mouse.x * factor
        const targetX = (state.pointer.x * viewport.width) / 2
        const targetY = (state.pointer.y * viewport.height) / 2

        // Move Light with mouse
        if (light.current) {
            light.current.position.set(targetX, targetY, 0)
        }

        particles.forEach((particle, i) => {
            // Calculate distance to cursor (Attractor)
            // We assume Z=0 for attractor plane
            const dx = targetX - particle.x
            const dy = targetY - particle.y
            const dz = 0 - particle.z // Pull towards center plane

            const distSq = dx * dx + dy * dy + dz * dz
            const dist = Math.sqrt(distSq) + 0.1 // avoid division by zero

            // F = G * m1 * m2 / r^2 direction
            // Force vector
            const f = ATTRACTOR_STRENGTH / dist

            // Update momentum
            particle.mx += (dx / dist) * f * 0.05
            particle.my += (dy / dist) * f * 0.05
            particle.mz += (dz / dist) * f * 0.05

            // Apply momentum to position
            particle.x += particle.mx
            particle.y += particle.my
            particle.z += particle.mz

            // Damping (Friction)
            particle.mx *= DAMPING
            particle.my *= DAMPING
            particle.mz *= DAMPING

            // Update Instance Matrix
            dummy.position.set(particle.x, particle.y, particle.z)

            // Rotate particles based on speed for visual flair
            dummy.rotation.x += particle.speed

            // Scale based on proximity to center/speed? 
            const scale = 0.5 + Math.min(1, Math.abs(particle.mx * 10))
            dummy.scale.set(scale, scale, scale)

            dummy.updateMatrix()
            mesh.current!.setMatrixAt(i, dummy.matrix)

            // Color update based on speed
            // Fast = White/Blue, Slow = Purple/Red
            const speedVal = Math.sqrt(particle.mx ** 2 + particle.my ** 2 + particle.mz ** 2)
            const hue = 0.6 + Math.min(0.2, speedVal * 0.5) // Blueish
            const lightness = 0.5 + Math.min(0.5, speedVal)

            particle.color.setHSL(hue, 0.8, lightness)
            mesh.current!.setColorAt(i, particle.color)
        })

        mesh.current.instanceMatrix.needsUpdate = true
        if (mesh.current.instanceColor) mesh.current.instanceColor.needsUpdate = true
    })

    return (
        <>
            <pointLight ref={light} distance={40} intensity={8} color="white" />
            <instancedMesh ref={mesh} args={[undefined, undefined, COUNT]}>
                <dodecahedronGeometry args={[0.2, 0]} />
                <meshPhongMaterial color="#050505" shininess={100} />
            </instancedMesh>
        </>
    )
}
