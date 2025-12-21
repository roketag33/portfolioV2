import { generateHTML } from '@tiptap/html'
import StarterKit from '@tiptap/starter-kit'
import CodeBlock from '@tiptap/extension-code-block'
import { CalloutDefinition } from '@/components/editor/extensions/definitions/Callout'
import { HeroDefinition } from '@/components/editor/extensions/definitions/Hero'
import { ImageDefinition } from '@/components/editor/extensions/definitions/Image'
import { createHighlighter } from 'shiki'

interface ServerContentRendererProps {
    content: any // Tiptap JSON content
}

import { StatsDefinition } from '@/components/editor/extensions/definitions/Stats'
import { MermaidDefinition } from '@/components/editor/extensions/definitions/Mermaid'
import { FlowDefinition } from '@/components/editor/extensions/definitions/Flow'

// ...

export async function ServerContentRenderer({ content }: ServerContentRendererProps) {
    if (!content) return null

    // 1. Generate base HTML from Tiptap JSON
    let htmlContent = generateHTML(content, [
        StarterKit.configure({
            codeBlock: false,
        }),
        CodeBlock,
        CalloutDefinition,
        HeroDefinition,
        ImageDefinition,
        StatsDefinition,
        MermaidDefinition,
        FlowDefinition,
    ])

    // 2. Process code blocks with Shiki
    // Find <pre><code class="language-xyz">...</code></pre> and replace with Shiki output
    try {
        const highlighter = await createHighlighter({
            themes: ['one-dark-pro'],
            langs: ['javascript', 'js', 'typescript', 'ts', 'css', 'html', 'json', 'bash', 'shell', 'python', 'java', 'c', 'cpp', 'sql', 'markdown', 'yaml', 'go', 'rust'],
        })

        // Match ALL pre > code blocks to ensure we don't miss any.
        // Updated to handle attributes on <pre> and whitespace (e.g. <pre class="..."> <code>)
        const codeBlockRegex = /<pre[^>]*>\s*<code([^>]*)>([\s\S]*?)<\/code>\s*<\/pre>/g

        const matches: { full: string, attrs: string, code: string, index: number }[] = []
        let match
        while ((match = codeBlockRegex.exec(htmlContent)) !== null) {
            matches.push({ full: match[0], attrs: match[1], code: match[2], index: match.index })
        }

        if (matches.length > 0) {
            let newHtml = ''
            let lastIndex = 0

            for (const m of matches) {
                // Append content before this block
                newHtml += htmlContent.substring(lastIndex, m.index)

                // Extract language from attributes
                // class="language-xyz" or class='language-xyz'
                const langMatch = m.attrs.match(/class=["'](?:[^"']*\s+)?language-([\w-]+)(?:\s+[^"']*)?["']/)
                const lang = langMatch ? langMatch[1] : 'text'

                const rawCode = m.code
                    .replace(/&lt;/g, '<')
                    .replace(/&gt;/g, '>')
                    .replace(/&quot;/g, '"')
                    .replace(/&#39;/g, "'")
                    .replace(/&amp;/g, '&')

                try {
                    const highlighted = highlighter.codeToHtml(rawCode, {
                        lang,
                        theme: 'one-dark-pro',
                    })
                    // Wrap in not-prose to avoid Tailwind Typography overriding styles
                    newHtml += `<div class="not-prose">${highlighted}</div>`
                } catch (e) {
                    console.error('Shiki highlighting failed for lang:', lang, e)
                    // Fallback to plain text highlighting if specific lang fails
                    try {
                        const plain = highlighter.codeToHtml(rawCode, {
                            lang: 'text',
                            theme: 'one-dark-pro',
                        })
                        newHtml += `<div class="not-prose">${plain}</div>`
                    } catch (e2) {
                        // Ultimate fallback: original HTML but ensures dark theme somewhat via parent class
                        newHtml += m.full
                    }
                }

                lastIndex = m.index + m.full.length
            }
            newHtml += htmlContent.substring(lastIndex)
            htmlContent = newHtml
        }
    } catch (e) {
        console.error('Shiki setup failed:', e)
    }

    return (
        <div
            className="prose prose-lg dark:prose-invert max-w-none 
            [&_figure]:my-8 [&_figure]:mx-auto [&_figure]:block 
            [&_img]:rounded-lg [&_img]:shadow-md 
            [&_pre]:!bg-stone-900 [&_pre]:!p-4 [&_pre]:rounded-lg [&_pre]:overflow-x-auto [&_pre]:border [&_pre]:border-white/10"
            dangerouslySetInnerHTML={{ __html: htmlContent }}
        />
    )
}
