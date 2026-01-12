'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routingConfig';
import { ArrowLeft, CreditCard, ShoppingBag, Zap } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const concepts = [
    {
        id: 'fintech',
        icon: CreditCard,
        color: 'from-cyan-500 to-blue-500',
        delay: 0.1
    },
    {
        id: 'fashion',
        icon: ShoppingBag,
        color: 'from-orange-400 to-pink-500',
        delay: 0.2
    },
    {
        id: 'agency',
        icon: Zap,
        color: 'from-lime-400 to-yellow-400',
        delay: 0.3
    }
];

export default function UIShowcasePage() {
    const t = useTranslations('Lab.ui-showcase');

    return (
        <div className="min-h-screen bg-neutral-950 text-white selection:bg-indigo-500/30">
            <Header />

            <main className="pt-32 pb-20 px-6 container mx-auto">
                {/* Header Section */}
                <div className="mb-20">
                    <Link
                        href="/lab"
                        className="inline-flex items-center text-neutral-400 hover:text-white mb-8 transition-colors group"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                        {t('back') || 'Back to Lab'}
                    </Link>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-neutral-500 mb-6"
                    >
                        {t('title')}
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-xl text-neutral-400 max-w-2xl"
                    >
                        {t('description')}
                    </motion.p>
                </div>

                {/* Concepts Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {concepts.map((concept) => (
                        <Link key={concept.id} href={`/lab/ui-showcase/${concept.id}`}>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: concept.delay }}
                                className="group relative h-[400px] bg-neutral-900/50 border border-white/5 rounded-3xl overflow-hidden hover:border-white/20 transition-colors"
                            >
                                {/* Background Gradient Blob */}
                                <div className={`absolute -top-20 -right-20 w-64 h-64 bg-gradient-to-br ${concept.color} opacity-20 blur-[100px] group-hover:opacity-30 transition-opacity duration-500`} />

                                <div className="absolute inset-0 p-8 flex flex-col justify-between">
                                    <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:scale-110 transition-transform duration-300">
                                        <concept.icon className="w-6 h-6 text-white" />
                                    </div>

                                    <div>
                                        <h3 className="text-3xl font-bold mb-3">{t(`${concept.id}.title`)}</h3>
                                        <p className="text-neutral-400">{t(`${concept.id}.desc`)}</p>
                                    </div>

                                    <div className="flex items-center text-sm font-medium text-white/50 group-hover:text-white transition-colors">
                                        View Concept <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                                    </div>
                                </div>
                            </motion.div>
                        </Link>
                    ))}
                </div>
            </main>

            <Footer />
        </div>
    );
}
