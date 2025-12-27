'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { Float, MeshTransmissionMaterial, Environment, ContactShadows, Stars } from '@react-three/drei'
import { Suspense, useRef } from 'react'
import * as THREE from 'three'

function Geometries() {
    const meshRef = useRef<THREE.Mesh>(null)

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.2
            meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.1
        }
    })

    return (
        <group>
            <Float speed={2} rotationIntensity={1.5} floatIntensity={1.5}>
                <mesh ref={meshRef} scale={2}>
                    <torusKnotGeometry args={[1, 0.35, 100, 32]} />
                    <MeshTransmissionMaterial
                        backside
                        backsideThickness={0.1}
                        thickness={0.2}
                        chromaticAberration={0.1}
                        anisotropy={0.3}
                        distortion={0.4}
                        distortionScale={0.3}
                        temporalDistortion={0.5}
                        color="#ffffff"
                        background={new THREE.Color("#000000")}
                        roughness={0.2}
                    />
                </mesh>
            </Float>

            <Stars radius={50} depth={50} count={2000} factor={4} saturation={0} fade speed={1} />
        </group>
    )
}

export default function CreativeShapes() {
    return (
        <div className="w-full h-full min-h-[400px] relative cursor-move">
            <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
                <Suspense fallback={null}>
                    <ambientLight intensity={0.5} />
                    <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
                    <Environment preset="city" />
                    <Geometries />
                    <ContactShadows position={[0, -3.5, 0]} opacity={0.4} scale={20} blur={2.5} far={4.5} />
                </Suspense>
            </Canvas>

            {/* Overlay Text */}
            <div className="absolute bottom-6 left-6 pointer-events-none select-none">
                <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest border border-white/10 px-2 py-1 rounded w-fit backdrop-blur-sm">
                        R3F / WebGL
                    </span>
                    <span className="text-white/20 text-xs font-light">
                        Interactive Experience
                    </span>
                </div>
            </div>
        </div>
    )
}
