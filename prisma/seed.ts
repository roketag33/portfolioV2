import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    console.log('Start seeding...')

    const posts = [
        {
            title: 'L\'Architecture Clean dans le Frontend Moderne',
            slug: 'clean-architecture-frontend',
            excerpt: 'Comment structurer une application React complexe pour qu\'elle reste maintenable pendant des années.',
            readTime: '12 min read',
            tags: ['Architecture', 'React', 'Clean Code'],
            published: true,
            coverImage: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=2070&auto=format&fit=crop',
            content: {
                type: 'doc',
                content: [
                    {
                        type: 'paragraph',
                        content: [{ type: 'text', text: 'Stocker du code est facile. Le maintenir sain sur le long terme est un art. Dans cet article, nous allons explorer comment les principes de la Clean Architecture de Robert C. Martin peuvent être appliqués avec élégance à l\'écosystème React moderne.' }]
                    },
                    {
                        type: 'heading',
                        attrs: { level: 2 },
                        content: [{ type: 'text', text: 'Le problème de la dépendance excessive' }]
                    },
                    {
                        type: 'paragraph',
                        content: [
                            { type: 'text', text: 'Trop souvent, nos composants UI sont "mariés" à notre logique métier, à nos appels API ou à notre gestion d\'état (Redux, TanStack Query). Si vous décidez de changer de bibliothèque, tout s\'effondre.' }
                        ]
                    },
                    {
                        type: 'callout',
                        attrs: { type: 'info' },
                        content: [
                            {
                                type: 'paragraph',
                                content: [{ type: 'text', text: 'La règle d\'or : La logique métier ne doit jamais dépendre de l\'implémentation technique (Framework, DB, API).' }]
                            }
                        ]
                    },
                    {
                        type: 'heading',
                        attrs: { level: 2 },
                        content: [{ type: 'text', text: 'Visualiser la structure' }]
                    },
                    {
                        type: 'paragraph',
                        content: [{ type: 'text', text: 'Voici comment se répartissent les responsabilités dans une structure solide :' }]
                    },
                    {
                        type: 'mermaid',
                        attrs: {
                            code: `graph TD
  UI[React Components] --> UI_Logic[Hooks / Presenters]
  UI_Logic --> UseCases[Use Cases / Business Logic]
  UseCases --> Entities[Entities / Models]
  UseCases --> Repositories[Repository Interfaces]
  Adapters[API / DB Adapters] --> Repositories`
                        }
                    },
                    {
                        type: 'heading',
                        attrs: { level: 2 },
                        content: [{ type: 'text', text: 'Exemple de Code : L\'Entité' }]
                    },
                    {
                        type: 'paragraph',
                        content: [{ type: 'text', text: 'Une entité doit être un simple objet JavaScript sans aucune connaissance de React.' }]
                    },
                    {
                        type: 'codeBlock',
                        attrs: { language: 'typescript' },
                        content: [{
                            type: 'text', text: `// Domain Entity
export interface User {
  id: string;
  email: string;
  fullName: string;
}

export const validateUser = (user: User): boolean => {
  return user.email.includes('@');
};`
                        }]
                    },
                    {
                        type: 'paragraph',
                        content: [{ type: 'text', text: 'En suivant cette approche, vous créez un système résilient aux changements technologiques. Vous pouvez tester votre logique métier sans même lancer un navigateur.' }]
                    },
                    {
                        type: 'blockquote',
                        content: [
                            {
                                type: 'paragraph',
                                content: [{ type: 'text', text: 'L\'architecture est une question de choix que vous pouvez vous permettre de ne pas faire tout de suite.' }]
                            }
                        ]
                    },
                    {
                        type: 'paragraph',
                        content: [{ type: 'text', text: 'Pour conclure, la Clean Architecture n\'est pas un "overkill" pour tous les projets, mais elle devient indispensable dès que la complexité métier dépasse le stade du simple CRUD.' }]
                    }
                ]
            }
        },
        {
            title: 'Pourquoi Next.js 15 est un game changer',
            slug: 'pourquoi-nextjs-15',
            excerpt: 'Analyse des nouveautés : Turbopack, Server Actions améliorées et pourquoi j\'ai choisi cette stack pour mon portfolio.',
            readTime: '5 min read',
            tags: ['Next.js', 'React', 'Performance'],
            published: true,
            content: {
                type: 'doc',
                content: [
                    {
                        type: 'heading',
                        attrs: { level: 2 },
                        content: [{ type: 'text', text: 'L\'ère de la vitesse avec Turbopack' }]
                    },
                    {
                        type: 'paragraph',
                        content: [
                            { type: 'text', text: 'Depuis l\'annonce de Next.js 15, l\'écosystème React a franchi une nouvelle étape. L\'introduction de Turbopack en version stable change radicalement l\'expérience de développement...' }
                        ]
                    },
                    {
                        type: 'paragraph',
                        content: [
                            { type: 'text', text: 'Le rendu des articles dans ce portfolio utilise désormais une approche inspirée de Medium, privilégiant la typographie et le confort de lecture.' }
                        ]
                    }
                ]
            }
        },
        {
            title: 'L\'art du Creative Development',
            slug: 'l-art-du-creative-development',
            excerpt: 'Comment concilier performance technique et esthétique artistique dans le web moderne.',
            readTime: '8 min read',
            tags: ['Design', 'GSAP', 'Philosophy'],
            published: true,
            content: {
                type: 'doc',
                content: [
                    {
                        type: 'heading',
                        attrs: { level: 2 },
                        content: [{ type: 'text', text: 'Au-delà du code' }]
                    },
                    {
                        type: 'paragraph',
                        content: [
                            { type: 'text', text: 'Le développement créatif ne s\'arrête pas à la simple écriture de fonctions performantes. C\'est un dialogue entre l\'utilisateur et l\'interface...' }
                        ]
                    }
                ]
            }
        }
    ]

    for (const post of posts) {
        const p = await prisma.post.upsert({
            where: { slug: post.slug },
            update: post,
            create: post,
        })
        console.log(`Created post with id: ${p.id}`)
    }

    console.log('Seeding finished.')
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
