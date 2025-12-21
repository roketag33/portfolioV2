'use client'

import { NodeViewWrapper, NodeViewContent } from '@tiptap/react'
import { Info, AlertTriangle, CheckCircle, AlertOctagon } from 'lucide-react'
import { cn } from '@/lib/utils'

const CalloutComponent = ({ node, updateAttributes }: any) => {
    const type = node.attrs.type || 'info'
    const types = {
        info: { icon: Info, color: 'bg-blue-500/10 border-blue-500/50 text-blue-500' },
        warning: { icon: AlertTriangle, color: 'bg-yellow-500/10 border-yellow-500/50 text-yellow-500' },
        success: { icon: CheckCircle, color: 'bg-green-500/10 border-green-500/50 text-green-500' },
        danger: { icon: AlertOctagon, color: 'bg-red-500/10 border-red-500/50 text-red-500' },
    }
    const current = types[type as keyof typeof types] || types.info
    const Icon = current.icon

    return (
        <NodeViewWrapper className={cn("flex gap-3 p-4 rounded-lg border my-4 items-start", current.color)}>
            <div className="mt-1 select-none" contentEditable={false}>
                <Icon size={20} />
            </div>
            <div className="flex-1 min-w-0">
                <div className="font-bold mb-1 select-none cursor-pointer" onClick={() => {
                    const keys = Object.keys(types)
                    const next = keys[(keys.indexOf(type) + 1) % keys.length]
                    updateAttributes({ type: next })
                }}>
                    {type.toUpperCase()}
                </div>
                <NodeViewContent className="outline-none" />
            </div>
        </NodeViewWrapper>
    )
}

export default CalloutComponent
