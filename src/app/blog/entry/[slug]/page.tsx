import { PrismaClient } from '@prisma/client'
import BlogContentWrapper from '@/components/editor/BlogContentWrapper'
import { notFound } from 'next/navigation'
import { format } from 'date-fns'

/* 
  NOTE: In a real app we would use a singleton Prisma Client 
  mapped to global logic to avoid connection exhaustion in dev. 
  For this demo, we use a fresh instance or assume global usage if configured.
*/
const prisma = new PrismaClient()

interface Props {
    params: Promise<{ slug: string }>
}

import { Badge } from '@/components/ui/badge'

export default async function BlogPostPage({ params }: Props) {
    const { slug } = await params
    const post = await prisma.post.findUnique({
        where: { slug },
    })

    if (!post) return notFound()

    return (
        <article className="container py-24 max-w-4xl">
            <header className="mb-12 border-b border-border/50 pb-8 space-y-6">
                <div className="space-y-4">
                    <h1 className="text-5xl font-black tracking-tight">{post.title}</h1>
                    {post.excerpt && (
                        <p className="text-xl text-muted-foreground">{post.excerpt}</p>
                    )}
                </div>

                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                        <span>{format(post.createdAt, 'MMMM d, yyyy')}</span>
                        {post.readTime && (
                            <>
                                <span>•</span>
                                <span>{post.readTime} to read</span>
                            </>
                        )}
                    </div>

                    {post.tags && post.tags.length > 0 && (
                        <div className="flex gap-2">
                            {post.tags.map(tag => (
                                <Badge key={tag} variant="outline">{tag}</Badge>
                            ))}
                        </div>
                    )}
                </div>
            </header>

            {(post.content && typeof post.content === 'object') ? (
                <BlogContentWrapper content={post.content as object} />
            ) : (
                <div className="prose dark:prose-invert">
                    {/* Fallback for old content or empty */}
                    <p>No content available.</p>
                </div>
            )}
        </article>
    )
}
