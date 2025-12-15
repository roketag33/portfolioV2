'use client'
import Hero from '@/components/features/Hero'
import About from '@/components/features/About'
import WorkList from '@/components/features/WorkList'
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
      <WorkList />
    </main>
  )
}
