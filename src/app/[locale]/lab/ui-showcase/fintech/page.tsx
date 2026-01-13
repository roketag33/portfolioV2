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
                className="fixed top-24 left-8 z-50 mix-blend-difference"
            >
                <Link
                    href="/lab/ui-showcase"
                    className="flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/90 hover:text-black transition-all duration-300 text-sm font-medium tracking-widest uppercase cursor-pointer"
                >
                    <ArrowLeft className="w-4 h-4" />
                    <span>BACK</span>
                </Link>
            </motion.div>

            <FintechDashboard />
        </div>
    );
}
