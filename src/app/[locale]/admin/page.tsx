'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Plus, Edit, Trash2 } from 'lucide-react'
import { getPosts } from '@/app/actions/blog'
import { format } from 'date-fns'
import { toast } from 'sonner'

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

import { ACHIEVEMENTS } from '@/lib/achievements'

// ... existing imports

export default function AdminPage() {
    const [posts, setPosts] = useState<Post[]>([])
    const [activeTab, setActiveTab] = useState<'posts' | 'achievements'>('posts')

    const loadPosts = async () => {
        const dbPosts = await getPosts({ includeDrafts: true })
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        setPosts(dbPosts as any) // Cast for simplicity in this iteration
    }

    useEffect(() => {
        // eslint-disable-next-line
        loadPosts()
    }, [])

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure?')) return

        try {
            await fetch(`/api/posts?id=${id}`, { method: 'DELETE' })
            toast.success('Post deleted')
            loadPosts()
        } catch (e) {
            console.error(e)
            toast.error('Failed to delete')
        }
    }

    return (
        <div className="container py-24 max-w-4xl space-y-8">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">Admin Dashboard</h1>
                <div className="flex gap-4">
                    <div className="flex bg-muted p-1 rounded-lg">
                        <button
                            onClick={() => setActiveTab('posts')}
                            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === 'posts' ? 'bg-background shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
                        >
                            Articles
                        </button>
                        <button
                            onClick={() => setActiveTab('achievements')}
                            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === 'achievements' ? 'bg-background shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
                        >
                            Succès
                        </button>
                    </div>
                    {activeTab === 'posts' && (
                        <Link href="/admin/write">
                            <Button>
                                <Plus className="mr-2 h-4 w-4" />
                                Nouvel Article
                            </Button>
                        </Link>
                    )}
                </div>
            </div>

            {activeTab === 'posts' ? (
                <div className="rounded-lg border bg-card">
                    {posts.map((post) => (
                        <div key={post.id} className="flex items-center justify-between p-4 border-b last:border-0">
                            <div>
                                <div className="font-semibold">{post.title}</div>
                                <div className="text-sm text-muted-foreground flex gap-4">
                                    <span>{post.published ? 'Publié' : 'Brouillon'}</span>
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
                            Aucun article trouvé. Commencez à écrire !
                        </div>
                    )}
                </div>
            ) : (
                <div className="grid gap-4">
                    <div className="rounded-lg border bg-card overflow-hidden">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-muted/50 border-b">
                                <tr>
                                    <th className="p-4 font-medium">Icône</th>
                                    <th className="p-4 font-medium">ID</th>
                                    <th className="p-4 font-medium">Titre</th>
                                    <th className="p-4 font-medium">Guide de Déblocage</th>
                                    <th className="p-4 font-medium">XP</th>
                                    <th className="p-4 font-medium">Secret</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Object.values(ACHIEVEMENTS).map((ach) => (
                                    <tr key={ach.id} className="border-b last:border-0 hover:bg-muted/50">
                                        <td className="p-4 text-2xl">{ach.icon}</td>
                                        <td className="p-4 font-mono text-xs">{ach.id}</td>
                                        <td className="p-4 font-semibold">{ach.title}</td>
                                        <td className="p-4 text-muted-foreground whitespace-pre-wrap max-w-xs">{ach.unlockHint || ach.description}</td>
                                        <td className="p-4 font-mono">+{ach.xp}</td>
                                        <td className="p-4">
                                            {ach.secret ? (
                                                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-500/10 text-yellow-500 border border-yellow-500/20">
                                                    Oui
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-500/10 text-green-500 border border-green-500/20">
                                                    Non
                                                </span>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    )
}
