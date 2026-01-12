'use client';

import { motion } from 'framer-motion';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { ArrowUpRight, ArrowDownLeft, Wallet, CreditCard, MoreHorizontal, Bell } from 'lucide-react';
import { useTranslations } from 'next-intl';

const data = [
    { name: 'Mon', value: 4000 },
    { name: 'Tue', value: 3000 },
    { name: 'Wed', value: 5000 },
    { name: 'Thu', value: 2780 },
    { name: 'Fri', value: 1890 },
    { name: 'Sat', value: 2390 },
    { name: 'Sun', value: 3490 },
];

const transactions = [
    { id: 1, name: 'Apple Store', date: 'Today, 10:45 AM', amount: '-$120.50', type: 'debit', icon: '🍎' },
    { id: 2, name: 'Salary Deposit', date: 'Yesterday, 9:00 AM', amount: '+$4,500.00', type: 'credit', icon: '💰' },
    { id: 3, name: 'Uber Limit', date: 'Yesterday, 8:30 PM', amount: '-$24.00', type: 'debit', icon: '🚗' },
    { id: 4, name: 'Netflix', date: 'Oct 24, 2025', amount: '-$15.00', type: 'debit', icon: '🎬' },
];

export default function FintechDashboard() {
    const t = useTranslations('Lab.ui-showcase.fintech');

    return (
        <div className="w-full h-full min-h-screen bg-[#0f172a] text-white font-sans p-4 md:p-8 flex items-center justify-center overflow-hidden relative">
            {/* Background Gradients */}
            <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-[120px] mix-blend-screen animate-pulse" />
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-[120px] mix-blend-screen animate-pulse delay-1000" />

            <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-3 gap-6 relative z-10">

                {/* Left Column: Main Card & Chart */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Header */}
                    <header className="flex justify-between items-center mb-8">
                        <div>
                            <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-neutral-400">
                                {t('title')}
                            </h1>
                            <p className="text-sm text-neutral-400">Welcome back, Alexandre</p>
                        </div>
                        <button className="p-2 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 transition-colors">
                            <Bell className="w-5 h-5 text-neutral-300" />
                        </button>
                    </header>

                    {/* Glass Card - Balance */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 relative overflow-hidden group"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="relative z-10 flex justify-between items-start">
                            <div>
                                <p className="text-neutral-400 mb-2">{t('card_balance')}</p>
                                <h2 className="text-5xl font-bold tracking-tight">$24,562.00</h2>
                                <div className="flex items-center gap-2 mt-4 text-emerald-400 bg-emerald-400/10 px-3 py-1 rounded-full w-fit">
                                    <ArrowUpRight className="w-4 h-4" />
                                    <span className="text-sm font-medium">+2.5% this week</span>
                                </div>
                            </div>
                            <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-2xl flex items-center justify-center shadow-lg shadow-cyan-500/20">
                                <Wallet className="w-6 h-6 text-white" />
                            </div>
                        </div>
                    </motion.div>

                    {/* Chart Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 h-[300px]"
                    >
                        <h3 className="text-lg font-semibold mb-6">Spending Overview</h3>
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={data}>
                                <defs>
                                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', borderRadius: '12px', color: '#fff' }}
                                    itemStyle={{ color: '#fff' }}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="value"
                                    stroke="#06b6d4"
                                    strokeWidth={3}
                                    fillOpacity={1}
                                    fill="url(#colorValue)"
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </motion.div>
                </div>

                {/* Right Column: Cards & Transactions */}
                <div className="space-y-6">
                    {/* Virtual Card */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="h-[220px] w-full bg-gradient-to-br from-[#1e293b] to-[#0f172a] rounded-3xl p-6 relative overflow-hidden border border-white/10 shadow-2xl"
                        style={{
                            backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")',
                        }}
                    >
                        {/* Mesh Gradient Emulation */}
                        <div className="absolute top-[-50%] right-[-50%] w-[100%] h-[100%] bg-purple-500/40 blur-[60px] rounded-full" />
                        <div className="absolute bottom-[-20%] left-[-20%] w-[80%] h-[80%] bg-cyan-500/40 blur-[60px] rounded-full" />

                        <div className="relative z-10 flex flex-col justify-between h-full">
                            <div className="flex justify-between items-center">
                                <span className="font-mono text-white/60">VIRTUAL</span>
                                <CreditCard className="w-6 h-6 text-white/80" />
                            </div>
                            <div>
                                <p className="font-mono text-xl tracking-widest text-white mb-2">**** **** **** 4289</p>
                                <div className="flex justify-between items-end">
                                    <div>
                                        <p className="text-xs text-white/40 uppercase mb-1">Card Holder</p>
                                        <p className="font-medium text-white">ALEXANDRE S.</p>
                                    </div>
                                    <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md" />
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Recent Transactions */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6"
                    >
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-lg font-semibold">{t('transactions')}</h3>
                            <button className="text-sm text-neutral-400 hover:text-white transition-colors">See all</button>
                        </div>

                        <div className="space-y-4">
                            {transactions.map((tx, i) => (
                                <div key={tx.id} className="flex items-center justify-between group cursor-pointer">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-full bg-white/5 border border-white/5 flex items-center justify-center text-lg group-hover:bg-white/10 transition-colors">
                                            {tx.icon}
                                        </div>
                                        <div>
                                            <p className="font-medium text-white">{tx.name}</p>
                                            <p className="text-xs text-neutral-400">{tx.date}</p>
                                        </div>
                                    </div>
                                    <p className={`font-medium ${tx.type === 'debit' ? 'text-white' : 'text-emerald-400'}`}>
                                        {tx.amount}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>

            </div>
        </div>
    );
}
