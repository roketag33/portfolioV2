import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft } from 'lucide-react'
import { getPostBySlug } from '@/lib/mdx'
import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import rehypeHighlight from 'rehype-highlight'
import { MDXComponents } from '@/components/features/MDXComponents'
import BookwormTracker from '@/components/features/BookwormTracker'

export default async function BlogPost(props: { params: Promise<{ slug: string }> }) {
    const params = await props.params;
    const post = getPostBySlug(params.slug)

    if (!post) {
        notFound()
    }

    return (
        <article className="min-h-screen pt-32 pb-20 px-6 bg-background text-foreground">
            <BookwormTracker />
            <div className="max-w-3xl mx-auto">
                <Link href="/blog" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-8 transition-colors">
                    <ArrowLeft size={20} />
                    Back to Blog
                </Link>

                <div className="mb-12">
                    <div className="flex gap-2 mb-6">
                        {post.tags.map(tag => (
                            <Badge key={tag} variant="outline" className="text-primary border-primary/20">
                                {tag}
                            </Badge>
                        ))}
                    </div>

                    <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-6 leading-tight">
                        {post.title}
                    </h1>

                    <div className="flex items-center gap-4 text-sm text-muted-foreground uppercase tracking-widest border-y border-white/10 py-4">
                        <span>{post.date}</span>
                        <span>•</span>
                        <span>{post.readTime}</span>
                    </div>
                </div>

                <div className="prose prose-invert prose-lg max-w-none">
                    <MDXRemote
                        source={post.content}
                        components={MDXComponents}
                        options={{
                            mdxOptions: {
                                rehypePlugins: [rehypeHighlight],
                            }
                        }}
                    />
                </div>

            </div>
        </article>
    )
}
