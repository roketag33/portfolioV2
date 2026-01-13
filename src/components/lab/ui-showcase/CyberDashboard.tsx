'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Terminal, Crosshair, Zap, Radio, Activity, Lock, ArrowLeft } from 'lucide-react';
import { Link } from '@/i18n/routingConfig';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const GlitchText = ({ text, as: Component = 'span', className = '' }: { text: string, as?: any, className?: string }) => {
    return (
        <Component className={`relative inline-block ${className} group`}>
            <span className="relative z-10">{text}</span>
            <span className="absolute top-0 left-0 -z-10 w-full h-full text-cyan-400 opacity-0 group-hover:opacity-70 animate-pulse translate-x-[2px]">{text}</span>
            <span className="absolute top-0 left-0 -z-10 w-full h-full text-fuchsia-500 opacity-0 group-hover:opacity-70 animate-pulse -translate-x-[2px]">{text}</span>
        </Component>
    );
};

const StatBar = ({ label, value, color = "bg-cyan-500" }: { label: string, value: number, color?: string }) => (
    <div className="mb-4">
        <div className="flex justify-between text-xs font-mono mb-1 text-cyan-200/70">
            <span>{label}</span>
            <span>{value}%</span>
        </div>
        <div className="h-2 bg-slate-900 border border-slate-800 relative overflow-hidden">
            <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${value}%` }}
                transition={{ duration: 1, ease: "circOut", delay: 0.5 }}
                className={`h-full ${color} relative`}
            >
                <div className="absolute top-0 right-0 h-full w-1 bg-white/50 shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
            </motion.div>
            {/* Grid lines on bar */}
            <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-20" />
        </div>
    </div>
);



const CyberDashboard = () => {
    const t = useTranslations('Lab.ui-showcase.cyber');
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        // eslint-disable-next-line
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <div className="min-h-screen bg-slate-950 text-cyan-400 p-4 md:p-8 font-mono overflow-hidden relative selection:bg-cyan-500/30 selection:text-cyan-100">
            {/* Background Grid & Effects */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#083344_1px,transparent_1px),linear-gradient(to_bottom,#083344_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(6,182,212,0.1),transparent_70%)]" />
            </div>

            {/* Scanline Effect */}
            <div className="fixed inset-0 pointer-events-none z-50 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%] animate-scanlines opacity-20" />

            {/* Back Button */}
            {/* Unified Back Button */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="fixed top-24 left-8 z-[60] mix-blend-difference"
            >
                <Link
                    href="/lab/ui-showcase"
                    className="flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/90 hover:text-black transition-all duration-300 text-sm font-medium tracking-widest uppercase cursor-pointer"
                >
                    <ArrowLeft className="w-4 h-4" />
                    <span>BACK</span>
                </Link>
            </motion.div>

            <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6">

                {/* Header / Top Bar */}
                <div className="lg:col-span-12 flex flex-col md:flex-row justify-between items-start md:items-center border-b border-cyan-500/30 pb-4 mb-4 backdrop-blur-sm">
                    <div>
                        <h1 className="text-4xl md:text-6xl font-black tracking-tighter uppercase mb-2">
                            <GlitchText text={t('title')} />
                        </h1>
                        <p className="text-sm md:text-base text-cyan-200/60 max-w-lg border-l-2 border-fuchsia-500 pl-4">
                            {t('desc')}
                        </p>
                    </div>
                    <div className="mt-4 md:mt-0 flex items-center space-x-6 text-xs md:text-sm">
                        <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-green-500 animate-pulse rounded-full" />
                            <span className="tracking-widest">{t('system_status')}: <span className="text-green-400 font-bold">{t('online')}</span></span>
                        </div>
                        <div className="text-right hidden md:block">
                            <div className="tracking-widest opacity-60">ID: 0X-9283-DELTA</div>
                            <div className="tracking-widest opacity-60">LOC: SECTOR 7G</div>
                        </div>
                    </div>
                </div>

                {/* Left Column: Stats & Loadout */}
                <div className="lg:col-span-3 space-y-6">
                    {/* Security Module */}
                    <motion.div
                        initial={{ x: -50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        className="bg-slate-900/50 border border-red-500/30 p-6 relative group overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 p-2 opacity-50"><Lock className="w-4 h-4 text-red-500" /></div>
                        <h3 className="text-red-400 font-bold tracking-widest text-xs mb-4 flex items-center gap-2">
                            {t('security_level')}
                        </h3>
                        <div className="text-4xl font-black text-red-500 mb-2 glitch-text">{t('high')}</div>
                        <div className="h-1 w-full bg-red-900/30 overflow-hidden">
                            <motion.div
                                animate={{ x: ['-100%', '100%'] }}
                                transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                                className="h-full w-1/2 bg-red-500/50 blur-sm"
                            />
                        </div>
                    </motion.div>

                    {/* Stats Module */}
                    <motion.div
                        initial={{ x: -50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="bg-slate-900/50 border border-cyan-500/30 p-6 relative"
                    >
                        <div className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-cyan-500" />
                        <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-cyan-500" />

                        <h3 className="text-cyan-400 font-bold tracking-widest text-xs mb-6 flex items-center gap-2">
                            <Activity className="w-4 h-4" /> {t('stats')}
                        </h3>

                        <StatBar label={t('accuracy')} value={87} />
                        <StatBar label={t('speed')} value={94} color="bg-fuchsia-500" />
                        <StatBar label={t('stealth')} value={62} color="bg-yellow-400" />
                    </motion.div>
                </div>

                {/* Center Column: Main Visual / Map */}
                <div className="lg:col-span-6 flex flex-col gap-6">
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.7 }}
                        className="flex-grow bg-slate-900/80 border border-cyan-500/20 relative aspect-video flex items-center justify-center overflow-hidden"
                    >
                        {/* Fake Holo Map */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-30">
                            <div className="w-[300px] h-[300px] border border-cyan-500/30 rounded-full animate-[spin_10s_linear_infinite]" />
                            <div className="w-[200px] h-[200px] border border-fuchsia-500/30 rounded-full animate-[spin_15s_linear_infinite_reverse] absolute" />
                            <div className="w-[100px] h-[100px] border border-yellow-500/30 rounded-full animate-[ping_3s_ease-in-out_infinite] absolute" />
                        </div>

                        <div className="z-10 text-center space-y-2">
                            <Radio className="w-12 h-12 text-cyan-400 mx-auto animate-pulse" />
                            <div className="text-xs tracking-[0.2em] font-bold">SCANNING SECTOR...</div>
                        </div>

                        {/* Decorated Corners */}
                        <div className="absolute top-4 left-4 w-16 h-16 border-t border-l border-cyan-500/50" />
                        <div className="absolute top-4 right-4 w-16 h-16 border-t border-r border-cyan-500/50" />
                        <div className="absolute bottom-4 left-4 w-16 h-16 border-b border-l border-cyan-500/50" />
                        <div className="absolute bottom-4 right-4 w-16 h-16 border-b border-r border-cyan-500/50" />
                    </motion.div>

                    {/* Terminal / Mission Log */}
                    <motion.div
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="bg-black border border-green-500/30 p-4 font-mono text-xs md:text-sm text-green-400 h-48 overflow-y-auto custom-scrollbar"
                    >
                        <h3 className="text-green-500 font-bold tracking-widest text-xs mb-2 border-b border-green-900 pb-1 flex items-center gap-2">
                            <Terminal className="w-3 h-3" /> {t('mission_log')}
                        </h3>
                        <div className="space-y-1 opacity-80">
                            <div className="flex gap-2"><span className="opacity-50">[10:42:01]</span> <span>{t('mission_1')}</span></div>
                            <div className="flex gap-2"><span className="opacity-50">[10:42:15]</span> <span className="animate-pulse">{t('mission_2')}</span></div>
                            <div className="flex gap-2"><span className="opacity-50">[10:42:55]</span> <span className="text-red-400">{t('mission_3')}</span></div>
                            <div className="flex gap-2"><span className="opacity-50">[10:43:00]</span> <span>root@sys:~$ <span className="animate-pulse">_</span></span></div>
                        </div>
                    </motion.div>
                </div>

                {/* Right Column: Loadout & Users */}
                <div className="lg:col-span-3 space-y-6">
                    <motion.div
                        initial={{ x: 50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="bg-slate-900/50 border border-fuchsia-500/30 p-6"
                    >
                        <h3 className="text-fuchsia-400 font-bold tracking-widest text-xs mb-4 flex items-center gap-2">
                            <Crosshair className="w-4 h-4" /> {t('loadout')}
                        </h3>
                        <ul className="space-y-4">
                            <li className="flex items-center justify-between group cursor-pointer">
                                <span className="group-hover:text-fuchsia-300 transition-colors">{t('weapon_1')}</span>
                                <div className="w-2 h-2 bg-fuchsia-500 rounded-full shadow-[0_0_10px_#d946ef]" />
                            </li>
                            <li className="flex items-center justify-between group cursor-pointer">
                                <span className="group-hover:text-fuchsia-300 transition-colors">{t('weapon_2')}</span>
                                <div className="w-2 h-2 bg-slate-600 rounded-full" />
                            </li>
                            <li className="flex items-center justify-between group cursor-pointer">
                                <span className="group-hover:text-fuchsia-300 transition-colors">{t('weapon_3')}</span>
                                <div className="w-2 h-2 bg-fuchsia-500 rounded-full shadow-[0_0_10px_#d946ef]" />
                            </li>
                        </ul>
                    </motion.div>

                    <motion.div
                        initial={{ x: 50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="bg-gradient-to-br from-cyan-900/20 to-slate-900 border border-cyan-500/20 p-6"
                    >
                        <h3 className="text-cyan-200 font-bold tracking-widest text-xs mb-4 flex items-center gap-2">
                            <Zap className="w-4 h-4" /> {t('active_users')}
                        </h3>
                        <div className="grid grid-cols-4 gap-2">
                            {[...Array(8)].map((_, i) => (
                                <div key={i} className="aspect-square bg-cyan-900/30 border border-cyan-500/20 flex items-center justify-center hover:bg-cyan-500/20 transition-colors cursor-pointer">
                                    <div className={`w-1 h-1 rounded-full ${i < 5 ? 'bg-cyan-400' : 'bg-slate-600'}`} />
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>

            </div>

            {/* CSS for custom scrollbar and animations usually goes in global css or tailwind config, 
                but we can inject a style tag for this component specific demo */}
            <style jsx global>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: #1e293b;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: #22d3ee;
                }
                @keyframes scanlines {
                    0% { background-position: 0% 0%; }
                    100% { background-position: 0% 100%; }
                }
            `}</style>
        </div>
    );
};

export default CyberDashboard;
