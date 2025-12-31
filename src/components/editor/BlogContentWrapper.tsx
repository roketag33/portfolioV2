'use client'
import { JSONContent } from '@tiptap/core'

import dynamic from 'next/dynamic'

const ContentRenderer = dynamic(() => import('./ContentRenderer'), {
    ssr: false,
    loading: () => <div className="prose dark:prose-invert animate-pulse space-y-4">
        <div className="h-4 bg-muted rounded w-3/4"></div>
        <div className="h-4 bg-muted rounded w-1/2"></div>
        <div className="h-4 bg-muted rounded w-full"></div>
    </div>
})

export default function BlogContentWrapper({ content }: { content: JSONContent }) {
    // Force remount when content changes to avoid Tiptap update issues
    return <ContentRenderer key={JSON.stringify(content)} content={content} />
}
