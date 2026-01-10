'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { ContactForm } from '@/components/features/ContactForm'
import { Mail, MapPin, Linkedin, Github, Copy } from 'lucide-react'

import { useTranslations } from 'next-intl'

import { toast } from 'sonner'

export default function ContactPage() {
    const t = useTranslations('Contact')

    const handleCopyEmail = () => {
        navigator.clipboard.writeText('contact@roketag.com')
        toast.success("Email copied to clipboard!")
    }

    return (
        <main className="min-h-screen bg-neutral-950 text-white relative overflow-hidden flex flex-col pt-32 pb-20 px-6">
            {/* Ambient Background */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-[-20%] left-[-20%] w-[1000px] h-[1000px] bg-primary/10 rounded-full blur-[150px]" />
                <div className="absolute bottom-[-20%] right-[-20%] w-[800px] h-[800px] bg-blue-500/10 rounded-full blur-[150px]" />
            </div>

            <div className="relative z-10 w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                {/* Left Column: Info */}
                <div className="space-y-12">
                    <motion.div
                        initial="initial"
                        animate="animate"
                        className="space-y-6"
                    >
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                        >
                            <h1 className="text-6xl md:text-8xl font-black uppercase leading-none mb-6">
                                {t('title_start')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-500">{t('title_end')}</span>
                            </h1>
                        </motion.div>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1, duration: 0.8 }}
                            className="text-xl md:text-2xl text-white/60 font-light max-w-lg"
                        >
                            {t('subtitle')}
                        </motion.p>
                    </motion.div>

                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={{
                            hidden: { opacity: 0 },
                            visible: {
                                opacity: 1,
                                transition: {
                                    staggerChildren: 0.1,
                                    delayChildren: 0.3
                                }
                            }
                        }}
                        className="space-y-8"
                    >
                        <motion.div
                            variants={{ hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0 } }}
                            className="flex items-center gap-6 group cursor-pointer hover:bg-white/5 p-4 rounded-xl transition-colors -ml-4 active:scale-95 transition-transform"
                            onClick={handleCopyEmail}
                        >
                            <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:border-primary transition-colors relative">
                                <Mail className="w-5 h-5 group-hover:opacity-0 transition-opacity absolute" />
                                <Copy className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity absolute" />
                            </div>
                            <div>
                                <div className="text-sm text-white/40 uppercase tracking-widest flex items-center gap-2">
                                    {t('email_label')}
                                    <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded text-white/60 opacity-0 group-hover:opacity-100 transition-opacity">CLICK TO COPY</span>
                                </div>
                                <div className="text-xl font-medium">contact@roketag.com</div>
                            </div>
                        </motion.div>

                        <motion.div
                            variants={{ hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0 } }}
                            className="flex items-center gap-6 group cursor-pointer hover:bg-white/5 p-4 rounded-xl transition-colors -ml-4"
                        >
                            <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:border-primary transition-colors">
                                <MapPin className="w-5 h-5" />
                            </div>
                            <div>
                                <div className="text-sm text-white/40 uppercase tracking-widest">{t('location_label')}</div>
                                <div className="text-xl font-medium">Bordeaux, France</div>
                            </div>
                        </motion.div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                        className="flex gap-4 pt-4"
                    >
                        <a href="https://www.linkedin.com/in/alexandre-sarrazin-344b98210/" target="_blank" className="w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all">
                            <Linkedin className="w-6 h-6" />
                        </a>
                        <a href="https://github.com/roketag33" target="_blank" className="w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all">
                            <Github className="w-6 h-6" />
                        </a>
                    </motion.div>
                </div>

                {/* Right Column: Form */}
                <div className="relative">
                    <ContactForm />
                </div>
            </div>
        </main>
    )
}
