'use client';

// Trigger Sync
import { useTranslations } from 'next-intl';
import { ArrowLeft, RefreshCw } from 'lucide-react';
import { Link } from '@/i18n/routingConfig';
import { useState } from 'react';
import ScrambleText from '@/components/lab/text-effects/ScrambleText';
import TypewriterText from '@/components/lab/text-effects/TypewriterText';
import MaskRevealText from '@/components/lab/text-effects/MaskRevealText';
import GradientFlowText from '@/components/lab/text-effects/GradientFlowText';
import StaggeredFadeText from '@/components/lab/text-effects/StaggeredFadeText';
import GlitchText from '@/components/lab/text-effects/GlitchText';
import WaveText from '@/components/lab/text-effects/WaveText';
import BlurInText from '@/components/lab/text-effects/BlurInText';
import NeonText from '@/components/lab/text-effects/NeonText';
import WordsPullUpText from '@/components/lab/text-effects/WordsPullUpText';

export default function TextEffectsPage() {
    const t = useTranslations('Lab.text-effects');

    // State for individual section keys to trigger re-renders
    const [keys, setKeys] = useState({
        scramble: 0,
        typewriter: 0,
        mask: 0,
        gradient: 0,
        stagger: 0,
        glitch: 0,
        wave: 0,
        blur: 0,
        neon: 0,
        pullup: 0
    });

    const reload = (section: keyof typeof keys) => {
        setKeys(prev => ({ ...prev, [section]: prev[section] + 1 }));
    };

    return (
        <main className="min-h-screen bg-neutral-950 text-white selection:bg-teal-500/30 pt-28 px-4 md:px-8 pb-20">
            <header className="max-w-7xl mx-auto mb-12 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link
                        href="/lab"
                        className="p-2 rounded-full hover:bg-white/10 transition-colors group"
                    >
                        <ArrowLeft className="w-6 h-6 text-neutral-400 group-hover:text-white transition-colors" />
                    </Link>
                    <div>
                        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-emerald-400">
                            {t('title')}
                        </h1>
                        <p className="text-neutral-400 mt-1">
                            {t('subtitle')}
                        </p>
                    </div>
                </div>
            </header>

            <div className="max-w-7xl mx-auto space-y-12">

                {/* Section 1: Scramble / Hacker */}
                <section className="bg-neutral-900/50 rounded-2xl p-8 border border-white/5 relative group">
                    <button
                        onClick={() => reload('scramble')}
                        className="absolute top-4 right-4 p-2 rounded-full bg-white/5 hover:bg-white/10 text-neutral-500 hover:text-white transition-colors z-10"
                        title={t('replay')}
                    >
                        <RefreshCw className="w-4 h-4" />
                    </button>
                    <div className="mb-6 border-b border-white/5 pb-4">
                        <h2 className="text-sm font-mono text-neutral-500 uppercase">{t('sections.scramble')}</h2>
                    </div>
                    <div key={keys.scramble} className="h-40 flex items-center justify-center">
                        <ScrambleText text="SYSTEM_BREACH_DETECTED" />
                    </div>
                </section>

                {/* Section 2: Typewriter */}
                <section className="bg-neutral-900/50 rounded-2xl p-8 border border-white/5 relative group">
                    <button
                        onClick={() => reload('typewriter')}
                        className="absolute top-4 right-4 p-2 rounded-full bg-white/5 hover:bg-white/10 text-neutral-500 hover:text-white transition-colors z-10"
                        title={t('replay')}
                    >
                        <RefreshCw className="w-4 h-4" />
                    </button>
                    <div className="mb-6 border-b border-white/5 pb-4">
                        <h2 className="text-sm font-mono text-neutral-500 uppercase">{t('sections.typewriter')}</h2>
                    </div>
                    <div key={keys.typewriter} className="h-40 flex items-center justify-center">
                        <TypewriterText text="The quick brown fox jumps over the lazy dog." />
                    </div>
                </section>

                {/* Section 3: Mask Reveal */}
                <section className="bg-neutral-900/50 rounded-2xl p-8 border border-white/5 relative group">
                    <button
                        onClick={() => reload('mask')}
                        className="absolute top-4 right-4 p-2 rounded-full bg-white/5 hover:bg-white/10 text-neutral-500 hover:text-white transition-colors z-10"
                        title={t('replay')}
                    >
                        <RefreshCw className="w-4 h-4" />
                    </button>
                    <div className="mb-6 border-b border-white/5 pb-4">
                        <h2 className="text-sm font-mono text-neutral-500 uppercase">{t('sections.mask')}</h2>
                    </div>
                    <div key={keys.mask} className="h-40 flex items-center justify-center">
                        <MaskRevealText text="Rising from the shadows" />
                    </div>
                </section>

                {/* Section 4: Gradient Flow */}
                <section className="bg-neutral-900/50 rounded-2xl p-8 border border-white/5 relative group">
                    <button
                        onClick={() => reload('gradient')}
                        className="absolute top-4 right-4 p-2 rounded-full bg-white/5 hover:bg-white/10 text-neutral-500 hover:text-white transition-colors z-10"
                        title={t('replay')}
                    >
                        <RefreshCw className="w-4 h-4" />
                    </button>
                    <div className="mb-6 border-b border-white/5 pb-4">
                        <h2 className="text-sm font-mono text-neutral-500 uppercase">{t('sections.gradient')}</h2>
                    </div>
                    <div key={keys.gradient} className="h-40 flex items-center justify-center">
                        <GradientFlowText text="Infinite Chromatic Dreams" />
                    </div>
                </section>

                {/* Section 5: Staggered Fade */}
                <section className="bg-neutral-900/50 rounded-2xl p-8 border border-white/5 relative group">
                    <button
                        onClick={() => reload('stagger')}
                        className="absolute top-4 right-4 p-2 rounded-full bg-white/5 hover:bg-white/10 text-neutral-500 hover:text-white transition-colors z-10"
                        title={t('replay')}
                    >
                        <RefreshCw className="w-4 h-4" />
                    </button>
                    <div className="mb-6 border-b border-white/5 pb-4">
                        <h2 className="text-sm font-mono text-neutral-500 uppercase">{t('sections.stagger')}</h2>
                    </div>
                    <div key={keys.stagger} className="h-40 flex items-center justify-center">
                        <StaggeredFadeText text="Each word appears in perfect harmony with the next" />
                    </div>
                </section>

                {/* Section 6: Glitch RGB */}
                <section className="bg-neutral-900/50 rounded-2xl p-8 border border-white/5 relative group">
                    <button
                        onClick={() => reload('glitch')}
                        className="absolute top-4 right-4 p-2 rounded-full bg-white/5 hover:bg-white/10 text-neutral-500 hover:text-white transition-colors z-10"
                        title={t('replay')}
                    >
                        <RefreshCw className="w-4 h-4" />
                    </button>
                    <div className="mb-6 border-b border-white/5 pb-4">
                        <h2 className="text-sm font-mono text-neutral-500 uppercase">{t('sections.glitch')}</h2>
                    </div>
                    <div key={keys.glitch} className="h-40 flex items-center justify-center">
                        <GlitchText text="CYBERPUNK_ERROR" />
                    </div>
                </section>

                {/* Section 7: Sine Wave */}
                <section className="bg-neutral-900/50 rounded-2xl p-8 border border-white/5 relative group">
                    <button
                        onClick={() => reload('wave')}
                        className="absolute top-4 right-4 p-2 rounded-full bg-white/5 hover:bg-white/10 text-neutral-500 hover:text-white transition-colors z-10"
                        title={t('replay')}
                    >
                        <RefreshCw className="w-4 h-4" />
                    </button>
                    <div className="mb-6 border-b border-white/5 pb-4">
                        <h2 className="text-sm font-mono text-neutral-500 uppercase">{t('sections.wave')}</h2>
                    </div>
                    <div key={keys.wave} className="h-40 flex items-center justify-center">
                        <WaveText text="Waving through the void..." />
                    </div>
                </section>

                {/* Section 8: Blur In */}
                <section className="bg-neutral-900/50 rounded-2xl p-8 border border-white/5 relative group">
                    <button
                        onClick={() => reload('blur')}
                        className="absolute top-4 right-4 p-2 rounded-full bg-white/5 hover:bg-white/10 text-neutral-500 hover:text-white transition-colors z-10"
                        title={t('replay')}
                    >
                        <RefreshCw className="w-4 h-4" />
                    </button>
                    <div className="mb-6 border-b border-white/5 pb-4">
                        <h2 className="text-sm font-mono text-neutral-500 uppercase">{t('sections.blur')}</h2>
                    </div>
                    <div key={keys.blur} className="h-40 flex items-center justify-center">
                        <BlurInText text="Focus on what matters" />
                    </div>
                </section>

                {/* Section 9: Pulsing Neon */}
                <section className="bg-neutral-900/50 rounded-2xl p-8 border border-white/5 relative group">
                    <button
                        onClick={() => reload('neon')}
                        className="absolute top-4 right-4 p-2 rounded-full bg-white/5 hover:bg-white/10 text-neutral-500 hover:text-white transition-colors z-10"
                        title={t('replay')}
                    >
                        <RefreshCw className="w-4 h-4" />
                    </button>
                    <div className="mb-6 border-b border-white/5 pb-4">
                        <h2 className="text-sm font-mono text-neutral-500 uppercase">{t('sections.neon')}</h2>
                    </div>
                    <div key={keys.neon} className="h-40 flex items-center justify-center">
                        <NeonText text="NEON LIGHTS" />
                    </div>
                </section>

                {/* Section 10: Word Pull Up */}
                <section className="bg-neutral-900/50 rounded-2xl p-8 border border-white/5 relative group">
                    <button
                        onClick={() => reload('pullup')}
                        className="absolute top-4 right-4 p-2 rounded-full bg-white/5 hover:bg-white/10 text-neutral-500 hover:text-white transition-colors z-10"
                        title={t('replay')}
                    >
                        <RefreshCw className="w-4 h-4" />
                    </button>
                    <div className="mb-6 border-b border-white/5 pb-4">
                        <h2 className="text-sm font-mono text-neutral-500 uppercase">{t('sections.pullup')}</h2>
                    </div>
                    <div key={keys.pullup} className="h-40 flex items-center justify-center">
                        <WordsPullUpText text="Elevate your design game instantly" />
                    </div>
                </section>

            </div>
        </main>
    );
}
