'use client'

import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import { ReactNodeViewRenderer } from '@tiptap/react'
import CodeBlockComponent from './CodeBlockComponent'

// We don't configure lowlight here because it needs to be passed instance
// from the main Editor.tsx where 'lowlight' (from 'lowlight' package) is initialized.
export const CodeBlockExtension = CodeBlockLowlight.extend({
    addNodeView() {
        return ReactNodeViewRenderer(CodeBlockComponent)
    },
}).configure({
    // Default language is auto
    defaultLanguage: null,
})
