'use client'

import { ReactNodeViewRenderer } from '@tiptap/react'
import HeroComponent from './HeroComponent'
import { HeroDefinition } from './definitions/Hero'

export const HeroExtension = HeroDefinition.extend({
    addNodeView() {
        return ReactNodeViewRenderer(HeroComponent)
    },
})
