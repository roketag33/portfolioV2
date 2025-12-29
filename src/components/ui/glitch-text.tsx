"use client";

import { cn } from "@/lib/utils";

interface GlitchTextProps {
    text: string;
    className?: string;
}

export default function GlitchText({ text, className }: GlitchTextProps) {
    return (
        <div className={cn("relative inline-block overflow-hidden group", className)}>
            <span className="relative z-10 block transition-transform duration-300 group-hover:-translate-y-[2px]">
                {text}
            </span>
            <span
                className="absolute top-0 left-0 -z-10 w-full h-full text-red-500 opacity-0 group-hover:opacity-100 group-hover:translate-x-[2px] transition-all duration-100 select-none"
                aria-hidden="true"
            >
                {text}
            </span>
            <span
                className="absolute top-0 left-0 -z-10 w-full h-full text-blue-500 opacity-0 group-hover:opacity-100 group-hover:-translate-x-[2px] transition-all duration-100 select-none"
                aria-hidden="true"
            >
                {text}
            </span>
            <span
                className="absolute top-0 left-0 -z-10 w-full h-full text-green-500 opacity-0 group-hover:opacity-100 group-hover:translate-y-[2px] transition-all duration-100 select-none"
                aria-hidden="true"
            >
                {text}
            </span>
        </div>
    );
}
