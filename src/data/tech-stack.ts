
export interface TechItem {
    name: string;
    description: string;
    category: string;
}

export const TECH_STACK: Record<string, TechItem> = {
    // Frontend
    "Next.js": { category: "Frontend", name: "Next.js", description: "Le framework React de production. SSR, SEO, et routing puissant. Indispensable pour des apps modernes et rapides." },
    "React": { category: "Frontend", name: "React", description: "La bibliothèque UI incontournable. Modularité, écosystème immense et composabilité parfaite." },
    "TypeScript": { category: "Frontend", name: "TypeScript", description: "JavaScript avec des super-pouvoirs. Typage statique pour un code plus robuste et maintenable." },
    "TailwindCSS": { category: "Frontend", name: "TailwindCSS", description: "Utility-first CSS. Permet de styliser à la vitesse de la pensée sans quitter le HTML." },
    "GSAP": { category: "Frontend", name: "GSAP", description: "La référence pour les animations web complexes et performantes. Indispensable pour le Creative Dev." },
    "Three.js": { category: "Frontend", name: "Three.js", description: "La 3D dans le navigateur. WebGL rendu accessible pour créer des expériences immersives." },

    // Mobile
    "React Native": { category: "Mobile", name: "React Native", description: "Créer des apps natives iOS/Android avec une seule codebase React. Efficacité maximale." },
    "Flutter": { category: "Mobile", name: "Flutter", description: "Le framework UI de Google. Performance native et design pixel-perfect sur tous les écrans." },

    // Backend
    "Node.js": { category: "Backend", name: "Node.js", description: "JavaScript côté serveur. I/O non-bloquant parfait pour les APIs temps réel et microservices." },
    "NestJS": { category: "Backend", name: "NestJS", description: "Framework Node.js progressif. Architecture angulaire (Modules, Injecteurs) pour des backends scalables." },
    "Symfony": { category: "Backend", name: "Symfony", description: "Le framework PHP robuste. Structure stricte, sécurité et composants réutilisables." },
    "PHP": { category: "Backend", name: "PHP", description: "Le pilier du web. Toujours pertinent pour sa simplicité de déploiement et sa rapidité." },
    "Go": { category: "Backend", name: "Go", description: "Simplicité et performance brute. Idéal pour le cloud, les microservices et la concurrence." },
    "Rust": { category: "Backend", name: "Rust", description: "Sécurité mémoire et performance sans compromis. Pour les outils critiques et le WebAssembly." },
    "PostgreSQL": { category: "Backend", name: "PostgreSQL", description: "La base de données relationnelle open-source la plus avancée. Fiable, extensible et puissante." },
    "GraphQL": { category: "Backend", name: "GraphQL", description: "Un langage de requête pour l'API. Permet au client de demander exactement ce dont il a besoin." },

    // DevOps
    "Docker": { category: "DevOps", name: "Docker", description: "Conteneurisation standard. Garantit que ça marche partout comme sur ma machine." },
    "Podman": { category: "DevOps", name: "Podman", description: "Alternative à Docker sans démon et rootless. Plus sécurisé et compatible OCI." },
    "Kubernetes": { category: "DevOps", name: "Kubernetes", description: "Orchestration de conteneurs à l'échelle. Pour gérer la complexité des microservices en production." },
    "Git": { category: "DevOps", name: "Git", description: "Le contrôle de version. Indispensable pour la collaboration et l'historique du code." },

    // AI
    "LLMs": { category: "AI", name: "LLMs", description: "Large Language Models (GPT, Claude). Intégration d'intelligence générative dans les apps." },
    "Chainlit": { category: "AI", name: "Chainlit", description: "Bibliothèque Python pour créer des interfaces conversationnelles (Chatbots) rapidement." }
};
