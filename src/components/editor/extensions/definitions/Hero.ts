import { mergeAttributes, Node, RawCommands } from '@tiptap/core'

export const HeroDefinition = Node.create({
    name: 'hero',
    group: 'block',
    draggable: true,
    atom: true,

    addAttributes() {
        return {
            src: {
                default: null,
            },
        }
    },

    parseHTML() {
        return [{ tag: 'div[data-type="hero"]' }]
    },

    renderHTML({ HTMLAttributes }) {
        const containerClasses = 'relative w-full h-64 md:h-96 my-8 rounded-xl overflow-hidden group select-none'

        if (HTMLAttributes.src) {
            return [
                'div',
                mergeAttributes(HTMLAttributes, {
                    'data-type': 'hero',
                    class: containerClasses
                }),
                ['img', {
                    src: HTMLAttributes.src,
                    alt: 'Hero',
                    class: 'absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105'
                }]
            ]
        }
        return ['div', mergeAttributes(HTMLAttributes, {
            'data-type': 'hero',
            class: containerClasses + ' bg-muted flex flex-col items-center justify-center text-muted-foreground'
        })]
    },

    addCommands() {
        return {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            setHero: () => ({ commands }: any) => {
                return commands.insertContent({ type: this.name })
            },
        } as Partial<RawCommands>
    },
})
