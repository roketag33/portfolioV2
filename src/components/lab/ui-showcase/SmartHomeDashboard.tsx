'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import {
    Sun, CloudRain, Thermometer, Music, Shield, Home,
    Lock, Unlock, Zap, LayoutGrid, Wind, Droplets, Fan, Tv, Router,
    Settings, ChevronRight, ArrowLeft
} from 'lucide-react';
import { Link } from '@/i18n/routingConfig';

// --- Types ---
type NavItem = 'home' | 'rooms' | 'climate' | 'security' | 'energy' | 'settings';

// --- Sub Components ---

const Sidebar = ({ active, onNavigate }: { active: NavItem, onNavigate: (i: NavItem) => void }) => {
    const t = useTranslations('Lab.ui-showcase.bento.nav');

    const items: { id: NavItem, icon: React.ComponentType<{ className?: string }>, label: string }[] = [
        { id: 'home', icon: Home, label: t('home') },
        { id: 'rooms', icon: LayoutGrid, label: t('rooms') },
        { id: 'climate', icon: Thermometer, label: t('climate') },
        { id: 'security', icon: Shield, label: t('security') },
        { id: 'energy', icon: Zap, label: t('energy') },
    ];

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`
                fixed bottom-0 left-0 right-0 h-20 bg-white/80 backdrop-blur-xl border-t border-white/50 z-40 flex flex-row justify-around items-center px-2 pb-2 
                md:relative md:h-screen md:w-20 md:flex-col md:justify-start md:items-center md:border-r md:border-t-0 md:bg-white/60 md:pt-48 md:pb-8 lg:w-64 lg:items-start lg:px-0 lg:pb-0
            `}
        >
            <div className="hidden lg:block px-6 mb-8 w-full">
                <div className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-600">
                    Smart OS
                </div>
            </div>

            <div className="w-full flex flex-row justify-evenly items-center md:flex-col md:space-y-2 md:px-3">
                {items.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => onNavigate(item.id)}
                        className={`
                            relative flex items-center justify-center p-2 rounded-xl transition-all duration-200 group overflow-hidden
                            md:w-full md:p-3 md:gap-3 md:justify-start
                            ${active === item.id
                                ? 'text-indigo-600 md:bg-indigo-600 md:text-white md:shadow-lg md:shadow-indigo-200'
                                : 'text-slate-400 hover:bg-white/50 hover:text-slate-800'
                            }
                        `}
                    >
                        <item.icon className={`w-6 h-6 md:w-5 md:h-5 relative z-10 ${active === item.id ? 'scale-110' : ''}`} />
                        <span className="font-medium hidden lg:block relative z-10 text-sm">{item.label}</span>

                        {/* Mobile Active Indicator (Dot) */}
                        {active === item.id && (
                            <motion.div
                                layoutId="nav-dot"
                                className="absolute -bottom-1 w-1 h-1 bg-indigo-600 rounded-full md:hidden"
                            />
                        )}

                        {/* Desktop Active BG Shimmer */}
                        {active === item.id && (
                            <motion.div
                                layoutId="nav-glow"
                                className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-indigo-500 z-0 hidden md:block"
                                initial={false}
                                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                            />
                        )}
                    </button>
                ))}

                {/* Mobile Settings Button (Inline) */}
                <button
                    onClick={() => onNavigate('settings')}
                    className="md:hidden p-2 rounded-xl text-slate-400 hover:text-slate-800"
                >
                    <Settings className="w-6 h-6" />
                </button>
            </div>

            {/* Desktop Settings Button (Bottom) */}
            <div className="w-full px-3 mt-auto hidden md:block">
                <button
                    onClick={() => onNavigate('settings')}
                    className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-white/50 text-slate-500 hover:text-slate-800 transition-colors"
                >
                    <Settings className="w-5 h-5" />
                    <span className="font-medium hidden lg:block">{t('settings')}</span>
                </button>
            </div>
        </motion.div>
    );
};

const Card = ({ children, className = '', title, icon: Icon, onClick }: { children: React.ReactNode, className?: string, title?: string, icon?: React.ComponentType<{ className?: string }>, onClick?: () => void }) => (
    <motion.div
        whileHover={{ scale: onClick ? 1.01 : 1, y: onClick ? -2 : 0 }}
        whileTap={{ scale: onClick ? 0.98 : 1 }}
        onClick={onClick}
        className={`bg-white/60 backdrop-blur-2xl rounded-3xl p-6 shadow-sm border border-white/60 flex flex-col transition-all ${onClick ? 'cursor-pointer hover:shadow-md' : ''} ${className}`}
    >
        {title && (
            <div className="flex items-center gap-2 mb-4 text-slate-500 text-sm font-semibold tracking-wide uppercase opacity-70">
                {Icon && <Icon className="w-4 h-4" />}
                <span>{title}</span>
            </div>
        )}
        {children}
    </motion.div>
);



