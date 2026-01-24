'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ProjectGalleryProps {
    images: string[]
    title: string
}

export default function ProjectGallery({ images, title }: ProjectGalleryProps) {
    const [index, setIndex] = useState(0)
    const [lightboxOpen, setLightboxOpen] = useState(false)

    const nextImage = () => {
        setIndex((prev) => (prev + 1) % images.length)
    }

    const prevImage = () => {
        setIndex((prev) => (prev - 1 + images.length) % images.length)
    }

    const setSpecificImage = (i: number) => {
        setIndex(i)
    }

    return (
        <div className="space-y-6">
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <span className="w-8 h-1 bg-emerald-500 rounded-full" />
                Gallery
            </h3>

            {/* Main Carousel Stage */}
            <div className="relative aspect-video w-full bg-neutral-900 rounded-xl overflow-hidden shadow-2xl group border border-neutral-800">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 1.05 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        className="relative w-full h-full"
                    >
                        <Image
                            src={images[index]}
                            alt={`${title} screenshot ${index + 1}`}
                            fill
                            className="object-contain"
                            priority
                        />
                    </motion.div>
                </AnimatePresence>

                {/* Controls Overlay */}
                <div className="absolute inset-0 flex items-center justify-between p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button
                        onClick={prevImage}
                        className="bg-black/50 hover:bg-black/70 text-white p-3 rounded-full backdrop-blur-sm transition-all transform hover:-translate-x-1"
                        aria-label="Previous image"
                    >
                        <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button
                        onClick={nextImage}
                        className="bg-black/50 hover:bg-black/70 text-white p-3 rounded-full backdrop-blur-sm transition-all transform hover:translate-x-1"
                        aria-label="Next image"
                    >
                        <ChevronRight className="w-6 h-6" />
                    </button>
                </div>

                {/* Image Counter Badge */}
                <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-xs font-mono text-white border border-white/10">
                    {index + 1} / {images.length}
                </div>

                {/* Fullscreen Trigger */}
                <button
                    onClick={() => setLightboxOpen(true)}
                    className="absolute top-4 right-4 bg-black/50 hover:bg-emerald-500 text-white p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300"
                >
                    <Maximize2 className="w-5 h-5" />
                </button>
            </div>

            {/* Thumbnails Strip (Bento-lite) */}
            <div className="grid grid-cols-4 md:grid-cols-6 gap-3">
                {images.map((img, i) => (
                    <button
                        key={i}
                        onClick={() => setSpecificImage(i)}
                        className={cn(
                            "relative aspect-square rounded-md overflow-hidden transition-all duration-300 border-2",
                            index === i
                                ? "border-emerald-500 scale-105 opacity-100"
                                : "border-transparent opacity-60 hover:opacity-100 hover:scale-105"
                        )}
                    >
                        <Image
                            src={img}
                            alt={`Thumbnail ${i + 1}`}
                            fill
                            className="object-cover"
                        />
                    </button>
                ))}
            </div>

            {/* Simple Lightbox Modal */}
            <AnimatePresence>
                {lightboxOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-12"
                        onClick={() => setLightboxOpen(false)}
                    >
                        <div className="relative w-full h-full max-w-7xl mx-auto flex items-center justify-center">
                            <Image
                                src={images[index]}
                                alt="Fullscreen view"
                                fill
                                className="object-contain"
                            />
                        </div>
                        <button className="absolute top-6 right-6 text-white hover:text-emerald-400">
                            Close [ESC]
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
