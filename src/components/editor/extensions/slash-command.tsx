import { Extension } from '@tiptap/core'
import Suggestion from '@tiptap/suggestion'
import { ReactRenderer } from '@tiptap/react'
import tippy from 'tippy.js'
import { CommandList } from './CommandList'
import {
    Heading1, Heading2, Heading3,
    List, ListOrdered,
    MessageSquare, Code,
    Type, CheckSquare,
    Quote, Image as ImageIcon, LayoutTemplate,
    BarChart3,
    Network
} from 'lucide-react'

const getSuggestionItems = ({ query }: { query: string }) => {
    return [
        {
            title: 'Image',
            description: 'Upload an image with caption.',
            searchTerms: ['photo', 'picture', 'media'],
            icon: ImageIcon,
            command: ({ editor, range }: any) => {
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
            command: ({ editor, range }: any) => {
                editor.chain().focus().deleteRange(range).setHero().run()
            },
        },
        {
            title: 'Code Block',
            description: 'Add a code block with syntax highlighting.',
            searchTerms: ['code', 'snippet', 'dev'],
            icon: Code,
            command: ({ editor, range }: any) => {
                editor.chain().focus().deleteRange(range).toggleCodeBlock().run()
            },
        },
        {
            title: 'Text',
            description: 'Just start typing with plain text.',
            searchTerms: ['p', 'paragraph'],
            icon: Type,
            command: ({ editor, range }: any) => {
                editor.chain().focus().deleteRange(range).toggleNode('paragraph', 'paragraph').run()
            },
        },
        {
            title: 'Heading 1',
            description: 'Big section heading.',
            searchTerms: ['title', 'big', 'large'],
            icon: Heading1,
            command: ({ editor, range }: any) => {
                editor.chain().focus().setTextSelection(range).deleteSelection().toggleHeading({ level: 1 }).run()
            },
        },
        {
            title: 'Heading 2',
            description: 'Medium section heading.',
            searchTerms: ['subtitle', 'medium'],
            icon: Heading2,
            command: ({ editor, range }: any) => {
                editor.chain().focus().setTextSelection(range).deleteSelection().toggleHeading({ level: 2 }).run()
            },
        },
        {
            title: 'Heading 3',
            description: 'Small section heading.',
            searchTerms: ['subtitle', 'small'],
            icon: Heading3,
            command: ({ editor, range }: any) => {
                editor.chain().focus().setTextSelection(range).deleteSelection().toggleHeading({ level: 3 }).run()
            },
        },
        {
            title: 'Bullet List',
            description: 'Create a simple bullet list.',
            searchTerms: ['unordered', 'point'],
            icon: List,
            command: ({ editor, range }: any) => {
                editor.chain().focus().setTextSelection(range).deleteSelection().toggleBulletList().run()
            },
        },
        {
            title: 'Numbered List',
            description: 'Create a list with numbering.',
            searchTerms: ['ordered'],
            icon: ListOrdered,
            command: ({ editor, range }: any) => {
                editor.chain().focus().deleteRange(range).toggleOrderedList().run()
            },
        },
        {
            title: 'Callout',
            description: 'Make a text stand out.',
            searchTerms: ['info', 'warning', 'alert'],
            icon: MessageSquare,
            command: ({ editor, range }: any) => {
                editor.chain().focus().deleteRange(range).setCallout().run()
            },
        },
        {
            title: 'Stats',
            description: 'Display 3 key metrics',
            searchTerms: ['stats', 'metrics', 'numbers'],
            icon: BarChart3,
            command: ({ editor, range }: any) => {
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
            command: ({ editor, range }: any) => {
                editor.chain().focus().deleteRange(range).insertContent({ type: 'mermaid' }).run()
            },
        },
        {
            title: 'Flowchart',
            description: 'Interactive Drag & Drop Diagram',
            searchTerms: ['flow', 'chart', 'diagram', 'graph', 'node'],
            icon: Network, // Using same icon or different one like Workflow
            command: ({ editor, range }: any) => {
                editor.chain().focus().deleteRange(range).insertContent({ type: 'flow' }).run()
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

const renderSuggestion = () => {
    let component: any
    let popup: any

    return {
        onStart: (props: any) => {
            component = new ReactRenderer(CommandList, {
                props,
                editor: props.editor,
            })

            if (!props.clientRect) {
                return
            }

            popup = tippy('body', {
                getReferenceClientRect: props.clientRect,
                appendTo: () => document.body,
                content: component.element,
                showOnCreate: true,
                interactive: true,
                trigger: 'manual',
                placement: 'bottom-start',
            })
        },
        onUpdate(props: any) {
            component.updateProps(props)

            if (!props.clientRect) {
                return
            }

            popup[0].setProps({
                getReferenceClientRect: props.clientRect,
            })
        },
        onKeyDown(props: any) {
            if (props.event.key === 'Escape') {
                popup[0].hide()
                return true
            }

            return component.ref?.onKeyDown(props)
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
                command: ({ editor, range, props }: any) => {
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
