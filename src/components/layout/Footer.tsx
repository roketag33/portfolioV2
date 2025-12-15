export default function Footer() {
    return (
        <footer className="w-full py-12 px-6 border-t border-border/10 bg-background relative z-10">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-end gap-8">
                <div>
                    <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-4">
                        Let's work <br /> together
                    </h2>
                    <a href="mailto:contact@roketag.com" className="text-xl text-primary hover:underline">
                        contact@roketag.com
                    </a>
                </div>

                <div className="flex flex-col items-end gap-4">
                    <div className="flex gap-4">
                        <a href="https://github.com/roketag33" target="_blank" rel="noopener noreferrer" className="uppercase text-sm hover:text-primary transition-colors">GitHub</a>
                        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="uppercase text-sm hover:text-primary transition-colors">LinkedIn</a>
                    </div>
                    <p className="text-xs text-muted-foreground uppercase opacity-50">
                        © {new Date().getFullYear()} Alexandre Sarrazin. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    )
}
