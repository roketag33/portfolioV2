export type Achievement = {
    id: string
    title: string
    description: string
    xp: number
    icon: string // Emoji or Lucid icon name
    secret?: boolean
}

export const ACHIEVEMENTS: Record<string, Achievement> = {
    FIRST_VISIT: {
        id: 'FIRST_VISIT',
        title: 'Hello World',
        description: 'Welcome to my digital playground.',
        xp: 10,
        icon: '👋'
    },
    KONAMI_CODE: {
        id: 'KONAMI_CODE',
        title: 'Cheater!',
        description: 'You entered the legendary Konami Code.',
        xp: 50,
        icon: '🎮',
        secret: true
    },
    SCROLL_MASTER: {
        id: 'SCROLL_MASTER',
        title: 'Explorer',
        description: 'You scrolled to the very bottom.',
        xp: 20,
        icon: '📜'
    },
    CLICK_FRENZY: {
        id: 'CLICK_FRENZY',
        title: 'Rage Clicker',
        description: 'Clicked 50 times in a row. Are you okay?',
        xp: 30,
        icon: '🖱️',
        secret: true
    },
    TIME_TRAVELER: {
        id: 'TIME_TRAVELER',
        title: 'Time Traveler',
        description: 'You visited the beginning of my journey.',
        xp: 50,
        icon: '⏳',
        secret: true
    },
    COPYCAT: {
        id: 'COPYCAT',
        title: 'Copycat',
        description: 'You copied my email. Write something nice!',
        xp: 15,
        icon: '📋'
    },
    SOCIALITE: {
        id: 'SOCIALITE',
        title: 'Socialite',
        description: 'You checked out my social networks.',
        xp: 15,
        icon: '🌐'
    },
    NOT_FOUND: {
        id: 'NOT_FOUND',
        title: '404 Hunter',
        description: 'You wandered into the unknown.',
        xp: 25,
        icon: '🕵️‍♂️',
        secret: true
    },
    NIGHT_OWL: {
        id: 'NIGHT_OWL',
        title: 'Night Owl',
        description: 'Coding late? Visited between 1AM and 5AM.',
        xp: 30,
        icon: '🦉',
        secret: true
    },
    QA_TESTER: {
        id: 'QA_TESTER',
        title: 'QA Tester',
        description: 'You resized the window. testing responsive design?',
        xp: 20,
        icon: '📐',
        secret: true
    },
    SPEED_RUNNER: {
        id: 'SPEED_RUNNER',
        title: 'Speed Runner',
        description: 'Visited 3 pages in less than 10 seconds. Slow down!',
        xp: 50,
        icon: '⚡',
        secret: true
    },
    COFFEE_ADDICT: {
        id: 'COFFEE_ADDICT',
        title: 'Caffeine Overload',
        description: 'You really like coffee... maybe too much.',
        xp: 15,
        icon: '☕',
        secret: true
    },
    BOOKWORM: {
        id: 'BOOKWORM',
        title: 'Bookworm',
        description: 'You actually read an article! Thanks.',
        xp: 30,
        icon: '📚',
        secret: true
    },
    SNAKE_MASTER: {
        id: 'SNAKE_MASTER',
        title: 'Snake Master',
        description: 'Scored 10+ points in Snake.',
        xp: 50,
        icon: '🐍',
        secret: true
    },
    WHO_AM_I: {
        id: 'WHO_AM_I',
        title: 'Who Am I',
        description: 'You found my name. Nice to meet you!',
        xp: 10,
        icon: '👋',
        secret: true
    },
    HACKERMAN: {
        id: 'HACKERMAN',
        title: 'Hackerman',
        description: 'Access the secret terminal.',
        xp: 50,
        icon: '💻',
        secret: true
    },
    SCRIPT_KIDDIE: {
        id: 'SCRIPT_KIDDIE',
        title: 'Script Kiddie',
        description: 'Tried to use sudo? Nice try.',
        xp: 20,
        icon: '👶',
        secret: true
    },
    DANGEROUS: {
        id: 'DANGEROUS',
        title: 'Living Dangerously',
        description: 'Do not remove root!',
        xp: 100,
        icon: '☢️',
        secret: true
    },
    GYM_RAT: {
        id: 'GYM_RAT',
        title: 'Gym Rat',
        description: 'You did 10 reps on the Sport card. Light weight baby!',
        xp: 30,
        icon: '💪'
    },
    CHAOS_ENGINEER: {
        id: 'CHAOS_ENGINEER',
        title: 'Chaos Engineer',
        description: 'You broke gravity. Newton is not happy.',
        xp: 30,
        icon: '🍎'
    },
    RETRO_VISION: {
        id: 'RETRO_VISION',
        title: 'Retro Vision',
        description: 'You traveled back to the 8-bit era.',
        xp: 20,
        icon: '👾',
        secret: true
    },
    MAD_SCIENTIST: {
        id: 'MAD_SCIENTIST',
        title: 'Mad Scientist',
        description: 'You inspected every single experiment.',
        xp: 40,
        icon: '👨‍🔬',
        secret: true
    },
    SYSTEM_MELTDOWN: {
        id: 'SYSTEM_MELTDOWN',
        title: 'System Meltdown',
        description: 'You broke the simulation.',
        xp: 50,
        icon: '💥',
        secret: true
    },
    THE_ARCHIVIST: {
        id: 'THE_ARCHIVIST',
        title: 'The Archivist',
        description: 'Access denied. Security Clearance Required.',
        xp: 50,
        icon: '📂',
        secret: true
    },
    LAB_MASTER: {
        id: 'LAB_MASTER',
        title: 'Lab Master',
        description: 'You discovered every secret in the Lab. Pure genius.',
        xp: 100,
        icon: '👑',
        secret: true
    },
    THE_ORACLE: {
        id: 'THE_ORACLE',
        title: 'The Oracle',
        description: 'You found the answer to Life, the Universe, and Everything.',
        xp: 42,
        icon: '🔮',
        secret: true
    },
    TOPIC_HUNTER: {
        id: 'TOPIC_HUNTER',
        title: 'Topic Hunter',
        description: 'You explored 3 different topics. Curious mind!',
        xp: 30,
        icon: '🧭',
        secret: true
    },
    NEON_VIBES: {
        id: 'NEON_VIBES',
        title: 'Neon Vibes',
        description: 'You lit up the blog. Groovy!',
        xp: 20,
        icon: '💡',
        secret: true
    }
}
