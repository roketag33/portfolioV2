'use server'

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function getPosts(options: { includeDrafts?: boolean } = {}) {
    try {
        const where = options.includeDrafts ? {} : { published: true }

        const posts = await prisma.post.findMany({
            where,
            orderBy: { createdAt: 'desc' },
            select: {
                id: true,
                title: true,
                slug: true,
                createdAt: true,
                excerpt: true,
                readTime: true,
                tags: true,
                published: true, // Needed for admin dashboard
                // We don't fetch full content for list to save bandwidth
            }
        })
        return posts
    } catch (error) {
        console.error('Failed to fetch posts:', error)
        return []
    }
}
