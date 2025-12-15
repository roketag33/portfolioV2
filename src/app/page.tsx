'use client'
import Hero from '@/components/features/Hero'
import About from '@/components/features/About'
import { useEffect } from 'react'
import { useGamification } from '@/context/GamificationContext'

export default function Home() {
  const { unlock } = useGamification()

  useEffect(() => {
    // Reveal 'First Visit' achievement immediately
    unlock('FIRST_VISIT')

    // Unlock 'Scroll Master' listener
    const handleScroll = () => {
      if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 100) {
        unlock('SCROLL_MASTER')
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [unlock])

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Hero />
      <About />
      <div className="h-[50vh] w-full flex items-center justify-center border-t border-white/5">
        <h2 className="text-4xl font-bold opacity-30">MORE COMING SOON...</h2>
      </div>
    </main>
  )
}
