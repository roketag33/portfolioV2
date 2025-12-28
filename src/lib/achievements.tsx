export type Achievement = {
    id: string
    title: string
    description: string
    xp: number
    icon: string // Emoji or Lucid icon name
    secret?: boolean
    unlockHint?: string
}

export const ACHIEVEMENTS: Record<string, Achievement> = {
    FIRST_VISIT: {
        id: 'FIRST_VISIT',
        title: 'Hello World',
        description: 'Bienvenue dans mon terrain de jeu numérique.',
        xp: 10,
        icon: '👋',
        unlockHint: 'Se débloque automatiquement à la première visite.'
    },
    KONAMI_CODE: {
        id: 'KONAMI_CODE',
        title: 'Petit Tricheur !',
        description: 'Vous avez entré le légendaire Code Konami.',
        xp: 50,
        icon: '🎮',
        secret: true,
        unlockHint: 'Entrez le Code Konami (↑↑↓↓←→←→BA) n’importe où.'
    },
    SCROLL_MASTER: {
        id: 'SCROLL_MASTER',
        title: 'Explorateur',
        description: 'Vous avez scrollé jusqu’au tout en bas.',
        xp: 20,
        icon: '📜',
        unlockHint: 'Faites défiler n’importe quelle page jusqu’à la fin.'
    },
    CLICK_FRENZY: {
        id: 'CLICK_FRENZY',
        title: 'Cliquage Compulsif',
        description: 'Cliqué 50 fois de suite. Ça va ?',
        xp: 30,
        icon: '🖱️',
        secret: true,
        unlockHint: 'Cliquez 50 fois rapidement sur n’importe quelle page.'
    },
    TIME_TRAVELER: {
        id: 'TIME_TRAVELER',
        title: 'Voyageur Temporel',
        description: 'Vous avez visité le début de mon aventure.',
        xp: 50,
        icon: '⏳',
        secret: true,
        unlockHint: 'Allez au tout premier élément de la Timeline dans "À propos".'
    },
    COPYCAT: {
        id: 'COPYCAT',
        title: 'Copieur',
        description: 'Vous avez copié mon email. Écrivez-moi quelque chose de sympa !',
        xp: 15,
        icon: '📋',
        unlockHint: 'Copiez l’adresse email depuis le pied de page Contact.'
    },
    SOCIALITE: {
        id: 'SOCIALITE',
        title: 'Être Social',
        description: 'Vous avez jeté un œil à mes réseaux sociaux.',
        xp: 15,
        icon: '🌐',
        unlockHint: 'Cliquez sur n’importe quel lien de réseau social dans le pied de page.'
    },
    NOT_FOUND: {
        id: 'NOT_FOUND',
        title: 'Chasseur de 404',
        description: 'Vous vous êtes égaré dans l’inconnu.',
        xp: 25,
        icon: '🕵️‍♂️',
        secret: true,
        unlockHint: 'Visitez une page qui n’existe pas (ex: /404).'
    },
    NIGHT_OWL: {
        id: 'NIGHT_OWL',
        title: 'Oiseau de Nuit',
        description: 'Vous codez tard ? Visité entre 1h et 5h du matin.',
        xp: 30,
        icon: '🦉',
        secret: true,
        unlockHint: 'Visitez le site entre 1h et 5h du matin.'
    },
    QA_TESTER: {
        id: 'QA_TESTER',
        title: 'Testeur QA',
        description: 'Vous avez redimensionné la fenêtre. On teste le responsive ?',
        xp: 20,
        icon: '📐',
        secret: true,
        unlockHint: 'Redimensionnez manuellement la fenêtre de votre navigateur.'
    },
    SPEED_RUNNER: {
        id: 'SPEED_RUNNER',
        title: 'Speed Runner',
        description: '3 pages visitées en moins de 10 secondes. Doucement !',
        xp: 50,
        icon: '⚡',
        secret: true,
        unlockHint: 'Naviguez sur 3 pages différentes en moins de 10 secondes.'
    },
    COFFEE_ADDICT: {
        id: 'COFFEE_ADDICT',
        title: 'Overdose de Caféine',
        description: 'Vous aimez vraiment le café... peut-être un peu trop.',
        xp: 15,
        icon: '☕',
        secret: true,
        unlockHint: 'Cliquez 10 fois sur l’icône de Café.'
    },
    BOOKWORM: {
        id: 'BOOKWORM',
        title: 'Rat de Bibliothèque',
        description: 'Vous avez vraiment lu un article ! Merci.',
        xp: 30,
        icon: '📚',
        secret: true,
        unlockHint: 'Restez sur une page d’article pendant plus de 2 minutes.'
    },
    SNAKE_MASTER: {
        id: 'SNAKE_MASTER',
        title: 'Maître du Serpent',
        description: 'Score de 10+ dans Snake.',
        xp: 50,
        icon: '🐍',
        secret: true,
        unlockHint: 'Atteignez un score d’au moins 10 au jeu Snake (Lab).'
    },
    WHO_AM_I: {
        id: 'WHO_AM_I',
        title: 'Qui suis-je ?',
        description: 'Vous avez trouvé mon nom. Ravi de vous rencontrer !',
        xp: 10,
        icon: '👋',
        secret: true,
        unlockHint: 'Tapez "whoami" dans le terminal secret.'
    },
    HACKERMAN: {
        id: 'HACKERMAN',
        title: 'Hackerman',
        description: 'Accès au terminal secret.',
        xp: 50,
        icon: '💻',
        secret: true,
        unlockHint: 'Ouvrez le Terminal dans la section Lab.'
    },
    SCRIPT_KIDDIE: {
        id: 'SCRIPT_KIDDIE',
        title: 'Script Kiddie',
        description: 'Vous avez essayé sudo ? Bien tenté.',
        xp: 20,
        icon: '👶',
        secret: true,
        unlockHint: 'Essayez de lancer une commande "sudo" dans le terminal.'
    },
    DANGEROUS: {
        id: 'DANGEROUS',
        title: 'Vivre Dangereusement',
        description: 'Ne supprimez pas le root !',
        xp: 100,
        icon: '☢️',
        secret: true,
        unlockHint: 'Essayez de supprimer le dossier racine (root) dans le terminal.'
    },
    GYM_RAT: {
        id: 'GYM_RAT',
        title: 'Rat de Salle',
        description: '10 répétitions sur la carte Sport. Light weight baby !',
        xp: 30,
        icon: '💪',
        unlockHint: 'Survolez la carte Sport 10 fois (page À propos).'
    },
    CHAOS_ENGINEER: {
        id: 'CHAOS_ENGINEER',
        title: 'Ingénieur du Chaos',
        description: 'Vous avez brisé la gravité. Newton n’est pas content.',
        xp: 30,
        icon: '🍎',
        unlockHint: 'Cliquez 5 fois sur le titre du Lab Gravity.'
    },
    RETRO_VISION: {
        id: 'RETRO_VISION',
        title: 'Vision Rétro',
        description: 'Retour à l’ère 8-bit.',
        xp: 20,
        icon: '👾',
        secret: true,
        unlockHint: 'Survolez la carte Retro Gaming dans À propos.'
    },
    MAD_SCIENTIST: {
        id: 'MAD_SCIENTIST',
        title: 'Savant Fou',
        description: 'Vous avez inspecté chaque expérience.',
        xp: 40,
        icon: '👨‍🔬',
        secret: true,
        unlockHint: 'Survolez chaque élément de la liste d’expériences du Lab.'
    },
    SYSTEM_MELTDOWN: {
        id: 'SYSTEM_MELTDOWN',
        title: 'Fusion du Système',
        description: 'Vous avez brisé la simulation.',
        xp: 50,
        icon: '💥',
        secret: true,
        unlockHint: 'Cliquez 5 fois sur le titre de la page "Lab".'
    },
    THE_ARCHIVIST: {
        id: 'THE_ARCHIVIST',
        title: 'L’Archiviste',
        description: 'Accès refusé. Accréditation de sécurité requise.',
        xp: 50,
        icon: '📂',
        secret: true,
        unlockHint: 'Cliquez sur un tag "Déclassifié" dans le Lab.'
    },
    LAB_MASTER: {
        id: 'LAB_MASTER',
        title: 'Maître du Lab',
        description: 'Vous avez découvert tous les secrets du Lab. Pur génie.',
        xp: 100,
        icon: '👑',
        secret: true,
        unlockHint: 'Débloquez tous les autres succès du Lab.'
    },
    THE_ORACLE: {
        id: 'THE_ORACLE',
        title: 'L’Oracle',
        description: 'Vous avez trouvé la réponse à la Vie, l’Univers et Reste.',
        xp: 42,
        icon: '🔮',
        secret: true,
        unlockHint: 'Recherchez "42" dans la barre de recherche du blog.'
    },
    TOPIC_HUNTER: {
        id: 'TOPIC_HUNTER',
        title: 'Chasseur de Sujets',
        description: 'Vous avez exploré 3 sujets différents. Esprit curieux !',
        xp: 30,
        icon: '🧭',
        secret: true,
        unlockHint: 'Sélectionnez 3 tags différents dans le filtre du blog.'
    },
    NEON_VIBES: {
        id: 'NEON_VIBES',
        title: 'Ambiance Néon',
        description: 'Vous avez illuminé le blog. Stylé !',
        xp: 20,
        icon: '💡',
        secret: true,
        unlockHint: 'Cliquez sur le caractère "&" dans le titre de la page Blog.'
    },
    MAGPIE: {
        id: 'MAGPIE',
        title: 'La Pie',
        description: 'Oh, ça brille ! Vous aimez vraiment ce trophée.',
        xp: 15,
        icon: '💍',
        secret: true,
        unlockHint: 'Cliquez 5 fois sur l’icône du trophée principal sur la page Succès.'
    },
    LOCKSMITH: {
        id: 'LOCKSMITH',
        title: 'Serrurier',
        description: 'Bien tenté, mais on ne crochète pas ces verrous.',
        xp: 25,
        icon: '🔐',
        secret: true,
        unlockHint: 'Cliquez 10 fois sur n’importe quelle carte de succès verrouillée.'
    },
    DECODER: {
        id: 'DECODER',
        title: 'Le Décodeur',
        description: 'Vous avez essayé de lire le texte censuré. Malin !',
        xp: 30,
        icon: '🕵️‍♀️',
        secret: true,
        unlockHint: 'Sélectionnez (surlignez) le texte flouté sur une carte de succès cachée.'
    },
    DEBUG_MASTER: {
        id: 'DEBUG_MASTER',
        title: 'Debug Master',
        description: 'Vous avez activé le mode de débogage visuel. La matrice est à nu.',
        xp: 50,
        icon: '🐛',
        secret: true,
        unlockHint: 'Cliquez 5 fois sur le bloc "Clean Code" dans la grille Bento.'
    },
    ARCHITECT_VISION: {
        id: 'ARCHITECT_VISION',
        title: 'Vision d\'Architecte',
        description: 'Vous avez révélé la structure cachée du site.',
        xp: 100,
        icon: '📐',
        secret: true,
        unlockHint: 'Trouvez et cliquez sur le mot "Architect" dans la description.'
    }
}
