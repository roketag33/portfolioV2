'use client';

// import { motion } from 'framer-motion';
// Trigger Sync
import { useTranslations } from 'next-intl';
import { ArrowLeft } from 'lucide-react';
import { Link } from '@/i18n/routingConfig';
import MagneticButton from '@/components/lab/buttons/MagneticButton';
import GlowButton from '@/components/lab/buttons/GlowButton';
import CyberButton from '@/components/lab/buttons/CyberButton';
import LiquifyButton from '@/components/lab/buttons/LiquifyButton';
import NeumorphismButton from '@/components/lab/buttons/NeumorphismButton';
import SpotlightButton from '@/components/lab/buttons/SpotlightButton';
import GradientBorderButton from '@/components/lab/buttons/GradientBorderButton';
import TiltButton from '@/components/lab/buttons/TiltButton';
import PulseButton from '@/components/lab/buttons/PulseButton';
import TextRevealButton from '@/components/lab/buttons/TextRevealButton';

export default function ButtonShowcasePage() {
    const t = useTranslations('Lab.button-showcase');

    return (
        <main className="min-h-screen bg-neutral-950 text-white selection:bg-indigo-500/30 p-4 md:p-8">
            <header className="max-w-7xl mx-auto mb-12 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link
                        href="/lab"
                        className="p-2 rounded-full hover:bg-white/10 transition-colors group"
                    >
                        <ArrowLeft className="w-6 h-6 text-neutral-400 group-hover:text-white transition-colors" />
                    </Link>
                    <div>
                        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-500">
                            {t('title')}
                        </h1>
                        <p className="text-neutral-400 mt-1">
                            {t('subtitle')}
                        </p>
                    </div>
                </div>
            </header>

            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-20">
                {/* Magnetic Button */}
                <div className="bg-neutral-900/50 rounded-2xl p-8 border border-white/5 flex flex-col items-center justify-center gap-6 min-h-[300px]">
                    <span className="text-sm font-mono text-neutral-500 uppercase">{t('labels.magnetic')}</span>
                    <MagneticButton>{t('labels.magnetic_action')}</MagneticButton>
                </div>

                {/* Glow Button */}
                <div className="bg-neutral-900/50 rounded-2xl p-8 border border-white/5 flex flex-col items-center justify-center gap-6 min-h-[300px]">
                    <span className="text-sm font-mono text-neutral-500 uppercase">{t('labels.glow')}</span>
                    <GlowButton>{t('labels.glow_action')}</GlowButton>
                </div>

                {/* Cyber Glitch */}
                <div className="bg-neutral-900/50 rounded-2xl p-8 border border-white/5 flex flex-col items-center justify-center gap-6 min-h-[300px]">
                    <span className="text-sm font-mono text-neutral-500 uppercase">{t('labels.cyber')}</span>
                    <CyberButton>{t('labels.cyber_action')}</CyberButton>
                </div>

                {/* Liquify/Morph */}
                <div className="bg-neutral-900/50 rounded-2xl p-8 border border-white/5 flex flex-col items-center justify-center gap-6 min-h-[300px]">
                    <span className="text-sm font-mono text-neutral-500 uppercase">{t('labels.liquify')}</span>
                    <LiquifyButton>{t('labels.liquify_action')}</LiquifyButton>
                </div>

                {/* Neumorphism */}
                <div className="bg-neutral-900/50 rounded-2xl p-8 border border-white/5 flex flex-col items-center justify-center gap-6 min-h-[300px]">
                    <span className="text-sm font-mono text-neutral-500 uppercase">{t('labels.soft')}</span>
                    <NeumorphismButton>{t('labels.soft_action')}</NeumorphismButton>
                </div>

                {/* Spotlight */}
                <div className="bg-neutral-900/50 rounded-2xl p-8 border border-white/5 flex flex-col items-center justify-center gap-6 min-h-[300px]">
                    <span className="text-sm font-mono text-neutral-500 uppercase">{t('labels.spotlight')}</span>
                    <SpotlightButton>{t('labels.spotlight_action')}</SpotlightButton>
                </div>

                {/* Gradient Border */}
                <div className="bg-neutral-900/50 rounded-2xl p-8 border border-white/5 flex flex-col items-center justify-center gap-6 min-h-[300px]">
                    <span className="text-sm font-mono text-neutral-500 uppercase">{t('labels.cosmic')}</span>
                    <GradientBorderButton>{t('labels.cosmic_action')}</GradientBorderButton>
                </div>

                {/* Tilt 3D */}
                <div className="bg-neutral-900/50 rounded-2xl p-8 border border-white/5 flex flex-col items-center justify-center gap-6 min-h-[300px] perspective-1000">
                    <span className="text-sm font-mono text-neutral-500 uppercase">{t('labels.tilt')}</span>
                    <TiltButton>{t('labels.tilt_action')}</TiltButton>
                </div>

                {/* Pulse */}
                <div className="bg-neutral-900/50 rounded-2xl p-8 border border-white/5 flex flex-col items-center justify-center gap-6 min-h-[300px]">
                    <span className="text-sm font-mono text-neutral-500 uppercase">{t('labels.pulse')}</span>
                    <PulseButton>{t('labels.pulse_action')}</PulseButton>
                </div>

                {/* Text Reveal */}
                <div className="bg-neutral-900/50 rounded-2xl p-8 border border-white/5 flex flex-col items-center justify-center gap-6 min-h-[300px]">
                    <span className="text-sm font-mono text-neutral-500 uppercase">{t('labels.reveal')}</span>
                    <TextRevealButton>{t('labels.reveal_action')}</TextRevealButton>
                </div>
            </div>
        </main>
    );
}
