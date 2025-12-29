import { motion } from 'framer-motion'
import { Badge } from '@/components/ui/badge'
import { Zap } from 'lucide-react'
import { useState } from 'react'
import { useGamification } from '@/context/GamificationContext'
import { cn } from '@/lib/utils'

import { SKILLS } from '@/data/skills'

export default function StackSection() {
    const { unlock } = useGamification()
    const [gravityBroken, setGravityBroken] = useState(false)

    const handleGravityClick = () => {
        const newState = !gravityBroken
        setGravityBroken(newState)
        if (newState) unlock('CHAOS_ENGINEER')
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            <div>
                <h3
                    onClick={handleGravityClick}
                    className="text-2xl font-bold uppercase mb-12 flex items-center gap-3 cursor-pointer select-none group"
                >
                    <Zap className={cn("transition-colors duration-300", gravityBroken ? "text-red-500 animate-bounce" : "text-yellow-500 group-hover:text-yellow-400")} />
                    Stack Technique
                    <span className="text-[10px] opacity-0 group-hover:opacity-50 transition-opacity ml-2 border border-white/20 px-2 py-0.5 rounded">
                        {gravityBroken ? "RESTORE GRAVITY" : "DO NOT CLICK"}
                    </span>
                </h3>
                <div className="space-y-8 relative">
                    {SKILLS.map((cat, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                        >
                            <h4 className="text-sm font-mono text-neutral-500 uppercase tracking-wider mb-4">{cat.name}</h4>
                            <motion.div
                                className="flex flex-wrap gap-3"
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                variants={{
                                    visible: { transition: { staggerChildren: 0.05 } }
                                }}
                            >
                                {cat.skills.map(skill => {
                                    // Randomize fall if gravity broken
                                    const randomY = Math.random() * 800 + 200
                                    const randomRotate = Math.random() * 360
                                    const randomX = (Math.random() - 0.5) * 200

                                    return (
                                        <motion.div
                                            key={skill}
                                            variants={{
                                                hidden: { opacity: 0, scale: 0.8 },
                                                visible: { opacity: 1, scale: 1 }
                                            }}
                                            animate={gravityBroken ? {
                                                y: randomY,
                                                x: randomX,
                                                rotate: randomRotate,
                                                transition: {
                                                    type: "spring",
                                                    damping: 10,
                                                    stiffness: 50
                                                }
                                            } : {
                                                y: 0,
                                                x: 0,
                                                rotate: 0,
                                                transition: { type: "spring", damping: 20 }
                                            }}
                                        >
                                            <Badge className={cn(
                                                "py-2 px-4 border-white/10 transition-all cursor-default",
                                                gravityBroken
                                                    ? "bg-red-900/50 hover:bg-red-900 text-red-200 border-red-500/30"
                                                    : "bg-neutral-900 hover:bg-white hover:text-black"
                                            )}>
                                                {skill}
                                            </Badge>
                                        </motion.div>
                                    )
                                })}
                            </motion.div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    )
}
