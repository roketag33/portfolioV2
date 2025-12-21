import { Node, mergeAttributes, RawCommands } from '@tiptap/core'
import { ReactNodeViewRenderer } from '@tiptap/react'
import ImageComponent from './ImageComponent'

export const ImageExtension = Node.create({
    name: 'imageBlock',
    group: 'block',
    draggable: true,
    atom: true,

    addAttributes() {
        return {
            src: {
                default: null,
            },
            alt: {
                default: null,
            },
            title: {
                default: null,
            },
        }
    },

    parseHTML() {
        return [
            {
                tag: 'figure[data-type="image-block"]',
            },
        ]
    },

    renderHTML({ HTMLAttributes }) {
        const { src, alt, title } = HTMLAttributes

        return ['figure', mergeAttributes(HTMLAttributes, {
            'data-type': 'image-block',
            class: 'my-8 group relative leading-none'
        }),
            ['div', { class: 'relative rounded-lg overflow-hidden border border-border bg-muted' },
                ['img', {
                    src: src || '',
                    alt: alt || '',
                    class: 'w-full h-auto max-h-[600px] object-contain'
                }]
            ],
            ...(title ? [['figcaption', { class: 'mt-2 text-center text-sm text-muted-foreground' }, title]] : [])
        ]
    },

    addNodeView() {
        return ReactNodeViewRenderer(ImageComponent)
    },

    addCommands() {
        return {
            setImageBlock: () => ({ commands }: any) => {
                return commands.insertContent({ type: this.name })
            },
        } as Partial<RawCommands>
    },
})
