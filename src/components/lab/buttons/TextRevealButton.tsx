'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function TextRevealButton({ children = "Explore" }: { children?: React.ReactNode }) {
    return (
        <motion.button
            className="group relative px-8 py-3 bg-white text-black font-medium rounded-full overflow-hidden"
            whileHover="hover"
        >
            <div className="relative overflow-hidden">
                {/* Initial Text */}
                <motion.span
                    className="flex items-center gap-2"
                    variants={{
                        hover: { y: "-150%" }
                    }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                    {children}
                </motion.span>

                {/* Hidden Text */}
                <motion.span
                    className="absolute inset-0 flex items-center justify-center gap-2"
                    variants={{
                        hover: { y: 0 }
                    }}
                    initial={{ y: "150%" }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                    Let's Go <ArrowRight className="w-4 h-4" />
                </motion.span>
            </div>
        </motion.button>
    );
}
