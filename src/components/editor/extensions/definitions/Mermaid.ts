import { Node } from '@tiptap/core'

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

    renderHTML({ node }) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return ['div', { class: 'mermaid' }, (node.attrs as any).code]
    },
})
