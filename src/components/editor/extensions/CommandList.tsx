import { useState, useEffect, useCallback, useImperativeHandle, forwardRef } from 'react'
import {
    Heading1, Heading2, Heading3,
    List, ListOrdered,
    MessageSquare, Code,
    Type, CheckSquare
} from 'lucide-react'

export const CommandList = forwardRef((props: any, ref) => {
    const [selectedIndex, setSelectedIndex] = useState(0)

    const selectItem = useCallback(
        (index: number) => {
            const item = props.items[index]

            if (item) {
                // Direct execution to ensure reliability
                item.command({ editor: props.editor, range: props.range })
            }
        },
        [props]
    )

    useEffect(() => {
        setSelectedIndex(0)
    }, [props.items])

    useImperativeHandle(ref, () => ({
        onKeyDown: ({ event }: { event: KeyboardEvent }) => {
            if (event.key === 'ArrowUp') {
                setSelectedIndex((selectedIndex + props.items.length - 1) % props.items.length)
                return true
            }

            if (event.key === 'ArrowDown') {
                setSelectedIndex((selectedIndex + 1) % props.items.length)
                return true
            }

            if (event.key === 'Enter') {
                selectItem(selectedIndex)
                return true
            }

            return false
        },
    }))

    return (
        <div className="z-50 min-w-[200px] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2">
            {props.items.length ? (
                props.items.map((item: any, index: number) => (
                    <button
                        key={index}
                        type="button"
                        className={`relative flex w-full cursor-pointer select-none items-start rounded-sm px-2 py-1.5 text-sm outline-none transition-colors ${index === selectedIndex ? 'bg-accent text-accent-foreground' : 'hover:bg-accent/50'
                            }`}
                        onMouseDown={(e) => {
                            e.preventDefault() // Prevent focus loss
                            e.stopPropagation()
                            selectItem(index)
                        }}
                    >
                        <div className="flex h-5 w-5 shrink-0 items-center justify-center mr-2 mt-0.5">
                            <item.icon className="h-4 w-4" />
                        </div>
                        <div className="flex flex-col items-start">
                            <span className="font-medium">{item.title}</span>
                            <span className="text-xs text-muted-foreground">{item.description}</span>
                        </div>
                    </button>
                ))
            ) : (
                <div className="p-2 text-sm text-muted-foreground">No result</div>
            )}
        </div>
    )
})

CommandList.displayName = 'CommandList'
