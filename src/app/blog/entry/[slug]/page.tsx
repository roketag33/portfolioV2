import { PrismaClient } from '@prisma/client'
import { ServerContentRenderer } from '@/components/editor/ServerContentRenderer'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ChevronLeft } from 'lucide-react'
import MermaidInitializer from '@/components/features/MermaidInitializer'

/* 
  NOTE: In a real app we would use a singleton Prisma Client 
  mapped to global logic to avoid connection exhaustion in dev. 
  For this demo, we use a fresh instance or assume global usage if configured.
*/
const prisma = new PrismaClient()

interface Props {
    params: Promise<{ slug: string }>
}

export default async function BlogPostPage({ params }: Props) {
    const { slug } = await params
    const post = await prisma.post.findUnique({
        where: { slug },
    })

    if (!post) notFound()

    return (
        <article className="container mx-auto py-24 max-w-4xl px-6">
            <Link href="/blog">
                <Button variant="ghost" className="mb-8 hover:-translate-x-1 transition-transform group pl-0">
                    <ChevronLeft className="w-4 h-4 mr-2 group-hover:animate-pulse" />
                    Back to Blog
                </Button>
            </Link>

            <header className="mb-12 text-center space-y-6">
                <div className="flex items-center justify-center gap-4 text-sm text-foreground/60">
                    <span className="px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">
                        {post.tags?.[0] || 'Uncategorized'}
                    </span>
                    <span>•</span>
                    <time dateTime={post.createdAt.toISOString()}>
                        {new Date(post.createdAt).toLocaleDateString('en-US', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                        })}
                    </time>
                </div>

                <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70 tracking-tight">
                    {post.title}
                </h1>

                {post.excerpt && (
                    <p className="text-xl text-foreground/60 max-w-2xl mx-auto leading-relaxed">
                        {post.excerpt}
                    </p>
                )}
            </header>

            <div className="bg-background/30 backdrop-blur-sm rounded-2xl border border-border/50 p-8 md:p-12 shadow-sm">
                {typeof post.content === 'object' && post.content !== null ? (
                    <ServerContentRenderer content={post.content} />
                ) : (
                    // Fallback for legacy content or simple strings
                    <div className="prose prose-lg dark:prose-invert max-w-none">
                        {String(post.content)}
                    </div>
                )}
            </div>
            <MermaidInitializer />
        </article>
    )
}
