/* eslint-disable */
'use client'

import { useState, useEffect, Suspense } from 'react'
import Editor from '@/components/editor/Editor'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { toast } from 'sonner'
import { Eye, EyeOff, FileJson } from 'lucide-react'
import ContentRenderer from '@/components/editor/ContentRenderer'
import { SimpleModal } from '@/components/ui/simple-modal'
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
    const [content, setContent] = useState<any>(undefined)
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

    const [showPreview, setShowPreview] = useState(false)

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

    // ... (existing state)

    const handleSave = async (published: boolean) => {
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
                    content,
                    published, // Use the passed published status
                }),
            })

            if (!res.ok) throw new Error('Failed to save')

            toast.success(id ? 'Post updated!' : (published ? 'Post published!' : 'Draft saved!'))
            if (!id) {
                // Force router push instead of full reload for smoother UX, but full reload is safer for Tiptap
                router.push('/admin')
            }
        } catch (error) {
            toast.error('Something went wrong')
        } finally {
            setLoading(false)
        }
    }

    // Source Editor Logic
    const [showSource, setShowSource] = useState(false)
    const [sourceCode, setSourceCode] = useState('')
    const [editorKey, setEditorKey] = useState(0)

    const openSource = () => {
        const fullArticle = {
            title,
            excerpt,
            tags: selectedTags,
            readTime: readTimeValue ? `${readTimeValue} ${readTimeUnit}` : '',
            content
        }
        setSourceCode(JSON.stringify(fullArticle, null, 2))
        setShowSource(true)
    }

    const importSource = () => {
        try {
            const json = JSON.parse(sourceCode)

            if (json.title) setTitle(json.title)
            if (json.excerpt) setExcerpt(json.excerpt)
            if (json.tags && Array.isArray(json.tags)) {
                setSelectedTags(json.tags)
                setTags(json.tags.join(','))
            }
            if (json.readTime) {
                const [val, unit] = json.readTime.split(' ')
                setReadTimeValue(val || '')
                if (['s', 'min', 'h'].includes(unit)) setReadTimeUnit(unit)
            }
            if (json.content) {
                if (!json.content.type) {
                    toast.error('Invalid content: missing document type')
                    return
                }
                setContent(json.content)
                setEditorKey((prev) => prev + 1)
            }

            setShowSource(false)
            toast.success('Full article imported successfully')
        } catch (e) {
            toast.error('Invalid JSON content')
        }
    }

    if (fetching) return <div>Loading...</div>

    return (
        <div className={`container py-24 ${showPreview ? 'max-w-full px-4' : 'max-w-4xl'} space-y-8 transition-all duration-300`}>
            <div className="flex justify-between items-center bg-background/95 backdrop-blur sticky top-0 z-50 py-4 border-b mb-8">
                <div className="flex items-center gap-4">
                    <h1 className="text-3xl font-bold">{id ? 'Edit Article' : 'New Article'}</h1>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setShowPreview(!showPreview)}
                        className="gap-2"
                    >
                        {showPreview ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        {showPreview ? 'Hide Preview' : 'Show Preview'}
                    </Button>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={openSource}
                        className="gap-2"
                    >
                        <FileJson className="w-4 h-4" />
                        Source
                    </Button>
                </div>
                <div className="flex gap-2">
                    <Button variant="secondary" onClick={() => handleSave(false)} disabled={loading}>
                        Save Draft
                    </Button>
                    <Button onClick={() => handleSave(true)} disabled={loading}>
                        {loading ? 'Saving...' : (id ? 'Update & Publish' : 'Publish')}
                    </Button>
                </div>
            </div>

            <div className={`grid ${showPreview ? 'grid-cols-2 gap-8' : 'grid-cols-1'}`}>
                {/* Editor Column */}
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

                    {/* Metadata Box */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 border rounded-xl bg-card/50">
                        {/* ... (existing metadata inputs) ... */}
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
                                    onBlur={() => setTimeout(() => setIsTagDropdownOpen(false), 200)}
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

                    <Editor key={editorKey} content={content} onChange={setContent} />
                </div>

                {/* Preview Column */}
                {showPreview && (
                    <div className="border-l pl-8 sticky top-24 h-[calc(100vh-6rem)] overflow-y-auto hidden lg:block">
                        <div className="prose prose-lg dark:prose-invert max-w-none">
                            <h1 className="mb-4">{title || 'Untitled'}</h1>
                            <p className="lead text-xl text-muted-foreground mb-8">{excerpt}</p>
                            <ContentRenderer content={content} />
                        </div>
                    </div>
                )}

            </div>

            <SimpleModal
                isOpen={showSource}
                onClose={() => setShowSource(false)}
                title="Full Article Source (Metadata + Content)"
            >
                <div className="flex flex-col h-[600px]">
                    <div className="p-4 bg-yellow-500/10 text-yellow-500 text-xs border-b border-yellow-500/20">
                        Warning: Importing will overwrite your current title, tags, and content.
                    </div>
                    <div className="flex-1 p-4 bg-muted/30">
                        <textarea
                            className="w-full h-full bg-background border rounded-md p-4 font-mono text-xs focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none pre"
                            value={sourceCode}
                            onChange={(e) => setSourceCode(e.target.value)}
                            spellCheck={false}
                            placeholder='Paste Article JSON here...'
                        />
                    </div>
                    <div className="p-4 border-t flex justify-between bg-background rounded-b-xl">
                        <div className="flex gap-2">
                            <Button
                                variant="outline"
                                onClick={() => {
                                    navigator.clipboard.writeText(sourceCode)
                                    toast.success('Copied to clipboard')
                                }}
                            >
                                Copy JSON
                            </Button>
                        </div>
                        <div className="flex gap-2">
                            <Button variant="ghost" onClick={() => setShowSource(false)}>Cancel</Button>
                            <Button onClick={importSource}>
                                Import / Apply
                            </Button>
                        </div>
                    </div>
                </div>
            </SimpleModal>
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
