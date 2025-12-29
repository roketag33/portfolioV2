'use client'
import { useGamification } from '@/context/GamificationContext'
import { toast } from 'sonner'
import { usePathname } from 'next/navigation'
import MagneticButton from '@/components/ui/magnetic-button'

export default function Footer() {
    const { unlock } = useGamification()
    const pathname = usePathname()

    // Hide footer on lab experiments, but show on main lab archive
    if (pathname?.startsWith('/lab/') && pathname !== '/lab') return null

    const handleCopyEmail = (e: React.MouseEvent) => {
        e.preventDefault()
        navigator.clipboard.writeText('contact@roketag.com')
        toast.success("Email copied to clipboard!")
        unlock('COPYCAT')
    }

    const handleSocial = () => {
        unlock('SOCIALITE')
    }

    return (
        <footer className="w-full py-12 px-6 border-t border-border/10 bg-background relative z-10">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-end gap-8">
                <div>
                    <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-4">
                        Let&apos;s work <br /> together
                    </h2>
                    <button onClick={handleCopyEmail} className="text-xl text-primary hover:underline text-left">
                        contact@roketag.com
                    </button>
                </div>

                <div className="flex flex-col items-end gap-4">
                    <div className="flex gap-4">
                        <MagneticButton href="https://github.com/roketag33" external variant="primary" className="px-6 py-3 text-sm" onClick={handleSocial}>GitHub</MagneticButton>
                        <MagneticButton href="https://www.linkedin.com/in/alexandre-sarrazin-344b98210/" external variant="primary" className="px-6 py-3 text-sm" onClick={handleSocial}>LinkedIn</MagneticButton>
                    </div>
                    <p className="text-xs text-muted-foreground uppercase opacity-50">
                        © {new Date().getFullYear()} Alexandre Sarrazin. All rights reserved.
                    </p>
                    <button
                        onClick={() => window.dispatchEvent(new Event('portfolio:toggle-terminal'))}
                        className="text-[10px] items-center gap-2 text-muted-foreground/30 hover:text-primary transition-colors font-mono hidden md:flex"
                        title="Press Ctrl+K to open terminal"
                    >
                        <span>v2.0.4</span>
                        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                        <span>SYSTEM READY</span>
                        <span>::</span>
                        <span>[CTRL + K]</span>
                    </button>
                </div>
            </div>
        </footer>
    )
}
