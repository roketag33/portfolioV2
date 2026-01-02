'use client'

import { useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera, Environment, ContactShadows } from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import { toast } from 'sonner'
import { FloatingShape, GeometryType, MaterialType } from './components/FloatingShape'
import { ControlPanel } from './components/ControlPanel'

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
            <ControlPanel
                color={color}
                setColor={setColor}
                geometry={geometry}
                setGeometry={setGeometry}
                materialType={materialType}
                setMaterialType={setMaterialType}
                roughness={roughness}
                setRoughness={setRoughness}
                metalness={metalness}
                setMetalness={setMetalness}
                emissiveIntensity={emissiveIntensity}
                setEmissiveIntensity={setEmissiveIntensity}
                handleCopyCode={handleCopyCode}
                COLORS={COLORS}
            />

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
        </main>
    )
}
