'use client'
import { motion, AnimatePresence } from 'framer-motion'
import { Achievement } from '@/lib/achievements'
import { Trophy } from 'lucide-react'

export default function AchievementToast({ achievement, visible, onClose }: { achievement: Achievement | null, visible: boolean, onClose: () => void }) {
    return (
        <AnimatePresence>
            {visible && achievement && (
                <motion.div
                    initial={{ y: 100, opacity: 0, scale: 0.8 }}
                    animate={{ y: 0, opacity: 1, scale: 1 }}
                    exit={{ y: 100, opacity: 0, scale: 0.8 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    className="fixed bottom-8 right-8 z-[100] flex items-center gap-4 bg-zinc-900 border border-zinc-800 p-4 rounded-lg shadow-2xl w-80 cursor-pointer hover:bg-zinc-800 transition-colors"
                    onClick={onClose}
                >
                    <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center text-2xl shrink-0">
                        {achievement.icon || <Trophy className="text-primary" />}
                    </div>
                    <div className="flex flex-col">
                        <span className="text-xs font-bold text-primary uppercase tracking-widest">Achievement Unlocked</span>
                        <h4 className="text-sm font-bold text-white shadow-black drop-shadow-md">{achievement.title}</h4>
                        <p className="text-xs text-zinc-400">{achievement.description}</p>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
