"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ShinyButtonProps {
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
}

export default function ShinyButton({ children, className, onClick }: ShinyButtonProps) {
    return (
        <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClick}
            className={cn(
                "relative rounded-lg px-6 py-2 font-medium transition-all duration-300 ease-out",
                "bg-neutral-900/50 text-neutral-400 border border-neutral-800",
                "hover:text-white hover:border-neutral-600",
                "overflow-hidden group",
                className
            )}
        >
            <span className="relative z-10 flex items-center gap-2">{children}</span>
            <div className="absolute inset-0 -z-10 bg-gradient-to-br from-neutral-800 to-neutral-900 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute bottom-0 left-0 h-[1px] w-0 bg-primary transition-all duration-300 group-hover:w-full" />
        </motion.button>
    );
}
