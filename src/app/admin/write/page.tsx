'use client'

import { useState, useEffect, Suspense } from 'react'
import Editor from '@/components/editor/Editor'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { toast } from 'sonner'
import { useRouter, useSearchParams } from 'next/navigation'
import { getPost } from '@/app/actions/getPost'

function WriteContent() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const id = searchParams.get('id')

    const [title, setTitle] = useState('')
    const [excerpt, setExcerpt] = useState('')
    const [tags, setTags] = useState('') // Comma separated (derived from selectedTags)
    const [readTime, setReadTime] = useState('') // (derived from readTimeValue and readTimeUnit)
    const [content, setContent] = useState<object>({})
    const [loading, setLoading] = useState(false)
    const [fetching, setFetching] = useState(!!id)

    const [readTimeValue, setReadTimeValue] = useState('')
    const [readTimeUnit, setReadTimeUnit] = useState('min')
    const [selectedTags, setSelectedTags] = useState<string[]>([])

    // Derived state for saving
    useEffect(() => {
        if (readTimeValue) {
            setReadTime(`${readTimeValue} ${readTimeUnit}`)
        } else {
            setReadTime('')
        }
    }, [readTimeValue, readTimeUnit])

    useEffect(() => {
        setTags(selectedTags.join(','))
    }, [selectedTags])

    // Load initial data
    useEffect(() => {
        if (id) {
            getPost(id).then((post: any) => {
                if (post) {
                    setTitle(post.title)
                    setExcerpt(post.excerpt || '')

                    // Parse tags
                    if (post.tags && Array.isArray(post.tags)) {
                        setSelectedTags(post.tags)
                        setTags(post.tags.join(','))
                    }

                    // Parse read time (simple heuristic)
                    if (post.readTime) {
                        const [val, unit] = post.readTime.split(' ')
                        setReadTimeValue(val || '')
                        // Normalise unit if needed, for now keep simple
                        if (['s', 'min', 'h'].includes(unit)) {
                            setReadTimeUnit(unit)
                        }
                    }

                    setContent(post.content as object)
                }
                setFetching(false)
            })
        }
    }, [id])

    const [tagSearch, setTagSearch] = useState('')
    const [isTagDropdownOpen, setIsTagDropdownOpen] = useState(false)

    const PREDEFINED_TAGS = [
        'Next.js', 'React', 'TypeScript', 'TailwindCSS',
        'Design', 'Creative', 'Tutorial', 'Career',
        'Postgres', 'Prisma', 'Docker', 'Engineering',
        'UI/UX', 'Animation', 'Performance'
    ]

    const filteredTags = PREDEFINED_TAGS.filter(tag =>
        tag.toLowerCase().includes(tagSearch.toLowerCase()) &&
        !selectedTags.includes(tag)
    )

    const addTag = (tag: string) => {
        if (!selectedTags.includes(tag)) {
            setSelectedTags([...selectedTags, tag])
        }
        setTagSearch('')
        setIsTagDropdownOpen(false)
    }

    const removeTag = (tagToRemove: string) => {
        setSelectedTags(selectedTags.filter(tag => tag !== tagToRemove))
    }

    const handleSave = async () => {
        if (!title) {
            toast.error('Please enter a title')
            return
        }

        setLoading(true)
        try {
            const res = await fetch('/api/posts', {
                method: id ? 'PUT' : 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    id,
                    title,
                    excerpt,
                    tags: selectedTags,
                    readTime: readTimeValue ? `${readTimeValue} ${readTimeUnit}` : '',
                    content
                }),
            })

            if (!res.ok) throw new Error('Failed to save')

            toast.success(id ? 'Post updated!' : 'Post created!')
            if (!id) {
                // Force full reload to clear editor state and avoid Tiptap crash
                window.location.href = '/admin'
            }
        } catch (error) {
            toast.error('Something went wrong')
        } finally {
            setLoading(false)
        }
    }

    if (fetching) return <div>Loading...</div>

    return (
        <div className="container py-24 max-w-4xl space-y-8">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">{id ? 'Edit Article' : 'New Article'}</h1>
                <Button onClick={handleSave} disabled={loading}>
                    {loading ? 'Saving...' : (id ? 'Update' : 'Publish')}
                </Button>
            </div>

            <div className="space-y-6">
                <Input
                    placeholder="Article Title"
                    className="text-4xl font-black py-8 border-none bg-transparent focus-visible:ring-0 placeholder:text-muted-foreground/50 h-auto"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

                <Input
                    placeholder="Excerpt (Subtitle)"
                    value={excerpt}
                    onChange={(e) => setExcerpt(e.target.value)}
                    className="text-lg"
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 border rounded-xl bg-card/50">
                    <div className="space-y-3">
                        <label className="text-sm font-medium text-muted-foreground">Read Time</label>
                        <div className="flex gap-2">
                            <Input
                                type="number"
                                placeholder="Value"
                                value={readTimeValue}
                                onChange={(e) => setReadTimeValue(e.target.value)}
                                className="w-24"
                            />
                            <select
                                className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                value={readTimeUnit}
                                onChange={(e) => setReadTimeUnit(e.target.value)}
                            >
                                <option value="s">Seconds (s)</option>
                                <option value="min">Minutes (min)</option>
                                <option value="h">Hours (h)</option>
                            </select>
                        </div>
                    </div>

                    <div className="space-y-3 relative">
                        <label className="text-sm font-medium text-muted-foreground">Tags</label>
                        <div className="relative">
                            <Input
                                placeholder="Search tags..."
                                value={tagSearch}
                                onChange={(e) => {
                                    setTagSearch(e.target.value)
                                    setIsTagDropdownOpen(true)
                                }}
                                onFocus={() => setIsTagDropdownOpen(true)}
                                onBlur={() => setTimeout(() => setIsTagDropdownOpen(false), 200)} // Delay to allow click
                            />
                            {isTagDropdownOpen && filteredTags.length > 0 && (
                                <div className="absolute z-10 w-full mt-1 bg-popover text-popover-foreground rounded-md border shadow-md max-h-40 overflow-y-auto">
                                    {filteredTags.map(tag => (
                                        <button
                                            key={tag}
                                            className="w-full text-left px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground transition-colors"
                                            onClick={() => addTag(tag)}
                                        >
                                            {tag}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className="flex flex-wrap gap-2 pt-2">
                            {selectedTags.map(tag => (
                                <Badge
                                    key={tag}
                                    variant="secondary"
                                    className="cursor-pointer hover:bg-destructive hover:text-destructive-foreground transition-colors"
                                    onClick={() => removeTag(tag)}
                                >
                                    {tag}
                                    <span className="ml-1 opacity-50">×</span>
                                </Badge>
                            ))}
                            {selectedTags.length === 0 && (
                                <span className="text-xs text-muted-foreground italic pl-1">No tags selected</span>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <Editor content={content} onChange={setContent} />
        </div>
    )
}

export default function WritePage() {
    return (
        <Suspense fallback={<div>Loading editor...</div>}>
            <WriteContent />
        </Suspense>
    )
}
