'use client'

import { ReactNodeViewRenderer } from '@tiptap/react'
import ImageComponent from './ImageComponent'
import { ImageDefinition } from './definitions/Image'

export const ImageExtension = ImageDefinition.extend({
    addNodeView() {
        return ReactNodeViewRenderer(ImageComponent)
    },
})
