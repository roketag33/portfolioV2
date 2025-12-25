import { motion } from 'framer-motion'
import { Dumbbell, Gamepad2, Cpu, Atom, UtensilsCrossed } from 'lucide-react'
import { cn } from '@/lib/utils'

// --- DATA ---
const PASSIONS = [
    {
        id: 'sport',
        title: "Sport & Combat",
        icon: Dumbbell,
        color: "text-red-500",
        bg: "bg-red-500/10",
        desc: "Passionné par l'intensité et la discipline.",
        tags: ["Streetlifting", "Powerlifting", "MMA", "Boxe Anglaise", "Muay Thaï", "Bodybuilding"]
    },
    {
        id: 'gaming',
        title: "Gaming",
        icon: Gamepad2,
        color: "text-purple-500",
        bg: "bg-purple-500/10",
        desc: "Immersion dans des univers complexes.",
        tags: ["RPG", "Rogue-like", "FPS Compétitif", "Indie Gems"]
    },
    {
        id: 'tech',
        title: "Tech",
        icon: Cpu,
        color: "text-blue-500",
        bg: "bg-blue-500/10",
        desc: "L'écosystème numérique dans son ensemble.",
        tags: ["IoT", "Hardware", "Self-host", "IA & LLMs", "Dev", "Ops", "Robotique"]
    },
    {
        id: 'science',
        title: "Sciences",
        icon: Atom,
        color: "text-cyan-500",
        bg: "bg-cyan-500/10",
        desc: "Comprendre les lois fondamentales.",
        tags: ["Physique", "Chimie", "Science de la nutrition"]
    },
    {
        id: 'food',
        title: "Cuisine",
        icon: UtensilsCrossed,
        color: "text-orange-500",
        bg: "bg-orange-500/10",
        desc: "La chimie au service du goût.",
        tags: ["Pâtisserie", "MicroNutrition", "MacroNutrition"]
    }
]

// --- PASSIONS SECTION (Neon Bento) ---
// --- PASSIONS SECTION (Neon Bento) ---
import { useGamification } from '@/context/GamificationContext'
import { useState } from 'react'

function PassionsGrid() {
    const { unlock } = useGamification()
    const [gymReps, setGymReps] = useState(0)
    const [retroMode, setRetroMode] = useState(false)

    const handleCardClick = (id: string) => {
        if (id === 'sport') {
            const newReps = gymReps + 1
            setGymReps(newReps)
            if (newReps >= 10) {
                unlock('GYM_RAT')
            }
        }
        if (id === 'gaming') {
            const newMode = !retroMode
            setRetroMode(newMode)
            if (newMode) unlock('RETRO_VISION')
        }
    }

    return (
        <div className="w-full">
            <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
                {PASSIONS.map((item, i) => {
                    const isRetro = retroMode && item.id === 'gaming'
                    const isGym = item.id === 'sport'

                    return (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            onClick={() => handleCardClick(item.id)}
                            whileTap={isGym ? { scale: 0.95 } : undefined}
                            className={cn(
                                "relative overflow-hidden rounded-3xl border border-white/5 bg-neutral-900/40 p-6 group hover:bg-neutral-900/60 transition-all cursor-pointer select-none",
                                i === 0 || i === 1 ? "md:col-span-3" : "md:col-span-2",
                                isRetro && "font-mono border-green-500/50 bg-black",
                                isGym && gymReps > 0 && "active:border-red-500/50"
                            )}
                            style={isRetro ? { imageRendering: 'pixelated' } : undefined}
                        >
                            {/* Glow Effect */}
                            {!isRetro && (
                                <div className={cn("absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 bg-gradient-to-br", item.color.replace('text-', 'from-'), "to-transparent")} />
                            )}
                            {isRetro && (
                                <div className="absolute inset-0 bg-green-900/10 pointer-events-none" style={{ backgroundImage: 'linear-gradient(transparent 50%, rgba(0, 50, 0, 0.5) 50%)', backgroundSize: '100% 4px' }} />
                            )}

                            {/* Border Glow */}
                            <div className={cn("absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 border-2", item.color.replace('text-', 'border-').replace('500', '500/20'))} />

                            <div className="relative z-10 flex flex-col h-full">
                                <div className="flex justify-between items-start">
                                    <div className={cn(
                                        "w-12 h-12 rounded-2xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110",
                                        item.bg,
                                        item.color,
                                        isRetro && "rounded-none bg-green-700 text-black animate-pulse"
                                    )}>
                                        <item.icon size={24} />
                                    </div>

                                    {isGym && gymReps > 0 && (
                                        <motion.span
                                            key={gymReps}
                                            initial={{ scale: 1.5, opacity: 0 }}
                                            animate={{ scale: 1, opacity: 1 }}
                                            className="font-black text-red-500 text-xl font-mono"
                                        >
                                            {gymReps}
                                        </motion.span>
                                    )}
                                </div>

                                <h3 className={cn("text-xl font-bold mb-2 text-white group-hover:translate-x-1 transition-transform", isRetro && "uppercase tracking-widest text-green-500")}>
                                    {item.title}
                                </h3>
                                <p className={cn("text-sm text-neutral-300 mb-4 font-medium", isRetro && "text-green-400/70")}>
                                    {item.desc}
                                </p>
                                <div className="flex flex-wrap gap-2 mt-auto">
                                    {item.tags.map(tag => (
                                        <span key={tag} className={cn(
                                            "text-[10px] uppercase font-bold px-2 py-1 rounded bg-white/10 text-white/90 border border-white/10 group-hover:border-white/20 transition-colors",
                                            isRetro && "rounded-none border-green-500/50 bg-black text-green-500"
                                        )}>
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    )
                })}
            </div>
        </div>
    )
}

export default function PassionsSection() {
    return (
        <PassionsGrid />
    )
}
