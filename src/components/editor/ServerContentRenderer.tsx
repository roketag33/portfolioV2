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
        <div className="font-newsreader selection:bg-primary/20 max-w-3xl mx-auto w-full">
            <div
                className="prose prose-lg dark:prose-invert max-w-none
                /* Baseline styling for all content */
                [&>p]:text-[21px] [&>p]:leading-[1.6] [&>p]:text-foreground/90 [&>p]:mb-8
                [&>h1]:font-sans [&>h1]:font-bold [&>h1]:tracking-tight [&>h1]:text-4xl [&>h1]:mt-16 [&>h1]:mb-6
                [&>h2]:font-sans [&>h2]:font-bold [&>h2]:mt-16 [&>h2]:mb-6 [&>h2]:text-3xl
                [&>h3]:font-sans [&>h3]:font-bold [&>h3]:mt-12 [&>h3]:mb-4 [&>h3]:text-2xl
                [&>ul]:mb-8 [&>ul]:pl-10
                [&>ol]:mb-8 [&>ol]:pl-10
                [&>blockquote]:border-l-[3px] [&>blockquote]:border-foreground [&>blockquote]:pl-8 [&>blockquote]:italic [&>blockquote]:text-3xl [&>blockquote]:my-12 [&>blockquote]:py-2 [&>blockquote]:text-foreground/80 [&>blockquote]:font-newsreader

                /* First paragraph drop cap */
                [&>p:first-of-type]:first-letter:text-[88px] 
                [&>p:first-of-type]:first-letter:font-bold 
                [&>p:first-of-type]:first-letter:float-left 
                [&>p:first-of-type]:first-letter:mr-3 
                [&>p:first-of-type]:first-letter:mt-3
                [&>p:first-of-type]:first-letter:leading-[0.8]
                [&>p:first-of-type]:first-letter:font-sans
                [&>p:first-of-type]:first-letter:text-foreground

                /* Interactive & Custom blocks - perfectly aligned with text baseline */
                [&_figure]:my-12 [&_figure]:max-w-none
                [&_img]:rounded-sm
                
                [&>.not-prose]:my-12 [&>.not-prose]:max-w-none
                [&_pre]:!bg-stone-900 [&_pre]:!p-8 [&_pre]:!pl-0 [&_pre]:rounded-sm [&_pre]:overflow-x-auto 
                [&_pre]:border [&_pre]:border-white/5 [&_pre]:text-sm [&_pre]:leading-relaxed
                
                [&>div[data-type]]:my-12 [&>div[data-type]]:max-w-none
                /* Ensure Mermaid diagrams are left-aligned */
                [&_.mermaid]:text-left [&_.mermaid_svg]:!mx-0 [&_.mermaid_svg]:!block
                "
                dangerouslySetInnerHTML={{ __html: htmlContent }}
            />
        </div>
    )
}
