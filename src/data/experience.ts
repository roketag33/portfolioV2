export interface TimelineItem {
    year: string
    work: {
        company: string
        role: string
        desc: string
        stack: string[]
    }
    school: {
        name: string
        degree: string
        desc: string
        status: string
    }
}

export const TIMELINE_DATA: TimelineItem[] = [
    {
        year: '2025 - Present',
        work: {
            company: 'BPCE Solutions',
            role: 'Alternant Expert SI & Ops InnoLab',
            desc: 'DevOps & IA : Gestion Conteneurs/Déploiement (Docker/Podman), Dev d\'interfaces (Chainlit) & Outils InnoLab.',
            stack: ['Chainlit', 'Python', 'Docker', 'Podman', 'AI/LLM', 'Ops']
        },
        school: {
            name: 'Sup de Vinci',
            degree: 'Master Expert SI (M2)',
            desc: 'Architecture logicielle, Management & Stratégie SI. (Année 2/2)',
            status: 'En cours'
        }
    },
    {
        year: '2024 - 2025',
        work: {
            company: 'Elemate',
            role: 'Développeur Full Stack',
            desc: 'SaaS B2B. Migration Legacy (jQuery → Vue.js) & Création d\'applications from scratch.',
            stack: ['Vue.js', 'jQuery', 'Docker', 'SaaS']
        },
        school: {
            name: 'Sup de Vinci',
            degree: 'Master Expert SI (M1)',
            desc: 'Début du Cycle Master. Approfondissement Technique & Chef de projet.',
            status: 'Validé'
        }
    },
    {
        year: '2023 - 2024',
        work: {
            company: 'Boby',
            role: 'Développeur Full Stack',
            desc: 'Immersion start-up. Développement produit intensif, forte implication QA (E2E/Unit) & CI/CD.',
            stack: ['Symfony', 'PHP', 'React', 'StimulusJS', 'Docker', 'Cypress']
        },
        school: {
            name: 'Wild Code School',
            degree: 'Concepteur d\'Application',
            desc: 'Formation intensive "Concepteur Développeur d\'Application" (Bac+3/4).',
            status: 'Diplômé'
        }
    },
    {
        year: '2021 - 2022',
        work: {
            company: 'AQUITEM',
            role: 'Développeur Logiciels',
            desc: 'Support & Maintenance applicative. Rigueur et gestion de la dette technique.',
            stack: ['WinDev', 'SQL']
        },
        school: {
            name: 'CESI',
            degree: 'Développeur Informatique',
            desc: 'Titre RNCP Niv 5. Bases solides en algorithmique et développement web.',
            status: 'Diplômé'
        }
    },
    {
        year: '2018 - 2021',
        work: {
            company: 'Hôtel de Police',
            role: 'Électrotechnicien',
            desc: 'Maintenance systèmes connectés & sécurité. La genèse de mon intérêt pour l\'IoT.',
            stack: ['Hardware', 'Réseau']
        },
        school: {
            name: 'Compagnons du Devoir',
            degree: 'Bac Pro MELEC',
            desc: 'Excellence, Rigueur et Apprentissage par la pratique.',
            status: 'Diplômé'
        }
    }
]
