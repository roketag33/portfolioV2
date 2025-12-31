import SnakeGame from '@/components/features/SnakeGame'
import FractalGenerator from '@/components/features/FractalGenerator'
import { ProjectCard3D } from '@/components/ui/project-card-3d'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

// Map HTML tags to custom styles or components
export const MDXComponents = {
    // Custom Components
    SnakeGame,
    FractalGenerator,
    ProjectCard3D,
    Button,
    Badge,

    // Styled HTML elements
    h1: (props: React.ComponentPropsWithoutRef<'h1'>) => <h1 className="text-3xl md:text-5xl font-black uppercase mt-12 mb-6 text-primary" {...props} />,
    h2: (props: React.ComponentPropsWithoutRef<'h2'>) => <h2 className="text-2xl md:text-3xl font-bold uppercase mt-10 mb-4 tracking-tight" {...props} />,
    p: (props: React.ComponentPropsWithoutRef<'p'>) => <p className="text-lg opacity-80 leading-relaxed mb-6" {...props} />,
    ul: (props: React.ComponentPropsWithoutRef<'ul'>) => <ul className="list-disc list-inside mb-6 space-y-2 opacity-80" {...props} />,
    li: (props: React.ComponentPropsWithoutRef<'li'>) => <li className="text-lg" {...props} />,
    code: (props: React.ComponentPropsWithoutRef<'code'>) => <code className="bg-white/10 rounded px-2 py-1 font-mono text-sm text-primary" {...props} />,
    pre: (props: React.ComponentPropsWithoutRef<'pre'>) => <pre className="bg-black/50 border border-white/10 rounded-xl p-6 overflow-x-auto mb-8" {...props} />,
}
