import { generateHTML } from '@tiptap/html'
import { JSONContent } from '@tiptap/core'
import StarterKit from '@tiptap/starter-kit'
import CodeBlock from '@tiptap/extension-code-block'
import { CalloutDefinition } from '@/components/editor/extensions/definitions/Callout'
import { HeroDefinition } from '@/components/editor/extensions/definitions/Hero'
import { ImageDefinition } from '@/components/editor/extensions/definitions/Image'
import { StatsDefinition } from '@/components/editor/extensions/definitions/Stats'
import { MermaidDefinition } from '@/components/editor/extensions/definitions/Mermaid'
import { FlowDefinition } from '@/components/editor/extensions/definitions/Flow'
import { ExcalidrawDefinition } from '@/components/editor/extensions/definitions/Excalidraw'
import { createHighlighter } from 'shiki'

interface ServerContentRendererProps {
    content: JSONContent // Tiptap JSON content
}

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
        ExcalidrawDefinition
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
                    } catch {
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
            /* Text content constraint (readability) */
            [&>p]:max-w-3xl [&>p]:mx-auto 
            [&>h1]:max-w-3xl [&>h1]:mx-auto 
            [&>h2]:max-w-3xl [&>h2]:mx-auto 
            [&>h3]:max-w-3xl [&>h3]:mx-auto 
            [&>h4]:max-w-3xl [&>h4]:mx-auto 
            [&>ul]:max-w-3xl [&>ul]:mx-auto 
            [&>ol]:max-w-3xl [&>ol]:mx-auto 
            [&>li]:max-w-3xl [&>li]:mx-auto 
            [&>blockquote]:max-w-3xl [&>blockquote]:mx-auto

            /* Media and Code expansion */
            [&_figure]:my-8 [&_figure]:mx-auto [&_figure]:block [&_figure]:max-w-5xl
            [&_img]:rounded-lg [&_img]:shadow-md [&_img]:w-full
            
            /* Code blocks */
            [&_pre]:!bg-stone-900 [&_pre]:!p-6 [&_pre]:rounded-xl [&_pre]:overflow-x-auto 
            [&_pre]:border [&_pre]:border-white/10 [&_pre]:max-w-5xl [&_pre]:mx-auto [&_pre]:my-8
            
            /* Custom blocks (Excalidraw, Flow, etc) */
            [&>div[data-type]]:max-w-6xl [&>div[data-type]]:mx-auto [&>div[data-type]]:w-full"
            dangerouslySetInnerHTML={{ __html: htmlContent }}
        />
    )
}
