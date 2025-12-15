export interface Project {
    id: string
    title: string
    category: string
    desc: string
    image: string
    year: string
    link?: string
    github?: string
    tags: string[]
}

export const PROJECTS: Project[] = [
    {
        id: 'fractal',
        title: 'Fractal Generator',
        category: 'Systems Programming',
        desc: 'High-performance fractal rendering CLI tool written in Rust. Generates Mandelbrot and Julia sets with parallel processing.',
        image: '/images/projects/fractal.png',
        year: '2025',
        github: 'https://github.com/roketag33/FractalGenerator',
        tags: ['Rust', 'CLI', 'Math', 'Performance']
    },
    {
        id: 'vaultword',
        title: 'VaultWord',
        category: 'Web Game',
        desc: 'A security-themed word puzzle game. Crack the vault code using logic and deduction. Built with TypeScript.',
        image: '/images/projects/vaultword.png',
        year: '2025',
        github: 'https://github.com/roketag33/VaultWord',
        tags: ['TypeScript', 'GameDev', 'Puzzle']
    },
    {
        id: 'platformer',
        title: 'Platformer.js',
        category: 'Game Engine',
        desc: 'A modular, lightweight platformer engine. Features custom physics, collision detection, and entity management.',
        image: '/images/projects/platformer.png',
        year: '2025',
        github: 'https://github.com/roketag33/platformer.js',
        tags: ['TypeScript', 'Physics', 'Game Engine']
    },
    {
        id: 'hooly',
        title: 'Hooly',
        category: 'Backend Tool',
        desc: 'High-performance backend utility written in Go. Designed for microservices architecture and scalability.',
        image: '/images/projects/hooly.png',
        year: '2024',
        github: 'https://github.com/roketag33/hooly',
        tags: ['Go', 'Backend', 'High Performance']
    },
    {
        id: 'jeanneret',
        title: 'Jeanneret',
        category: 'Web Design',
        desc: 'A tribute to modernist architecture. Minimalist design system and layout logic inspired by Le Corbusier.',
        image: '/images/projects/jeanneret.png',
        year: '2024',
        github: 'https://github.com/roketag33/jeanneret',
        tags: ['Design', 'Minimalism', 'Architecture']
    },
    {
        id: 'ponymarket',
        title: 'PonyMarket',
        category: 'E-commerce',
        desc: 'A vibrant marketplace platform with live auctions and inventory management. Pastel aesthetic.',
        image: '/images/projects/ponymarket.png',
        year: '2025',
        github: 'https://github.com/roketag33/PonyMarket',
        tags: ['TypeScript', 'Fullstack', 'Marketplace']
    },
    {
        id: 'proposalspark',
        title: 'ProposalSpark',
        category: 'Automation',
        desc: 'Automated proposal generation tool for freelancers. AI-driven content suggestions and template management.',
        image: '/images/projects/proposalspark.png',
        year: '2025',
        github: 'https://github.com/roketag33/ProposalSpark',
        tags: ['TypeScript', 'AI', 'SaaS']
    },
    {
        id: 'goop',
        title: 'GOOP',
        category: 'Experiments',
        desc: 'Fluid dynamics simulation and viscous material rendering experiment. Interactive slime physics.',
        image: '/images/projects/goop.png',
        year: '2024',
        github: 'https://github.com/roketag33/GOOP',
        tags: ['JavaScript', 'Physics', 'Rendering']
    },
    {
        id: 'cybertools',
        title: 'CyberTools',
        category: 'Security',
        desc: 'Suite of cybersecurity utilities for network analysis and vulnerability scanning. Built with TypeScript.',
        image: '/images/projects/cybertools.png',
        year: '2025',
        github: 'https://github.com/roketag33/CyberTools',
        tags: ['TypeScript', 'Security', 'Network']
    },
    {
        id: 'ponybook',
        title: 'PonyBook',
        category: 'Social Network',
        desc: 'A niche social media platform experiment. Features real-time interactions and a custom graph database.',
        image: '/images/projects/ponybook.png',
        year: '2025',
        github: 'https://github.com/roketag33/PonyBook',
        tags: ['TypeScript', 'Social', 'Graph']
    },
    {
        id: 'dogodex',
        title: 'DogoDex',
        category: 'Mobile App',
        desc: 'The ultimate Pokedex for dogs. Identify breeds and track your canine encounters. Responsive mobile-first design.',
        image: '/images/projects/dogodex.png',
        year: '2025',
        github: 'https://github.com/roketag33/DogoDex',
        tags: ['TypeScript', 'Mobile', 'App']
    },
    {
        id: 'huge-workout',
        title: 'HugeWorkout',
        category: 'Health & Fitness',
        desc: 'Comprehensive workout tracker and analytics platform. Visualize your gains with interactive charts.',
        image: '/images/projects/huge-workout.png',
        year: '2025',
        github: 'https://github.com/roketag33/HugeWorkout',
        tags: ['TypeScript', 'Health', 'Analytics']
    },
    {
        id: 'periodic-table',
        title: 'Periodic Table',
        category: 'Education',
        desc: 'Interactive 3D Periodic Table of Elements. Built with Svelte for smooth transitions and state management.',
        image: '/images/projects/periodic-table.png',
        year: '2025',
        github: 'https://github.com/roketag33/PeriodicTable',
        tags: ['Svelte', 'Education', '3D']
    },
    {
        id: 'solidjs-draw',
        title: 'SolidJS Draw',
        category: 'Creative Tool',
        desc: 'Vector drawing application leveraging SolidJS fine-grained reactivity for high-performance rendering.',
        image: '/images/projects/solidjs-draw.png',
        year: '2025',
        github: 'https://github.com/roketag33/SolidJS-Draw',
        tags: ['SolidJS', 'Graphics', 'Tool']
    },
    {
        id: 'scrapper-game',
        title: 'Scrapper Game',
        category: 'Game Development',
        desc: 'A pixel-art survival game set in a robot junkyard. Craft, fight, and survive using scavenged parts.',
        image: '/images/projects/scrapper.png',
        year: '2025',
        github: 'https://github.com/roketag33/ScrapperGame',
        tags: ['TypeScript', 'GameDev', 'Pixel Art']
    },
    {
        id: 'monotaskr',
        title: 'MonoTaskr',
        category: 'Productivity Tool',
        desc: 'A Chrome Extension designed to enforce single-tasking and deep focus. Using minimal UI to reduce cognitive load.',
        image: '/images/projects/monotaskr.png',
        year: '2025',
        github: 'https://github.com/roketag33/MonoTaskr',
        tags: ['TypeScript', 'Chrome Extension', 'React']
    },
    {
        id: 'dasharchive',
        title: 'DashArchive',
        category: 'Data Management',
        desc: 'A comprehensive dashboard for archiving and visualizing digital assets. Features advanced filtering and sorting.',
        image: '/images/projects/dasharchive.png',
        year: '2025',
        github: 'https://github.com/roketag33/DashArchive',
        tags: ['TypeScript', 'Next.js', 'Data Viz']
    },
    {
        id: 'wilda',
        title: 'Wilda Trattoria',
        category: 'Web Design',
        desc: 'Elegant showcase website for an Italian restaurant. Focusing on premium aesthetics and responsive design.',
        image: '/images/projects/wilda.png',
        year: '2024',
        github: 'https://github.com/roketag33/Wilda-Trattoria',
        tags: ['HTML', 'CSS', 'UI/UX']
    },
    {
        id: 'windastreet',
        title: 'Win Da Street',
        category: 'Game Development',
        desc: 'Retro-style arcade fighting game. Built with JavaScript and Kaboom.js for a nostalgic experience.',
        image: '/images/projects/windastreet.png',
        year: '2024',
        github: 'https://github.com/roketag33/WIN-DA-STREET',
        tags: ['JavaScript', 'GameDev', 'Kaboom.js']
    },
    {
        id: 'lootopia',
        title: 'Lootopia',
        category: 'Augmented Reality',
        desc: 'Platform for AR treasure hunts. Integrates geolocation and gamification for immersive outdoor experiences.',
        image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=2070&auto=format&fit=crop',
        year: '2024',
        tags: ['AR', 'Geolocation', 'Gamification']
    },
    {
        id: 'boby',
        title: 'Boby Solutions',
        category: 'SaaS Architecture',
        desc: 'Fullstack development and cloud architecture for a B2B SaaS solution. Optimized for scalability.',
        image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop',
        year: '2023-2024',
        tags: ['SaaS', 'Cloud', 'Fullstack']
    }
]
