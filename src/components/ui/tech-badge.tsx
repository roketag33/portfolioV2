'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Badge } from '@/components/ui/badge'
import { X, Info } from 'lucide-react'
import { TechItem } from '@/data/tech-stack'

interface TechBadgeProps {
    tech: TechItem | string;
    description?: string; // Fallback if tech is just a string
}

export default function TechBadge({ tech, description }: TechBadgeProps) {
    const [isOpen, setIsOpen] = useState(false)

    // Normalize input
    const name = typeof tech === 'string' ? tech : tech.name
    const desc = typeof tech === 'string' ? description : tech.description

    return (
        <>
            <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => desc && setIsOpen(true)}
                className="cursor-pointer"
            >
                <Badge variant="secondary" className="px-3 py-1 bg-white/5 hover:bg-white/10 transition-colors text-sm font-normal text-muted-foreground hover:text-foreground border border-white/5 hover:border-primary/50 flex items-center gap-2">
                    {name}
                    {desc && <Info size={10} className="opacity-50" />}
                </Badge>
            </motion.div>

            <AnimatePresence>
                {isOpen && desc && (
                    <div className="fixed inset-0 z-[9999] flex items-center justify-center px-4">
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                        />

                        {/* Modal */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="relative bg-background border border-border rounded-2xl p-6 max-w-sm w-full shadow-2xl z-10 overflow-hidden"
                        >
                            {/* Decorative Glow */}
                            <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/20 blur-[50px] rounded-full pointer-events-none" />

                            <button
                                onClick={() => setIsOpen(false)}
                                className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
                            >
                                <X size={20} />
                            </button>

                            <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
                                {name}
                            </h3>

                            <div className="h-1 w-12 bg-primary/50 rounded-full mb-4" />

                            <p className="text-muted-foreground leading-relaxed">
                                {desc}
                            </p>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    )
}
