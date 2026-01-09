'use client'

import React, { useState, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment, PerspectiveCamera } from '@react-three/drei'
import * as THREE from 'three'
import { Type, Info, Box, Network } from 'lucide-react'
import LabExitButton from '@/components/lab/LabExitButton'
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing'
import MarkmapView from './components/MarkmapView'
import GraphSimulation, { GraphNode } from './components/GraphSimulation'

// --- default Markdown ---
const DEFAULT_MARKDOWN = `# My Second Brain
- Ideas
  - 3D Visualization
  - Knowledge Graphs
  - Interactive Art
- Technologies
  - Next.js
  - React Three Fiber
  - WebGL
- Goals
  - Build Portfolio
  - Experiment
  - Learn`

// --- Parser Logic ---
const parseMarkdown = (text: string): GraphNode[] => {
    const lines = text.split('\n')
    const nodes: GraphNode[] = []
    const stack: { node: GraphNode, indent: number }[] = []

    const getParent = (indent: number) => {
        for (let i = stack.length - 1; i >= 0; i--) {
            if (stack[i].indent < indent) return stack[i].node
        }
        return null
    }

    lines.forEach((line, index) => {
        if (!line.trim()) return

        const indent = line.search(/\S/)
        const content = line.trim().replace(/^[-*#]+\s*/, '')

        let level = 0
        if (line.trim().startsWith('#')) level = 1
        else level = 2 + Math.floor(indent / 2)

        const newNode: GraphNode = {
            id: `node-${index}`,
            label: content,
            level,
            position: new THREE.Vector3((Math.random() - 0.5) * 5, (Math.random() - 0.5) * 5, (Math.random() - 0.5) * 5),
            velocity: new THREE.Vector3(0, 0, 0),
            connections: []
        }

        const parent = getParent(indent)
        if (parent) {
            parent.connections.push(newNode.id)
            newNode.connections.push(parent.id)
        } else if (nodes.length > 0 && level > 1) {
            nodes[0].connections.push(newNode.id)
            newNode.connections.push(nodes[0].id)
        }

        nodes.push(newNode)
        stack.push({ node: newNode, indent })
    })

    if (nodes.length === 0) return [{
        id: 'root', label: 'Empty', level: 1,
        position: new THREE.Vector3(0, 0, 0), velocity: new THREE.Vector3(0, 0, 0), connections: []
    }]

    return nodes
}

export default function KnowledgeGraphPage() {
    const [markdown, setMarkdown] = useState(DEFAULT_MARKDOWN)
    const [graphData, setGraphData] = useState<GraphNode[]>([])
    const [viewMode, setViewMode] = useState<'3d' | '2d'>('3d')

    useEffect(() => {
        setGraphData(parseMarkdown(markdown))
    }, [markdown])

    return (
        <main className="h-screen w-full bg-black text-white overflow-hidden flex flex-col md:flex-row font-sans">
            {/* LEFT: Editor Panel */}
            <div className="w-full h-[40vh] md:w-1/3 md:h-full min-w-[300px] md:min-w-[350px] max-w-none md:max-w-[500px] bg-neutral-900 border-b md:border-b-0 md:border-r border-neutral-800 flex flex-col z-10 shadow-2xl relative">
                {/* Header */}
                <div className="p-4 border-b border-neutral-800 flex items-center justify-between bg-neutral-900">
                    <LabExitButton />
                    <div className="flex items-center gap-2">
                        <span className="text-xs font-bold tracking-wider text-indigo-400 uppercase">Input Data</span>
                    </div>
                </div>

                {/* Editor */}
                <textarea
                    value={markdown}
                    onChange={(e) => setMarkdown(e.target.value)}
                    className="flex-grow bg-[#0a0a0a] text-neutral-300 p-6 font-mono text-sm resize-none focus:outline-none focus:ring-1 focus:ring-indigo-500/50 leading-relaxed custom-scrollbar"
                    placeholder="# Your Title\n- Topic A\n  - Subtopic 1"
                    spellCheck={false}
                />

                {/* Toolbar */}
                <div className="p-4 border-t border-neutral-800 bg-neutral-900 text-xs text-neutral-500 flex gap-4">
                    <div className="flex items-center gap-1"><Type className="w-3 h-3" /> Markdown Support</div>
                    <div className="flex items-center gap-1"><Info className="w-3 h-3" /> Auto-updates</div>
                </div>
            </div>

            {/* RIGHT: Visualization Area */}
            <div className="flex-grow relative bg-black">
                {/* View Toggle UI */}
                <div className="absolute top-6 right-6 z-20 flex flex-col items-end gap-2">
                    <div className="text-right pointer-events-none mb-2">
                        <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-pink-400">Knowledge Graph</h1>
                        <p className="text-sm text-neutral-500">Interactive Visualization</p>
                    </div>

                    <div className="flex bg-neutral-900/80 backdrop-blur-sm p-1 rounded-lg border border-white/10">
                        <button
                            onClick={() => setViewMode('3d')}
                            className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm transition-all ${viewMode === '3d' ? 'bg-indigo-600 text-white shadow-lg' : 'hover:bg-white/10 text-neutral-400'}`}
                        >
                            <Box className="w-4 h-4" /> 3D View
                        </button>
                        <button
                            onClick={() => setViewMode('2d')}
                            className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm transition-all ${viewMode === '2d' ? 'bg-pink-600 text-white shadow-lg' : 'hover:bg-white/10 text-neutral-400'}`}
                        >
                            <Network className="w-4 h-4" /> 2D Map
                        </button>
                    </div>
                </div>

                {viewMode === '3d' ? (
                    <Canvas dpr={[1, 2]}>
                        <PerspectiveCamera makeDefault position={[0, 0, 20]} fov={40} />
                        <color attach="background" args={['#030712']} />

                        <ambientLight intensity={0.5} />
                        <pointLight position={[10, 10, 10]} intensity={1} color="#4f46e5" />

                        <GraphSimulation graphData={graphData} />

                        <OrbitControls makeDefault autoRotate autoRotateSpeed={0.5} enablePan={true} maxDistance={50} minDistance={5} />
                        <Environment preset="night" />
                        <EffectComposer>
                            <Bloom luminanceThreshold={0.5} mipmapBlur intensity={1.0} />
                            <Vignette eskil={false} offset={0.1} darkness={1.1} />
                        </EffectComposer>
                    </Canvas>
                ) : (
                    <div className="w-full h-full bg-slate-900 flex items-center justify-center p-8 overflow-hidden">
                        <div className="w-full h-full bg-slate-900 relative">
                            <MarkmapView markdown={markdown} />
                        </div>
                    </div>
                )}
            </div>

            <style jsx global>{`
                .custom-scrollbar::-webkit-scrollbar { width: 6px; }
                .custom-scrollbar::-webkit-scrollbar-track { background: #171717; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: #404040; border-radius: 3px; }
                /* Markmap overrides to fit dark theme */
                .markmap-container svg { width: 100%; height: 100%; }
                .markmap-foreign { display: inline-block; }
            `}</style>
        </main>
    )
}
