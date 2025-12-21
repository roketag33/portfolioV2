'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'
import { all, createLowlight } from 'lowlight'
import { CodeBlockExtension } from '@/components/editor/extensions/CodeBlockExtension'
import { CalloutExtension } from '@/components/editor/extensions/CalloutExtension'
import { SlashCommand } from '@/components/editor/extensions/slash-command'
import { HeroExtension } from '@/components/editor/extensions/HeroExtension'
import { ImageExtension } from '@/components/editor/extensions/ImageExtension'
import { StatsExtension } from '@/components/editor/extensions/StatsExtension'
import { MermaidExtension } from '@/components/editor/extensions/MermaidExtension'
import { FlowExtension } from '@/components/editor/extensions/FlowExtension'
import { useState } from 'react'
import { FileJson } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { SimpleModal } from '@/components/ui/simple-modal'
import { toast } from 'sonner'
import { ExcalidrawExtension } from './extensions/ExcalidrawExtension'

interface EditorProps {
    content?: string | object
    onChange?: (content: object) => void
}

const lowlight = createLowlight(all)

export default function Editor({ content, onChange }: EditorProps) {
    const editor = useEditor({
        immediatelyRender: false,
        extensions: [
            StarterKit.configure({
                codeBlock: false,
            }),
            CodeBlockExtension.configure({
                lowlight,
            }),
            Placeholder.configure({
                placeholder: 'Write something amazing... Type / for commands',
            }),
            CalloutExtension,
            HeroExtension,
            ImageExtension,
            StatsExtension,
            MermaidExtension,
            FlowExtension,
            ExcalidrawExtension,
            SlashCommand,
        ],
        content: content || '',
        editorProps: {
            attributes: {
                class: 'prose prose-lg dark:prose-invert max-w-none focus:outline-none min-h-[500px]',
            },
        },
        onUpdate: ({ editor }) => {
            const json = editor.getJSON()
            if (onChange) onChange(json)
        },
    })

    // Source Editor Logic
    const [showSource, setShowSource] = useState(false)
    const [sourceCode, setSourceCode] = useState('')

    const openSource = () => {
        if (!editor) return
        setSourceCode(JSON.stringify(editor.getJSON(), null, 2))
        setShowSource(true)
    }

    const importSource = () => {
        if (!editor) return
        try {
            const json = JSON.parse(sourceCode)
            editor.commands.setContent(json)
            setShowSource(false)
            toast.success('Content imported successfully')
        } catch (e) {
            toast.error('Invalid JSON content')
        }
    }

    if (!editor) return null

    return (
        <div className="border border-border/50 rounded-lg bg-background/50 backdrop-blur-sm min-h-[80vh] flex flex-col relative">
            <div className="flex justify-end p-2 border-b border-border/50 bg-muted/20 rounded-t-lg gap-2">
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={openSource}
                    className="gap-2 text-muted-foreground hover:text-foreground"
                    title="View Source / Import JSON"
                >
                    <FileJson className="w-4 h-4" />
                    <span className="text-xs uppercase font-semibold tracking-wider">Source</span>
                </Button>
            </div>

            <div className="p-8 flex-1">
                <EditorContent editor={editor} />
            </div>

            <SimpleModal
                isOpen={showSource}
                onClose={() => setShowSource(false)}
                title="Article Source (JSON)"
            >
                <div className="flex flex-col h-[600px]">
                    <div className="flex-1 p-4 bg-muted/30">
                        <textarea
                            className="w-full h-full bg-background border rounded-md p-4 font-mono text-xs focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
                            value={sourceCode}
                            onChange={(e) => setSourceCode(e.target.value)}
                            spellCheck={false}
                            placeholder='Paste Tiptap JSON content here...'
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
