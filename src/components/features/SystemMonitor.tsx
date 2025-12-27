'use client'

import { motion } from 'framer-motion'
import { Activity, Server, Cpu, Database, Wifi, Shield, Terminal as TerminalIcon } from 'lucide-react'
import { useState, useEffect } from 'react'

export default function SystemMonitor() {
    const [metrics, setMetrics] = useState({
        cpu: 12,
        memory: 45,
        network: 240,
        temp: 42
    })

    useEffect(() => {
        const interval = setInterval(() => {
            setMetrics({
                cpu: Math.floor(Math.random() * (40 - 10) + 10),
                memory: Math.floor(Math.random() * (60 - 40) + 40),
                network: Math.floor(Math.random() * (500 - 100) + 100),
                temp: Math.floor(Math.random() * (55 - 40) + 40)
            })
        }, 2000)
        return () => clearInterval(interval)
    }, [])

    return (
        <div className="w-full h-full min-h-[400px] bg-neutral-900 rounded-3xl overflow-hidden border border-white/10 p-6 font-mono relative group">
            <div className="absolute inset-0 bg-grid-white/[0.03] bg-[size:24px_24px] pointer-events-none" />

            {/* Header / Top Bar */}
            <div className="flex justify-between items-center mb-8 relative z-10 border-b border-white/5 pb-4">
                <div className="flex items-center gap-3">
                    <div className="flex gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
                        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
                        <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
                    </div>
                    <span className="text-xs text-neutral-500 ml-2">sys_monitor_v2.0</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-xs text-emerald-500 font-bold tracking-wider">ONLINE</span>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">

                {/* Status Cards */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white/5 rounded-xl p-4 border border-white/5 hover:border-blue-500/30 transition-colors">
                        <div className="flex justify-between items-start mb-2">
                            <Cpu className="w-4 h-4 text-blue-400" />
                            <span className="text-[10px] text-neutral-500">CPU LOAD</span>
                        </div>
                        <div className="text-2xl font-bold text-white mb-1">{metrics.cpu}%</div>
                        <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                            <motion.div
                                className="h-full bg-blue-500"
                                animate={{ width: `${metrics.cpu}%` }}
                                transition={{ duration: 0.5 }}
                            />
                        </div>
                    </div>

                    <div className="bg-white/5 rounded-xl p-4 border border-white/5 hover:border-purple-500/30 transition-colors">
                        <div className="flex justify-between items-start mb-2">
                            <Server className="w-4 h-4 text-purple-400" />
                            <span className="text-[10px] text-neutral-500">MEMORY</span>
                        </div>
                        <div className="text-2xl font-bold text-white mb-1">{metrics.memory}%</div>
                        <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                            <motion.div
                                className="h-full bg-purple-500"
                                animate={{ width: `${metrics.memory}%` }}
                                transition={{ duration: 0.5 }}
                            />
                        </div>
                    </div>

                    <div className="bg-white/5 rounded-xl p-4 border border-white/5 hover:border-emerald-500/30 transition-colors">
                        <div className="flex justify-between items-start mb-2">
                            <Wifi className="w-4 h-4 text-emerald-400" />
                            <span className="text-[10px] text-neutral-500">NETWORK</span>
                        </div>
                        <div className="text-2xl font-bold text-white mb-1">{metrics.network} <span className="text-xs text-neutral-500">ms</span></div>
                        <div className="flex gap-0.5 items-end h-3 mt-2 opacity-50">
                            {[40, 70, 30, 85, 50].map((h, i) => (
                                <div key={i} className="w-1 bg-emerald-500" style={{ height: `${h}%` }} />
                            ))}
                        </div>
                    </div>

                    <div className="bg-white/5 rounded-xl p-4 border border-white/5 hover:border-orange-500/30 transition-colors">
                        <div className="flex justify-between items-start mb-2">
                            <Activity className="w-4 h-4 text-orange-400" />
                            <span className="text-[10px] text-neutral-500">TEMP</span>
                        </div>
                        <div className="text-2xl font-bold text-white mb-1">{metrics.temp}°C</div>
                        <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                            <motion.div
                                className="h-full bg-orange-500"
                                animate={{ width: `${(metrics.temp / 80) * 100}%` }}
                                transition={{ duration: 0.5 }}
                            />
                        </div>
                    </div>
                </div>

                {/* Log Terminal */}
                <div className="bg-black/40 rounded-xl border border-white/5 p-4 flex flex-col font-mono text-[10px] md:text-xs">
                    <div className="flex items-center gap-2 text-neutral-500 mb-3 pb-2 border-b border-white/5">
                        <TerminalIcon className="w-3 h-3" />
                        <span>SYSTEM LOGS</span>
                    </div>
                    <div className="flex-1 overflow-hidden space-y-1.5 text-neutral-400">
                        <div className="flex gap-2"><span className="text-blue-500">[INFO]</span> <span>Initializing core services...</span></div>
                        <div className="flex gap-2"><span className="text-emerald-500">[SUCCESS]</span> <span>Connected to Kubernetes Cluster</span></div>
                        <div className="flex gap-2"><span className="text-blue-500">[INFO]</span> <span>Loading IoT telemetry stream</span></div>
                        <div className="flex gap-2"><span className="text-yellow-500">[WARN]</span> <span>Latency spike detected in region-eu-west</span></div>
                        <div className="flex gap-2"><span className="text-emerald-500">[SUCCESS]</span> <span>Database replication synced</span></div>
                        <div className="flex gap-2"><span className="text-blue-500">[INFO]</span> <span>Deployment pipeline ready</span></div>
                        <div className="animate-pulse text-blue-400">_</div>
                    </div>
                </div>
            </div>

            {/* Architecture Badge */}
            <div className="absolute bottom-6 left-6 right-6 pt-6 border-t border-white/5 flex justify-between items-center text-xs z-10">
                <div className="flex items-center gap-2 text-neutral-400">
                    <Database className="w-3 h-3" />
                    <span>Architecture: Microservices</span>
                </div>
                <div className="flex items-center gap-2 text-neutral-400">
                    <Shield className="w-3 h-3" />
                    <span>Security: Enhanced</span>
                </div>
            </div>

            {/* Glow Effect */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] bg-blue-500/10 blur-[80px] pointer-events-none" />
        </div>
    )
}
