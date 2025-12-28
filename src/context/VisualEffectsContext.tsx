'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

type EffectMode = 'NONE' | 'DEBUG' | 'XRAY'

interface VisualEffectsContextType {
    mode: EffectMode
    toggleDebug: () => void
    toggleXRay: () => void
    resetEffects: () => void
}

const VisualEffectsContext = createContext<VisualEffectsContextType>({
    mode: 'NONE',
    toggleDebug: () => { },
    toggleXRay: () => { },
    resetEffects: () => { },
})

export const useVisualEffects = () => useContext(VisualEffectsContext)

export function VisualEffectsProvider({ children }: { children: React.ReactNode }) {
    const [mode, setMode] = useState<EffectMode>('NONE')

    const toggleDebug = () => {
        setMode(prev => prev === 'DEBUG' ? 'NONE' : 'DEBUG')
    }

    const toggleXRay = () => {
        setMode(prev => prev === 'XRAY' ? 'NONE' : 'XRAY')
    }

    const resetEffects = () => {
        setMode('NONE')
    }

    // Auto-disable debug after 10s
    useEffect(() => {
        if (mode === 'DEBUG') {
            const timer = setTimeout(() => setMode('NONE'), 10000)
            return () => clearTimeout(timer)
        }
    }, [mode])

    return (
        <VisualEffectsContext.Provider value={{ mode, toggleDebug, toggleXRay, resetEffects }}>
            {children}

            {/* DEBUG OVERLAY */}
            {mode === 'DEBUG' && (
                <div className="fixed inset-0 z-[9999] pointer-events-none">
                    <style jsx global>{`
                        * {
                            outline: 1px solid rgba(255, 0, 0, 0.3) !important;
                        }
                    `}</style>
                    <div className="absolute top-4 left-4 bg-black/90 text-green-500 p-4 font-mono text-xs border border-green-500/50 shadow-2xl rounded">
                        <div>SYSTEM_STATUS: <span className="text-red-500">CRITICAL</span></div>
                        <div>MEMORY: 128MB / 1024MB</div>
                        <div>FPS: 60</div>
                        <div>DOM_NODES: {typeof document !== 'undefined' ? document.getElementsByTagName('*').length : 0}</div>
                        <div className="mt-2 text-white animate-pulse">VISUALIZING BOUNDARIES...</div>
                    </div>
                </div>
            )}

            {/* X-RAY OVERLAY */}
            {mode === 'XRAY' && (
                <div className="fixed inset-0 z-[9999] pointer-events-none mix-blend-hard-light">
                    <style jsx global>{`
                        body {
                            background-color: #0044cc !important;
                            color: white !important;
                        }
                        * {
                            border-color: rgba(255, 255, 255, 0.3) !important;
                            background: transparent !important;
                            box-shadow: none !important;
                        }
                        img, video {
                            filter: grayscale(100%) brightness(200%) contrast(200%) !important;
                            opacity: 0.5 !important;
                        }
                    `}</style>
                    <div className="absolute inset-0 bg-[#0044cc] opacity-20" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
                    <div className="absolute bottom-12 right-12 border-4 border-white p-4">
                        <h1 className="text-4xl font-bold uppercase tracking-widest text-white">Blueprint V.1.0</h1>
                        <p className="font-mono text-sm mt-2">STRUCTURAL INTEGRITY: 100%</p>
                    </div>
                </div>
            )}
        </VisualEffectsContext.Provider>
    )
}
