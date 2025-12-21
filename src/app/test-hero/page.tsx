'use client'

import ContentRenderer from '@/components/editor/ContentRenderer'

const content = {
    type: 'doc',
    content: [
        {
            type: 'hero',
            attrs: {
                src: 'https://via.placeholder.com/800x400'
            }
        },
        {
            type: 'paragraph',
            content: [
                {
                    type: 'text',
                    text: 'This is a test of the Hero Block rendering.'
                }
            ]
        }
    ]
}

export default function TestHeroPage() {
    return (
        <div className="container mx-auto py-10">
            <h1 className="text-2xl font-bold mb-4">Hero Render Test</h1>
            <ContentRenderer content={content} />
        </div>
    )
}
