'use client'

import React, { Suspense } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ChevronLeft } from 'lucide-react'
import { Canvas } from '@react-three/fiber'
import ParticleSystem from '@/components/lab/galaxy-chaos/ParticleSystem'
import { OrbitControls } from '@react-three/drei'

export default function GalaxyChaosPage() {
    return (
        <main className="relative w-screen h-screen overflow-hidden bg-black text-white">
            {/* Header / UI Layer */}
            <div className="absolute top-24 left-6 z-40 pointer-events-none">
                <Link href="/fr/lab" className="pointer-events-auto">
                    <Button variant="ghost" size="icon" className="group text-white hover:bg-white/10">
                        <ChevronLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
                    </Button>
                </Link>
            </div>

            <div className="absolute top-24 right-6 z-40 pointer-events-none text-right opacity-70">
                <h1 className="text-2xl font-bold tracking-widest uppercase">Galaxy Chaos</h1>
                <p className="text-xs font-mono">10k Particles. Physics. Chaos.</p>
            </div>

            {/* Hint Overlay */}
            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 text-center pointer-events-none opacity-50 animate-pulse">
                <p className="text-sm font-light">Drag to Rotate • Scroll to Zoom </p>
                <p className="text-xs font-mono mt-1">Move mouse to attract particles</p>
            </div>

            {/* 3D Scene */}
            <div className="w-full h-full">
                <Canvas camera={{ position: [0, 0, 50], fov: 60 }} gl={{ antialias: false, powerPreference: "high-performance" }}>
                    <color attach="background" args={['#000000']} />
                    <ambientLight intensity={0.5} />

                    <Suspense fallback={null}>
                        <ParticleSystem />
                    </Suspense>

                    <OrbitControls makeDefault enablePan={false} maxDistance={200} minDistance={10} />
                </Canvas>
            </div>
        </main>
    )
}
