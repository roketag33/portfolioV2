'use server'

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function getPost(id: string) {
    try {
        const post = await prisma.post.findUnique({
            where: { id },
        })
        return post
    } catch (error) {
        console.error('Failed to fetch post:', error)
        return null
    }
}
