'use client'

import React, { useRef, useMemo } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

const COUNT = 4000 // Reduced from 8000 for clarity
const ATTRACTOR_STRENGTH = 80 // Reduced from 150 for control
const DAMPING = 0.975 // More friction for floating feel

export default function ParticleSystem() {
    const mesh = useRef<THREE.InstancedMesh>(null)
    const { viewport, mouse } = useThree()

    const dummy = useMemo(() => new THREE.Object3D(), [])
    const particles = useMemo(() => {
        const temp = []
        for (let i = 0; i < COUNT; i++) {
            const t = Math.random() * 100
            const factor = 20 + Math.random() * 100
            const speed = 0.01 + Math.random() / 200

            // Random spread - wider initial distribution
            const pX = (Math.random() - 0.5) * 150
            const pY = (Math.random() - 0.5) * 150
            const pZ = (Math.random() - 0.5) * 150

            temp.push({
                t, factor, speed,
                x: pX, y: pY, z: pZ,
                mx: 0, my: 0, mz: 0,
                color: new THREE.Color()
            })
        }
        return temp
    }, [])

    useFrame((state) => {
        if (!mesh.current) return

        const targetX = (state.pointer.x * viewport.width) / 2
        const targetY = (state.pointer.y * viewport.height) / 2

        particles.forEach((particle, i) => {
            // Gravity Logic
            const dx = targetX - particle.x
            const dy = targetY - particle.y
            const dz = 0 - particle.z

            const distSq = dx * dx + dy * dy + dz * dz
            const dist = Math.sqrt(distSq) + 0.1

            const f = ATTRACTOR_STRENGTH / distSq

            particle.mx += (dx / dist) * f
            particle.my += (dy / dist) * f
            particle.mz += (dz / dist) * f

            // Brownian Motion (Organic Noise)
            particle.mx += (Math.random() - 0.5) * 0.02
            particle.my += (Math.random() - 0.5) * 0.02
            particle.mz += (Math.random() - 0.5) * 0.02

            particle.x += particle.mx
            particle.y += particle.my
            particle.z += particle.mz

            particle.mx *= DAMPING
            particle.my *= DAMPING
            particle.mz *= DAMPING

            // Update Matrix
            dummy.position.set(particle.x, particle.y, particle.z)
            dummy.rotation.x += particle.speed * 0.5
            dummy.rotation.y += particle.speed * 0.5

            // Pulse scale based on velocity
            const velocity = Math.sqrt(particle.mx ** 2 + particle.my ** 2 + particle.mz ** 2)
            const scale = 0.2 + Math.min(1.0, velocity * 1.5)
            dummy.scale.set(scale, scale, scale)

            dummy.updateMatrix()
            mesh.current!.setMatrixAt(i, dummy.matrix)

            // Dynamic Colors
            // Smoother gradient: Blue -> Cyan -> White
            const hue = 0.55 + Math.min(0.1, velocity * 0.05)
            const lightness = 0.4 + Math.min(0.6, velocity * 0.8)

            particle.color.setHSL(hue, 0.8, lightness)
            mesh.current!.setColorAt(i, particle.color)
        })

        mesh.current.instanceMatrix.needsUpdate = true
        if (mesh.current.instanceColor) mesh.current.instanceColor.needsUpdate = true
    })

    return (
        <instancedMesh ref={mesh} args={[undefined, undefined, COUNT]}>
            <dodecahedronGeometry args={[0.3, 0]} />
            <meshBasicMaterial toneMapped={false} transparent opacity={0.8} />
        </instancedMesh>
    )
}
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

const COUNT = 8000
const ATTRACTOR_STRENGTH = 150 // increased from 1.6 to 150
const DAMPING = 0.98 // less friction

export default function ParticleSystem() {
    const mesh = useRef<THREE.InstancedMesh>(null)
    const { viewport, mouse } = useThree()

    const dummy = useMemo(() => new THREE.Object3D(), [])
    const particles = useMemo(() => {
        const temp = []
        for (let i = 0; i < COUNT; i++) {
            const t = Math.random() * 100
            const factor = 20 + Math.random() * 100
            const speed = 0.01 + Math.random() / 200

            // Random spread - wider initial distribution
            const pX = (Math.random() - 0.5) * 150
            const pY = (Math.random() - 0.5) * 150
            const pZ = (Math.random() - 0.5) * 150

            temp.push({
                t, factor, speed,
                x: pX, y: pY, z: pZ,
                mx: 0, my: 0, mz: 0,
                color: new THREE.Color()
            })
        }
        return temp
    }, [])

    useFrame((state) => {
        if (!mesh.current) return

        const targetX = (state.pointer.x * viewport.width) / 1.5
        const targetY = (state.pointer.y * viewport.height) / 1.5

        particles.forEach((particle, i) => {
            // Gravity Logic
            const dx = targetX - particle.x
            const dy = targetY - particle.y
            const dz = 0 - particle.z

            const distSq = dx * dx + dy * dy + dz * dz
            const dist = Math.sqrt(distSq) + 1.0 // avoid extreme acceleration at minimal distance

            const f = ATTRACTOR_STRENGTH / distSq // Real gravity uses r^2

            particle.mx += (dx / dist) * f
            particle.my += (dy / dist) * f
            particle.mz += (dz / dist) * f

            particle.x += particle.mx
            particle.y += particle.my
            particle.z += particle.mz

            particle.mx *= DAMPING
            particle.my *= DAMPING
            particle.mz *= DAMPING

            // Update Matrix
            dummy.position.set(particle.x, particle.y, particle.z)
            dummy.rotation.x += particle.speed * 2

            // Pulse scale based on velocity
            const velocity = Math.sqrt(particle.mx ** 2 + particle.my ** 2 + particle.mz ** 2)
            const scale = 0.3 + Math.min(1.5, velocity * 2)
            dummy.scale.set(scale, scale, scale)

            dummy.updateMatrix()
            mesh.current!.setMatrixAt(i, dummy.matrix)

            // Dynamic Colors
            // High speed = Cyan/White, Low speed = Purple/Blue
            const hue = 0.6 + Math.min(0.2, velocity * 0.1)
            const lightness = 0.5 + Math.min(0.5, velocity * 0.5)

            particle.color.setHSL(hue, 0.9, lightness)
            mesh.current!.setColorAt(i, particle.color)
        })

        mesh.current.instanceMatrix.needsUpdate = true
        if (mesh.current.instanceColor) mesh.current.instanceColor.needsUpdate = true
    })

    return (
        <instancedMesh ref={mesh} args={[undefined, undefined, COUNT]}>
            <dodecahedronGeometry args={[0.4, 0]} />
            <meshBasicMaterial toneMapped={false} />
        </instancedMesh>
    )
}

