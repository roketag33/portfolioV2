import { Node, mergeAttributes } from '@tiptap/core'

export const MermaidDefinition = Node.create({
    name: 'mermaid',
    group: 'block',
    atom: true,

    addAttributes() {
        return {
            code: {
                default: 'graph TD; A-->B;',
            },
        }
    },

    parseHTML() {
        return [
            {
                tag: 'div[data-type="mermaid"]',
            },
            {
                tag: 'div.mermaid',
                getAttrs: (node) => {
                    if (typeof node === 'string') return {}
                    return {
                        code: node.textContent,
                    }
                }
            }
        ]
    },

    renderHTML({ HTMLAttributes }) {
        // For server rendering, we output the raw code in a div.mermaid
        // The client-side initializer will pick this up and render it.
        return ['div', { class: 'mermaid' }, HTMLAttributes.code]
    },
})
