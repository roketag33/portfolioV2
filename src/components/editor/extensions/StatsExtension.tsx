'use client'

import { ReactNodeViewRenderer } from '@tiptap/react'
import StatsComponent from './StatsComponent'
import { StatsDefinition } from './definitions/Stats'

export const StatsExtension = StatsDefinition.extend({
    addNodeView() {
        return ReactNodeViewRenderer(StatsComponent)
    },
})
