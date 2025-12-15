'use client'
import { motion } from 'framer-motion'
import { useGamification } from '@/context/GamificationContext'
import { ACHIEVEMENTS } from '@/lib/achievements'
import { Badge } from '@/components/ui/badge'
import { Lock, Trophy } from 'lucide-react'

export default function AchievementsPage() {
    const { unlocked, score } = useGamification()
    const list = Object.values(ACHIEVEMENTS)

    return (
        <main className="min-h-screen pt-24 pb-20 px-6 bg-background text-foreground">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-12 flex items-center justify-between"
                >
                    <div>
                        <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">
                            Achievements
                        </h1>
                        <p className="text-muted-foreground mt-2">
                            Unlocked: {unlocked.length} / {list.length} • Total XP: {score}
                        </p>
                    </div>
                    <div className="text-right hidden md:block">
                        <div className="text-6xl font-black text-primary">{Math.round((unlocked.length / list.length) * 100)}%</div>
                        <span className="text-xs uppercase tracking-widest opacity-50">Completion</span>
                    </div>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {list.map((achievement, i) => {
                        const isUnlocked = unlocked.includes(achievement.id)
                        const isSecret = achievement.secret && !isUnlocked

                        return (
                            <motion.div
                                key={achievement.id}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: i * 0.05 }}
                                className={`relative p-6 rounded-xl border ${isUnlocked ? 'border-primary/50 bg-primary/5' : 'border-zinc-800 bg-zinc-900/50'} overflow-hidden group`}
                            >
                                <div className="flex items-start justify-between mb-4">
                                    <div className={`h-12 w-12 rounded-full flex items-center justify-center text-2xl ${isUnlocked ? 'bg-primary/20' : 'bg-zinc-800'}`}>
                                        {isUnlocked ? achievement.icon : <Lock className="w-5 h-5 text-zinc-600" />}
                                    </div>
                                    <Badge variant={isUnlocked ? "default" : "outline"} className="opacity-50">
                                        {achievement.xp} XP
                                    </Badge>
                                </div>

                                <h3 className={`text-xl font-bold mb-2 ${isUnlocked ? 'text-foreground' : 'text-zinc-500'}`}>
                                    {isSecret ? '???' : achievement.title}
                                </h3>
                                <p className={`text-sm ${isUnlocked ? 'text-foreground/70' : 'text-zinc-600'}`}>
                                    {isSecret ? 'This achievement is hidden.' : achievement.description}
                                </p>

                                {isUnlocked && (
                                    <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                                )}
                            </motion.div>
                        )
                    })}
                </div>
            </div>
        </main>
    )
}
