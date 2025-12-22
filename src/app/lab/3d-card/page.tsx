'use client'

import { useState, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import {
    OrbitControls,
    PerspectiveCamera,
    Environment,
    ContactShadows,
    Float,
    MeshDistortMaterial,
    MeshTransmissionMaterial,
    Sphere,
    TorusKnot,
    Icosahedron,
    Torus
} from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import { motion } from 'framer-motion'
import { ArrowLeft, Boxes, Layers, Droplet, Zap, Copy } from 'lucide-react'
import Link from 'next/link'
import { toast } from 'sonner'
import * as THREE from 'three'

type GeometryType = 'torus' | 'sphere' | 'icosahedron' | 'knot'
type MaterialType = 'distort' | 'glass' | 'standard' | 'wireframe'

function FloatingShape({
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

export default function ThreeDCardPage() {
    const [color, setColor] = useState('#6366f1')
    const [geometry, setGeometry] = useState<GeometryType>('knot')
    const [materialType, setMaterialType] = useState<MaterialType>('distort')

    // New PBR State
    const [roughness, setRoughness] = useState(0.2)
    const [metalness, setMetalness] = useState(0.5)
    const [emissiveIntensity, setEmissiveIntensity] = useState(0)

    const COLORS = [
        { name: 'Indigo', value: '#6366f1' },
        { name: 'Rose', value: '#f43f5e' },
        { name: 'Emerald', value: '#10b981' },
        { name: 'Amber', value: '#f59e0b' },
        { name: 'Cyan', value: '#06b6d4' },
    ]

    const handleCopyCode = () => {
        const code = `<meshStandardMaterial 
    color="${color}"
    roughness={${roughness}}
    metalness={${metalness}}
    emissiveIntensity={${emissiveIntensity}}
    ${materialType === 'wireframe' ? 'wireframe' : ''}
/>`
        navigator.clipboard.writeText(code)
        toast.success('Material code copied!')
    }

    return (
        <main className="min-h-screen bg-neutral-950 text-white overflow-hidden relative selection:bg-white/20">
            {/* Nav */}
            <nav className="absolute top-0 left-0 right-0 p-6 z-10 flex justify-between items-center bg-gradient-to-b from-black/50 to-transparent pointer-events-none">
                <Link href="/lab" className="flex items-center gap-2 text-sm text-neutral-400 hover:text-white transition-colors pointer-events-auto">
                    <ArrowLeft className="w-4 h-4" />
                    Back to Lab
                </Link>
                <div className="font-mono text-xs text-neutral-500 uppercase tracking-widest">Abstract Matter v3.0</div>
            </nav>

            {/* 3D Scene */}
            <div className="absolute inset-0 z-0">
                <Canvas>
                    <PerspectiveCamera makeDefault position={[0, 0, 6]} fov={50} />
                    <ambientLight intensity={0.5} />
                    <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
                    <Environment preset="city" />

                    <FloatingShape
                        color={color}
                        geometry={geometry}
                        materialType={materialType}
                        roughness={roughness}
                        metalness={metalness}
                        emissiveIntensity={emissiveIntensity}
                    />

                    <EffectComposer>
                        <Bloom luminanceThreshold={1} mipmapBlur intensity={1.5} radius={0.8} />
                    </EffectComposer>

                    <ContactShadows position={[0, -2.5, 0]} opacity={0.5} scale={20} blur={2} far={4.5} />
                    <OrbitControls enableZoom={true} enablePan={false} minPolarAngle={Math.PI / 4} maxPolarAngle={Math.PI / 1.5} />
                </Canvas>
            </div>

            {/* UI Overlay */}
            <div className="absolute inset-0 z-10 pointer-events-none flex flex-col justify-end pb-10 md:justify-center md:pb-0 md:pl-20">
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                    className="pointer-events-auto bg-black/40 backdrop-blur-xl border border-white/10 p-6 rounded-3xl max-w-sm ml-4 mr-4 md:mr-0 md:ml-0 overflow-y-auto max-h-[80vh]"
                >
                    <div className="flex justify-between items-start mb-2">
                        <div>
                            <h1 className="text-3xl font-bold">Abstract Matter</h1>
                            <p className="text-neutral-400 text-sm leading-relaxed">
                                Customize geometry & material physics.
                            </p>
                        </div>
                        <button onClick={handleCopyCode} className="p-2 hover:bg-white/10 rounded-full text-neutral-400 hover:text-white transition-colors" title="Copy Material Code">
                            <Copy className="w-5 h-5" />
                        </button>
                    </div>

                    <div className="space-y-6 mt-6">
                        {/* Geometry Selector */}
                        <div className="space-y-2">
                            <span className="text-xs font-bold text-neutral-500 uppercase tracking-wider flex items-center gap-2">
                                <Boxes className="w-3 h-3" /> Geometry
                            </span>
                            <div className="grid grid-cols-4 gap-2">
                                <button onClick={() => setGeometry('torus')} className={`p-2 rounded-lg text-[10px] font-medium transition-all ${geometry === 'torus' ? 'bg-white text-black' : 'bg-white/5 hover:bg-white/10'}`}>Torus</button>
                                <button onClick={() => setGeometry('knot')} className={`p-2 rounded-lg text-[10px] font-medium transition-all ${geometry === 'knot' ? 'bg-white text-black' : 'bg-white/5 hover:bg-white/10'}`}>Knot</button>
                                <button onClick={() => setGeometry('sphere')} className={`p-2 rounded-lg text-[10px] font-medium transition-all ${geometry === 'sphere' ? 'bg-white text-black' : 'bg-white/5 hover:bg-white/10'}`}>Sphere</button>
                                <button onClick={() => setGeometry('icosahedron')} className={`p-2 rounded-lg text-[10px] font-medium transition-all ${geometry === 'icosahedron' ? 'bg-white text-black' : 'bg-white/5 hover:bg-white/10'}`}>Geo</button>
                            </div>
                        </div>

                        {/* Material Selector */}
                        <div className="space-y-2">
                            <span className="text-xs font-bold text-neutral-500 uppercase tracking-wider flex items-center gap-2">
                                <Layers className="w-3 h-3" /> Material
                            </span>
                            <div className="grid grid-cols-4 gap-2">
                                <button onClick={() => setMaterialType('distort')} className={`p-2 rounded-lg text-[10px] font-medium transition-all ${materialType === 'distort' ? 'bg-white text-black' : 'bg-white/5 hover:bg-white/10'}`}>Liquid</button>
                                <button onClick={() => setMaterialType('glass')} className={`p-2 rounded-lg text-[10px] font-medium transition-all ${materialType === 'glass' ? 'bg-white text-black' : 'bg-white/5 hover:bg-white/10'}`}>Glass</button>
                                <button onClick={() => setMaterialType('standard')} className={`p-2 rounded-lg text-[10px] font-medium transition-all ${materialType === 'standard' ? 'bg-white text-black' : 'bg-white/5 hover:bg-white/10'}`}>PBR</button>
                                <button onClick={() => setMaterialType('wireframe')} className={`p-2 rounded-lg text-[10px] font-medium transition-all ${materialType === 'wireframe' ? 'bg-white text-black' : 'bg-white/5 hover:bg-white/10'}`}>Wire</button>
                            </div>
                        </div>

                        {/* PBR Sliders */}
                        <div className="space-y-4 pt-2 border-t border-white/5">
                            <div className="space-y-2">
                                <div className="flex justify-between text-xs">
                                    <span className="text-neutral-400">Roughness</span>
                                    <span className="font-mono text-neutral-500">{roughness.toFixed(2)}</span>
                                </div>
                                <input type="range" min="0" max="1" step="0.05" value={roughness} onChange={(e) => setRoughness(Number(e.target.value))} className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-indigo-500" />
                            </div>
                            <div className="space-y-2">
                                <div className="flex justify-between text-xs">
                                    <span className="text-neutral-400">Metalness</span>
                                    <span className="font-mono text-neutral-500">{metalness.toFixed(2)}</span>
                                </div>
                                <input type="range" min="0" max="1" step="0.05" value={metalness} onChange={(e) => setMetalness(Number(e.target.value))} className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-indigo-500" />
                            </div>
                            <div className="space-y-2">
                                <div className="flex justify-between text-xs">
                                    <span className="text-neutral-400">Emissive</span>
                                    <span className="font-mono text-neutral-500">{emissiveIntensity.toFixed(2)}</span>
                                </div>
                                <input type="range" min="0" max="2" step="0.1" value={emissiveIntensity} onChange={(e) => setEmissiveIntensity(Number(e.target.value))} className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-indigo-500" />
                            </div>
                        </div>

                        {/* Color Selector */}
                        <div className="space-y-2">
                            <span className="text-xs font-bold text-neutral-500 uppercase tracking-wider flex items-center gap-2">
                                <Droplet className="w-3 h-3" /> Pigment
                            </span>
                            <div className="flex gap-3">
                                {COLORS.map((c) => (
                                    <button
                                        key={c.name}
                                        onClick={() => setColor(c.value)}
                                        className={`w-6 h-6 rounded-full transition-transform hover:scale-110 focus:outline-none ring-2 ring-offset-2 ring-offset-black ${color === c.value ? 'ring-white scale-110' : 'ring-transparent'}`}
                                        style={{ backgroundColor: c.value }}
                                        title={c.name}
                                    />
                                ))}
                                <input
                                    type="color"
                                    value={color}
                                    onChange={(e) => setColor(e.target.value)}
                                    className="w-6 h-6 rounded-full overflow-hidden border-0 p-0 cursor-pointer opacity-50 hover:opacity-100 transition-opacity"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 pt-4 border-t border-white/10 flex justify-between items-center text-xs text-neutral-500 font-mono">
                        <span className="flex items-center gap-1"><Zap className="w-3 h-3" /> Bloom Active</span>
                        <span>R3F v8</span>
                    </div>
                </motion.div>
            </div>
        </main>
    )
}
