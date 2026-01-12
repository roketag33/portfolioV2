'use client'

import { useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import ParticleSystem from '@/components/lab/galaxy-chaos/ParticleSystem'
import { ChevronLeft } from 'lucide-react'
import Link from 'next/link'
import Controls from '@/components/lab/galaxy-chaos/Controls'

// Initial Config matching "Stardust" tuning
const INITIAL_CONFIG = {
    count: 4000, // Safe default for mobile
    attractorStrength: 30,
    damping: 0.99,
    colorMode: 'stardust' as const
}

export default function GalaxyChaosPage() {
    const [config, setConfig] = useState(INITIAL_CONFIG)

    return (
        <div className="w-full h-screen bg-black relative overflow-hidden touch-none">
            {/* UI Overlay */}
            <div className="absolute top-0 left-0 w-full p-4 sm:p-6 z-10 flex justify-between pointer-events-none">
                <Link href="/lab" className="pointer-events-auto text-white/50 hover:text-white transition-colors flex items-center gap-2 text-sm sm:text-base">
                    <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" /> Back <span className="hidden sm:inline">to Lab</span>
                </Link>
                <div className="text-right">
                    <h1 className="text-xl sm:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-cyan-400">
                        GALAXY CHAOS
                    </h1>
                    <p className="text-[10px] sm:text-xs text-white/40 font-mono hidden sm:block">10k Particles. Physics. Chaos.</p>
                </div>
            </div>

            {/* Controls */}
            <Controls config={config} setConfig={setConfig} />

            <div className="absolute bottom-6 left-6 z-0 text-white/30 text-[10px] text-xs font-mono max-w-xs pointer-events-none hidden sm:block">
                <p>MOUSE/TOUCH to Attract. SCROLL to Zoom. DRAG to Rotate.</p>
            </div>

            {/* 3D Scene */}
            <Canvas
                camera={{ position: [0, 0, 50], fov: 75 }}
                gl={{ antialias: false, powerPreference: "high-performance" }} // Perf opt
                dpr={[1, 2]} // Quality scaling
            >
                <color attach="background" args={['#000000']} />

                <ParticleSystem
                    count={config.count}
                    attractorStrength={config.attractorStrength}
                    damping={config.damping}
                    colorMode={config.colorMode}
                />

                <OrbitControls
                    enablePan={false}
                    enableZoom={true}
                    maxDistance={200}
                    minDistance={10}
                    autoRotate={true}
                    autoRotateSpeed={0.5}
                    makeDefault
                />
            </Canvas>
        </div>
    )
}

export default function GalaxyChaosPage() {
    const [config, setConfig] = useState(INITIAL_CONFIG)

    return (
        <div className="w-full h-screen bg-black relative overflow-hidden">
            {/* UI Overlay */}
            <div className="absolute top-0 left-0 w-full p-6 z-10 flex justify-between pointer-events-none">
                <Link href="/lab" className="pointer-events-auto text-white/50 hover:text-white transition-colors flex items-center gap-2">
                    <ChevronLeft /> Back to Lab
                </Link>
                <div className="text-right">
                    <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-cyan-400">
                        GALAXY CHAOS
                    </h1>
                    <p className="text-xs text-white/40 font-mono">10k Particles. Physics. Chaos.</p>
                </div>
            </div>

            {/* Controls */}
            <div className="pointer-events-auto">
                <Controls config={config} setConfig={setConfig} />
            </div>

            <div className="absolute bottom-6 left-6 z-10 text-white/30 text-xs font-mono max-w-xs pointer-events-none">
                <p>MOUSE to Attract. SCROLL to Zoom. DRAG to Rotate.</p>
            </div>

            {/* 3D Scene */}
            <Canvas
                camera={{ position: [0, 0, 50], fov: 75 }}
                gl={{ antialias: false, powerPreference: "high-performance" }} // Perf opt
                dpr={[1, 2]} // Quality scaling
            >
                <color attach="background" args={['#000000']} />

                <ParticleSystem
                    count={config.count}
                    attractorStrength={config.attractorStrength}
                    damping={config.damping}
                    colorMode={config.colorMode}
                />

                <OrbitControls
                    enablePan={false}
                    enableZoom={true}
                    maxDistance={200}
                    minDistance={10}
                    autoRotate={true}
                    autoRotateSpeed={0.5}
                />
            </Canvas>
        </div>
    )
}
