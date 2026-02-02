'use client'
import { Link } from '@/i18n/routingConfig'
import { m } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import dynamic from 'next/dynamic'
import { useTranslations } from 'next-intl'

// Dynamically import the portal overlay to ensure client-side rendering
const MobileMenuOverlay = dynamic(() => import('./MobileMenuOverlay'), { ssr: false })

export default function Header() {
    const t = useTranslations('Navigation');
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <m.header
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
                    {['work', 'about', 'lab', 'blog', 'achievements'].map((item) => (
                        <Link key={item} href={`/${item}`} className="group relative text-sm uppercase tracking-widest hover:text-primary transition-colors cursor-pointer block font-medium opacity-80 hover:opacity-100">
                            {t(item)}
                            <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-foreground transition-all duration-300 group-hover:w-full" />
                        </Link>
                    ))}
                </nav>

                <div className="flex items-center gap-4 z-50 relative">
                    <Link href="/contact" className="hidden md:block">
                        <Button className="rounded-full cursor-pointer bg-foreground text-background hover:bg-foreground/90 transition-colors px-6 font-medium shadow-sm">
                            {t('contact')}
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
            </m.header>

            {/* Portal Overlay */}
            <MobileMenuOverlay isOpen={isOpen} onClose={() => setIsOpen(false)} />
        </>
    )
}
