import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST(req: Request) {
    try {
        const body = await req.json()
        const { title, content, excerpt, readTime, tags, coverImage, published } = body

        // Simple slug generation
        const slug = title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)+/g, '')

        const post = await prisma.post.create({
            data: {
                title,
                slug: `${slug}-${Date.now()}`,
                content,
                excerpt,
                readTime,
                tags,
                coverImage,
                published: published ?? false, // Default to draft if not specified
            },
        })

        return NextResponse.json(post)
    } catch (error) {
        console.error('Save error:', error)
        return NextResponse.json({ error: 'Failed to create post' }, { status: 500 })
    }
}

export async function PUT(req: Request) {
    try {
        const body = await req.json()
        const { id, title, content, excerpt, readTime, tags, coverImage, published } = body

        if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 })

        const post = await prisma.post.update({
            where: { id },
            data: {
                title,
                content,
                excerpt,
                readTime,
                tags,
                coverImage,
                published, // Allow updating published status
            },
        })

        return NextResponse.json(post)
    } catch (error) {
        console.error('Update error:', error)
        return NextResponse.json({ error: 'Failed to update post' }, { status: 500 })
    }
}

export async function DELETE(req: Request) {
    try {
        const { searchParams } = new URL(req.url)
        const id = searchParams.get('id')

        if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 })

        await prisma.post.delete({
            where: { id },
        })

        return NextResponse.json({ success: true })
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete' }, { status: 500 })
    }
}
