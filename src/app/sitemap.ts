import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://roketag.com'

    // Static routes
    const routes = [
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

    return routes
}
