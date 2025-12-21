'use server'

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function getPosts() {
    try {
        const posts = await prisma.post.findMany({
            where: { published: true },
            orderBy: { createdAt: 'desc' },
            select: {
                id: true,
                title: true,
                slug: true,
                createdAt: true,
                excerpt: true,
                readTime: true,
                tags: true,
                // We don't fetch full content for list to save bandwidth
            }
        })
        return posts
    } catch (error) {
        console.error('Failed to fetch posts:', error)
        return []
    }
}
