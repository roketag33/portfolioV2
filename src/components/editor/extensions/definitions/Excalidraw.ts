import { Node } from '@tiptap/core'
// ReactNodeViewRenderer unused

export const ExcalidrawDefinition = Node.create({
    name: 'excalidraw',
    group: 'block',
    atom: true,

    addAttributes() {
        return {
            elements: {
                default: [],
                parseHTML: element => {
                    const data = element.getAttribute('data-elements')
                    return data ? JSON.parse(data) : []
                },
            },
            appState: {
                default: {},
                parseHTML: element => {
                    const data = element.getAttribute('data-app-state')
                    return data ? JSON.parse(data) : {}
                },
            },
        }
    },

    parseHTML() {
        return [
            {
                tag: 'div[data-type="excalidraw"]',
            },
        ]
    },

    renderHTML({ HTMLAttributes }) {
        return ['div', {
            'data-type': 'excalidraw',
            'data-elements': JSON.stringify(HTMLAttributes.elements),
            'data-app-state': JSON.stringify(HTMLAttributes.appState)
            // We don't spread ...HTMLAttributes to avoid [object Object] mess in class or other standard attrs if they conflict
        }]
    },
})
