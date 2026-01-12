'use client';

import FashionConcept from '@/components/lab/ui-showcase/FashionConcept';
import { ArrowLeft } from 'lucide-react';
import { Link } from '@/i18n/routingConfig';
import { motion } from 'framer-motion';

export default function FashionPage() {
    return (
        <div className="relative">
            {/* Overlay Navigation - Dark/Light aware if needed, sticking to dark overlay here */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="absolute top-6 left-6 z-50"
            >
                <Link
                    href="/lab/ui-showcase"
                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-md border border-white/10 text-white hover:bg-white/40 transition-all text-sm font-medium mix-blend-difference"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back
                </Link>
            </motion.div>

            <FashionConcept />
        </div>
    );
}
