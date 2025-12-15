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
        category: 'Dev Tools',
        desc: 'Interactive fractal explorer supporting Mandelbrot, Julia, and Newton sets. Features custom color palettes and high-performance Rust core.',
        image: '/images/projects/fractal.png',
        year: '2025',
        github: 'https://github.com/roketag33/FractalGenerator',
        tags: ['Rust', 'WASM', 'Math', 'Visualization']
    },
    {
        id: 'vaultword',
        title: 'VaultWord',
        category: 'Games & Creative',
        desc: 'Security-themed word puzzle game built with Tauri and React. Crack the vault code using logic.',
        image: '/images/projects/vaultword.png',
        year: '2025',
        github: 'https://github.com/roketag33/VaultWord',
        tags: ['Tauri', 'React', 'TypeScript', 'Game']
    },
    {
        id: 'platformer',
        title: 'Platformer.js',
        category: 'Games & Creative',
        desc: 'Modular 2D platformer engine built with PixiJS. Features physics, collision detection, and entity management.',
        image: '/images/projects/platformer.png',
        year: '2025',
        github: 'https://github.com/roketag33/platformer.js',
        tags: ['PixiJS', 'TypeScript', 'Game Engine']
    },
    {
        id: 'hooly',
        title: 'Hooly',
        category: 'Web Apps',
        desc: 'Reservation system for mobile shops and food truck locations. Simplifies spot management for street vendors.',
        image: '/images/projects/hooly.png',
        year: '2024',
        github: 'https://github.com/roketag33/hooly',
        tags: ['Go', 'Backend', 'Geospatial']
    },
    {
        id: 'jeanneret',
        title: 'Jeanneret',
        category: 'Web Design',
        desc: 'A tribute to modernist architecture. Minimalist design system inspired by Le Corbusier.',
        image: '/images/projects/jeanneret.png',
        year: '2024',
        github: 'https://github.com/roketag33/jeanneret',
        tags: ['Design', 'Minimalism', 'Architecture']
    },
    {
        id: 'ponymarket',
        title: 'PonyMarket',
        category: 'Web Apps',
        desc: 'Marketplace platform for digital assets. Features live auctions and inventory management.',
        image: '/images/projects/ponymarket.png',
        year: '2025',
        github: 'https://github.com/roketag33/PonyMarket',
        tags: ['TypeScript', 'Fullstack', 'Marketplace']
    },
    {
        id: 'proposalspark',
        title: 'ProposalSpark',
        category: 'Web Apps',
        desc: 'Automated proposal generation tool for freelancers. AI-driven content suggestions.',
        image: '/images/projects/proposalspark.png',
        year: '2025',
        github: 'https://github.com/roketag33/ProposalSpark',
        tags: ['TypeScript', 'AI', 'SaaS']
    },
    {
        id: 'goop',
        title: 'GOOP',
        category: 'Dev Tools',
        desc: 'Fullstack React-Express-MySQL starter template. Pre-configured with ESLint, Prettier, and Husky for rapid development.',
        image: '/images/projects/goop.png',
        year: '2024',
        github: 'https://github.com/roketag33/GOOP',
        tags: ['React', 'Express', 'MySQL', 'Template']
    },
    {
        id: 'cybertools',
        title: 'CyberTools',
        category: 'Dev Tools',
        desc: 'Comprehensive security suite: Network Mapper, Traffic Analyzer, SSL Checker, and Malware Scanner.',
        image: '/images/projects/cybertools.png',
        year: '2025',
        github: 'https://github.com/roketag33/CyberTools',
        tags: ['Python', 'Security', 'Network Analysis']
    },
    {
        id: 'ponybook',
        title: 'PonyBook',
        category: 'Web Apps',
        desc: 'Equine digital health record and data aggregator. Centralizes veterinary and care information for horses.',
        image: '/images/projects/ponybook.png',
        year: '2025',
        github: 'https://github.com/roketag33/PonyBook',
        tags: ['TypeScript', 'Health', 'Data Aggregation']
    },
    {
        id: 'dogodex',
        title: 'DogoDex',
        category: 'Mobile',
        desc: 'The ultimate Pokedex for dogs. Identify breeds and track canine encounters.',
        image: '/images/projects/dogodex.png',
        year: '2025',
        github: 'https://github.com/roketag33/DogoDex',
        tags: ['TypeScript', 'Mobile', 'App']
    },
    {
        id: 'huge-workout',
        title: 'HugeWorkout',
        category: 'Web Apps',
        desc: 'Comprehensive workout tracker and analytics platform. Visualize gains with interactive charts.',
        image: '/images/projects/huge-workout.png',
        year: '2025',
        github: 'https://github.com/roketag33/HugeWorkout',
        tags: ['TypeScript', 'Health', 'Analytics']
    },
    {
        id: 'periodic-table',
        title: 'Periodic Table',
        category: 'Games & Creative',
        desc: 'Interactive 3D Periodic Table of Elements. Built with Svelte, GSAP, and Tailwind for smooth animations.',
        image: '/images/projects/periodic-table.png',
        year: '2025',
        github: 'https://github.com/roketag33/PeriodicTable',
        tags: ['Svelte', 'GSAP', 'Education']
    },
    {
        id: 'solidjs-draw',
        title: 'SolidJS Draw',
        category: 'Games & Creative',
        desc: 'Vector drawing application experiment using SolidJS.',
        image: '/images/projects/solidjs-draw.png',
        year: '2025',
        github: 'https://github.com/roketag33/SolidJS-Draw',
        tags: ['SolidJS', 'Graphics', 'Tool']
    },
    {
        id: 'scrapper-tool',
        title: 'Scrapper Config',
        category: 'Dev Tools',
        desc: 'NestJS Price Scraper using Playwright. Compares component prices from retailers like LDLC.',
        image: '/images/projects/scrapper.png',
        year: '2025',
        github: 'https://github.com/roketag33/ScrapperGame',
        tags: ['NestJS', 'Playwright', 'Scraping']
    },
    {
        id: 'monotaskr',
        title: 'MonoTaskr',
        category: 'Dev Tools',
        desc: 'Chrome Extension designed to enforce single-tasking and deep focus.',
        image: '/images/projects/monotaskr.png',
        year: '2025',
        github: 'https://github.com/roketag33/MonoTaskr',
        tags: ['TypeScript', 'Chrome Extension', 'React']
    },
    {
        id: 'dasharchive',
        title: 'DashArchive',
        category: 'Dev Tools',
        desc: 'Local AI file organizer. Uses MobileBERT for auto-classification and OCR for document scanning.',
        image: '/images/projects/dasharchive.png',
        year: '2025',
        github: 'https://github.com/roketag33/DashArchive',
        tags: ['TypeScript', 'AI', 'MobileBERT', 'Local']
    },
    {
        id: 'wilda',
        title: 'Wilda Trattoria',
        category: 'Web Design',
        desc: 'Elegant showcase website for an Italian restaurant.',
        image: '/images/projects/wilda.png',
        year: '2024',
        github: 'https://github.com/roketag33/Wilda-Trattoria',
        tags: ['HTML', 'CSS', 'UI/UX']
    },
    {
        id: 'windastreet',
        title: 'Win Da Street',
        category: 'Games & Creative',
        desc: 'Artistic treasure hunt in the streets of Bordeaux. Gamified discovery of local street art.',
        image: '/images/projects/windastreet.png',
        year: '2024',
        github: 'https://github.com/roketag33/WIN-DA-STREET',
        tags: ['React', 'Gamification', 'Art']
    },
    {
        id: 'lootopia',
        title: 'Lootopia',
        category: 'Games & Creative',
        desc: 'Platform for AR treasure hunts. Integrates geolocation and gamification.',
        image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=2070&auto=format&fit=crop',
        year: '2024',
        tags: ['AR', 'Geolocation', 'Gamification']
    },
    {
        id: 'boby',
        title: 'Boby Solutions',
        category: 'Web Apps',
        desc: 'Personal project based on professional work. Fullstack SaaS solution for business process management.',
        image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop',
        year: '2023-2024',
        tags: ['SaaS', 'Cloud', 'Fullstack']
    }
]
