'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { ContactForm } from '@/components/features/ContactForm'
import { Mail, MapPin, Linkedin, Github } from 'lucide-react'

export default function ContactPage() {
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
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 className="text-6xl md:text-8xl font-black uppercase leading-none mb-6">
                            Let's <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-500">Talk</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-white/60 font-light max-w-lg">
                            Have a project in mind or just want to chat?
                            Feel free to reach out. I'm always open to discussing new ideas.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="space-y-8"
                    >
                        <div className="flex items-center gap-6 group cursor-pointer hover:bg-white/5 p-4 rounded-xl transition-colors -ml-4">
                            <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:border-primary transition-colors">
                                <Mail className="w-5 h-5" />
                            </div>
                            <div>
                                <div className="text-sm text-white/40 uppercase tracking-widest">Email</div>
                                <div className="text-xl font-medium">contact@roketag.com</div>
                            </div>
                        </div>

                        <div className="flex items-center gap-6 group cursor-pointer hover:bg-white/5 p-4 rounded-xl transition-colors -ml-4">
                            <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:border-primary transition-colors">
                                <MapPin className="w-5 h-5" />
                            </div>
                            <div>
                                <div className="text-sm text-white/40 uppercase tracking-widest">Location</div>
                                <div className="text-xl font-medium">Bordeaux, France</div>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                        className="flex gap-4 pt-4"
                    >
                        <a href="https://linkedin.com" target="_blank" className="w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all">
                            <Linkedin className="w-6 h-6" />
                        </a>
                        <a href="https://github.com" target="_blank" className="w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all">
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
