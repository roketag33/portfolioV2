'use client'

import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { useEffect, useState } from 'react'
import { getPosts } from '@/app/actions/blog'
import { formatDistance } from 'date-fns'

/* Combined type for local + db posts */
type Post = {
    id?: string
    slug: string
    title: string
    excerpt?: string
    date: string | Date
    readTime?: string
    tags?: string[]
}

export default function BlogList() {
    const [posts, setPosts] = useState<Post[]>([])

    useEffect(() => {
        getPosts().then((dbPosts: any[]) => {
            const formatted = dbPosts.map((p: any) => ({
                id: p.id,
                slug: p.slug,
                title: p.title,
                excerpt: p.excerpt || 'No description',
                date: p.createdAt,
                readTime: p.readTime || '5 min read',
                tags: p.tags && p.tags.length > 0 ? p.tags : ['Blog']
            }))
            setPosts(formatted)
        })
    }, [])

    return (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
                <article
                    key={post.slug}
                    className="group relative flex flex-col justify-between h-full bg-white/5 border border-white/10 p-6 rounded-2xl hover:bg-white/10 transition-colors"
                >
                    <div>
                        <div className="flex justify-between items-center mb-4 text-xs uppercase tracking-wider text-muted-foreground">
                            <span>
                                {typeof post.date === 'string'
                                    ? post.date
                                    : formatDistance(new Date(post.date), new Date(), { addSuffix: true })}
                            </span>
                            <span>{post.readTime} to read</span>
                        </div>

                        <h2 className="text-2xl font-bold mb-3 leading-tight group-hover:text-primary transition-colors">
                            <Link
                                // Route logic: if it has an ID, it's from DB -> /blog/entry/, else /blog/ (mdx)
                                href={post.id ? `/blog/entry/${post.slug}` : `/blog/${post.slug}`}
                                className="before:absolute before:inset-0"
                            >
                                {post.title}
                            </Link>
                        </h2>

                        <p className="text-muted-foreground line-clamp-3 mb-6">
                            {post.excerpt}
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-2 mt-auto">
                        {post.tags?.map(tag => (
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
