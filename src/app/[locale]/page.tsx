'use client'

import dynamic from 'next/dynamic'
import Hero from '@/components/features/Hero'
import LazyView from '@/components/ui/LazyView'
import { useEffect } from 'react'
import { useGamification } from '@/context/GamificationContext'
import { VisualEffectsProvider } from '@/context/VisualEffectsContext'

const About = dynamic(() => import('@/components/features/About'), {
  loading: () => <div className="min-h-screen bg-background" /> // Placeholder to prevent CLS
})
const WorkList = dynamic(() => import('@/components/features/WorkList'), {
  loading: () => <div className="min-h-[50vh] bg-background" />
})

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
      <VisualEffectsProvider>
        <Hero />
        <LazyView>
          <About />
        </LazyView>
        <LazyView>
          <WorkList limit={3} showHeader={false} />
        </LazyView>
      </VisualEffectsProvider>
    </main>
  )
}
