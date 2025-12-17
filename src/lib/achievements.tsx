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
    }
}
