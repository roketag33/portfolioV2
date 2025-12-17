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
    }
}
