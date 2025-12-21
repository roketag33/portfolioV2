import { generateHTML } from '@tiptap/html'
import StarterKit from '@tiptap/starter-kit'
import { CalloutDefinition } from '@/components/editor/extensions/definitions/Callout'
import { HeroDefinition } from '@/components/editor/extensions/definitions/Hero'
import { ImageDefinition } from '@/components/editor/extensions/definitions/Image'
import { createHighlighter } from 'shiki'

interface ServerContentRendererProps {
    content: any // Tiptap JSON content
}

import { StatsDefinition } from '@/components/editor/extensions/definitions/Stats'

// ...

export async function ServerContentRenderer({ content }: ServerContentRendererProps) {
    if (!content) return null

    // 1. Generate base HTML from Tiptap JSON
    let htmlContent = generateHTML(content, [
        StarterKit,
        CalloutDefinition,
        HeroDefinition,
        ImageDefinition,
        StatsDefinition,
    ])

    // 2. Process code blocks with Shiki
    // Find <pre><code class="language-xyz">...</code></pre> and replace with Shiki output
    try {
        const highlighter = await createHighlighter({
            themes: ['github-dark', 'github-light'],
            langs: ['javascript', 'typescript', 'css', 'html', 'json', 'bash', 'shell', 'python', 'java', 'c', 'cpp', 'sql', 'markdown', 'yaml'],
        })

        // Regex to match Tiptap's code block output: <pre><code class="language-js">content</code></pre>
        // Note: Tiptap escapes content inside code blocks.
        const codeBlockRegex = /<pre><code class="language-([^"]+)">([\s\S]*?)<\/code><\/pre>/g

        const replacements: Promise<string>[] = []
        let match

        // We need to replace async, so we gather promises first? 
        // String.replace doesn't support async replacer.
        // We will match all, generate replacements, then replace.

        const matches: { full: string, lang: string, code: string, index: number }[] = []
        while ((match = codeBlockRegex.exec(htmlContent)) !== null) {
            matches.push({ full: match[0], lang: match[1], code: match[2], index: match.index })
        }

        if (matches.length > 0) {
            // Process all matches
            for (const m of matches) {
                // Decode HTML entities in the code content (e.g. &lt; to <) because Shiki expects raw text
                const rawCode = m.code
                    .replace(/&lt;/g, '<')
                    .replace(/&gt;/g, '>')
                    .replace(/&quot;/g, '"')
                    .replace(/&#39;/g, "'")
                    .replace(/&amp;/g, '&')

                const highlighted = highlighter.codeToHtml(rawCode, {
                    lang: m.lang,
                    themes: {
                        light: 'github-light',
                        dark: 'github-dark',
                    }
                })

                // Replace the specific occurrence in the string (handling potential duplicates carefully)
                // A safer way is to split the string or use a library, but for this specific pattern, string replacement is acceptable if we are careful.
                // However, doing global replace might replace identical blocks wrong. 
                // Better to rebuild string.
            }

            // Rebuild string
            let newHtml = ''
            let lastIndex = 0

            for (const m of matches) {
                newHtml += htmlContent.substring(lastIndex, m.index)

                const rawCode = m.code
                    .replace(/&lt;/g, '<')
                    .replace(/&gt;/g, '>')
                    .replace(/&quot;/g, '"')
                    .replace(/&#39;/g, "'")
                    .replace(/&amp;/g, '&')

                try {
                    const highlighted = highlighter.codeToHtml(rawCode, {
                        lang: m.lang,
                        themes: {
                            light: 'github-light',
                            dark: 'github-dark',
                        }
                    })
                    newHtml += highlighted
                } catch (e) {
                    // Fallback if language not found
                    newHtml += m.full
                }

                lastIndex = m.index + m.full.length
            }
            newHtml += htmlContent.substring(lastIndex)
            htmlContent = newHtml
        }

    } catch (e) {
        console.error('Shiki highlighting failed:', e)
        // Fallback to original HTML if Shiki fails
    }

    return (
        <div
            className="prose prose-lg dark:prose-invert max-w-none 
            [&_figure]:my-8 [&_figure]:mx-auto [&_figure]:block 
            [&_img]:rounded-lg [&_img]:shadow-md 
            [&_pre]:bg-transparent [&_pre]:p-0 [&_pre]:m-0"
            dangerouslySetInnerHTML={{ __html: htmlContent }}
        />
    )
}
