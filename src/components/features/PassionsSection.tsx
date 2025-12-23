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
function PassionsGrid() {
    return (
        <div className="w-full">
            <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
                {PASSIONS.map((item, i) => (
                    <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className={cn(
                            "relative overflow-hidden rounded-3xl border border-white/5 bg-neutral-900/40 p-6 group hover:bg-neutral-900/60 transition-colors",
                            i === 0 || i === 1 ? "md:col-span-3" : "md:col-span-2"
                        )}
                    >
                        {/* Glow Effect - ensuring 'from-color' works for all */}
                        <div className={cn("absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 bg-gradient-to-br", item.color.replace('text-', 'from-'), "to-transparent")} />

                        {/* Interactive Border Glow (optional, if enabled) */}
                        <div className={cn("absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 border-2", item.color.replace('text-', 'border-').replace('500', '500/20'))} />

                        <div className="relative z-10">
                            <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110", item.bg, item.color)}>
                                <item.icon size={24} />
                            </div>
                            <h3 className="text-xl font-bold mb-2 text-white group-hover:translate-x-1 transition-transform">{item.title}</h3>
                            <p className="text-sm text-neutral-300 mb-4 font-medium">{item.desc}</p>
                            <div className="flex flex-wrap gap-2">
                                {item.tags.map(tag => (
                                    <span key={tag} className="text-[10px] uppercase font-bold px-2 py-1 rounded bg-white/10 text-white/90 border border-white/10 group-hover:border-white/20 transition-colors">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    )
}

export default function PassionsSection() {
    return (
        <PassionsGrid />
    )
}
