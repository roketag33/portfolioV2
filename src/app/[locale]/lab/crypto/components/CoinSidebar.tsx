import React from 'react'
import { Bitcoin, Activity, Zap, Coins, Globe, LucideIcon } from 'lucide-react'

export type Coin = {
    symbol: string
    name: string
    display: string
    icon: LucideIcon
    gradientFrom: string
    gradientTo: string
}

export const COINS: Coin[] = [
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

interface CoinSidebarProps {
    selectedCoin: Coin
    onSelectCoin: (coin: Coin) => void
}

export default function CoinSidebar({ selectedCoin, onSelectCoin }: CoinSidebarProps) {
    return (
        <div className="w-full md:w-64 flex flex-col gap-3">
            {COINS.map(coin => (
                <button
                    key={coin.symbol}
                    onClick={() => onSelectCoin(coin)}
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
    )
}
