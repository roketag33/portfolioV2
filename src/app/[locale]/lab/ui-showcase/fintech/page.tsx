'use client';

import FintechDashboard from '@/components/lab/ui-showcase/FintechDashboard';
import { ArrowLeft } from 'lucide-react';
import { Link } from '@/i18n/routingConfig';
import { motion } from 'framer-motion';

export default function FintechPage() {
    return (
        <div className="relative">
            {/* Overlay Navigation */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="absolute top-6 left-6 z-50"
            >
                <Link
                    href="/lab/ui-showcase"
                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-black/20 backdrop-blur-md border border-white/10 text-white/50 hover:text-white hover:bg-black/40 transition-all text-sm font-medium"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Showcase
                </Link>
            </motion.div>

            <FintechDashboard />
        </div>
    );
}
