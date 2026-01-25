import React from 'react';

export default function Logo({ className = "", width = 32, height = 32 }: { className?: string, width?: number, height?: number }) {
    return (
        <svg
            width={width}
            height={height}
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
            aria-label="Alexandre Sarrazin Logo"
        >
            <path
                d="M50 10L10 90H30L50 50L70 90H90L50 10Z"
                fill="currentColor"
                className="opacity-90"
            />
            <path
                d="M30 90L50 40L70 90"
                stroke="currentColor"
                strokeWidth="4"
                className="opacity-50"
            />
        </svg>
    );
}
