'use client'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);

    // Prevent scrolling when menu is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [isOpen]);

    return (
        <motion.header
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-6 py-4 bg-background/75 backdrop-blur-md border-b border-border/5 text-foreground transition-all duration-300"
        >
            <Link href="/" className="text-xl font-bold tracking-tighter hover:opacity-70 transition-opacity z-50 relative" onClick={() => setIsOpen(false)}>
                ALEXANDRE.S
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
                {['Work', 'About', 'Lab', 'Blog', 'Achievements'].map((item) => (
                    <Link key={item} href={`/${item.toLowerCase()}`} className="group relative text-sm uppercase tracking-widest hover:text-primary transition-colors cursor-pointer block font-medium opacity-80 hover:opacity-100">
                        {item}
                        <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-foreground transition-all duration-300 group-hover:w-full" />
                    </Link>
                ))}
            </nav>

            <div className="flex items-center gap-4 z-50 relative">
                <Link href="/contact" className="hidden md:block">
                    <Button className="rounded-full cursor-pointer bg-foreground text-background hover:bg-foreground/90 transition-colors px-6 font-medium shadow-sm">
                        Contact
                    </Button>
                </Link>

                {/* Mobile Burger Toggle */}
                <button
                    className="md:hidden p-2 hover:bg-foreground/5 rounded-full transition-colors"
                    onClick={() => setIsOpen(!isOpen)}
                    aria-label="Toggle Menu"
                >
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
                        animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                        exit={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        className="fixed inset-0 bg-neutral-950/98 backdrop-blur-xl z-[60] flex flex-col items-center justify-center md:hidden text-white"
                    >
                        {/* Close Button Inside Overlay */}
                        <button
                            className="absolute top-6 right-6 p-2 rounded-full hover:bg-white/10 transition-colors"
                            onClick={() => setIsOpen(false)}
                            aria-label="Close Menu"
                        >
                            <X size={32} className="text-white" />
                        </button>

                        {/* Logo in Overlay */}
                        <div className="absolute top-6 left-6 text-xl font-bold tracking-tighter opacity-50">
                            ALEXANDRE.S
                        </div>

                        <nav className="flex flex-col items-center gap-10">
                            {['Work', 'About', 'Lab', 'Blog', 'Achievements'].map((item, index) => (
                                <motion.div
                                    key={item}
                                    initial={{ opacity: 0, y: 40 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 + index * 0.1, duration: 0.5, ease: "easeOut" }}
                                >
                                    <Link
                                        href={`/${item.toLowerCase()}`}
                                        className="text-5xl font-bold tracking-tighter text-white/70 hover:text-white transition-colors relative group"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        {item}
                                        <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-[3px] bg-indigo-500 transition-all duration-300 group-hover:w-full" />
                                    </Link>
                                </motion.div>
                            ))}
                            <motion.div
                                initial={{ opacity: 0, y: 40 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.6 }}
                            >
                                <Link href="/contact" onClick={() => setIsOpen(false)}>
                                    <Button size="lg" className="rounded-full text-xl px-10 py-7 mt-8 bg-white text-black hover:bg-white/90">
                                        Let&apos;s Talk
                                    </Button>
                                </Link>
                            </motion.div>
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.header>
    )
}
