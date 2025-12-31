'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'
import { ArrowLeft, TrendingUp, TrendingDown, Bitcoin, Activity, Zap, Coins, Globe } from 'lucide-react'
import Link from 'next/link'

// Type for the price data point
type PricePoint = {
    time: string
    price: number
}

const COINS = [
    {
        symbol: 'btcusdt',
        name: 'Bitcoin',
        display: 'BTC',
        icon: Bitcoin,
        gradientFrom: 'from-orange-500',
        gradientTo: 'to-yellow-500'
    },
    {
        symbol: 'ethusdt',
        name: 'Ethereum',
        display: 'ETH',
        icon: Activity,
        gradientFrom: 'from-indigo-500',
        gradientTo: 'to-purple-500'
    },
    {
        symbol: 'solusdt',
        name: 'Solana',
        display: 'SOL',
        icon: Zap,
        gradientFrom: 'from-emerald-500',
        gradientTo: 'to-teal-500'
    },
    {
        symbol: 'bnbusdt',
        name: 'Binance Coin',
        display: 'BNB',
        icon: Coins,
        gradientFrom: 'from-yellow-500',
        gradientTo: 'to-amber-500'
    },
    {
        symbol: 'xrpusdt',
        name: 'Ripple',
        display: 'XRP',
        icon: Globe,
        gradientFrom: 'from-blue-500',
        gradientTo: 'to-cyan-500'
    }
]

