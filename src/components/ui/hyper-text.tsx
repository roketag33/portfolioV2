"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, Variants, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

interface HyperTextProps {
    text: string;
    duration?: number;
    framerProps?: Variants;
    className?: string;
    animateOnLoad?: boolean;
    animateInView?: boolean;
}

const alphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

const getRandomInt = (max: number) => Math.floor(Math.random() * max);

export default function HyperText({
    text,
    duration = 800,
    framerProps = {
        initial: { opacity: 0, y: -10 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: 3 },
    },
    className,
    animateOnLoad = true,
    animateInView = false,
}: HyperTextProps) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });
    const [displayText, setDisplayText] = useState(text.split(""));
    const [trigger, setTrigger] = useState(false);
    const interations = useRef(0);
    const isFirstRender = useRef(true);

    const triggerAnimation = () => {
        interations.current = 0;
        setTrigger(true);
    };

    useEffect(() => {
        const interval = setInterval(() => {
            if (!trigger) {
                clearInterval(interval);
                return;
            }
            if (interations.current < text.length) {
                setDisplayText((t) =>
                    t.map((l, i) =>
                        l === " "
                            ? l
                            : i <= interations.current
                                ? text[i]
                                : alphabets[getRandomInt(26)]
                    )
                );
                interations.current = interations.current + 0.1;
            } else {
                setTrigger(false);
                clearInterval(interval);
            }
        }, duration / (text.length * 10));
        // Clean up interval on unmount
        return () => clearInterval(interval);
    }, [text, duration, trigger]);

    useEffect(() => {
        if (!animateOnLoad && isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }

        if (animateInView && isInView) {
            triggerAnimation();
        } else if (!animateInView) {
            triggerAnimation();
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [text, isInView, animateInView]);

    return (
        <div
            ref={ref}
            className="overflow-hidden py-2 flex cursor-default scale-100"
            onMouseEnter={triggerAnimation}
        >
            <AnimatePresence mode="wait">
                {displayText.map((letter, i) => (
                    <motion.h1
                        key={i}
                        className={cn("font-mono", letter === " " ? "w-3" : "", className)}
                        {...framerProps}
                    >
                        {letter.toUpperCase()}
                    </motion.h1>
                ))}
            </AnimatePresence>
        </div>
    );
}
