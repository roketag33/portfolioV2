'use client'

import { ReactNodeViewRenderer } from '@tiptap/react'
import { FlowDefinition } from './definitions/Flow'
import FlowComponent from './FlowComponent'

export const FlowExtension = FlowDefinition.extend({
    addNodeView() {
        return ReactNodeViewRenderer(FlowComponent)
    },
})
