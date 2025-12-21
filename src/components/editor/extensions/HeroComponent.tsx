'use client'

import { NodeViewWrapper } from '@tiptap/react'
import { ImageIcon } from 'lucide-react'
import { useState, useRef } from 'react'

const HeroComponent = ({ node, updateAttributes, editor }: any) => {
    const fileInputRef = useRef<HTMLInputElement>(null)
    const [isHovered, setIsHovered] = useState(false)
    const isEditable = editor.isEditable

    const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (file) {
            const formData = new FormData()
            formData.append('file', file)

            // Optimistic update
            const objectUrl = URL.createObjectURL(file)
            updateAttributes({ src: objectUrl })

            try {
                const res = await fetch('/api/upload', {
                    method: 'POST',
                    body: formData,
                })

                if (!res.ok) throw new Error('Upload failed')

                const data = await res.json()
                updateAttributes({ src: data.url })
            } catch (error) {
                console.error('Upload failed', error)
            }
        }
    }

    return (
        <NodeViewWrapper className="relative w-full h-64 md:h-96 my-8 rounded-xl overflow-hidden group select-none">
            {node.attrs.src ? (
                <img
                    src={node.attrs.src}
                    alt="Hero"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
            ) : (
                <div className="absolute inset-0 bg-muted flex flex-col items-center justify-center text-muted-foreground transition-colors group-hover:bg-muted/80">
                    <ImageIcon className="w-12 h-12 mb-4 opacity-50" />
                    <span className="font-medium">Add Cover Image</span>
                </div>
            )}

            <div className="absolute inset-0 bg-black/40 transition-opacity duration-300" />

            {isEditable && (
                <div
                    className="absolute inset-x-0 bottom-0 p-8 flex flex-col justify-end min-h-[50%]"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    <input
                        type="file"
                        ref={fileInputRef}
                        className="hidden"
                        accept="image/*"
                        onChange={handleImageUpload}
                    />

                    <button
                        onClick={() => fileInputRef.current?.click()}
                        className={`self-start bg-white/10 hover:bg-white/20 text-white backdrop-blur-md px-4 py-2 rounded-lg text-sm font-medium transition-all transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 flex items-center gap-2`}
                    >
                        <ImageIcon className="w-4 h-4" />
                        {node.attrs.src ? 'Change Cover' : 'Upload Cover'}
                    </button>
                </div>
            )}
        </NodeViewWrapper>
    )
}

export default HeroComponent
