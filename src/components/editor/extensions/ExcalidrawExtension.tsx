
import { ReactNodeViewRenderer } from '@tiptap/react'
import { ExcalidrawDefinition } from './definitions/Excalidraw'
import ExcalidrawComponent from './ExcalidrawComponent'

export const ExcalidrawExtension = ExcalidrawDefinition.extend({
    addNodeView() {
        return ReactNodeViewRenderer(ExcalidrawComponent)
    },
})
