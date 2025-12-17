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
            className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-6 py-4 bg-background/75 backdrop-blur-md border-b border-border/5 text-foreground transition-all duration-300"
        >
            <Link href="/" className="text-xl font-bold tracking-tighter hover:opacity-70 transition-opacity">
                ALEXANDRE.S
            </Link>

            <nav className="hidden md:flex items-center gap-8">
                {['Work', 'About', 'Lab', 'Blog', 'Achievements'].map((item) => (
                    <Link key={item} href={`/${item.toLowerCase()}`} className="group relative text-sm uppercase tracking-widest hover:text-primary transition-colors cursor-pointer block font-medium opacity-80 hover:opacity-100">
                        {item}
                        <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-foreground transition-all duration-300 group-hover:w-full" />
                    </Link>
                ))}
            </nav>

            <div className="flex items-center gap-4">
                {/* Gamification Badge Placeholder */}
                <Link href="/contact">
                    <Button className="rounded-full hidden md:flex cursor-pointer bg-foreground text-background hover:bg-foreground/90 transition-colors px-6 font-medium shadow-sm">
                        Contact
                    </Button>
                </Link>
            </div>
        </motion.header>
    )
}
