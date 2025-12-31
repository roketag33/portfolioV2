'use client'

import { NodeViewWrapper } from '@tiptap/react'
import { Upload, X } from 'lucide-react'
import { useCallback, useRef } from 'react'


// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function ImageComponent(props: any) {
    const fileInputRef = useRef<HTMLInputElement>(null)

    const onUpload = useCallback(
        async (e: React.ChangeEvent<HTMLInputElement>) => {
            const file = e.target.files?.[0]
            if (file) {
                const formData = new FormData()
                formData.append('file', file)

                // Optimistic update
                const objectUrl = URL.createObjectURL(file)
                props.updateAttributes({ src: objectUrl })

                try {
                    const res = await fetch('/api/upload', {
                        method: 'POST',
                        body: formData,
                    })

                    if (!res.ok) throw new Error('Upload failed')

                    const data = await res.json()
                    props.updateAttributes({ src: data.url, alt: file.name })
                } catch (error) {
                    console.error('Upload failed', error)
                }
            }
        },
        [props]
    )

    const triggerUpload = () => {
        fileInputRef.current?.click()
    }

    if (!props.node.attrs.src) {
        return (
            <NodeViewWrapper className="my-8">
                <div
                    className="flex flex-col items-center justify-center p-12 border-2 border-dashed border-border rounded-lg bg-muted/20 hover:bg-muted/40 transition-colors cursor-pointer group"
                    onClick={triggerUpload}
                >
                    <div className="bg-background p-4 rounded-full shadow-sm mb-4 group-hover:scale-110 transition-transform">
                        <Upload className="w-6 h-6 text-muted-foreground" />
                    </div>
                    <p className="text-sm font-medium text-muted-foreground">
                        Click to upload an image
                    </p>
                    <input
                        type="file"
                        ref={fileInputRef}
                        className="hidden"
                        accept="image/*"
                        onChange={onUpload}
                    />
                </div>
            </NodeViewWrapper>
        )
    }

    return (
        <NodeViewWrapper className="my-8 group relative leading-none">
            <figure className="relative">
                <div className="relative rounded-lg overflow-hidden border border-border bg-muted">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src={props.node.attrs.src}
                        alt={props.node.attrs.alt}
                        className="w-full h-auto max-h-[600px] object-contain"
                    />
                    {props.editor.isEditable && (
                        <button
                            className="absolute top-2 right-2 p-1.5 bg-background/80 backdrop-blur-sm rounded-md shadow-sm opacity-0 group-hover:opacity-100 transition-opacity hover:text-destructive"
                            onClick={() => props.deleteNode()}
                            title="Remove image"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    )}
                </div>
                <figcaption className="mt-2 text-center text-sm text-muted-foreground">
                    {props.editor.isEditable ? (
                        <input
                            type="text"
                            placeholder="Write a caption..."
                            className="bg-transparent border-none text-center w-full focus:outline-none placeholder:text-muted-foreground/50"
                            value={props.node.attrs.title || ''}
                            onChange={(e) => props.updateAttributes({ title: e.target.value })}
                        />
                    ) : (
                        props.node.attrs.title && <span>{props.node.attrs.title}</span>
                    )}
                </figcaption>
            </figure>
        </NodeViewWrapper>
    )
}
