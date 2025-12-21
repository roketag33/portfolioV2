'use client'

import { ReactNodeViewRenderer } from '@tiptap/react'
import CalloutComponent from './CalloutComponent'
import { CalloutDefinition } from './definitions/Callout'

export const CalloutExtension = CalloutDefinition.extend({
    addNodeView() {
        return ReactNodeViewRenderer(CalloutComponent)
    },
})
