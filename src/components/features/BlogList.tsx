'use client'

import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
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
    coverImage?: string
}

export default function BlogList() {
    const [posts, setPosts] = useState<Post[]>([])
    const [search, setSearch] = useState('')
    const [selectedTag, setSelectedTag] = useState<string | null>(null)
    const [page, setPage] = useState(1)
    const ITEMS_PER_PAGE = 6

    useEffect(() => {
        getPosts().then((dbPosts: any[]) => {
            const formatted = dbPosts
                .filter((p: any) => p.published)
                .sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                .map((p: any) => ({
                    id: p.id,
                    slug: p.slug,
                    title: p.title,
                    excerpt: p.excerpt || 'No description',
                    date: p.createdAt,
                    readTime: p.readTime || '5 min read',
                    tags: p.tags && p.tags.length > 0 ? p.tags : ['Blog'],
                    coverImage: p.coverImage
                }))
            setPosts(formatted)
        })
    }, [])

    // Filter Logic
    const filteredPosts = posts.filter(post => {
        const matchesSearch = post.title.toLowerCase().includes(search.toLowerCase()) ||
            (post.excerpt?.toLowerCase() || '').includes(search.toLowerCase())
        const matchesTag = selectedTag ? post.tags?.includes(selectedTag) : true
        return matchesSearch && matchesTag
    })

    // Pagination Logic
    const totalPages = Math.ceil(filteredPosts.length / ITEMS_PER_PAGE)
    const paginatedPosts = filteredPosts.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE)

    // Featured Article (First one of the filtered list, or absolute latest if no filter)
    // If searching or filtering, we don't show specific "Featured", just the list
    const featuredPost = !search && !selectedTag && page === 1 && posts.length > 0 ? posts[0] : null
    const listPosts = featuredPost ? paginatedPosts.slice(1) : paginatedPosts

    return (
        <div className="space-y-12">
            {/* Filters */}
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                <Input
                    placeholder="Search articles..."
                    className="max-w-md bg-white/5 border-white/10"
                    value={search}
                    onChange={(e) => { setSearch(e.target.value); setPage(1) }}
                />
                <div className="flex gap-2 overflow-x-auto max-w-full pb-2 no-scrollbar">
                    <Badge
                        variant={selectedTag === null ? "default" : "outline"}
                        className="cursor-pointer whitespace-nowrap"
                        onClick={() => { setSelectedTag(null); setPage(1) }}
                    >
                        All
                    </Badge>
                    {Array.from(new Set(posts.flatMap(p => p.tags || []))).map(tag => (
                        <Badge
                            key={tag}
                            variant={selectedTag === tag ? "default" : "outline"}
                            className="cursor-pointer whitespace-nowrap"
                            onClick={() => { setSelectedTag(tag); setPage(1) }}
                        >
                            {tag}
                        </Badge>
                    ))}
                </div>
            </div>

            {/* Featured Post */}
            {featuredPost && (
                <article className="group relative grid md:grid-cols-2 gap-8 bg-white/5 border border-white/10 p-8 rounded-3xl hover:bg-white/10 transition-colors">
                    {featuredPost.coverImage && (
                        <div className="aspect-video relative rounded-xl overflow-hidden bg-black/20">
                            <img src={featuredPost.coverImage} alt={featuredPost.title} className="object-cover w-full h-full" />
                        </div>
                    )}
                    <div className="flex flex-col justify-center">
                        <div className="flex gap-2 mb-4">
                            {featuredPost.tags?.map(tag => (
                                <Badge key={tag} variant="secondary">{tag}</Badge>
                            ))}
                        </div>
                        <h2 className="text-4xl font-bold mb-4 group-hover:text-primary transition-colors">
                            <Link href={featuredPost.id ? `/blog/entry/${featuredPost.slug}` : `/blog/${featuredPost.slug}`}>
                                <span className="absolute inset-0 z-10" />
                                {featuredPost.title}
                            </Link>
                        </h2>
                        <p className="text-lg text-muted-foreground mb-6">{featuredPost.excerpt}</p>
                        <div className="text-sm text-muted-foreground">
                            {typeof featuredPost.date === 'string' ? featuredPost.date : formatDistance(new Date(featuredPost.date!), new Date(), { addSuffix: true })} · {featuredPost.readTime}
                        </div>
                    </div>
                </article>
            )}

            {/* Grid */}
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {listPosts.map((post) => (
                    <article
                        key={post.slug}
                        className="group relative flex flex-col justify-between h-full bg-white/5 border border-white/10 p-6 rounded-2xl hover:bg-white/10 transition-colors"
                    >
                        {post.coverImage && (
                            <div className="aspect-video mb-4 rounded-lg overflow-hidden bg-black/20 relative">
                                <img src={post.coverImage} alt={post.title} className="object-cover w-full h-full" />
                            </div>
                        )}
                        <div>
                            <div className="flex justify-between items-center mb-4 text-xs uppercase tracking-wider text-muted-foreground">
                                <span>
                                    {typeof post.date === 'string'
                                        ? post.date
                                        : formatDistance(new Date(post.date!), new Date(), { addSuffix: true })}
                                </span>
                                <span>{post.readTime}</span>
                            </div>

                            <h2 className="text-2xl font-bold mb-3 leading-tight group-hover:text-primary transition-colors">
                                <Link
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
                                <Badge key={tag} variant="secondary" className="bg-white/5 hover:bg-white/10 text-xs text-white">
                                    {tag}
                                </Badge>
                            ))}
                        </div>
                    </article>
                ))}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
                <div className="flex justify-center gap-2 mt-8">
                    <Button
                        variant="ghost"
                        disabled={page === 1}
                        onClick={() => setPage(p => p - 1)}
                    >
                        Previous
                    </Button>
                    <span className="flex items-center px-4 text-sm text-muted-foreground">
                        Page {page} of {totalPages}
                    </span>
                    <Button
                        variant="ghost"
                        disabled={page === totalPages}
                        onClick={() => setPage(p => p + 1)}
                    >
                        Next
                    </Button>
                </div>
            )}
        </div>
    )
}
