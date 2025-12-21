'use client'

import { NodeViewContent, NodeViewWrapper } from '@tiptap/react'
import { Check, ChevronDown, Copy } from 'lucide-react'
import { useState } from 'react'

const extensionLanguages = [
    { label: 'Auto', value: null },
    { label: 'JavaScript', value: 'javascript' },
    { label: 'TypeScript', value: 'typescript' },
    { label: 'HTML', value: 'html' },
    { label: 'CSS', value: 'css' },
    { label: 'JSON', value: 'json' },
    { label: 'Bash', value: 'bash' },
    { label: 'Python', value: 'python' },
    { label: 'Java', value: 'java' },
    { label: 'C++', value: 'cpp' },
    { label: 'Go', value: 'go' },
    { label: 'Rust', value: 'rust' },
    { label: 'SQL', value: 'sql' },
    { label: 'Markdown', value: 'markdown' },
    { label: 'YAML', value: 'yaml' },
]

export default function CodeBlockComponent({ node, updateAttributes, extension }: any) {
    const [copied, setCopied] = useState(false)

    const handleCopy = () => {
        const text = node.textContent
        navigator.clipboard.writeText(text)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    return (
        <NodeViewWrapper className="relative group my-6 rounded-lg overflow-hidden border border-border bg-stone-900 shadow-sm">
            <div className="flex items-center justify-between px-4 py-2 bg-stone-950 border-b border-white/10">
                <div className="relative">
                    <select
                        contentEditable={false}
                        defaultValue={node.attrs.language || 'null'}
                        onChange={(event) => updateAttributes({ language: event.target.value === 'null' ? null : event.target.value })}
                        className="bg-transparent text-xs font-medium text-muted-foreground hover:text-foreground focus:outline-none appearance-none pr-6 cursor-pointer"
                    >
                        {extensionLanguages.map((lang) => (
                            <option key={lang.value || 'auto'} value={lang.value || 'null'}>
                                {lang.label}
                            </option>
                        ))}
                    </select>
                    <ChevronDown className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 text-muted-foreground pointer-events-none" />
                </div>

                <button
                    onClick={handleCopy}
                    className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                    {copied ? (
                        <>
                            <Check className="w-3.5 h-3.5" />
                            <span>Copied</span>
                        </>
                    ) : (
                        <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copy</span>
                        </>
                    )}
                </button>
            </div>

            <pre className="!m-0 !p-4 !bg-transparent text-sm font-mono leading-relaxed overflow-x-auto">
                <NodeViewContent as={"code" as any} className={node.attrs.language ? `language-${node.attrs.language}` : ''} />
            </pre>
        </NodeViewWrapper>
    )
}
