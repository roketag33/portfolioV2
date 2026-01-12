"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp, Settings2 } from "lucide-react";
import { useState } from "react";

interface Config {
    count: number;
    attractorStrength: number;
    damping: number;
    colorMode: 'stardust' | 'inferno' | 'matrix';
}

interface ControlsProps {
    config: Config;
    setConfig: (config: Config) => void;
}

export default function Controls({ config, setConfig }: ControlsProps) {
    const [isOpen, setIsOpen] = useState(false); // Closed by default on load for cleaner look

    const handleChange = (key: keyof Config, value: any) => {
        setConfig({ ...config, [key]: value });
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`fixed z-20 transition-all duration-300 ease-out
                ${isOpen
                    ? 'inset-x-4 bottom-24 sm:top-24 sm:left-6 sm:bottom-auto sm:right-auto sm:w-80'
                    : 'bottom-6 right-6 sm:top-24 sm:left-6 sm:bottom-auto sm:right-auto w-auto'
                }
            `}
        >
            <div className={`backdrop-blur-xl bg-black/60 border border-white/10 overflow-hidden shadow-2xl text-white transition-all
                ${isOpen ? 'rounded-2xl' : 'rounded-full sm:rounded-2xl'}
            `}>
                {/* Header / Toggle Button */}
                <div
                    className={`flex items-center justify-between cursor-pointer hover:bg-white/10 transition-colors
                        ${isOpen ? 'p-4 bg-white/5' : 'p-3 sm:p-4'}
                    `}
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <div className="flex items-center gap-2">
                        <Settings2 className={`${isOpen ? 'w-4 h-4' : 'w-6 h-6 sm:w-4 sm:h-4'} text-indigo-400`} />
                        {(isOpen || typeof window !== 'undefined' && window.innerWidth >= 640) && (
                            <span className="font-medium text-sm hidden sm:inline">Settings</span>
                        )}
                        {isOpen && <span className="font-medium text-sm sm:hidden">Settings</span>}
                    </div>
                    {isOpen ? <ChevronUp className="w-4 h-4 text-white/50" /> : <ChevronDown className="hidden sm:block w-4 h-4 text-white/50" />}
                </div>

                {/* Body */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                        >
                            <div className="p-5 space-y-6">
                                {/* Count */}
                                <div className="space-y-2">
                                    <div className="flex justify-between text-xs text-white/70">
                                        <span>Particles</span>
                                        <span>{config.count}</span>
                                    </div>
                                    <input
                                        type="range"
                                        min="1000"
                                        max="10000"
                                        step="100"
                                        value={config.count}
                                        onChange={(e) => handleChange('count', Number(e.target.value))}
                                        className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                                    />
                                </div>

                                {/* Gravity */}
                                <div className="space-y-2">
                                    <div className="flex justify-between text-xs text-white/70">
                                        <span>Gravity (Hold to Attract)</span>
                                        <span>{Math.round(config.attractorStrength)}</span>
                                    </div>
                                    <input
                                        type="range"
                                        min="0"
                                        max="200"
                                        step="1"
                                        value={config.attractorStrength}
                                        onChange={(e) => handleChange('attractorStrength', Number(e.target.value))}
                                        className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                                    />
                                </div>

                                {/* Damping */}
                                <div className="space-y-2">
                                    <div className="flex justify-between text-xs text-white/70">
                                        <span>Friction</span>
                                        <span>{config.damping.toFixed(3)}</span>
                                    </div>
                                    <input
                                        type="range"
                                        min="0.900"
                                        max="0.999"
                                        step="0.001"
                                        value={config.damping}
                                        onChange={(e) => handleChange('damping', Number(e.target.value))}
                                        className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                                    />
                                </div>

                                {/* Color Mode */}
                                <div className="flex bg-white/5 p-1 rounded-lg">
                                    {['stardust', 'inferno', 'matrix'].map((mode) => (
                                        <button
                                            key={mode}
                                            onClick={() => handleChange('colorMode', mode)}
                                            className={`flex-1 overflow-hidden py-1.5 text-xs rounded-md transition-all ${config.colorMode === mode
                                                    ? 'bg-indigo-500 text-white shadow-lg'
                                                    : 'text-white/50 hover:text-white hover:bg-white/5'
                                                }`}
                                        >
                                            {mode.charAt(0).toUpperCase() + mode.slice(1)}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    );
}

interface Config {
    count: number;
    attractorStrength: number;
    damping: number;
    colorMode: 'stardust' | 'inferno' | 'matrix';
}

interface ControlsProps {
    config: Config;
    setConfig: (config: Config) => void;
}

export default function Controls({ config, setConfig }: ControlsProps) {
    const [isOpen, setIsOpen] = useState(true);

    const handleChange = (key: keyof Config, value: any) => {
        setConfig({ ...config, [key]: value });
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute top-24 left-6 z-10 w-80 backdrop-blur-xl bg-black/60 border border-white/10 rounded-2xl overflow-hidden shadow-2xl text-white"
        >
            {/* Header */}
            <div
                className="flex items-center justify-between p-4 bg-white/5 cursor-pointer hover:bg-white/10 transition-colors"
                onClick={() => setIsOpen(!isOpen)}
            >
                <div className="flex items-center gap-2">
                    <Settings2 className="w-4 h-4 text-indigo-400" />
                    <span className="font-medium text-sm">Simulation Settings</span>
                </div>
                {isOpen ? <ChevronUp className="w-4 h-4 text-white/50" /> : <ChevronDown className="w-4 h-4 text-white/50" />}
            </div>

            {/* Body */}
            {isOpen && (
                <div className="p-5 space-y-6">
                    {/* Count */}
                    <div className="space-y-2">
                        <div className="flex justify-between text-xs text-white/70">
                            <span>Particles</span>
                            <span>{config.count}</span>
                        </div>
                        <input
                            type="range"
                            min="1000"
                            max="10000"
                            step="100"
                            value={config.count}
                            onChange={(e) => handleChange('count', Number(e.target.value))}
                            className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                        />
                    </div>

                    {/* Gravity */}
                    <div className="space-y-2">
                        <div className="flex justify-between text-xs text-white/70">
                            <span>Gravity</span>
                            <span>{Math.round(config.attractorStrength)}</span>
                        </div>
                        <input
                            type="range"
                            min="0"
                            max="200"
                            step="1"
                            value={config.attractorStrength}
                            onChange={(e) => handleChange('attractorStrength', Number(e.target.value))}
                            className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                        />
                    </div>

                    {/* Damping */}
                    <div className="space-y-2">
                        <div className="flex justify-between text-xs text-white/70">
                            <span>Friction (Damping)</span>
                            <span>{config.damping.toFixed(3)}</span>
                        </div>
                        <input
                            type="range"
                            min="0.900"
                            max="0.999"
                            step="0.001"
                            value={config.damping}
                            onChange={(e) => handleChange('damping', Number(e.target.value))}
                            className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                        />
                    </div>

                    {/* Color Mode */}
                    <div className="flex bg-white/5 p-1 rounded-lg">
                        {['stardust', 'inferno', 'matrix'].map((mode) => (
                            <button
                                key={mode}
                                onClick={() => handleChange('colorMode', mode)}
                                className={`flex-1 overflow-hidden py-1.5 text-xs rounded-md transition-all ${config.colorMode === mode
                                    ? 'bg-indigo-500 text-white shadow-lg'
                                    : 'text-white/50 hover:text-white hover:bg-white/5'
                                    }`}
                            >
                                {mode.charAt(0).toUpperCase() + mode.slice(1)}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </motion.div>
    );
}
