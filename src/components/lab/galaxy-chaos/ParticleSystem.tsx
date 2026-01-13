'use client'

import React, { useRef, useMemo, useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

interface ParticleSystemProps {
    count: number;
    attractorStrength: number;
    damping: number;
    colorMode: 'stardust' | 'inferno' | 'matrix';
}

interface Particle {
    x: number;
    y: number;
    z: number;
    mx: number;
    my: number;
    mz: number;
    speed: number;
    color: THREE.Color;
}

export default function ParticleSystem({ count, attractorStrength, damping, colorMode }: ParticleSystemProps) {
    const mesh = useRef<THREE.InstancedMesh>(null)
    const { viewport } = useThree()

    const dummy = useMemo(() => new THREE.Object3D(), [])

    // Initialize particles
    // We memoize based on 'count' to recreate array only when count changes
    // Initialize particles using useRef to avoid impure Math.random during render
    const particles = useRef<Particle[]>([])

    useEffect(() => {
        const temp = []
        for (let i = 0; i < count; i++) {
            const t = Math.random() * 100

            // Random spread - Massive spread for "space" feel
            const pX = (Math.random() - 0.5) * 200
            const pY = (Math.random() - 0.5) * 200
            const pZ = (Math.random() - 0.5) * 200

            const speed = 0.01 + Math.random() / 200

            temp.push({
                x: pX, y: pY, z: pZ,
                mx: 0, my: 0, mz: 0,
                speed,
                color: new THREE.Color()
            })
        }
        particles.current = temp
    }, [count])

    useFrame((state) => {
        if (!mesh.current) return

        const targetX = (state.pointer.x * viewport.width) / 2
        const targetY = (state.pointer.y * viewport.height) / 2

        if (particles.current.length === 0) return

        particles.current.forEach((particle, i) => {
            // Gravity Logic
            const dx = targetX - particle.x
            const dy = targetY - particle.y
            const dz = 0 - particle.z

            const distSq = dx * dx + dy * dy + dz * dz
            const dist = Math.sqrt(distSq) + 0.1

            // USE PROP directly (closure works because useFrame runs in render loop context? 
            // Actually in React, the lambda captures the props of the current render IF we reconstruct the lambda.
            // But useFrame from @react-three/fiber persists. 
            // Better to use a ref for fluid updates without re-renders, 
            // BUT since this component is fast, we rely on React re-render or let the closure Capture.
            // Be careful: if useFrame dependency array is empty, it captures INITIAL props.
            // But useFrame doesn't have dependency array in the hook signature, it attaches to the loop.
            // The best way is to use refs for mutable values if we don't want to re-construct the hook.
            // However, R3F useFrame callback is called every frame. Does it capture the latest state?
            // Yes, if the component re-renders, the callback is re-defined (unless wrapped in useCallback).
            // Here we pass an inline function, so it redefines on every render.
            // R3F handles this.

            const f = attractorStrength / distSq

            particle.mx += (dx / dist) * f
            particle.my += (dy / dist) * f
            particle.mz += (dz / dist) * f

            // Brownian Motion
            particle.mx += (Math.random() - 0.5) * 0.01
            particle.my += (Math.random() - 0.5) * 0.01
            particle.mz += (Math.random() - 0.5) * 0.01

            particle.x += particle.mx
            particle.y += particle.my
            particle.z += particle.mz

            particle.mx *= damping
            particle.my *= damping
            particle.mz *= damping

            // Update Matrix
            dummy.position.set(particle.x, particle.y, particle.z)
            dummy.rotation.x += particle.speed * 0.2
            dummy.rotation.y += particle.speed * 0.2

            const velocity = Math.sqrt(particle.mx ** 2 + particle.my ** 2 + particle.mz ** 2)
            const scale = 0.5 + Math.min(1.0, velocity * 2.0)
            dummy.scale.set(scale, scale, scale)

            dummy.updateMatrix()
            mesh.current!.setMatrixAt(i, dummy.matrix)

            // Dynamic Colors based on Mode
            let hue, saturation, lightness;

            if (colorMode === 'inferno') {
                // Red/Orange/Yellow
                hue = 0.0 + Math.min(0.15, velocity * 0.1)
                saturation = 0.9
                lightness = 0.5 + velocity
            } else if (colorMode === 'matrix') {
                // Green
                hue = 0.3
                saturation = 1.0
                lightness = 0.2 + velocity * 2
            } else {
                // Stardust (Default)
                // Deep violet to Cyan
                hue = 0.6 + Math.min(0.2, velocity * 0.2)
                saturation = 0.9
                lightness = 0.3 + Math.min(0.7, velocity * 1.0)
            }

            particle.color.setHSL(hue, saturation, lightness)
            mesh.current!.setColorAt(i, particle.color)
        })

        mesh.current.instanceMatrix.needsUpdate = true
        if (mesh.current.instanceColor) mesh.current.instanceColor.needsUpdate = true
    })

    return (
        <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
            <dodecahedronGeometry args={[0.08, 0]} />
            <meshBasicMaterial toneMapped={false} transparent opacity={0.6} />
        </instancedMesh>
    )
}
