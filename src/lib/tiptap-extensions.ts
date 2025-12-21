import { Extension } from '@tiptap/core'
import { Plugin, PluginKey } from '@tiptap/pm/state'
import { Decoration, DecorationSet } from '@tiptap/pm/view'
import { getHighlighter } from 'shiki'

// NOTE: Real-time Shiki in Tiptap is complex because it's async.
// For simplicity in this iteration, we will use Tiptap's default CodeBlockLowlight
// with 'lowlight' (highlight.js) for the EDITOR, but render with Shiki on the FRONTEND.
// This is a common pattern to keep editor responsive.

// However, to satisfy the "Custom Blocks" requirement, we will build a custom
// "Callout" extension instead which is easier to demonstrate as a React Node View.
