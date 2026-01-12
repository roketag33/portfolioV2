'use client';

import BrutalistLanding from '@/components/lab/ui-showcase/BrutalistLanding';
import { ArrowLeft } from 'lucide-react';
import { Link } from '@/i18n/routingConfig';
import { motion } from 'framer-motion';

export default function AgencyPage() {
    return (
        <div className="relative">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="absolute top-6 left-6 z-50 mix-blend-difference"
            >
                <Link
                    href="/lab/ui-showcase"
                    className="flex items-center gap-2 px-4 py-2 bg-black text-white hover:bg-yellow-400 hover:text-black transition-colors border-2 border-white text-sm font-bold uppercase"
                >
                    <ArrowLeft className="w-4 h-4" />
                    BACK
                </Link>
            </motion.div>

            <BrutalistLanding />
        </div>
    );
}
