import SnakeGame from '@/components/features/SnakeGame'
import { Badge } from '@/components/ui/badge'

// Map HTML tags to custom styles or components
export const MDXComponents = {
    // Custom Components
    SnakeGame,
    Badge,

    // Styled HTML elements
    h1: (props: any) => <h1 className="text-3xl md:text-5xl font-black uppercase mt-12 mb-6 text-primary" {...props} />,
    h2: (props: any) => <h2 className="text-2xl md:text-3xl font-bold uppercase mt-10 mb-4 tracking-tight" {...props} />,
    p: (props: any) => <p className="text-lg opacity-80 leading-relaxed mb-6" {...props} />,
    ul: (props: any) => <ul className="list-disc list-inside mb-6 space-y-2 opacity-80" {...props} />,
    li: (props: any) => <li className="text-lg" {...props} />,
    code: (props: any) => <code className="bg-white/10 rounded px-2 py-1 font-mono text-sm text-primary" {...props} />,
    pre: (props: any) => <pre className="bg-black/50 border border-white/10 rounded-xl p-6 overflow-x-auto mb-8" {...props} />,
}
