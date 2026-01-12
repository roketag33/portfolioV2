'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { ArrowLeft } from 'lucide-react';
import { Link } from '@/i18n/routingConfig';
import MagneticButton from '@/components/lab/buttons/MagneticButton';
import GlowButton from '@/components/lab/buttons/GlowButton';
import CyberButton from '@/components/lab/buttons/CyberButton';
import LiquifyButton from '@/components/lab/buttons/LiquifyButton';
import NeumorphismButton from '@/components/lab/buttons/NeumorphismButton';

export default function ButtonShowcasePage() {
    // const t = useTranslations('Lab.buttons'); // TODO: Add translations

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
                            Button Showcase
                        </h1>
                        <p className="text-neutral-400 mt-1">
                            Interactive UI components playground
                        </p>
                    </div>
                </div>
            </header>

            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Magnetic Button */}
                <div className="bg-neutral-900/50 rounded-2xl p-8 border border-white/5 flex flex-col items-center justify-center gap-6 min-h-[300px]">
                    <span className="text-sm font-mono text-neutral-500">MAGNETIC</span>
                    <MagneticButton>Hover Me</MagneticButton>
                </div>

                {/* Glow Button */}
                <div className="bg-neutral-900/50 rounded-2xl p-8 border border-white/5 flex flex-col items-center justify-center gap-6 min-h-[300px]">
                    <span className="text-sm font-mono text-neutral-500">NEON GLOW</span>
                    <GlowButton>Activate</GlowButton>
                </div>

                {/* Cyber Glitch */}
                <div className="bg-neutral-900/50 rounded-2xl p-8 border border-white/5 flex flex-col items-center justify-center gap-6 min-h-[300px]">
                    <span className="text-sm font-mono text-neutral-500">CYBER GLITCH</span>
                    <CyberButton>HACK_SYSTEM</CyberButton>
                </div>

                {/* Liquify/Morph */}
                <div className="bg-neutral-900/50 rounded-2xl p-8 border border-white/5 flex flex-col items-center justify-center gap-6 min-h-[300px]">
                    <span className="text-sm font-mono text-neutral-500">LIQUIFY</span>
                    <LiquifyButton>Click Me</LiquifyButton>
                </div>

                {/* Neumorphism */}
                <div className="bg-neutral-900/50 rounded-2xl p-8 border border-white/5 flex flex-col items-center justify-center gap-6 min-h-[300px]">
                    <span className="text-sm font-mono text-neutral-500">SOFT UI</span>
                    <NeumorphismButton>Press Softly</NeumorphismButton>
                </div>
            </div>
        </main>
    );
}
