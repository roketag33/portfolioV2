'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Link } from '@/i18n/routingConfig'
import { Button } from '@/components/ui/button'
import { X } from 'lucide-react'
import ClientPortal from '@/components/ui/client-portal'
import { useEffect } from 'react'

interface MobileMenuOverlayProps {
    isOpen: boolean;
    onClose: () => void;
}

import { useTranslations } from 'next-intl'

export default function MobileMenuOverlay({ isOpen, onClose }: MobileMenuOverlayProps) {
    const t = useTranslations('Navigation')
    const tHero = useTranslations('Hero')

    // Lock scroll when open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset' };
    }, [isOpen]);

    const menuItems = [
        { label: t('work'), href: '/work' },
        { label: t('about'), href: '/about' },
        { label: t('lab'), href: '/lab' },
        { label: t('blog'), href: '/blog' },
        { label: t('achievements'), href: '/achievements' },
    ]

    return (
        <ClientPortal>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ y: '100%' }}
                        animate={{ y: 0 }}
                        exit={{ y: '100%' }}
                        transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
                        className="fixed inset-0 bg-neutral-950/98 backdrop-blur-xl z-[9999] flex flex-col items-center justify-center md:hidden text-white overflow-hidden"
                    >
                        {/* Close Button Inside Overlay */}
                        <button
                            className="absolute top-6 right-6 p-2 rounded-full hover:bg-white/10 transition-colors z-50 cursor-pointer"
                            onClick={onClose}
                            aria-label="Close Menu"
                        >
                            <X size={32} className="text-white" />
                        </button>

                        {/* Logo in Overlay */}
                        <div className="absolute top-6 left-6 text-xl font-bold tracking-tighter opacity-50 select-none">
                            ALEXANDRE.S
                        </div>

                        <nav className="flex flex-col items-center gap-8 md:gap-10 w-full px-6">
                            {menuItems.map((item, index) => (
                                <motion.div
                                    key={item.href}
                                    initial={{ opacity: 0, y: 40 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 + index * 0.1, duration: 0.5, ease: "easeOut" }}
                                    className="w-full flex justify-center"
                                >
                                    <Link
                                        href={item.href}
                                        className="text-4xl md:text-5xl font-bold tracking-tighter text-white/70 hover:text-white transition-colors relative group py-2"
                                        onClick={onClose}
                                    >
                                        {item.label}
                                        <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[3px] bg-indigo-500 transition-all duration-300 group-hover:w-full" />
                                    </Link>
                                </motion.div>
                            ))}
                            <motion.div
                                initial={{ opacity: 0, y: 40 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.6 }}
                            >
                                <Link href="/contact" onClick={onClose}>
                                    <Button size="lg" className="rounded-full text-xl px-10 py-6 mt-6 bg-white text-black hover:bg-white/90">
                                        {tHero('cta_contact')}
                                    </Button>
                                </Link>
                            </motion.div>
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </ClientPortal>
    )
}
