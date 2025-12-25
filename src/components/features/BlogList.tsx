'use client'

import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useEffect, useState } from 'react'
import { getPosts } from '@/app/actions/blog'
import { formatDistance } from 'date-fns'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, X } from 'lucide-react'
import confetti from 'canvas-confetti'

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

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
}

const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
}

import { useGamification } from '@/context/GamificationContext'
import { cn } from '@/lib/utils'

// ... (existing types)

export default function BlogList() {
    const { unlock } = useGamification()
    const [posts, setPosts] = useState<Post[]>([])
    const [search, setSearch] = useState('')
    const [selectedTag, setSelectedTag] = useState<string | null>(null)
    const [page, setPage] = useState(1)

    // Achievement States
    const [searchedTags, setSearchedTags] = useState<Set<string>>(new Set())
    const [isOracleMode, setIsOracleMode] = useState(false)
    const [placeholderIndex, setPlaceholderIndex] = useState(0)
    const oraclePlaceholders = [
        "Computing...",
        "The Answer is...",
        "Don't Panic...",
        "Life, Universe, Everything...",
        "42"
    ]

    useEffect(() => {
        if (isOracleMode) {
            const interval = setInterval(() => {
                setPlaceholderIndex(prev => (prev + 1) % oraclePlaceholders.length)
            }, 2000)
            return () => clearInterval(interval)
        }
    }, [isOracleMode])

    // Handle Search Change (Oracle)
    const handleSearchChange = (value: string) => {
        setSearch(value)
        setPage(1)

        if (value.trim() === '42') {
            setIsOracleMode(true)
            unlock('THE_ORACLE')
        } else {
            setIsOracleMode(false)
        }
    }

    // Handle Tag Click (Topic Hunter)
    const handleTagClick = (tag: string | null) => {
        setSelectedTag(tag)
        setPage(1)

        if (tag) {
            const newTags = new Set(searchedTags)
            newTags.add(tag)
            setSearchedTags(newTags)

            if (newTags.size === 3) {
                unlock('TOPIC_HUNTER')
                confetti({
                    particleCount: 150,
                    spread: 80,
                    origin: { y: 0.6 },
                    colors: ['#FFD700', '#FFA500', '#ffffff'] // Gold theme
                })
            }
        }
    }

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

    // Featured Article logic
    const showFeatured = !search && !selectedTag && page === 1 && posts.length > 0
    const featuredPost = showFeatured ? posts[0] : null
    const listPosts = showFeatured ? paginatedPosts.slice(1) : paginatedPosts

    return (
        <div className="space-y-12">
            {/* Search & Filters */}
            <div className="space-y-6">
                <div className="relative max-w-lg mx-auto md:mx-0 group">
                    <Search className={cn(
                        "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors",
                        isOracleMode ? "text-green-500 animate-pulse" : "text-muted-foreground group-focus-within:text-primary"
                    )} />

                    {/* Matrix Glitch Overlay - Replaced Galaxy */}
                    <div className={cn(
                        "absolute inset-0 rounded-full border border-green-500/50 opacity-0 transition-opacity duration-300",
                        isOracleMode && "opacity-100 shadow-[0_0_10px_rgba(34,197,94,0.3)] bg-black"
                    )} />

                    <Input
                        placeholder={isOracleMode ? oraclePlaceholders[placeholderIndex] : "Search for articles, insights..."}
                        className={cn(
                            "pl-10 transition-all rounded-full h-11 border-white/10 relative z-10",
                            isOracleMode
                                ? "bg-black text-green-500 font-mono tracking-wider border-green-500/50 focus-visible:ring-green-500/50 placeholder:text-green-700"
                                : "bg-white/5 focus-visible:ring-primary/50 focus-visible:border-primary"
                        )}
                        value={search}
                        onChange={(e) => handleSearchChange(e.target.value)}
                    />
                    {isOracleMode && (
                        <div className="absolute right-12 top-1/2 -translate-y-1/2 text-[10px] font-mono text-green-700 animate-pulse pointer-events-none">
                            SYSTEM_OVERRIDE
                        </div>
                    )}
                    {search && (
                        <button
                            onClick={() => handleSearchChange('')}
                            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-white/10 rounded-full transition-colors"
                        >
                            <X className={cn("w-3 h-3", isOracleMode ? "text-green-500" : "text-muted-foreground")} />
                        </button>
                    )}
                </div>

                <div className="flex flex-wrap gap-2 items-center">
                    <span className="text-sm font-medium text-muted-foreground mr-2">Topics:</span>
                    <motion.div className="flex flex-wrap gap-2">
                        <Badge
                            variant={selectedTag === null ? "default" : "secondary"}
                            className={`cursor-pointer transition-all hover:scale-105 ${selectedTag === null ? 'bg-primary text-primary-foreground' : 'bg-white/5 hover:bg-white/10'}`}
                            onClick={() => handleTagClick(null)}
                        >
                            All
                        </Badge>
                        {Array.from(new Set(posts.flatMap(p => p.tags || []))).map(tag => {
                            // Don't show gold border if we've already hit the target
                            const isHunted = searchedTags.has(tag) && searchedTags.size < 3
                            return (
                                <Badge
                                    key={tag}
                                    variant={selectedTag === tag ? "default" : "secondary"}
                                    className={cn(
                                        "cursor-pointer transition-all hover:scale-105",
                                        selectedTag === tag ? 'bg-primary text-primary-foreground' : 'bg-white/5 hover:bg-white/10',
                                        isHunted && "border-yellow-500/50 shadow-[0_0_10px_rgba(234,179,8,0.2)] text-yellow-500"
                                    )}
                                    onClick={() => handleTagClick(tag)}
                                >
                                    {tag}
                                </Badge>
                            )
                        })}
                    </motion.div>
                </div>
            </div>

            <AnimatePresence mode="wait">
                {/* Featured Post */}
                {featuredPost && (
                    <motion.div
                        key="featured"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                    >
                        <article className="group relative grid md:grid-cols-2 gap-8 bg-gradient-to-br from-white/5 to-white/0 border border-white/10 p-8 rounded-3xl overflow-hidden hover:border-primary/20 transition-all duration-500">
                            <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                            {featuredPost.coverImage && (
                                <div className="aspect-video relative rounded-2xl overflow-hidden shadow-2xl">
                                    <img
                                        src={featuredPost.coverImage}
                                        alt={featuredPost.title}
                                        className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-700"
                                    />
                                </div>
                            )}
                            <div className="flex flex-col justify-center relative z-10">
                                <div className="flex gap-2 mb-6">
                                    <Badge className="bg-primary/20 text-primary border-primary/50 hover:bg-primary/30">Latest</Badge>
                                    {featuredPost.tags?.map(tag => (
                                        <Badge key={tag} variant="secondary" className="bg-white/10 text-xs backdrop-blur-sm">{tag}</Badge>
                                    ))}
                                </div>
                                <h2 className="text-4xl md:text-5xl font-black mb-6 leading-tight tracking-tight group-hover:text-primary transition-colors">
                                    <Link href={featuredPost.id ? `/blog/entry/${featuredPost.slug}` : `/blog/${featuredPost.slug}`}>
                                        <span className="absolute inset-0 z-10" />
                                        {featuredPost.title}
                                    </Link>
                                </h2>
                                <p className="text-lg text-muted-foreground mb-8 leading-relaxed">{featuredPost.excerpt}</p>
                                <div className="flex items-center gap-4 text-sm text-muted-foreground font-medium">
                                    <span>{typeof featuredPost.date === 'string' ? featuredPost.date : formatDistance(new Date(featuredPost.date!), new Date(), { addSuffix: true })}</span>
                                    <span className="w-1 h-1 rounded-full bg-white/20" />
                                    <span>{featuredPost.readTime}</span>
                                </div>
                            </div>
                        </article>
                    </motion.div>
                )}

                {/* Grid */}
                <motion.div
                    key="grid"
                    variants={container}
                    initial="hidden"
                    animate="show"
                    layout
                    className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
                >
                    {listPosts.map((post) => (
                        <motion.article
                            key={post.slug}
                            variants={item}
                            layout
                            className="group relative flex flex-col h-full bg-white/5 border border-white/10 p-5 rounded-2xl hover:bg-white/10 hover:border-white/20 hover:-translate-y-1 transition-all duration-300"
                        >
                            {post.coverImage && (
                                <div className="aspect-[16/10] mb-5 rounded-xl overflow-hidden bg-black/20 relative">
                                    <img
                                        src={post.coverImage}
                                        alt={post.title}
                                        className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-500"
                                    />
                                </div>
                            )}
                            <div className="flex-1 flex flex-col">
                                <div className="flex justify-between items-center mb-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground/80">
                                    <span>
                                        {typeof post.date === 'string'
                                            ? post.date
                                            : formatDistance(new Date(post.date!), new Date(), { addSuffix: true })}
                                    </span>
                                    <span>{post.readTime}</span>
                                </div>

                                <h2 className="text-xl font-bold mb-3 leading-snug group-hover:text-primary transition-colors line-clamp-2">
                                    <Link
                                        href={post.id ? `/blog/entry/${post.slug}` : `/blog/${post.slug}`}
                                        className="before:absolute before:inset-0"
                                    >
                                        {post.title}
                                    </Link>
                                </h2>

                                <p className="text-muted-foreground text-sm line-clamp-3 mb-6">
                                    {post.excerpt}
                                </p>

                                <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-white/5">
                                    {post.tags?.slice(0, 3).map(tag => (
                                        <Badge key={tag} variant="secondary" className="bg-white/5 hover:bg-white/10 text-[10px] px-2 h-5 text-muted-foreground">
                                            {tag}
                                        </Badge>
                                    ))}
                                    {post.tags && post.tags.length > 3 && (
                                        <span className="text-[10px] text-muted-foreground self-center">+{post.tags.length - 3}</span>
                                    )}
                                </div>
                            </div>
                        </motion.article>
                    ))}
                </motion.div>
            </AnimatePresence>

            {/* Pagination Controls */}
            {totalPages > 1 && (
                <div className="flex justify-center gap-2 mt-12">
                    <Button
                        variant="outline"
                        size="sm"
                        disabled={page === 1}
                        onClick={() => { setPage(p => p - 1); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
                        className="rounded-full px-6"
                    >
                        Previous
                    </Button>
                    <div className="flex items-center gap-1 px-4">
                        {Array.from({ length: totalPages }).map((_, i) => (
                            <div
                                key={i}
                                className={`w-2 h-2 rounded-full transition-all ${page === i + 1 ? 'bg-primary scale-125' : 'bg-white/20'}`}
                            />
                        ))}
                    </div>
                    <Button
                        variant="outline"
                        size="sm"
                        disabled={page === totalPages}
                        onClick={() => { setPage(p => p + 1); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
                        className="rounded-full px-6"
                    >
                        Next
                    </Button>
                </div>
            )}
        </div>
    )
}
