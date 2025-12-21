'use client'

import { useMemo } from 'react'
import { generateHTML } from '@tiptap/html'
import StarterKit from '@tiptap/starter-kit'
import { CalloutExtension } from '@/components/editor/extensions/CalloutExtension'
import { HeroExtension } from '@/components/editor/extensions/HeroExtension'
import { ImageExtension } from '@/components/editor/extensions/ImageExtension'
import { StatsExtension } from '@/components/editor/extensions/StatsExtension'
import { CodeBlockExtension } from '@/components/editor/extensions/CodeBlockExtension'
import { MermaidExtension } from '@/components/editor/extensions/MermaidExtension'

// ... (in useMemo)

interface ContentRendererProps {
    content: any
}

export default function ContentRenderer({ content }: ContentRendererProps) {
    const output = useMemo(() => {
        if (!content) return ''

        return generateHTML(content, [
            StarterKit,
            CalloutExtension,
            HeroExtension,
            ImageExtension,
            // Add missing extensions for preview
            CodeBlockExtension,
            StatsExtension,
            MermaidExtension,
        ])
    }, [content])

    return (
        <div
            className="prose prose-lg dark:prose-invert max-w-none [&_figure]:my-8 [&_img]:rounded-lg"
            dangerouslySetInnerHTML={{ __html: output }}
        />
    )
}
