'use client'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'

export default function Header() {
    return (
        <motion.header
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-6 py-4 mix-blend-difference text-white"
        >
            <Link href="/" className="text-xl font-bold tracking-tighter hover:opacity-70 transition-opacity">
                ALEXANDRE.S
            </Link>

            <nav className="hidden md:flex items-center gap-8">
                {['Work', 'About', 'Lab', 'Blog', 'Achievements'].map((item) => (
                    <Link key={item} href={`/${item.toLowerCase()}`} className="text-sm uppercase tracking-widest hover:text-primary transition-colors">
                        {item}
                    </Link>
                ))}
            </nav>

            <div className="flex items-center gap-4">
                {/* Gamification Badge Placeholder */}
                <Link href="/contact">
                    <Button variant="outline" className="rounded-full hidden md:flex border-white/20 bg-white/5 text-white hover:bg-white/10 hover:text-white hover:border-white/40">
                        Contact
                    </Button>
                </Link>
            </div>
        </motion.header>
    )
}
