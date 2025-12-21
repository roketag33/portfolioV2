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

    if (!editor) return null

    return (
        <div className="border border-border/50 rounded-lg p-8 bg-background/50 backdrop-blur-sm min-h-[80vh]">
            <EditorContent editor={editor} />
        </div>
    )
}
