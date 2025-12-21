import { mergeAttributes, Node, RawCommands } from '@tiptap/core'

export const CalloutDefinition = Node.create({
    name: 'callout',
    group: 'block',
    content: 'paragraph+', // Can contain paragraphs
    draggable: true,

    addAttributes() {
        return {
            type: {
                default: 'info',
            },
        }
    },

    parseHTML() {
        return [{ tag: 'div[data-type="callout"]' }]
    },

    renderHTML({ HTMLAttributes }) {
        const type = HTMLAttributes.type || 'info'
        const classes = {
            info: 'bg-blue-500/10 border-blue-500/50 text-blue-500',
            warning: 'bg-yellow-500/10 border-yellow-500/50 text-yellow-500',
            success: 'bg-green-500/10 border-green-500/50 text-green-500',
            danger: 'bg-red-500/10 border-red-500/50 text-red-500',
        }
        const colorClass = classes[type as keyof typeof classes] || classes.info

        return [
            'div',
            mergeAttributes(HTMLAttributes, {
                'data-type': 'callout',
                class: `flex gap-3 p-4 rounded-lg border my-4 items-start ${colorClass}`
            }),
            0
        ]
    },

    addCommands() {
        return {
            setCallout: () => ({ commands }: any) => {
                return commands.wrapIn(this.name)
            },
            toggleCallout: () => ({ commands }: any) => {
                return commands.toggleWrap(this.name)
            },
            unsetCallout: () => ({ commands }: any) => {
                return commands.lift(this.name)
            },
        } as Partial<RawCommands>
    },
})
