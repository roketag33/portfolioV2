import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft } from 'lucide-react'
import SnakeGame from '@/components/features/SnakeGame'

// Mock Data Enhanced
const POST = {
    title: 'L\'art du Creative Development',
    date: '2025-05-20',
    readTime: '6 min read',
    tags: ['Next.js', 'Creative', 'GameDev'],
}

export default function BlogPost({ params }: { params: { slug: string } }) {
    // In a real app with MDX working, we would fetch post by slug
    // const post = getPostBySlug(params.slug)

    return (
        <article className="min-h-screen pt-32 pb-20 px-6 bg-background text-foreground">
            <div className="max-w-3xl mx-auto">
                <Link href="/blog" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-8 transition-colors">
                    <ArrowLeft size={20} />
                    Back to Blog
                </Link>

                <div className="mb-12">
                    <div className="flex gap-2 mb-6">
                        {POST.tags.map(tag => (
                            <Badge key={tag} variant="outline" className="text-primary border-primary/20">
                                {tag}
                            </Badge>
                        ))}
                    </div>

                    <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-6 leading-tight">
                        {POST.title}
                    </h1>

                    <div className="flex items-center gap-4 text-sm text-muted-foreground uppercase tracking-widest border-y border-white/10 py-4">
                        <span>{POST.date}</span>
                        <span>•</span>
                        <span>{POST.readTime}</span>
                    </div>
                </div>

                <div className="prose prose-invert prose-lg max-w-none">
                    <p>
                        Bienvenue sur cet article de démonstration. L'objectif était de montrer comment intégrer des éléments interactifs au sein de contenu textuel.
                    </p>
                    <h2 className="text-2xl font-bold uppercase mt-8 mb-4">Demo Interactive</h2>
                    <p>
                        Voici une instance du jeu Snake exécutée directement dans la page de l'article :
                    </p>

                    <div className="my-12 not-prose">
                        <SnakeGame />
                    </div>

                    <p>
                        Cette approche permet de créer des tutoriels immersifs où le lecteur peut expérimenter directement les concepts expliqués.
                    </p>
                </div>

            </div>
        </article>
    )
}
