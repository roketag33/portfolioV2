"use client";



interface TextRevealProps {
    text: string;
    className?: string;
}

export default function TextReveal({ text, className }: TextRevealProps) {
    return (
        <div className={`relative overflow-hidden ${className}`}>
            <div className="flex flex-col transition-transform duration-300 group-hover:-translate-y-full">
                <span className="block py-1">{text}</span>
                <span className="block py-1 absolute top-full left-0 font-bold">
                    {text}
                </span>
            </div>
        </div>
    );
}
