'use client'

import { NodeViewWrapper } from '@tiptap/react'
import { BarChart3 } from 'lucide-react'

export default function StatsComponent(props: any) {
    const updateItem = (index: number, field: 'label' | 'value', value: string) => {
        const newItems = [...props.node.attrs.items]
        newItems[index] = { ...newItems[index], [field]: value }
        props.updateAttributes({
            items: newItems
        })
    }

    return (
        <NodeViewWrapper className="my-8">
            <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-6 text-muted-foreground">
                    <BarChart3 className="w-5 h-5" />
                    <span className="text-sm font-medium uppercase tracking-wider">Key Metrics</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {props.node.attrs.items.map((item: any, index: number) => (
                        <div key={index} className="space-y-2">
                            <input
                                type="text"
                                className="w-full bg-transparent text-3xl font-bold text-foreground border-none p-0 focus:ring-0 placeholder:text-muted-foreground/30"
                                placeholder="00%"
                                value={item.value}
                                onChange={(e) => updateItem(index, 'value', e.target.value)}
                            />
                            <input
                                type="text"
                                className="w-full bg-transparent text-sm font-medium text-muted-foreground border-none p-0 focus:ring-0 placeholder:text-muted-foreground/30"
                                placeholder="Metric Label"
                                value={item.label}
                                onChange={(e) => updateItem(index, 'label', e.target.value)}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </NodeViewWrapper>
    )
}
