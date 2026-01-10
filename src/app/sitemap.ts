import { MetadataRoute } from 'next'
import { PROJECTS } from '@/data/projects'
import { PrismaClient } from '@prisma/client'

// Prisma instance for build time (avoids multiple instances in dev, but sitemap is server-side)
const prisma = new PrismaClient()

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = 'https://www.alexandresarrazin.fr'

    // Static routes
    const staticRoutes = [
        '',
        '/work',
        '/about',
        '/lab',
        '/lab/snake',
        '/lab/fractal',
        '/blog',
        '/contact',
        '/achievements',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: route === '' ? 1 : 0.8,
    }))

    // Dynamic Projects
    const projectRoutes = PROJECTS.map((project) => ({
        url: `${baseUrl}/work/${project.id}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
    }))

    // Dynamic Blog Posts
    let blogRoutes: MetadataRoute.Sitemap = []
    try {
        // Fetch published posts only
        // Note: Check if handling this in build environments where DB might be unreachable is needed
        // For Vercel builds, DATABASE_URL should be available.
        const posts = await prisma.post.findMany({
            where: { published: true },
            select: { slug: true, updatedAt: true }
        })

        blogRoutes = posts.map((post) => ({
            url: `${baseUrl}/blog/${post.slug}`,
            lastModified: post.updatedAt,
            changeFrequency: 'weekly' as const,
            priority: 0.6,
        }))
    } catch (error) {
        console.warn('Failed to fetch blog posts for sitemap (Database might be unreachable during build):', error)
        // Fallback to empty list or static list if urgent
    }

    return [...staticRoutes, ...projectRoutes, ...blogRoutes]
}
