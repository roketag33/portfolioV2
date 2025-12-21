'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Plus, Edit, Trash2 } from 'lucide-react'
import { getPosts } from '@/app/actions/blog'
import { format } from 'date-fns'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

/* Combined type for local + db posts */
type Post = {
    id?: string
    slug: string
    title: string
    excerpt?: string
    published: boolean
    createdAt: Date
    // ... other fields
}

export default function AdminPage() {
    const [posts, setPosts] = useState<Post[]>([])
    const router = useRouter()

    useEffect(() => {
        loadPosts()
    }, [])

    const loadPosts = async () => {
        const dbPosts = await getPosts({ includeDrafts: true })
        setPosts(dbPosts as any) // Cast for simplicity in this iteration
    }

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure?')) return

        try {
            await fetch(`/api/posts?id=${id}`, { method: 'DELETE' })
            toast.success('Post deleted')
            loadPosts()
        } catch (e) {
            toast.error('Failed to delete')
        }
    }

    return (
        <div className="container py-24 max-w-4xl space-y-8">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">Admin Dashboard</h1>
                <Link href="/admin/write">
                    <Button>
                        <Plus className="mr-2 h-4 w-4" />
                        New Article
                    </Button>
                </Link>
            </div>

            <div className="rounded-lg border bg-card">
                {posts.map((post) => (
                    <div key={post.id} className="flex items-center justify-between p-4 border-b last:border-0">
                        <div>
                            <div className="font-semibold">{post.title}</div>
                            <div className="text-sm text-muted-foreground flex gap-4">
                                <span>{post.published ? 'Published' : 'Draft'}</span>
                                <span>{format(new Date(post.createdAt), 'MMM d, yyyy')}</span>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <Link href={`/admin/write?id=${post.id}`}>
                                <Button variant="ghost" size="icon">
                                    <Edit className="h-4 w-4" />
                                </Button>
                            </Link>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="text-destructive hover:text-destructive hover:bg-destructive/10"
                                onClick={() => post.id && handleDelete(post.id)}
                            >
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                ))}
                {posts.length === 0 && (
                    <div className="p-8 text-center text-muted-foreground">
                        No posts found. Start writing!
                    </div>
                )}
            </div>
        </div>
    )
}
