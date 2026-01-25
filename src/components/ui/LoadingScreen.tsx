'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { ACHIEVEMENTS } from '@/lib/achievements';
import { useGamification } from '@/context/GamificationContext';

export default function LoadingScreen() {
    const t = useTranslations('LoadingScreen');
    const { unlocked } = useGamification();
    const unlockedCount = unlocked.length;
    const totalAchievements = Object.keys(ACHIEVEMENTS).length;
    const [isLoading, setIsLoading] = useState(true);
    const [step, setStep] = useState(0);

    useEffect(() => {
        // Prevent scrolling while loading
        document.body.style.overflow = 'hidden';

        // Sequence of "fake" loading steps
        const timers = [
            setTimeout(() => setStep(1), 800),  // "Initializing..."
            setTimeout(() => setStep(2), 2000), // "Searching..."
            setTimeout(() => {
                setIsLoading(false);
                document.body.style.overflow = '';
            }, 3500) // Finish
        ];

        return () => {
            timers.forEach(clearTimeout);
            document.body.style.overflow = '';
        };
    }, []);

    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    className="fixed inset-0 z-[9999] bg-background flex flex-col items-center justify-center font-mono text-xs md:text-sm"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
                >
                    <div className="flex flex-col items-start gap-2 w-[300px]">
                        {/* Step 0: Initializing */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex items-center gap-2 text-muted-foreground"
                        >
                            <span className="text-primary">{'>'}</span>
                            {t('initializing')}
                        </motion.div>

                        {/* Step 1: Searching Protocols */}
                        {step >= 1 && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="flex items-center gap-2 text-muted-foreground"
                            >
                                <span className="text-primary">{'>'}</span>
                                {t('searching')}
                            </motion.div>
                        )}

                        {/* Step 2: Achievements Hint (Mysterious) */}
                        {step >= 2 && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="flex items-center gap-2 text-primary mt-4"
                            >
                                <span className="animate-pulse">_</span>
                                {t('achievements_hint', {
                                    count: unlockedCount,
                                    total: totalAchievements
                                })}
                            </motion.div>
                        )}
                    </div>

                    {/* Progress Bar styled as a loader */}
                    <motion.div
                        className="absolute bottom-10 left-0 right-0 h-[2px] bg-primary/20"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                    >
                        <motion.div
                            className="h-full bg-primary"
                            initial={{ width: "0%" }}
                            animate={{ width: "100%" }}
                            transition={{ duration: 3.5, ease: "easeInOut" }}
                        />
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
