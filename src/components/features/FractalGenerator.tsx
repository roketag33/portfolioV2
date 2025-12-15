'use client'

import { useRef, useMemo, useState } from 'react'
import { Canvas, useFrame, useThree, ThreeEvent } from '@react-three/fiber'
import * as THREE from 'three'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { RefreshCcw, ZoomIn, ZoomOut } from 'lucide-react'

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

varying vec2 vUv;

void main() {
    // Basic UV coordinates
    vec2 p = vUv * 2.0 - 1.0;
    
    // Fix Aspect Ratio
    p.x *= uResolution.x / uResolution.y;

    // Apply Zoom and Center
    vec2 c = uCenter + p / uZoom;
    
    vec2 z = vec2(0.0);
    float iter = 0.0;
    const float maxIter = 200.0; // Higher iterations for deeper zoom
    
    // Mandelbrot Loop
    for(float i = 0.0; i < maxIter; i++) {
        z = vec2(z.x*z.x - z.y*z.y, 2.0*z.x*z.y) + c;
        if(length(z) > 4.0) break;
        iter++;
    }
    
    // Coloring
    float t = iter / maxIter;
    
    vec3 color = vec3(0.0);
    
    if(iter < maxIter) {
        // Smooth coloring based on iteration
        float smoothT = t + 0.1 * sin(uTime * 0.5); // Subtle animation
        color = mix(uColor1, uColor2, sqrt(t));
        color = mix(color, uColor3, t * t);
    }
    
    gl_FragColor = vec4(color, 1.0);
}
`

function FractalScene() {
    const meshWithMaterial = useRef<THREE.Mesh>(null)
    const { viewport, size } = useThree()
    const shaderRef = useRef<THREE.ShaderMaterial>(null)

    // State for interaction
    const [zoom, setZoom] = useState(0.8)
    const [center, setCenter] = useState(new THREE.Vector2(-0.5, 0))
    const isDragging = useRef(false)
    const lastMousePos = useRef({ x: 0, y: 0 })

    const uniforms = useMemo(
        () => ({
            uTime: { value: 0 },
            uResolution: { value: new THREE.Vector2(size.width, size.height) },
            uCenter: { value: center },
            uZoom: { value: zoom },
            // Aesthetic Color Palette (Deep Space / Cyber)
            uColor1: { value: new THREE.Color('#0a0a1a') }, // Dark Background
            uColor2: { value: new THREE.Color('#4f46e5') }, // Indigo
            uColor3: { value: new THREE.Color('#ec4899') }, // Pink/Magenta Accent
        }),
        []
    )

    useFrame((state) => {
        if (shaderRef.current) {
            shaderRef.current.uniforms.uTime.value = state.clock.elapsedTime
            shaderRef.current.uniforms.uZoom.value = THREE.MathUtils.lerp(shaderRef.current.uniforms.uZoom.value, zoom, 0.1)
            shaderRef.current.uniforms.uCenter.value.lerp(center, 0.1)
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

        // Calculate pan delta strictly based on Zoom level to keep movement consistent 
        // dx is in screen pixels. Need to convert to fractal space.
        // Approximate scaling factor derived from screen width and current zoom
        const sensitivity = 0.002 / zoom

        setCenter(prev => new THREE.Vector2(
            prev.x - dx * sensitivity * (size.width / 500),
            prev.y + dy * sensitivity * (size.width / 500)
        ))
    }

    const handleWheel = (e: any) => {
        // Standard wheel delta is often +/- 100 or line height
        const zoomFactor = 1.1
        if (e.deltaY < 0) {
            setZoom(z => z * zoomFactor)
        } else {
            setZoom(z => z / zoomFactor)
        }
    }

    // Expose interaction globally via DOM events attached to Canvas parent if needed, 
    // but R3F events on mesh are easier for self-contained component
    // Need a full screen plane to catch all events

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
    return (
        <div className="w-full h-[600px] relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-black">
            <Canvas>
                <FractalScene />
            </Canvas>

            {/* Overlay UI Controls */}
            <div className="absolute bottom-6 left-6 flex gap-2">
                <div className="px-4 py-2 bg-black/50 backdrop-blur-md rounded-lg border border-white/10 text-xs text-white/50 uppercase tracking-widest pointer-events-none">
                    Drag to Pan • Scroll to Zoom
                </div>
            </div>

            <div className="absolute top-6 right-6 flex flex-col gap-2">
                {/*  Reset Button could go here if state was lifted up, keeping simple for now */}
            </div>
        </div>
    )
}
