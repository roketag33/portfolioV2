import { PrismaClient } from '@prisma/client'
import { ServerContentRenderer } from '@/components/editor/ServerContentRenderer'
import { notFound } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { ChevronLeft, Share2, Bookmark, MoreHorizontal } from 'lucide-react'
import MermaidInitializer from '@/components/features/MermaidInitializer'
import FlowHydrator from '@/components/features/FlowHydrator'
import ExcalidrawHydrator from '@/components/features/ExcalidrawHydrator'
import ReadingProgress from '@/components/features/ReadingProgress'
import RelatedContent from '@/components/features/RelatedContent'
import { Link } from '@/i18n/routingConfig'
import Image from 'next/image'
import { getPosts } from '@/app/actions/blog'
import { JSONContent } from '@tiptap/core'

import type { Metadata } from 'next'

const prisma = new PrismaClient()

interface Props {
    params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params
    const post = await prisma.post.findUnique({
        where: { slug },
    })

    if (!post) {
        return {
            title: 'Post Not Found',
        }
    }

    return {
        title: post.title,
        description: post.excerpt || `Read this article on Alexandre's Blog.`,
        openGraph: {
            title: post.title,
            description: post.excerpt || undefined,
            type: 'article',
            publishedTime: post.createdAt.toISOString(),
            authors: ['Alexandre Sarrazin'],
        }
    }
}

export default async function BlogPostPage({ params }: Props) {
    const { slug } = await params
    const post = await prisma.post.findUnique({
        where: { slug },
    })

    if (!post) notFound()

    return (
        <article className="min-h-screen bg-background relative selection:bg-primary/20">
            <ReadingProgress />

            <div className="max-w-screen-xl mx-auto px-4 sm:px-6">
                <header className="pt-32 pb-16 max-w-3xl mx-auto">
                    <div className="flex items-center justify-between mb-12">
                        <Link href="/blog">
                            <Button variant="ghost" className="hover:-translate-x-1 transition-transform group pl-0 text-muted-foreground hover:text-foreground">
                                <ChevronLeft className="w-4 h-4 mr-2 group-hover:animate-pulse" />
                                Back to Blog
                            </Button>
                        </Link>
                        <div className="flex items-center gap-4 text-muted-foreground">
                            <Share2 className="w-5 h-5 cursor-pointer hover:text-foreground transition-colors" />
                            <Bookmark className="w-5 h-5 cursor-pointer hover:text-foreground transition-colors" />
                            <MoreHorizontal className="w-5 h-5 cursor-pointer hover:text-foreground transition-colors" />
                        </div>
                    </div>

                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-8 leading-[1.15] font-sans">
                        {post.title}
                    </h1>

                    <div className="flex items-center gap-4 mb-10">
                        <div className="relative w-12 h-12 rounded-full overflow-hidden bg-primary/10 border border-primary/20">
                            <div className="absolute inset-0 flex items-center justify-center font-bold text-primary">AS</div>
                        </div>
                        <div className="flex flex-col">
                            <span className="font-medium text-foreground">Alexandre Sarrazin</span>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <span>{post.readTime || '5 min read'}</span>
                                <span>·</span>
                                <time dateTime={post.createdAt.toISOString()} suppressHydrationWarning>
                                    {new Date(post.createdAt).toLocaleDateString('fr-FR', {
                                        month: 'short',
                                        day: 'numeric',
                                        year: 'numeric',
                                    })}
                                </time>
                            </div>
                        </div>
                    </div>

                    {post.coverImage && (
                        <div className="relative aspect-video w-full mb-12 rounded-2xl overflow-hidden border border-border/40">
                            <Image
                                src={post.coverImage}
                                alt={post.title}
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>
                    )}
                </header>

                <main className="pb-24">
                    {typeof post.content === 'object' && post.content !== null ? (
                        <ServerContentRenderer content={post.content as unknown as JSONContent} />
                    ) : (
                        <div className="prose prose-lg dark:prose-invert max-w-none font-newsreader [&>p]:max-w-3xl [&>p]:mx-auto [&>p]:text-xl [&>p]:leading-relaxed">
                            {String(post.content)}
                        </div>
                    )}
                </main>

                <footer className="max-w-3xl mx-auto pt-16 pb-32 border-t border-border/40">
                </footer>
            </div>

            <RelatedContent
                currentSlug={slug}
                tags={post.tags}
                allPosts={await getPosts()}
            />

            <MermaidInitializer />
            <FlowHydrator />
            <ExcalidrawHydrator />
        </article>
    )
}
