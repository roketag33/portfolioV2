import { Node, mergeAttributes } from '@tiptap/core'

export const StatsDefinition = Node.create({
    name: 'stats',
    group: 'block',
    atom: true,

    addAttributes() {
        return {
            items: {
                default: [
                    { label: 'Metric 1', value: '100+' },
                    { label: 'Metric 2', value: '24/7' },
                    { label: 'Metric 3', value: '500k' },
                ],
            },
        }
    },

    parseHTML() {
        return [
            {
                tag: 'div[data-type="stats"]',
            },
        ]
    },

    renderHTML({ HTMLAttributes }) {
        const items = HTMLAttributes.items || []

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const cols = items.map((item: any) => [
            'div',
            { class: 'stats-item space-y-1' },
            ['div', { class: 'text-3xl font-bold text-foreground' }, item.value],
            ['div', { class: 'text-sm font-medium text-muted-foreground uppercase tracking-wider' }, item.label]
        ])

        return [
            'div',
            mergeAttributes(HTMLAttributes, {
                'data-type': 'stats',
                class: 'grid grid-cols-1 md:grid-cols-3 gap-8 p-8 border border-border/50 rounded-xl bg-card shadow-sm my-8 not-prose'
            }),
            ...cols
        ]
    },
})
