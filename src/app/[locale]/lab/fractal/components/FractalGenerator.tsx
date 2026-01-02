'use client'

import { useRef, useMemo, useState } from 'react'
import { Canvas, useFrame, useThree, ThreeEvent } from '@react-three/fiber'
import * as THREE from 'three'
import { motion, AnimatePresence } from 'framer-motion'
import { RefreshCcw, ZoomIn, ZoomOut, Settings2, Palette } from 'lucide-react'

// --- Shaders ---
const vertexShader = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`

const fragmentShader = `
uniform float uTime;
uniform vec2 uResolution;
uniform vec2 uCenter;
uniform float uZoom;
uniform vec3 uColor1;
uniform vec3 uColor2;
uniform vec3 uColor3;
uniform int uType; // 0 = Mandelbrot, 1 = Julia
uniform vec2 uJuliaC;

varying vec2 vUv;

void main() {
    // Basic UV coordinates
    vec2 p = vUv * 2.0 - 1.0;
    
    // Fix Aspect Ratio
    float aspect = uResolution.x / uResolution.y;
    p.x *= aspect;

    // Apply Zoom and Center
    vec2 pos = uCenter + p / uZoom;
    
    vec2 z;
    vec2 c;

    if (uType == 0) {
        // Mandelbrot: z starts at 0, c is position
        z = vec2(0.0);
        c = pos;
    } else {
        // Julia: z is position, c is constant
        z = pos;
        c = uJuliaC;
    }
    
    float iter = 0.0;
    const float maxIter = 300.0;
    
    // Iteration Loop
    for(float i = 0.0; i < maxIter; i++) {
        z = vec2(z.x*z.x - z.y*z.y, 2.0*z.x*z.y) + c;
        if(dot(z,z) > 4.0) break;
        iter++;
    }
    
    // Coloring
    float t = iter / maxIter;
    vec3 color = vec3(0.0);
    
    if(iter < maxIter) {
        // Smooth coloring
        float smoothT = t + 0.1 * sin(uTime * 0.2 + length(z)*0.1); 
        
        // Palette mixing
        vec3 c1 = mix(uColor1, uColor2, sqrt(t));
        color = mix(c1, uColor3, pow(t, 3.0));
        
        // Add glow
        color += uColor3 * 0.05 * (1.0 - t);
    }
    
    gl_FragColor = vec4(color, 1.0);
}
`

interface FractalSceneProps {
    fractalType: 'mandelbrot' | 'julia'
    zoom: number
    center: { x: number, y: number }
    juliaC: { x: number, y: number }
    onPan: (dx: number, dy: number) => void
    onZoom: (factor: number) => void
}

function FractalScene({ fractalType, zoom, center, juliaC, onPan, onZoom }: FractalSceneProps) {
    const meshWithMaterial = useRef<THREE.Mesh>(null)
    const { viewport, size } = useThree()
    const shaderRef = useRef<THREE.ShaderMaterial>(null)
    const isDragging = useRef(false)
    const lastMousePos = useRef({ x: 0, y: 0 })

    const uniforms = useMemo(
        () => ({
            uTime: { value: 0 },
            uResolution: { value: new THREE.Vector2(size.width, size.height) },
            uCenter: { value: new THREE.Vector2(center.x, center.y) },
            uZoom: { value: zoom },
            uType: { value: 0 },
            uJuliaC: { value: new THREE.Vector2(juliaC.x, juliaC.y) },
            uColor1: { value: new THREE.Color('#030712') }, // Dark Background
            uColor2: { value: new THREE.Color('#6366f1') }, // Indigo
            uColor3: { value: new THREE.Color('#a855f7') }, // Purple
        }),
        []
    )

    useFrame((state) => {
        if (shaderRef.current) {
            shaderRef.current.uniforms.uTime.value = state.clock.elapsedTime
            shaderRef.current.uniforms.uZoom.value = THREE.MathUtils.lerp(shaderRef.current.uniforms.uZoom.value, zoom, 0.1)
            shaderRef.current.uniforms.uCenter.value.lerp(new THREE.Vector2(center.x, center.y), 0.1)
            shaderRef.current.uniforms.uJuliaC.value.lerp(new THREE.Vector2(juliaC.x, juliaC.y), 0.1)
            shaderRef.current.uniforms.uType.value = fractalType === 'mandelbrot' ? 0 : 1
            shaderRef.current.uniforms.uResolution.value.set(size.width, size.height)
        }
    })

    const handlePointerDown = (e: ThreeEvent<PointerEvent>) => {
        isDragging.current = true
        lastMousePos.current = { x: e.clientX, y: e.clientY }
    }

    const handlePointerUp = () => {
        isDragging.current = false
    }

    const handlePointerMove = (e: ThreeEvent<PointerEvent>) => {
        if (!isDragging.current) return

        const dx = e.clientX - lastMousePos.current.x
        const dy = e.clientY - lastMousePos.current.y
        lastMousePos.current = { x: e.clientX, y: e.clientY }

        onPan(dx, dy)
    }

    const handleWheel = (e: ThreeEvent<WheelEvent>) => {
        const factor = e.deltaY < 0 ? 1.1 : 0.9
        onZoom(factor)
    }

    return (
        <mesh
            ref={meshWithMaterial}
            scale={[viewport.width, viewport.height, 1]}
            onPointerDown={handlePointerDown}
            onPointerUp={handlePointerUp}
            onPointerLeave={handlePointerUp}
            onPointerMove={handlePointerMove}
            onWheel={handleWheel}
        >
            <planeGeometry args={[1, 1]} />
            <shaderMaterial
                ref={shaderRef}
                vertexShader={vertexShader}
                fragmentShader={fragmentShader}
                uniforms={uniforms}
            />
        </mesh>
    )
}

export default function FractalGenerator() {
    const [fractalType, setFractalType] = useState<'mandelbrot' | 'julia'>('mandelbrot')
    const [zoom, setZoom] = useState(0.8)
    const [center, setCenter] = useState({ x: -0.5, y: 0 })
    const [juliaC, setJuliaC] = useState({ x: -0.4, y: 0.6 })
    const [showControls, setShowControls] = useState(true)

    const handlePan = (dx: number, dy: number) => {
        const sensitivity = 0.002 / zoom
        setCenter(prev => ({
            x: prev.x - dx * sensitivity,
            y: prev.y + dy * sensitivity
        }))
    }

    const handleZoom = (factor: number) => {
        setZoom(z => Math.max(0.1, Math.min(z * factor, 100000)))
    }

    const resetView = () => {
        setZoom(0.8)
        setCenter({ x: -0.5, y: 0 })
        setJuliaC({ x: -0.4, y: 0.6 })
    }

    return (
        <div className="w-full h-[600px] relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-black group">
            <Canvas>
                <FractalScene
                    fractalType={fractalType}
                    zoom={zoom}
                    center={center}
                    juliaC={juliaC}
                    onPan={handlePan}
                    onZoom={handleZoom}
                />
            </Canvas>

            {/* Controls Toggle */}
            <button
                className="absolute top-4 right-4 z-10 p-2 bg-black/50 backdrop-blur border border-white/10 hover:bg-white/10 rounded-md text-white transition-colors"
                onClick={() => setShowControls(!showControls)}
            >
                <Settings2 className="w-4 h-4" />
            </button>

            {/* Main Controls Panel */}
            <AnimatePresence>
                {showControls && (
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className="absolute right-4 top-16 w-64 bg-black/60 backdrop-blur-xl border border-white/10 rounded-xl p-4 flex flex-col gap-6 text-white"
                    >
                        {/* Type Selection */}
                        <div className="space-y-2">
                            <label className="text-xs uppercase tracking-wider text-neutral-400 font-bold">Fractal Type</label>
                            <div className="flex bg-white/5 p-1 rounded-lg">
                                <button
                                    onClick={() => setFractalType('mandelbrot')}
                                    className={`flex-1 py-1.5 text-xs rounded-md transition-all ${fractalType === 'mandelbrot' ? 'bg-indigo-600 text-white shadow-lg' : 'text-neutral-400 hover:text-white'}`}
                                >
                                    Mandelbrot
                                </button>
                                <button
                                    onClick={() => setFractalType('julia')}
                                    className={`flex-1 py-1.5 text-xs rounded-md transition-all ${fractalType === 'julia' ? 'bg-indigo-600 text-white shadow-lg' : 'text-neutral-400 hover:text-white'}`}
                                >
                                    Julia
                                </button>
                            </div>
                        </div>

                        {/* Julia Controls */}
                        {fractalType === 'julia' && (
                            <div className="space-y-4">
                                <label className="text-xs uppercase tracking-wider text-neutral-400 font-bold flex items-center gap-2">
                                    <Palette className="w-3 h-3" /> Julia Constant (C)
                                </label>
                                <div className="space-y-1">
                                    <div className="flex justify-between text-[10px] text-white/50">
                                        <span>Real (X)</span>
                                        <span>{juliaC.x.toFixed(2)}</span>
                                    </div>
                                    <input
                                        type="range"
                                        min="-1.5" max="1.5" step="0.01"
                                        value={juliaC.x}
                                        onChange={(e) => setJuliaC(prev => ({ ...prev, x: parseFloat(e.target.value) }))}
                                        className="w-full h-1 bg-white/20 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <div className="flex justify-between text-[10px] text-white/50">
                                        <span>Imaginary (Y)</span>
                                        <span>{juliaC.y.toFixed(2)}</span>
                                    </div>
                                    <input
                                        type="range"
                                        min="-1.5" max="1.5" step="0.01"
                                        value={juliaC.y}
                                        onChange={(e) => setJuliaC(prev => ({ ...prev, y: parseFloat(e.target.value) }))}
                                        className="w-full h-1 bg-white/20 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                                    />
                                </div>
                            </div>
                        )}

                        {/* Zoom Controls */}
                        <div className="space-y-2">
                            <label className="text-xs uppercase tracking-wider text-neutral-400 font-bold">Zoom Level</label>
                            <div className="flex items-center gap-2 text-white">
                                <button className="p-2 hover:bg-white/10 rounded-full transition-colors" onClick={() => handleZoom(0.5)}><ZoomOut className="w-4 h-4" /></button>
                                <span className="text-xs font-mono flex-1 text-center">{zoom.toFixed(2)}x</span>
                                <button className="p-2 hover:bg-white/10 rounded-full transition-colors" onClick={() => handleZoom(2.0)}><ZoomIn className="w-4 h-4" /></button>
                            </div>
                        </div>

                        <div className="pt-2 border-t border-white/10">
                            <button className="w-full py-2 bg-white/10 hover:bg-white/20 rounded-md text-xs transition-colors flex items-center justify-center" onClick={resetView}>
                                <RefreshCcw className="w-3 h-3 mr-2" /> Reset View
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="absolute bottom-6 left-6 px-4 py-2 bg-black/50 backdrop-blur-md rounded-lg border border-white/10 text-[10px] text-white/50 uppercase tracking-widest pointer-events-none">
                Interactive WebGL Generator v2.0
            </div>
        </div>
    )
}