export default function CryptoDashboard() {
    const [selectedCoin, setSelectedCoin] = useState(COINS[0])
    const [data, setData] = useState<PricePoint[]>([])
    const [currentPrice, setCurrentPrice] = useState(0)
    const [prevPrice, setPrevPrice] = useState(0)
    const [status, setStatus] = useState<'connecting' | 'connected' | 'error'>('connecting')
    const ws = useRef<WebSocket | null>(null)

    useEffect(() => {
        // Reset state on coin change
        setData([])
        setStatus('connecting')
        setPrevPrice(0)
        setCurrentPrice(0)

        // Connect to Binance WebSocket
        ws.current = new WebSocket(`wss://stream.binance.com:9443/ws/${selectedCoin.symbol}@trade`)

        ws.current.onopen = () => {
            setStatus('connected')
        }

        ws.current.onmessage = (event) => {
            const message = JSON.parse(event.data)
            const price = parseFloat(message.p)
            const time = new Date(message.T).toLocaleTimeString()

            setCurrentPrice(prev => {
                setPrevPrice(prev)
                return price
            })

            setData(prevData => {
                const newData = [...prevData, { time, price }]
                // Keep only last 50 points
                if (newData.length > 50) return newData.slice(newData.length - 50)
                return newData
            })
        }

        ws.current.onerror = () => {
            setStatus('error')
        }

        return () => {
            ws.current?.close()
        }
    }, [selectedCoin])

    const isUp = currentPrice >= prevPrice
    const diff = currentPrice - prevPrice
    const diffPercent = prevPrice !== 0 ? ((diff / prevPrice) * 100).toFixed(4) : '0.00'
    const CurrentIcon = selectedCoin.icon

    return (
        <main className="min-h-screen bg-[#0f172a] text-white flex flex-col relative overflow-hidden font-sans selection:bg-cyan-500/30">
            {/* Background Gradients */}
            <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[128px]" />
            <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-cyan-600/20 rounded-full blur-[128px]" />

            {/* Nav */}
            <nav className="p-6 relative z-10 flex justify-between items-center backdrop-blur-sm bg-white/5 border-b border-white/10">
                <Link href="/lab" className="flex items-center gap-2 text-sm text-neutral-400 hover:text-white transition-colors">
                    <ArrowLeft className="w-4 h-4" />
                    Back to Lab
                </Link>
                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-black/40 border border-white/10 text-xs font-mono">
                    <div className={`w-2 h-2 rounded-full ${status === 'connected' ? 'bg-emerald-500 animate-pulse' : 'bg-red-500'}`} />
                    {status === 'connected' ? `LIVE FEED: ${selectedCoin.display}` : 'CONNECTING...'}
                </div>
            </nav>

            {/* Dashboard Content */}
            <div className="flex-1 flex flex-col md:flex-row gap-6 p-4 md:p-8 relative z-10 max-w-7xl mx-auto w-full">

                {/* Coin Selector Sidebar */}
                <div className="w-full md:w-64 flex flex-col gap-3">
                    {COINS.map(coin => (
                        <button
                            key={coin.symbol}
                            onClick={() => setSelectedCoin(coin)}
                            className={`flex items-center gap-3 p-4 rounded-2xl transition-all duration-300 border ${selectedCoin.symbol === coin.symbol
                                    ? 'bg-white/10 border-white/20 shadow-lg scale-105'
                                    : 'bg-white/5 border-transparent hover:bg-white/10'
                                }`}
                        >
                            <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${coin.gradientFrom} ${coin.gradientTo} flex items-center justify-center`}>
                                <coin.icon className="w-5 h-5 text-white" />
                            </div>
                            <div className="text-left">
                                <div className="font-bold text-sm tracking-wide">{coin.name}</div>
                                <div className="text-xs text-neutral-500 font-mono">{coin.display}</div>
                            </div>
                        </button>
                    ))}
                </div>

                {/* Main View */}
                <motion.div
                    layout
                    className="flex-1 bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-6 md:p-10 shadow-2xl"
                >
                    {/* Header Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                        <div className="flex items-center gap-4">
                            <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${selectedCoin.gradientFrom} ${selectedCoin.gradientTo} flex items-center justify-center shadow-lg shadow-orange-500/20`}>
                                <CurrentIcon className="w-10 h-10 text-white" />
                            </div>
                            <div>
                                <h2 className="text-3xl font-bold tracking-tight">{selectedCoin.name}</h2>
                                <span className="text-neutral-400 font-mono">{selectedCoin.display}/USDT</span>
                            </div>
                        </div>

                        {/* Price Display */}
                        <div className="flex flex-col md:items-end justify-center">
                            <motion.div
                                key={currentPrice}
                                initial={{ opacity: 0.5, y: -5 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-5xl md:text-7xl font-mono font-bold tracking-tighter"
                            >
                                ${currentPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                            </motion.div>
                            <div className={`flex items-center gap-2 mt-2 text-lg font-medium px-4 py-1 rounded-full w-fit ${isUp ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'}`}>
                                {isUp ? <TrendingUp className="w-5 h-5" /> : <TrendingDown className="w-5 h-5" />}
                                <span>{diff > 0 ? '+' : ''}{diff.toFixed(2)} ({diffPercent}%)</span>
                            </div>
                        </div>
                    </div>

                    {/* Chart Area */}
                    <div className="h-[400px] w-full bg-black/20 rounded-2xl border border-white/5 p-4 relative overflow-hidden">
                        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={data}>
                                <defs>
                                    <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor={isUp ? '#10b981' : '#f43f5e'} stopOpacity={0.3} />
                                        <stop offset="95%" stopColor={isUp ? '#10b981' : '#f43f5e'} stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                                <XAxis
                                    dataKey="time"
                                    stroke="#64748b"
                                    tick={{ fontSize: 12 }}
                                    tickLine={false}
                                    axisLine={false}
                                    minTickGap={30}
                                />
                                <YAxis
                                    domain={['auto', 'auto']}
                                    stroke="#64748b"
                                    tick={{ fontSize: 12 }}
                                    tickFormatter={(value) => `$${value.toLocaleString()}`}
                                    tickLine={false}
                                    axisLine={false}
                                    width={80}
                                />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#0f172a', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '12px' }}
                                    itemStyle={{ color: '#fff' }}
                                    formatter={(value: number | undefined) => [`$${(value || 0).toFixed(2)}`, 'Price']}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="price"
                                    stroke={isUp ? '#10b981' : '#f43f5e'}
                                    strokeWidth={3}
                                    fillOpacity={1}
                                    fill="url(#colorPrice)"
                                    animationDuration={500}
                                    isAnimationActive={true}
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </motion.div>
            </div>
        </main>
    )
}
