"use client";

import React from 'react';
import { motion, Variants } from 'framer-motion';
import { } from 'lucide-react';
import { useTranslations } from 'next-intl';
// import Image from 'next/image';

// --- Types ---
type Transaction = {
    id: number;
    nameId: string; // Key for translation
    date: string;
    amount: string;
    type: 'debit' | 'credit';
    icon: string;
};

export default function FintechDashboard() {
    const t = useTranslations('Lab.ui-showcase.fintech');

    // --- Data (Moved inside component for t()) ---
    const data = [
        { name: 'Jan', value: 65 },
        { name: 'Feb', value: 59 },
        { name: 'Mar', value: 80 },
        { name: 'Apr', value: 81 },
        { name: 'May', value: 56 },
        { name: 'Jun', value: 55 },
        { name: 'Jul', value: 40 },
    ];

    const transactions: Transaction[] = [
        { id: 1, nameId: 'apple', date: t('dates.today') + ', 10:45 AM', amount: '-$120.50', type: 'debit', icon: '🍎' },
        { id: 2, nameId: 'salary', date: t('dates.yesterday') + ', 9:00 AM', amount: '+$4,500.00', type: 'credit', icon: '💰' },
        { id: 3, nameId: 'uber', date: t('dates.yesterday') + ', 8:30 PM', amount: '-$24.00', type: 'debit', icon: '🚗' },
        { id: 4, nameId: 'netflix', date: 'Oct 24, 2025', amount: '-$15.00', type: 'debit', icon: '🎬' },
    ];

    const marketData = [65, 45, 75, 55, 85, 65, 95];

    // Animation Variants
    const fadeInUp: Variants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
    };

    const stagger: Variants = {
        visible: { transition: { staggerChildren: 0.1 } }
    };

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white font-sans selection:bg-emerald-500/30 pt-20">
            {/* Nav */}
            <nav className="flex items-center justify-between px-6 py-6 sticky top-0 bg-[#0a0a0a]/80 backdrop-blur-md z-40 border-b border-white/5">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center font-bold">N</div>
                    <span className="font-bold tracking-tight">NeoBank</span>
                </div>
                <div className="hidden md:flex gap-8 text-sm text-neutral-400 font-medium">
                    <a href="#" className="text-white">Dashboard</a>
                    <a href="#" className="hover:text-white transition-colors">Transactions</a>
                    <a href="#" className="hover:text-white transition-colors">Cards</a>
                    <a href="#" className="hover:text-white transition-colors">Investments</a>
                </div>
                <div className="w-10 h-10 rounded-full bg-neutral-800 border border-white/10" />
            </nav>

            <main className="p-4 md:p-8 max-w-7xl mx-auto space-y-8">
                {/* Hero Section */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Balance Card */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={stagger}
                        className="lg:col-span-2 space-y-8"
                    >
                        <motion.div variants={fadeInUp}>
                            <h1 className="text-3xl md:text-4xl font-light text-neutral-400 mb-2">{t('welcome')}, Alexandre</h1>
                            <p className="text-neutral-500 text-sm md:text-base">{t('dates.today')}</p>
                        </motion.div>

                        <motion.div variants={fadeInUp} className="p-6 md:p-8 rounded-3xl bg-gradient-to-br from-neutral-900 to-neutral-900/50 border border-white/5 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 group-hover:bg-emerald-500/20 transition-all duration-700" />

                            <div className="relative z-10">
                                <p className="text-neutral-400 mb-4 font-medium flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                                    {t('total_balance')}
                                </p>
                                <h2 className="text-5xl md:text-7xl font-bold tracking-tighter mb-8">
                                    $42,593<span className="text-emerald-500/50 text-3xl md:text-5xl">.00</span>
                                </h2>

                                <div className="flex flex-col sm:flex-row gap-4 sm:items-center">
                                    <button className="px-6 py-3 bg-white text-black rounded-xl font-bold hover:scale-105 active:scale-95 transition-all text-sm md:text-base">
                                        {t('transfer')}
                                    </button>
                                    <button className="px-6 py-3 bg-white/5 text-white border border-white/10 rounded-xl font-medium hover:bg-white/10 transition-all text-sm md:text-base">
                                        {t('request')}
                                    </button>
                                </div>
                            </div>
                        </motion.div>

                        {/* Chart Area */}
                        <motion.div variants={fadeInUp} className="p-6 md:p-8 rounded-3xl bg-neutral-900/50 border border-white/5 min-h-[300px] md:min-h-[400px]">
                            <div className="flex items-center justify-between mb-8">
                                <h3 className="text-xl font-semibold">{t('spending_overview')}</h3>
                                <div className="flex gap-2">
                                    {['1D', '1W', '1M', '1Y'].map((period) => (
                                        <button
                                            key={period}
                                            className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${period === '1M' ? 'bg-emerald-500/20 text-emerald-400' : 'text-neutral-500 hover:text-white'
                                                }`}
                                        >
                                            {period}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="h-48 md:h-64 flex items-end justify-between gap-1 md:gap-2">
                                {data.map((d, i) => (
                                    <div key={i} className="flex-1 flex flex-col justify-end group relative">
                                        <div
                                            className="w-full bg-emerald-500/20 rounded-t-sm group-hover:bg-emerald-400 transition-all duration-300 relative overflow-hidden"
                                            style={{ height: `${d.value}%` }}
                                        >
                                            <div className="absolute inset-x-0 bottom-0 h-full bg-gradient-to-t from-emerald-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                        </div>
                                        <p className="text-center text-[10px] md:text-xs text-neutral-500 mt-2 opacity-50 group-hover:opacity-100 transition-opacity">
                                            {t(`months.${d.name.toLowerCase()}`)}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Right Column */}
                    <div className="space-y-8">
                        {/* Cards */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="p-1 rounded-3xl bg-gradient-to-b from-white/10 to-transparent"
                        >
                            <div className="p-6 md:p-8 rounded-[22px] bg-neutral-900 backdrop-blur-xl relative overflow-hidden h-64 md:h-80 flex flex-col justify-between group">
                                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 via-blue-500/10 to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-700" />

                                <div className="relative z-10 flex justify-between items-start">
                                    <div className="w-12 h-8 rounded border border-white/20 flex items-center justify-center">
                                        <div className="w-6 h-6 rounded-full bg-white/20 -ml-3" />
                                        <div className="w-6 h-6 rounded-full bg-white/20 -ml-3" />
                                    </div>
                                    <span className="font-mono text-white/50">{t('virtual')}</span>
                                </div>

                                <div className="relative z-10">
                                    <p className="font-mono text-lg md:text-xl tracking-widest mb-4">**** **** **** 4289</p>
                                    <div className="flex justify-between items-end">
                                        <div>
                                            <p className="text-xs text-neutral-500 uppercase mb-1">Card Holder</p>
                                            <p className="font-medium">ALEXANDRE S.</p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-neutral-500 uppercase mb-1">Expires</p>
                                            <p className="font-medium">12/28</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Recent Transactions */}
                        <div className="p-6 md:p-8 rounded-3xl bg-neutral-900/50 border border-white/5">
                            <h3 className="text-xl font-semibold mb-6">{t('recent_transactions')}</h3>
                            <motion.div
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                variants={stagger}
                                className="space-y-4"
                            >
                                {transactions.map((tx) => (
                                    <motion.div variants={fadeInUp} key={tx.id} className="flex items-center justify-between group cursor-pointer hover:bg-white/5 p-2 md:p-0 rounded-xl md:rounded-none -mx-2 md:mx-0 transition-colors">
                                        <div className="flex items-center gap-3 md:gap-4">
                                            <div className="w-10 h-10 rounded-full bg-white/5 border border-white/5 flex items-center justify-center text-lg group-hover:bg-white/10 transition-colors shrink-0">
                                                {tx.icon}
                                            </div>
                                            <div className="min-w-0">
                                                <p className="font-medium text-white truncate">{t(`tx_types.${tx.nameId}`)}</p>
                                                <p className="text-xs text-neutral-400">{tx.date}</p>
                                            </div>
                                        </div>
                                        <p className={`font-medium whitespace-nowrap ${tx.type === 'debit' ? 'text-white' : 'text-emerald-400'}`}>
                                            {tx.amount}
                                        </p>
                                    </motion.div>
                                ))}
                            </motion.div>
                        </div >
                    </div >
                </div >

                {/* Market Trends (Scroll Reveal) */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-8">
                    <div className="p-6 rounded-2xl bg-neutral-900/30 border border-white/5">
                        <h4 className="text-sm font-medium text-neutral-400 mb-2">{t('market_trends')}</h4>
                        <div className="flex items-end gap-2 h-16">
                            {marketData.map((d, i) => (
                                <div key={i} className="flex-1 bg-emerald-500/20 rounded-sm hover:bg-emerald-500 transition-colors" style={{ height: `${d}%` }} />
                            ))}
                        </div>
                    </div>
                </div >

                {/* Why Us Section */}
                < div className="py-20 border-t border-white/5" >
                    <div className="text-center mb-16">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="text-3xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-neutral-500 bg-clip-text text-transparent"
                        >
                            {t('why_us.title')}
                        </motion.h2>
                    </div>

                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={stagger}
                        className="grid grid-cols-1 md:grid-cols-3 gap-8"
                    >
                        {[1, 2, 3].map((item) => (
                            <motion.div variants={fadeInUp} key={item} className="p-8 rounded-3xl bg-neutral-900/50 border border-white/5 hover:border-emerald-500/30 transition-colors group">
                                <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-2xl mb-6 text-emerald-500 group-hover:scale-110 transition-transform">
                                    {['⚡️', '🛡️', '🌍'][item - 1]}
                                </div>
                                <h3 className="text-xl font-bold mb-4">{t(`why_us.f${item}`)}</h3>
                                <p className="text-neutral-400 leading-relaxed">
                                    {t(`why_us.d${item}`)}
                                </p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div >

                {/* CTA */}
                < motion.div
                    initial={{ opacity: 0, y: 50 }
                    }
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
                    className="rounded-[40px] bg-gradient-to-r from-emerald-600 to-emerald-900 p-8 md:p-12 text-center relative overflow-hidden"
                >
                    <div className="relative z-10">
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">{t('cta.title')}</h2>
                        <button className="px-8 py-4 bg-white text-black rounded-2xl font-bold hover:scale-105 transition-transform shadow-xl">
                            {t('cta.button')}
                        </button>
                    </div>
                    <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
                </motion.div >
            </main >
        </div >
    );
}
