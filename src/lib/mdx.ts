import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const postsDirectory = path.join(process.cwd(), 'src/content/blog')

export type BlogPost = {
    slug: string
    title: string
    date: string
    excerpt: string
    tags: string[]
    content: string // The raw MDX content
    readTime: string
}

export function getAllPosts(): BlogPost[] {
    // Create directory if it doesn't exist (safety check)
    if (!fs.existsSync(postsDirectory)) {
        return []
    }

    const fileNames = fs.readdirSync(postsDirectory)
    const posts = fileNames
        .filter(fileName => fileName.endsWith('.mdx'))
        .map(fileName => {
            const slug = fileName.replace(/\.mdx$/, '')
            const fullPath = path.join(postsDirectory, fileName)
            const fileContents = fs.readFileSync(fullPath, 'utf8')
            const { data, content } = matter(fileContents)

            return {
                slug,
                title: data.title,
                date: data.date,
                excerpt: data.excerpt || '',
                tags: data.tags || [],
                readTime: data.readTime || '5 min read',
                content: content
            }
        })
        // Sort posts by date
        .sort((a, b) => (a.date < b.date ? 1 : -1))

    return posts
}

export function getPostBySlug(slug: string): BlogPost | null {
    try {
        const fullPath = path.join(postsDirectory, `${slug}.mdx`)
        const fileContents = fs.readFileSync(fullPath, 'utf8')
        const { data, content } = matter(fileContents)

        return {
            slug,
            title: data.title,
            date: data.date,
            excerpt: data.excerpt || '',
            tags: data.tags || [],
            readTime: data.readTime || '5 min read',
            content: content
        }
    } catch (_error) {
        return null
    }
}
