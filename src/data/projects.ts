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
    // Extended details
    content?: string
    features?: string[]
    gallery?: string[]
}

export const PROJECTS: Project[] = [
    {
        id: 'fractal',
        title: 'Fractal Generator',
        category: 'Dev Tools',
        desc: 'Application native haute performance développée en Rust, permettant l\'exploration interactive de structures mathématiques complexes.',
        image: '/images/projects/fractal/main.png',
        year: '2025',
        github: 'https://github.com/roketag33/FractalGenerator',
        tags: ['Rust', 'WASM', 'Math', 'Visualization'],
        content: `
            <p><strong>Fractal Generator</strong> est une application native haute performance développée en <strong>Rust</strong>, permettant l'exploration interactive de structures mathématiques complexes.</p>
            <p>Conçu avec l'interface <strong>egui</strong> et optimisé pour le calcul parallèle via <strong>Rayon</strong>, ce générateur offre une fluidité exceptionnelle même à haute résolution.</p>
        `,
        features: [
            "5 Types de Fractales (Mandelbrot, Julia, Burning Ship...)",
            "5 Palettes de Couleurs (Feu, Océan, Arc-en-ciel...)",
            "Calcul multithreadé (CPU) et système de cache intelligent",
            "Export haute qualité (PNG)"
        ],
        gallery: [
            "/images/projects/fractal/main.png",
            "/images/projects/fractal/mandelbrot_fire.png",
            "/images/projects/fractal/julia_ocean.png",
            "/images/projects/fractal/burning_ship_rainbow.png",
            "/images/projects/fractal/newton_classic.png"
        ]
    },
    {
        id: 'vaultword',
        title: 'VaultWord',
        category: 'Games & Creative',
        desc: 'Refonte complète de l\'interface utilisateur de VaultWord avec un thème "Dark Glass" moderne et premium.',
        image: '/images/projects/vaultword/main.png',
        year: '2025',
        github: 'https://github.com/roketag33/VaultWord',
        tags: ['Tauri', 'React', 'TypeScript', 'Game'],
        content: `
            <p>Transformation complète de l'interface utilisateur de VaultWord avec un thème "Dark Glass" moderne et premium.</p>
            <p>Ce projet combine la flexibilité de React pour l'UI avec la performance et la sécurité de Rust pour la logique backend via Tauri.</p>
        `,
        features: [
            "Thème Dark Glass moderne",
            "Animations Framer Motion fluides",
            "Logique de jeu sécurisée en Rust",
            "Expérience native desktop"
        ],
        gallery: [
            "/images/projects/vaultword/main.png",
            "/images/projects/vaultword/desktop_add_modal.png",
            "/images/projects/vaultword/desktop_generator.png",
            "/images/projects/vaultword/desktop_import_export.png",
            "/images/projects/vaultword/vaultword_home_empty.png"
        ]
    },
    {
        id: 'platformer',
        title: 'Platformer.js',
        category: 'Games & Creative',
        desc: 'Une refonte visuelle premium d\'un jeu de plateforme 2D propulsé par PixiJS. Moteur parallaxe et design moderne.',
        image: '/images/projects/platformer/main.png',
        year: '2025',
        github: 'https://github.com/roketag33/platformer.js',
        tags: ['PixiJS', 'TypeScript', 'Game Engine'],
        content: `
            <p><strong>Platformer.js</strong> est une refonte visuelle premium d'un jeu de plateforme 2D propulsé par <strong>PixiJS</strong>. Le projet met en avant un moteur parallaxe avancé et une interface en "Glassmorphism".</p>
            <p>Tous les sprites sont vectoriels pour une netteté parfaite à n'importe quelle résolution.</p>
        `,
        features: [
            "Moteur Parallaxe multi-couches",
            "Interface Glassmorphism avec flou temps réel",
            "Sprites Vectoriels",
            "Optimisé avec Vite et TypeScript"
        ],
        gallery: [
            "/images/projects/platformer/main.png",
            "/images/projects/platformer/menu.png"
        ]
    },
    {
        id: 'hooly',
        title: 'Hooly',
        category: 'Web Apps',
        desc: 'Plateforme dédiée aux professionnels de la restauration mobile (Food Trucks). Gestion des emplacements et réservations.',
        image: '/images/projects/hooly/main.png',
        year: '2024',
        github: 'https://github.com/roketag33/hooly',
        tags: ['Go', 'Backend', 'Geospatial'],
        content: `
            <p><strong>Hooly</strong> est une plateforme dédiée aux professionnels de la restauration mobile (Food Trucks). Elle simplifie la gestion des emplacements, des réservations et du suivi de l'activité commerciale.</p>
            <p>L'objectif était de créer une interface "Premium" et intuitive permettant aux gérants de visualiser leurs statistiques et gérer leur planning efficacement.</p>
        `,
        features: [
            "Tableau de bord statistique complet",
            "Système de réservation d'emplacements",
            "Cartographie interactive des spots",
            "Interface Premium Glassmorphism"
        ],
        gallery: [
            "/images/projects/hooly/main.png",
            "/images/projects/hooly/bookings_desktop.png",
            "/images/projects/hooly/spots_desktop.png",
            "/images/projects/hooly/desktop.png",
            "/images/projects/hooly/mobile.png"
        ]
    },
    {
        id: 'jeanneret',
        title: 'Jeanneret',
        category: 'Web Design',
        desc: 'Site e-commerce pour une marque de chaussures de luxe éco-responsables. Hommage à l\'architecture moderniste.',
        image: '/images/projects/jeanneret/main.png',
        year: '2024',
        github: 'https://github.com/roketag33/jeanneret',
        tags: ['Design', 'Minimalism', 'Architecture'],
        content: `
            <p><strong>Jeanneret Paris</strong> est une marque de chaussures de luxe éco-responsables Made in France. Le site e-commerce présente les collections, l'histoire de la marque et permet l'achat en ligne.</p>
            <p>Le design est minimaliste, luxueux et met en avant une typographie soignée, inspirée par Le Corbusier.</p>
        `,
        features: [
            "Catalogue produits filtrable",
            "Fiches produits détaillées avec guides des tailles",
            "Panier et Checkout Shopify",
            "Pages de contenu immersives (Histoire, Valeurs)"
        ],
        gallery: [
            "/images/projects/jeanneret/main.png",
            "/images/projects/jeanneret/jeanneret_collection_dt.png",
            "/images/projects/jeanneret/jeanneret_about_dt.png",
            "/images/projects/jeanneret/jeanneret_cart_dt.png",
            "/images/projects/jeanneret/jeanneret_home_mb.png"
        ]
    },
    {
        id: 'ponymarket',
        title: 'PonyMarket',
        category: 'Web Apps',
        desc: 'Marketplace C2C premium dédiée à l\'équipement équestre ("Le Vinted de l\'équitation").',
        image: '/images/projects/ponymarket/main.png',
        year: '2025',
        github: 'https://github.com/roketag33/PonyMarket',
        tags: ['TypeScript', 'Fullstack', 'Marketplace'],
        content: `
            <p><strong>Pony Market</strong> est une marketplace C2C premium dédiée à l'équipement équestre. Elle reprend les codes des plateformes de mode actuelles avec une touche d'authenticité et de luxe.</p>
            <p>Le design system utilise une palette Vert Amande / Crème et une typographie Serif pour un rendu élégant.</p>
        `,
        features: [
            "Design Premium et Authentique",
            "Génération d'images produits par IA",
            "Interface fluide avec Framer Motion",
            "Stack Next.js 14 App Router"
        ],
        gallery: [
            "/images/projects/ponymarket/main.png",
            "/images/projects/ponymarket/pony_market_categories_dt.png",
            "/images/projects/ponymarket/pony_market_listings_dt.png",
            "/images/projects/ponymarket/pony_market_trust_dt.png",
            "/images/projects/ponymarket/pony_market_mobile_full.png"
        ]
    },
    {
        id: 'proposalspark',
        title: 'ProposalSpark',
        category: 'Web Apps',
        desc: 'SaaS de gestion de devis professionnels, permettant de créer, envoyer et suivre des propositions commerciales.',
        image: '/images/projects/proposalspark/main.png',
        year: '2025',
        github: 'https://github.com/roketag33/ProposalSpark',
        tags: ['TypeScript', 'AI', 'SaaS'],
        content: `
            <p><strong>ProposalSpark</strong> est un SaaS de gestion de devis professionnels inspiré par le design system de Vercel. Il permet de créer, envoyer et suivre des propositions commerciales avec l'aide de l'IA.</p>
            <p>L'interface est minimaliste, professionnelle et ultra-clean, avec un mode sombre par défaut.</p>
        `,
        features: [
            "Dashboard avec KPIs en temps réel",
            "Suivi des statuts de devis (envoyé, consulté, signé)",
            "Feed d'activité live",
            "Design system 'Vercel-like' (Grids, Gradients)"
        ],
        gallery: [
            "/images/projects/proposalspark/main.png",
            "/images/projects/proposalspark/landing_desktop.png",
            "/images/projects/proposalspark/dashboard_mobile.png",
            "/images/projects/proposalspark/demo_generating.png",
            "/images/projects/proposalspark/landing_mobile.png"
        ]
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
        desc: 'Suite de sécurité offensive et défensive moderne. Network Mapper, Traffic Analyzer, et plus.',
        image: '/images/projects/cybertools/main.png',
        year: '2025',
        github: 'https://github.com/roketag33/CyberTools',
        tags: ['Python', 'Security', 'Network Analysis'],
        content: `
            <p><strong>CyberTools</strong> est une suite de sécurité offensive et défensive moderne, développée avec **Tauri** (Rust) et **React**.</p>
            <p>Elle intègre des outils puissants comme un cartographe réseau, un analyseur de trafic temps réel, un scanner de malware et un évaluateur de mots de passe.</p>
        `,
        features: [
            "Cartographie Réseau (Network Mapper)",
            "Analyseur de Trafic temps réel",
            "Scanner de Malware",
            "Analyseur d'en-têtes de sécurité"
        ],
        gallery: [
            "/images/projects/cybertools/main.png",
            "/images/projects/cybertools/cybertools_network_mapper_1769025361772.png",
            "/images/projects/cybertools/cybertools_traffic_analyzer_scrolled_1769025447219.png",
            "/images/projects/cybertools/cybertools_security_headers_1769025769982.png",
            "/images/projects/cybertools/cybertools_malware_scanner_1769026218001.png"
        ]
    },
    {
        id: 'ponybook',
        title: 'PonyBook',
        category: 'Web Apps',
        desc: 'Carnet de santé numérique pour chevaux. Centralisez toutes les informations de santé de vos équidés.',
        image: '/images/projects/ponybook/main.png',
        year: '2025',
        github: 'https://github.com/roketag33/PonyBook',
        tags: ['TypeScript', 'Health', 'Data Aggregation'],
        content: `
            <p><strong>PonyBook</strong> est une application mobile de carnet de santé numérique pour chevaux. Elle permet aux propriétaires de centraliser vaccination, rendez-vous vétérinaires et traitements.</p>
            <p>L'interface est soignée avec des dégradés premium et des effets glassmorphism.</p>
        `,
        features: [
            "Gestion multi-chevaux",
            "Suivi des vaccinations et rappels",
            "Calendrier des rendez-vous",
            "Stockage de documents numériques"
        ],
        gallery: [
            "/images/projects/ponybook/main.png",
            "/images/projects/ponybook/calendar_desktop.png",
            "/images/projects/ponybook/health_treatments_mobile.png",
            "/images/projects/ponybook/profile_general_desktop.png",
            "/images/projects/ponybook/dashboard_mobile.png"
        ]
    },
    {
        id: 'dogodex',
        title: 'DogoDex',
        category: 'Mobile',
        desc: 'Le Pokédex pour chiens. Découvrez, identifiez et collectionnez les races de chiens rencontrées.',
        image: '/images/projects/dogodex/main.png',
        year: '2025',
        github: 'https://github.com/roketag33/DogoDex',
        tags: ['TypeScript', 'Mobile', 'App'],
        content: `
            <p><strong>DogoDex</strong> est une application mobile ludique permettant de collectionner les races de chiens rencontrées dans la vraie vie. C'est le 'Pokédex' des amoureux des chiens.</p>
            <p>Elle intègre des éléments de gamification comme des niveaux, de l'XP et des badges.</p>
        `,
        features: [
            "Catalogue de 18+ races détaillées",
            "Système de collection avec dates et lieux",
            "Gamification (Niveaux, XP, Streak)",
            "Design Dark mode premium"
        ],
        gallery: [
            "/images/projects/dogodex/main.png",
            "/images/projects/dogodex/pokedex_mobile.png",
            "/images/projects/dogodex/breed_detail_mobile.png",
            "/images/projects/dogodex/collection_mobile.png"
        ]
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
        desc: 'Tableau périodique interactif 3D. Animations fluides et données complètes sur les éléments.',
        image: '/images/projects/periodic-table/main.png',
        year: '2025',
        github: 'https://github.com/roketag33/PeriodicTable',
        tags: ['Svelte', 'GSAP', 'Education'],
        content: `
            <p>Tableau périodique interactif réalisé en <strong>Svelte</strong> avec des animations complexes via <strong>GSAP</strong>.</p>
            <p>Il offre une visualisation moderne et fluide des 118 éléments avec filtres par catégorie et état.</p>
        `,
        features: [
            "118 éléments avec données complètes",
            "Filtres interactifs (Catégorie, État)",
            "Animations GSAP fluides (effets neon)",
            "Support i18n (FR/EN)"
        ],
        gallery: [
            "/images/projects/periodic-table/main.png",
            "/images/projects/periodic-table/periodictable_modal_fixed_1769106128144.png",
            "/images/projects/periodic-table/periodictable_mobile_1769105790470.png"
        ]
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
        desc: 'Extension Chrome de productivité qui bloque les sites distrayants pendant les sessions de focus.',
        image: '/images/projects/monotaskr/main.png',
        year: '2025',
        github: 'https://github.com/roketag33/MonoTaskr',
        tags: ['TypeScript', 'Chrome Extension', 'React'],
        content: `
            <p><strong>MonoTaskr</strong> est une extension Chrome conçue pour favoriser le "Deep Work". Elle bloque l'accès aux sites distrayants pendant des sessions de concentration définies.</p>
            <p>Elle intègre un timer Pomodoro et des éléments de gamification pour motiver l'utilisateur.</p>
        `,
        features: [
            "Timer Pomodoro intégré",
            "Blocage intelligent des distractions",
            "Gamification (XP, Niveaux)",
            "100% Local et Privacy-First"
        ],
        gallery: [
            "/images/projects/monotaskr/main.png",
            "/images/projects/monotaskr/screenshot_1_1280x800.png",
            "/images/projects/monotaskr/screenshot_2_1280x800.png",
            "/images/projects/monotaskr/screenshot_3_1280x800.png"
        ]
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
        desc: 'Site vitrine élégant pour un restaurant italien. Design Responsive et animations soignées.',
        image: '/images/projects/wilda/main.png',
        year: '2024',
        github: 'https://github.com/roketag33/Wilda-Trattoria',
        tags: ['HTML', 'CSS', 'UI/UX'],
        content: `
            <p><strong>Wilda Trattoria</strong> est un site vitrine immersif pour un restaurant italien. Le projet met l'accent sur l'ambiance et la présentation des produits.</p>
            <p>Développé avec une approche Mobile-First, il propose une navigation fluide et des animations d'apparition élégantes.</p>
        `,
        features: [
            "Design Responsive Mobile-First",
            "Animations CSS soignées",
            "Navigation fluide (Scrollspy)",
            "Mise en valeur des produits"
        ],
        gallery: [
            "/images/projects/wilda/main.png",
            "/images/projects/wilda/wilda_trattoria_menu_dt.png",
            "/images/projects/wilda/wilda_trattoria_contact_dt.png",
            "/images/projects/wilda/wilda_trattoria_mobile_full.png"
        ]
    },
    {
        id: 'windastreet',
        title: 'Win Da Street',
        category: 'Games & Creative',
        desc: 'Chasse au trésor artistique dans les rues de Bordeaux. Gamification de la découverte du Street Art.',
        image: '/images/projects/windastreet/main.png',
        year: '2024',
        github: 'https://github.com/roketag33/WIN-DA-STREET',
        tags: ['React', 'Gamification', 'Art'],
        content: `
            <p><strong>WIN-DA-STREET</strong> est une application interactive transformant la ville de Bordeaux en terrain de jeu. Les utilisateurs partent à la chasse aux œuvres de Street Art.</p>
            <p>L'application propose une carte interactive, un système de scan virtuel et un classement des meilleurs chasseurs.</p>
        `,
        features: [
            "Carte interactive des œuvres",
            "Système de collection gamifié",
            "Classement (Leaderboard) des joueurs",
            "Profil utilisateur détaillé"
        ],
        gallery: [
            "/images/projects/windastreet/main.png",
            "/images/projects/windastreet/win_da_street_art_list_dt.png",
            "/images/projects/windastreet/win_da_street_leaderboard_dt.png",
            "/images/projects/windastreet/win_da_street_home_mb.png"
        ]
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

