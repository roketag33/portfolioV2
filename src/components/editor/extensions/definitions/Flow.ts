import { Node, mergeAttributes } from '@tiptap/core'

export const FlowDefinition = Node.create({
    name: 'flow',
    group: 'block',
    atom: true,

    addAttributes() {
        return {
            nodes: {
                default: [],
            },
            edges: {
                default: [],
            },
        }
    },

    parseHTML() {
        return [
            {
                tag: 'div[data-type="flow"]',
            },
            {
                tag: 'div.flow-diagram',
                getAttrs: (node) => {
                    if (typeof node === 'string') return {}
                    const nodes = node.getAttribute('data-nodes')
                    const edges = node.getAttribute('data-edges')
                    return {
                        nodes: nodes ? JSON.parse(nodes) : [],
                        edges: edges ? JSON.parse(edges) : [],
                    }
                }
            }
        ]
    },

    renderHTML({ HTMLAttributes }) {
        // For server rendering, we output a div with data attributes.
        // The client-side renderer will pick this up and hydration it.
        return [
            'div',
            {
                class: 'flow-diagram',
                'data-nodes': JSON.stringify(HTMLAttributes.nodes),
                'data-edges': JSON.stringify(HTMLAttributes.edges)
            }
        ]
    },
})
