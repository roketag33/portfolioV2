import { Extension, Editor, Range } from '@tiptap/core'
import Suggestion, { SuggestionProps } from '@tiptap/suggestion'
import { ReactRenderer } from '@tiptap/react'
import tippy from 'tippy.js'
import { CommandList } from './CommandList'
import {
    Heading1, Heading2, Heading3,
    List, ListOrdered,
    MessageSquare, Code,
    Type,
    Image as ImageIcon,
    BarChart3,
    Network,
    PenTool
} from 'lucide-react'

const getSuggestionItems = ({ query }: { query: string }) => {
    return [
        {
            title: 'Image',
            description: 'Upload an image with caption.',
            searchTerms: ['photo', 'picture', 'media'],
            icon: ImageIcon,
            command: ({ editor, range }: CommandProps) => {
                editor
                    .chain()
                    .focus()
                    .deleteRange(range)
                    .run()
                // We use insertContent instead of setNode because our imageBlock is a block node
                const node = { type: 'imageBlock' }
                editor.commands.insertContent(node)
            },
        },
        {
            title: 'Hero Image',
            description: 'Upload a large cover image.',
            searchTerms: ['image', 'cover', 'hero'],
            icon: ImageIcon,
            command: ({ editor, range }: CommandProps) => {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                (editor.chain().focus().deleteRange(range) as any).setHero().run()
            },
        },
        {
            title: 'Code Block',
            description: 'Add a code block with syntax highlighting.',
            searchTerms: ['code', 'snippet', 'dev'],
            icon: Code,
            command: ({ editor, range }: CommandProps) => {
                editor.chain().focus().deleteRange(range).toggleCodeBlock().run()
            },
        },
        {
            title: 'Text',
            description: 'Just start typing with plain text.',
            searchTerms: ['p', 'paragraph'],
            icon: Type,
            command: ({ editor, range }: CommandProps) => {
                editor.chain().focus().deleteRange(range).toggleNode('paragraph', 'paragraph').run()
            },
        },
        {
            title: 'Heading 1',
            description: 'Big section heading.',
            searchTerms: ['title', 'big', 'large'],
            icon: Heading1,
            command: ({ editor, range }: CommandProps) => {
                editor.chain().focus().setTextSelection(range).deleteSelection().toggleHeading({ level: 1 }).run()
            },
        },
        {
            title: 'Heading 2',
            description: 'Medium section heading.',
            searchTerms: ['subtitle', 'medium'],
            icon: Heading2,
            command: ({ editor, range }: CommandProps) => {
                editor.chain().focus().setTextSelection(range).deleteSelection().toggleHeading({ level: 2 }).run()
            },
        },
        {
            title: 'Heading 3',
            description: 'Small section heading.',
            searchTerms: ['subtitle', 'small'],
            icon: Heading3,
            command: ({ editor, range }: CommandProps) => {
                editor.chain().focus().setTextSelection(range).deleteSelection().toggleHeading({ level: 3 }).run()
            },
        },
        {
            title: 'Bullet List',
            description: 'Create a simple bullet list.',
            searchTerms: ['unordered', 'point'],
            icon: List,
            command: ({ editor, range }: CommandProps) => {
                editor.chain().focus().setTextSelection(range).deleteSelection().toggleBulletList().run()
            },
        },
        {
            title: 'Numbered List',
            description: 'Create a list with numbering.',
            searchTerms: ['ordered'],
            icon: ListOrdered,
            command: ({ editor, range }: CommandProps) => {
                editor.chain().focus().deleteRange(range).toggleOrderedList().run()
            },
        },
        {
            title: 'Callout',
            description: 'Make a text stand out.',
            searchTerms: ['info', 'warning', 'alert'],
            icon: MessageSquare,
            command: ({ editor, range }: CommandProps) => {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                (editor.chain().focus().deleteRange(range) as any).setCallout().run()
            },
        },
        {
            title: 'Stats',
            description: 'Display 3 key metrics',
            searchTerms: ['stats', 'metrics', 'numbers'],
            icon: BarChart3,
            command: ({ editor, range }: CommandProps) => {
                editor
                    .chain()
                    .focus()
                    .deleteRange(range)
                    .insertContent({
                        type: 'stats',
                        attrs: {
                            items: [
                                { label: 'Users', value: '10k+' },
                                { label: 'Uptime', value: '99.9%' },
                                { label: 'Countries', value: '25+' }
                            ]
                        }
                    })
                    .run()
            },
        },
        {
            title: 'Mermaid',
            description: 'Diagrams & Charts',
            searchTerms: ['mermaid', 'diagram', 'chart', 'graph'],
            icon: Network,
            command: ({ editor, range }: CommandProps) => {
                editor.chain().focus().deleteRange(range).insertContent({ type: 'mermaid' }).run()
            },
        },
        {
            title: 'Flowchart',
            description: 'Interactive Drag & Drop Diagram',
            searchTerms: ['flow', 'chart', 'diagram', 'graph', 'node'],
            icon: Network,
            command: ({ editor, range }: CommandProps) => {
                editor.chain().focus().deleteRange(range).insertContent({ type: 'flow' }).run()
            },
        },
        {
            title: 'Excalidraw',
            description: 'Freehand sketch and diagrams',
            searchTerms: ['sketch', 'draw', 'board'],
            icon: PenTool,
            command: ({ editor, range }: CommandProps) => {
                editor
                    .chain()
                    .focus()
                    .deleteRange(range)
                    .insertContent({ type: 'excalidraw' })
                    .run()
            },
        },
    ].filter((item) => {
        if (typeof query === 'string' && query.length > 0) {
            const search = query.toLowerCase()
            return (
                item.title.toLowerCase().includes(search) ||
                item.description.toLowerCase().includes(search) ||
                (item.searchTerms && item.searchTerms.some((term: string) => term.includes(search)))
            )
        }
        return true
    })
}

interface CommandProps {
    editor: Editor
    range: Range
}

const renderSuggestion = () => {
    let component: ReactRenderer
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let popup: any

    return {
        onStart: (props: SuggestionProps) => {
            component = new ReactRenderer(CommandList, {
                props,
                editor: props.editor,
            })

            if (!props.clientRect) {
                return
            }

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            popup = tippy(document.body as any, {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                getReferenceClientRect: props.clientRect as any,
                appendTo: () => document.body,
                content: component.element,
                showOnCreate: true,
                interactive: true,
                trigger: 'manual',
                placement: 'bottom-start',
            })
        },
        onUpdate(props: SuggestionProps) {
            component.updateProps(props)

            if (!props.clientRect) {
                return
            }

            popup[0].setProps({
                getReferenceClientRect: props.clientRect,
            })
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onKeyDown(props: { view: any; event: KeyboardEvent; range: Range }) {
            if (props.event.key === 'Escape') {
                popup[0].hide()
                return true
            }

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            return (component.ref as any)?.onKeyDown(props)
        },
        onExit() {
            popup[0].destroy()
            component.destroy()
        },
    }
}

export const SlashCommand = Extension.create({
    name: 'slashCommand',

    addOptions() {
        return {
            suggestion: {
                char: '/',
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                command: ({ editor, range, props }: { editor: Editor, range: Range, props: any }) => {
                    props.command({ editor, range })
                },
            },
        }
    },

    addProseMirrorPlugins() {
        return [
            Suggestion({
                editor: this.editor,
                ...this.options.suggestion,
            }),
        ]
    },
}).configure({
    suggestion: {
        items: getSuggestionItems,
        render: renderSuggestion,
    },
})