const EnergyGraph = () => {
    const t = useTranslations('Lab.ui-showcase.bento.energy_stats');
    // Simulated path data for a smooth curve
    const path = "M0,100 C20,90 40,110 60,60 C80,10 100,40 120,45 C140,50 160,30 180,50 C200,70 220,60 240,80 C260,100 280,100 300,90";

    return (
        <div className="relative h-48 w-full mt-4 bg-indigo-50/50 rounded-2xl p-4 overflow-hidden">
            <div className="absolute top-4 right-4 flex gap-4 text-xs font-medium text-slate-500 z-10">
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-indigo-500"></span>{t('weekly')}</span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-cyan-400"></span>{t('peak')}</span>
            </div>

            <svg className="w-full h-full visible overflow-visible" preserveAspectRatio="none" viewBox="0 0 300 120">
                <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#6366f1" stopOpacity="0.3" />
                        <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
                    </linearGradient>
                </defs>
                <motion.path
                    d={`${path} L300,150 L0,150 Z`}
                    fill="url(#gradient)"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                />
                <motion.path
                    d={path}
                    fill="none"
                    stroke="#6366f1"
                    strokeWidth="3"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2, ease: "easeInOut" }}
                    strokeLinecap="round"
                />
            </svg>

            {/* Simulated Data Points */}
            <div className="absolute bottom-2 left-0 right-0 flex justify-between px-2 text-xs text-slate-400 font-medium">
                <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
            </div>
        </div>
    );
};

