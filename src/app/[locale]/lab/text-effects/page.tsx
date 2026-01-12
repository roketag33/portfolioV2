'use client';

import { useTranslations } from 'next-intl';
import { ArrowLeft, RefreshCw } from 'lucide-react';
import { Link } from '@/i18n/routingConfig';
import { useState } from 'react';
import ScrambleText from '@/components/lab/text-effects/ScrambleText';
import TypewriterText from '@/components/lab/text-effects/TypewriterText';
import MaskRevealText from '@/components/lab/text-effects/MaskRevealText';
import GradientFlowText from '@/components/lab/text-effects/GradientFlowText';
import StaggeredFadeText from '@/components/lab/text-effects/StaggeredFadeText';

export default function TextEffectsPage() {
    const t = useTranslations('Lab.text-effects');
    const [key, setKey] = useState(0);

    const replayAnimations = () => {
        setKey(prev => prev + 1);
    };

    return (
        <main className="min-h-screen bg-neutral-950 text-white selection:bg-teal-500/30 p-4 md:p-8">
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
                <button
                    onClick={replayAnimations}
                    className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-full transition-colors text-sm font-medium"
                >
                    <RefreshCw className="w-4 h-4" />
                    {t('replay')}
                </button>
            </header>

            <div key={key} className="max-w-7xl mx-auto space-y-12 pb-20">

                {/* Section 1: Scramble / Hacker */}
                <section className="bg-neutral-900/50 rounded-2xl p-8 border border-white/5">
                    <div className="mb-6 border-b border-white/5 pb-4">
                        <h2 className="text-sm font-mono text-neutral-500 uppercase">01. Scramble / Hacker Effect</h2>
                    </div>
                    <div className="h-40 flex items-center justify-center">
                        <ScrambleText text="SYSTEM_BREACH_DETECTED" />
                    </div>
                </section>

                {/* Section 2: Typewriter */}
                <section className="bg-neutral-900/50 rounded-2xl p-8 border border-white/5">
                    <div className="mb-6 border-b border-white/5 pb-4">
                        <h2 className="text-sm font-mono text-neutral-500 uppercase">02. Typewriter</h2>
                    </div>
                    <div className="h-40 flex items-center justify-center">
                        <TypewriterText text="The quick brown fox jumps over the lazy dog." />
                    </div>
                </section>

                {/* Section 3: Mask Reveal */}
                <section className="bg-neutral-900/50 rounded-2xl p-8 border border-white/5">
                    <div className="mb-6 border-b border-white/5 pb-4">
                        <h2 className="text-sm font-mono text-neutral-500 uppercase">03. Mask Reveal</h2>
                    </div>
                    <div className="h-40 flex items-center justify-center">
                        <MaskRevealText text="Rising from the shadows" />
                    </div>
                </section>

                {/* Section 4: Gradient Flow */}
                <section className="bg-neutral-900/50 rounded-2xl p-8 border border-white/5">
                    <div className="mb-6 border-b border-white/5 pb-4">
                        <h2 className="text-sm font-mono text-neutral-500 uppercase">04. Gradient Flow</h2>
                    </div>
                    <div className="h-40 flex items-center justify-center">
                        <GradientFlowText text="Infinite Chromatic Dreams" />
                    </div>
                </section>

                {/* Section 5: Staggered Fade */}
                <section className="bg-neutral-900/50 rounded-2xl p-8 border border-white/5">
                    <div className="mb-6 border-b border-white/5 pb-4">
                        <h2 className="text-sm font-mono text-neutral-500 uppercase">05. Staggered Word Fade</h2>
                    </div>
                    <div className="h-40 flex items-center justify-center">
                        <StaggeredFadeText text="Each word appears in perfect harmony with the next" />
                    </div>
                </section>

            </div>
        </main>
    );
}
