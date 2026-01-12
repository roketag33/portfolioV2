'use client'
import { Link } from '@/i18n/routingConfig'
import Image from 'next/image'
import { motion } from 'framer-motion'

interface BlogPost {
    id: string
    title: string
    slug: string
    createdAt: Date
    excerpt: string | null
    readTime: string | null
    tags: string[]
    coverImage?: string | null
}

interface RelatedContentProps {
    currentSlug: string
    tags: string[]
    allPosts: BlogPost[]
}

export default function RelatedContent({ currentSlug, tags, allPosts }: RelatedContentProps) {
    const relatedPosts = allPosts
        .filter(p => p.slug !== currentSlug)
        .filter(p => p.tags.some((t: string) => tags.includes(t)))
        .slice(0, 3)

    if (relatedPosts.length === 0) {
        // Fallback to latest posts if no tags match
        relatedPosts.push(...allPosts.filter(p => p.slug !== currentSlug).slice(0, 3))
    }

    return (
        <section className="bg-muted/30 py-24 border-t border-border/40">
            <div className="max-w-3xl mx-auto px-4 sm:px-6">
                <h2 className="text-3xl font-bold mb-12">More from Alexandre Sarrazin</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {relatedPosts.map((post, i) => (
                        <motion.div
                            key={post.slug}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="flex flex-col group"
                        >
                            <Link href={`/blog/entry/${post.slug}`} className="flex flex-col h-full">
                                {post.coverImage && (
                                    <div className="relative aspect-video rounded-xl overflow-hidden mb-4 border border-border/40">
                                        <Image
                                            src={post.coverImage}
                                            alt={post.title}
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                    </div>
                                )}
                                {!post.coverImage && (
                                    <div className="aspect-video rounded-xl mb-4 bg-primary/5 border border-primary/10 flex items-center justify-center">
                                        <span className="text-primary/40 font-bold text-4xl">{post.title.charAt(0)}</span>
                                    </div>
                                )}
                                <h3 className="text-xl font-bold line-clamp-2 group-hover:text-primary transition-colors mb-2">
                                    {post.title}
                                </h3>
                                <p className="text-muted-foreground text-sm line-clamp-2 mb-4">
                                    {post.excerpt}
                                </p>
                                <div className="mt-auto flex items-center gap-2 text-xs font-medium text-muted-foreground" suppressHydrationWarning>
                                    <span>{post.readTime || '5 min read'}</span>
                                    <span>·</span>
                                    <span>{new Date(post.createdAt).toLocaleDateString('fr-FR')}</span>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