const SecurityFeed = ({ label, isLive }: { label: string, isLive: boolean }) => {
    const t = useTranslations('Lab.ui-showcase.bento');
    return (
        <div className="relative h-48 bg-slate-900 rounded-2xl overflow-hidden group">
            <div className="absolute inset-0 flex items-center justify-center opacity-30">
                {/* Placeholder Visual for Camera */}
                <div className="w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-700 to-slate-900 group-hover:scale-105 transition-transform duration-700"></div>
                <div className="absolute inset-0 grid grid-cols-12 grid-rows-12 opacity-20">
                    {/* Perspective Grid for depth */}
                    {[...Array(12)].map((_, i) => <div key={i} className="border-r border-white/20 h-full col-start-[auto]"></div>)}
                    {[...Array(12)].map((_, i) => <div key={i} className="border-b border-white/20 w-full row-start-[auto]"></div>)}
                </div>
            </div>

            {/* UI Overlay */}
            <div className="absolute top-3 right-3 flex gap-2">
                {isLive && (
                    <div className="bg-red-500/90 text-white text-[10px] font-bold px-2 py-0.5 rounded flex items-center gap-1 animate-pulse">
                        <span className="w-1.5 h-1.5 rounded-full bg-white"></span> {t('security_feeds.live')}
                    </div>
                )}
                <div className="bg-black/50 backdrop-blur text-white text-[10px] font-medium px-2 py-0.5 rounded">
                    1080p
                </div>
            </div>

            <div className="absolute bottom-3 left-3 bg-black/50 backdrop-blur px-2 py-1 rounded-lg">
                <div className="text-white text-xs font-medium">{label}</div>
                <div className="text-slate-300 text-[10px]">12:42:05 PM</div>
            </div>

            {/* Scanline */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent h-4 w-full animate-scan-fast pointer-events-none opacity-30" />
        </div>
    );
};

const RoomItem = ({ name, devices, icon: Icon, color }: { name: string, devices: number, icon: React.ComponentType<{ className?: string }>, color: string }) => (
    <div className="flex items-center justify-between p-4 bg-white/40 hover:bg-white/60 active:bg-white/80 transition-colors rounded-2xl cursor-pointer group">
        <div className="flex items-center gap-4">
            <div className={`w-12 h-12 rounded-2xl ${color} flex items-center justify-center text-white shadow-sm group-hover:scale-105 transition-transform`}>
                <Icon className="w-6 h-6" />
            </div>
            <div>
                <div className="font-semibold text-slate-800">{name}</div>
                <div className="text-xs text-slate-500 font-medium">{devices} Active Devices</div>
            </div>
        </div>
        <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all" />
    </div>
);

// --- Main Dashboard ---

const SmartHomeDashboard = () => {
    const t = useTranslations('Lab.ui-showcase.bento');
    const [activeTab, setActiveTab] = useState<NavItem>('home');

    const [temp, setTemp] = useState(21.5);
    const [locked, setLocked] = useState(true);
    const [dateString, setDateString] = useState<string>('');

    React.useEffect(() => {
        setDateString(new Date().toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' }));
    }, []);

    return (
        <div className="min-h-screen bg-[#F2F4F8] text-slate-800 font-sans selection:bg-indigo-100 selection:text-indigo-900 flex flex-col md:flex-row overflow-hidden relative">
            {/* Unified Back Button */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="fixed top-24 left-8 z-50 mix-blend-difference"
            >
                <Link
                    href="/lab/ui-showcase"
                    className="flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/90 hover:text-black transition-all duration-300 text-sm font-medium tracking-widest uppercase cursor-pointer"
                >
                    <ArrowLeft className="w-4 h-4" />
                    <span>{t('back')}</span>
                </Link>
            </motion.div>

            {/* Navigation */}
            <Sidebar active={activeTab} onNavigate={setActiveTab} />

            {/* Main Content Scrollable Area */}
            <main className="flex-1 h-screen overflow-y-auto overflow-x-hidden">
                <div className="max-w-7xl mx-auto p-4 md:p-8 pb-24">

                    {/* Header */}
                    <header className="flex justify-between items-end mb-8">
                        <div>
                            <motion.h1
                                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                                className="text-4xl font-bold text-slate-900 tracking-tight"
                            >
                                {t('greeting')}
                            </motion.h1>
                            <motion.p
                                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                                className="text-slate-500 font-medium mt-1"
                            >
                                {dateString || "..."} • {t('home')}
                            </motion.p>
                        </div>
                        <div className="flex gap-4">
                            <div className="hidden md:flex items-center gap-2 bg-white/60 backdrop-blur px-4 py-2 rounded-full shadow-sm border border-white/50 text-slate-600 text-sm font-medium">
                                <CloudRain className="w-4 h-4 text-blue-500" />
                                <span>{t('weather_extended.outside')}: 14°C</span>
                            </div>
                            <div className="w-12 h-12 rounded-full bg-slate-200 overflow-hidden border-2 border-white shadow-sm cursor-pointer hover:ring-2 ring-indigo-500/50 transition-all">
                                {/* Avatar placeholder */}
                                {/* <img src="..." /> */}
                                <div className="w-full h-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold">AS</div>
                            </div>
                        </div>
                    </header>

                    {/* Content Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6 grid-auto-rows-[min-content]">

                        {/* --- ROW 1: Status & Quick Controls --- */}

                        {/* Weather Card */}
                        <Card className="md:col-span-2 row-span-2 !bg-gradient-to-br !from-blue-500 !to-indigo-600 !text-white !border-none relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-32 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:translate-y-[-40%] transition-transform duration-1000"></div>
                            <div className="flex flex-col justify-between h-full relative z-10">
                                <div className="flex justify-between items-start">
                                    <div className="flex flex-col gap-1">
                                        <span className="text-blue-100 font-medium text-lg">{t('weather_extended.forecast') || "Forecast"}</span>
                                        <span className="text-sm text-blue-200">Paris, FR</span>
                                    </div>
                                    <Sun className="w-12 h-12 text-yellow-300 animate-spin-slow" />
                                </div>
                                <div className="mt-8">
                                    <div className="text-7xl font-light tracking-tighter">24°</div>
                                    <div className="flex gap-4 mt-4 text-blue-100/80 text-sm font-medium">
                                        <span className="flex items-center gap-1"><Wind className="w-3 h-3" /> 12 km/h</span>
                                        <span className="flex items-center gap-1"><Droplets className="w-3 h-3" /> 42%</span>
                                    </div>
                                </div>
                            </div>
                        </Card>

                        {/* Security Main */}
                        <Card className="md:col-span-2 row-span-1" title={t('security')} icon={Shield} onClick={() => setLocked(!locked)}>
                            <div className="flex items-center justify-between h-full">
                                <div className="space-y-1">
                                    <div className="text-2xl font-bold tracking-tight">{locked ? t('security_feeds.live') : t('security_feeds.unlocked')}</div>
                                    <div className={`text-xs font-bold uppercase tracking-wider ${locked ? 'text-green-600' : 'text-red-500'}`}>
                                        {locked ? t('security_feeds.armed') : t('security_feeds.attention')}
                                    </div>
                                </div>
                                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 shadow-md ${locked ? 'bg-green-500 text-white' : 'bg-red-100 text-red-500'}`}>
                                    {locked ? <Lock className="w-6 h-6" /> : <Unlock className="w-6 h-6" />}
                                </div>
                            </div>
                        </Card>

                        {/* Climate / Temp */}
                        <Card className="md:col-span-2 row-span-1" title={t('temperature')} icon={Thermometer}>
                            <div className="flex items-center justify-between">
                                <div>
                                    <div className="text-3xl font-bold">{temp}°C</div>
                                    <div className="text-xs text-slate-400 font-medium mt-1">{t('climate_target')}: 22°C</div>
                                </div>
                                <div className="flex gap-1 bg-slate-100 p-1 rounded-xl">
                                    <button onClick={() => setTemp(t => t - 0.5)} className="w-10 h-10 rounded-lg hover:bg-white hover:shadow-sm flex items-center justify-center transition-all">-</button>
                                    <button onClick={() => setTemp(t => t + 0.5)} className="w-10 h-10 rounded-lg hover:bg-white hover:shadow-sm flex items-center justify-center transition-all">+</button>
                                </div>
                            </div>
                        </Card>

                        {/* Rooms List */}
                        <div className="md:col-span-2 row-span-2 space-y-4">
                            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider ml-1 mb-2">{t('nav.rooms')}</h3>
                            <RoomItem name={t('rooms_list.living')} devices={4} icon={Tv} color="bg-orange-400" />
                            <RoomItem name={t('rooms_list.kitchen')} devices={2} icon={Fan} color="bg-cyan-500" />
                            <RoomItem name={t('rooms_list.office')} devices={6} icon={Router} color="bg-indigo-500" />
                        </div>

                        {/* --- ROW 2: Rich Data --- */}

                        {/* Energy Chart */}
                        <Card className="md:col-span-4 row-span-2" title={t('energy')} icon={Zap}>
                            <div className="flex items-end gap-4 mb-2">
                                <div>
                                    <div className="text-4xl font-bold text-slate-900">24.5 <span className="text-lg text-slate-400 font-normal">kWh</span></div>
                                    <div className="text-green-500 text-sm font-bold flex items-center gap-1 mt-1">
                                        <span className="bg-green-100 px-1.5 py-0.5 rounded">-12%</span> {t('energy_stats.vs_last_week')}
                                    </div>
                                </div>
                            </div>
                            <EnergyGraph />
                        </Card>

                        {/* --- ROW 3: Security Feeds below weather --- */}

                        <div className="md:col-span-2 space-y-3">
                            <div className="flex justify-between items-center mb-1">
                                <span className="text-sm font-bold text-slate-400 uppercase tracking-wider">{t('security_feeds.cameras') || "Cameras"}</span>
                                <span className="text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded font-bold">{t('security_feeds.recording')}</span>
                            </div>
                            <SecurityFeed label={t('security_feeds.front_door')} isLive={true} />
                            <SecurityFeed label={t('security_feeds.backyard')} isLive={false} />
                        </div>

                        {/* Music Player Extended */}
                        <Card className="md:col-span-2 lg:col-span-4 row-span-1" title={t('music')} icon={Music}>
                            <div className="flex items-center gap-6">
                                <div className="w-20 h-20 bg-slate-900 rounded-2xl relative overflow-hidden flex-shrink-0 shadow-lg group cursor-pointer">
                                    <div className="absolute inset-0 bg-gradient-to-br from-violet-600 to-fuchsia-600 group-hover:scale-110 transition-transform duration-500"></div>
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <Music className="w-8 h-8 text-white/50" />
                                    </div>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="text-lg font-bold text-slate-800 truncate">{t('song')}</div>
                                    <div className="text-slate-500 font-medium">{t('artist')}</div>
                                    {/* Progress Bar */}
                                    <div className="mt-4 h-1.5 bg-slate-100 rounded-full overflow-hidden w-full">
                                        <motion.div
                                            className="h-full bg-slate-800 rounded-full"
                                            initial={{ width: "30%" }}
                                            animate={{ width: "45%" }}
                                            transition={{ duration: 10, ease: "linear" }}
                                        />
                                    </div>
                                    <div className="flex justify-between text-[10px] text-slate-400 mt-1 font-medium">
                                        <span>1:24</span>
                                        <span>3:42</span>
                                    </div>
                                </div>
                                <div className="flex gap-4 pr-4">
                                    <button className="w-10 h-10 rounded-full bg-slate-100 hover:bg-white hover:shadow-md flex items-center justify-center transition-all">
                                        <div className="w-3 h-3 bg-slate-800" style={{ clipPath: "polygon(0 0, 100% 50%, 0 100%)" }}></div>
                                    </button>
                                </div>
                            </div>
                        </Card>

                    </div>
                </div>
            </main>

        </div>
    );
};

export default SmartHomeDashboard;
