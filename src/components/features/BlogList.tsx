import Link from 'next/link'
import { Badge } from '@/components/ui/badge'

const BLOG_POSTS = [
    {
        slug: 'creative-dev',
        title: 'L\'art du Creative Development',
        excerpt: 'Comment j\'ai intégré un jeu Snake directement dans mon blog.',
        date: '2025-05-20',
        readTime: '6 min read',
        tags: ['Next.js', 'Creative']
    },
    {
        slug: 'nextjs-15',
        title: 'Pourquoi Next.js 15 est le futur',
        excerpt: 'Analyse des Server Actions et de Turbopack.',
        date: '2025-04-10',
        readTime: '4 min read',
        tags: ['Tech', 'React']
    }
]

export default function BlogList() {
    return (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {BLOG_POSTS.map((post) => (
                <article
                    key={post.slug}
                    className="group relative flex flex-col justify-between h-full bg-white/5 border border-white/10 p-6 rounded-2xl hover:bg-white/10 transition-colors"
                >
                    <div>
                        <div className="flex justify-between items-center mb-4 text-xs uppercase tracking-wider text-muted-foreground">
                            <span>{post.date}</span>
                            <span>{post.readTime}</span>
                        </div>

                        <h2 className="text-2xl font-bold mb-3 leading-tight group-hover:text-primary transition-colors">
                            <Link href={`/blog/${post.slug}`} className="before:absolute before:inset-0">
                                {post.title}
                            </Link>
                        </h2>

                        <p className="text-muted-foreground line-clamp-3 mb-6">
                            {post.excerpt}
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-2 mt-auto">
                        {post.tags.map(tag => (
                            <Badge key={tag} variant="secondary" className="bg-white/5 hover:bg-white/10 text-xs">
                                {tag}
                            </Badge>
                        ))}
                    </div>
                </article>
            ))}
        </div>
    )
}
