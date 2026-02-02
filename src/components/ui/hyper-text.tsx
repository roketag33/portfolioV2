"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, m, Variants, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

interface HyperTextProps {
    text: string;
    duration?: number;
    framerProps?: Variants;
    className?: string;
    as?: React.ElementType;
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
    as: Component = "h1",
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
        setDisplayText(text.split(""));
    }, [text]);

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
                                ? text[i] || ""
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
        } else if (!animateInView && animateOnLoad) {
            triggerAnimation();
        }


    }, [text, isInView, animateInView, animateOnLoad]);

    // Create a motion version of the component
    const MotionComponent = m(Component);

    return (
        <div
            ref={ref}
            className="overflow-hidden py-2 flex cursor-default scale-100"
            onMouseEnter={triggerAnimation}
        >
            <AnimatePresence>
                {displayText.map((letter, i) => (
                    <MotionComponent
                        key={i}
                        className={cn("font-mono", letter === " " ? "w-3" : "", className)}
                        {...framerProps}
                    >
                        {letter?.toUpperCase()}
                    </MotionComponent>
                ))}
            </AnimatePresence>
        </div>
    );
}
