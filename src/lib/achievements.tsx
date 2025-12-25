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
        description: 'Welcome to my digital playground.',
        xp: 10,
        icon: '👋',
        unlockHint: 'Autoconnected on first visit.'
    },
    KONAMI_CODE: {
        id: 'KONAMI_CODE',
        title: 'Cheater!',
        description: 'You entered the legendary Konami Code.',
        xp: 50,
        icon: '🎮',
        secret: true,
        unlockHint: 'Type the Konami Code (↑↑↓↓←→←→BA) anywhere.'
    },
    SCROLL_MASTER: {
        id: 'SCROLL_MASTER',
        title: 'Explorer',
        description: 'You scrolled to the very bottom.',
        xp: 20,
        icon: '📜',
        unlockHint: 'Scroll to the end of any page.'
    },
    CLICK_FRENZY: {
        id: 'CLICK_FRENZY',
        title: 'Rage Clicker',
        description: 'Clicked 50 times in a row. Are you okay?',
        xp: 30,
        icon: '🖱️',
        secret: true,
        unlockHint: 'Click 50 times rapidly on any page.'
    },
    TIME_TRAVELER: {
        id: 'TIME_TRAVELER',
        title: 'Time Traveler',
        description: 'You visited the beginning of my journey.',
        xp: 50,
        icon: '⏳',
        secret: true,
        unlockHint: 'Go to the very first item in the About Timeline.'
    },
    COPYCAT: {
        id: 'COPYCAT',
        title: 'Copycat',
        description: 'You copied my email. Write something nice!',
        xp: 15,
        icon: '📋',
        unlockHint: 'Copy the email address from the Contact footer.'
    },
    SOCIALITE: {
        id: 'SOCIALITE',
        title: 'Socialite',
        description: 'You checked out my social networks.',
        xp: 15,
        icon: '🌐',
        unlockHint: 'Click on any social media link in the Contact footer.'
    },
    NOT_FOUND: {
        id: 'NOT_FOUND',
        title: '404 Hunter',
        description: 'You wandered into the unknown.',
        xp: 25,
        icon: '🕵️‍♂️',
        secret: true,
        unlockHint: 'Visit a page that doesn\'t exist (e.g., /404).'
    },
    NIGHT_OWL: {
        id: 'NIGHT_OWL',
        title: 'Night Owl',
        description: 'Coding late? Visited between 1AM and 5AM.',
        xp: 30,
        icon: '🦉',
        secret: true,
        unlockHint: 'Visit the site between 1 AM and 5 AM.'
    },
    QA_TESTER: {
        id: 'QA_TESTER',
        title: 'QA Tester',
        description: 'You resized the window. testing responsive design?',
        xp: 20,
        icon: '📐',
        secret: true,
        unlockHint: 'Manually resize your browser window.'
    },
    SPEED_RUNNER: {
        id: 'SPEED_RUNNER',
        title: 'Speed Runner',
        description: 'Visited 3 pages in less than 10 seconds. Slow down!',
        xp: 50,
        icon: '⚡',
        secret: true,
        unlockHint: 'Navigate to 3 different pages within 10 seconds.'
    },
    COFFEE_ADDICT: {
        id: 'COFFEE_ADDICT',
        title: 'Caffeine Overload',
        description: 'You really like coffee... maybe too much.',
        xp: 15,
        icon: '☕',
        secret: true,
        unlockHint: 'Click the Coffee icon 10 times.'
    },
    BOOKWORM: {
        id: 'BOOKWORM',
        title: 'Bookworm',
        description: 'You actually read an article! Thanks.',
        xp: 30,
        icon: '📚',
        secret: true,
        unlockHint: 'Stay on a blog article page for more than 2 minutes.'
    },
    SNAKE_MASTER: {
        id: 'SNAKE_MASTER',
        title: 'Snake Master',
        description: 'Scored 10+ points in Snake.',
        xp: 50,
        icon: '🐍',
        secret: true,
        unlockHint: 'Reach a score of at least 10 in the Snake game (Lab).'
    },
    WHO_AM_I: {
        id: 'WHO_AM_I',
        title: 'Who Am I',
        description: 'You found my name. Nice to meet you!',
        xp: 10,
        icon: '👋',
        secret: true,
        unlockHint: 'Type "whoami" in the secret terminal.'
    },
    HACKERMAN: {
        id: 'HACKERMAN',
        title: 'Hackerman',
        description: 'Access the secret terminal.',
        xp: 50,
        icon: '💻',
        secret: true,
        unlockHint: 'Open the Terminal in the Lab section.'
    },
    SCRIPT_KIDDIE: {
        id: 'SCRIPT_KIDDIE',
        title: 'Script Kiddie',
        description: 'Tried to use sudo? Nice try.',
        xp: 20,
        icon: '👶',
        secret: true,
        unlockHint: 'Try running a "sudo" command in the terminal.'
    },
    DANGEROUS: {
        id: 'DANGEROUS',
        title: 'Living Dangerously',
        description: 'Do not remove root!',
        xp: 100,
        icon: '☢️',
        secret: true,
        unlockHint: 'Try to delete the root directory in the terminal.'
    },
    GYM_RAT: {
        id: 'GYM_RAT',
        title: 'Gym Rat',
        description: 'You did 10 reps on the Sport card. Light weight baby!',
        xp: 30,
        icon: '💪',
        unlockHint: 'Hover the Sport card 10 times (About page).'
    },
    CHAOS_ENGINEER: {
        id: 'CHAOS_ENGINEER',
        title: 'Chaos Engineer',
        description: 'You broke gravity. Newton is not happy.',
        xp: 30,
        icon: '🍎',
        unlockHint: 'Click the Gravity Lab title 5 times.'
    },
    RETRO_VISION: {
        id: 'RETRO_VISION',
        title: 'Retro Vision',
        description: 'You traveled back to the 8-bit era.',
        xp: 20,
        icon: '👾',
        secret: true,
        unlockHint: 'Hover the Retro Gaming card in About.'
    },
    MAD_SCIENTIST: {
        id: 'MAD_SCIENTIST',
        title: 'Mad Scientist',
        description: 'You inspected every single experiment.',
        xp: 40,
        icon: '👨‍🔬',
        secret: true,
        unlockHint: 'Hover every item in the Lab experiment list.'
    },
    SYSTEM_MELTDOWN: {
        id: 'SYSTEM_MELTDOWN',
        title: 'System Meltdown',
        description: 'You broke the simulation.',
        xp: 50,
        icon: '💥',
        secret: true,
        unlockHint: 'Click the "Lab" page title 5 times.'
    },
    THE_ARCHIVIST: {
        id: 'THE_ARCHIVIST',
        title: 'The Archivist',
        description: 'Access denied. Security Clearance Required.',
        xp: 50,
        icon: '📂',
        secret: true,
        unlockHint: 'Click on a "Declassified" tag in the Lab.'
    },
    LAB_MASTER: {
        id: 'LAB_MASTER',
        title: 'Lab Master',
        description: 'You discovered every secret in the Lab. Pure genius.',
        xp: 100,
        icon: '👑',
        secret: true,
        unlockHint: 'Unlock all other Lab achievements.'
    },
    THE_ORACLE: {
        id: 'THE_ORACLE',
        title: 'The Oracle',
        description: 'You found the answer to Life, the Universe, and Everything.',
        xp: 42,
        icon: '🔮',
        secret: true,
        unlockHint: 'Search for "42" in the blog search bar.'
    },
    TOPIC_HUNTER: {
        id: 'TOPIC_HUNTER',
        title: 'Topic Hunter',
        description: 'You explored 3 different topics. Curious mind!',
        xp: 30,
        icon: '🧭',
        secret: true,
        unlockHint: 'Select 3 different tags in the blog filter.'
    },
    NEON_VIBES: {
        id: 'NEON_VIBES',
        title: 'Neon Vibes',
        description: 'You lit up the blog. Groovy!',
        xp: 20,
        icon: '💡',
        secret: true,
        unlockHint: 'Click the "&" character in the Blog page title.'
    },
    MAGPIE: {
        id: 'MAGPIE',
        title: 'Magpie',
        description: 'Oooh, shiny! You really like that trophy.',
        xp: 15,
        icon: '💍',
        secret: true,
        unlockHint: 'Click the main trophy icon 5 times on the Achievements page.'
    },
    LOCKSMITH: {
        id: 'LOCKSMITH',
        title: 'Locksmith',
        description: 'Nice try, but you can\'t pick these locks.',
        xp: 25,
        icon: '🔐',
        secret: true,
        unlockHint: 'Click any locked achievement card 10 times.'
    },
    DECODER: {
        id: 'DECODER',
        title: 'The Decoder',
        description: 'You tried to read the redacted text. Clever!',
        xp: 30,
        icon: '🕵️‍♀️',
        secret: true,
        unlockHint: 'Select (highlight) the blurred text on a hidden achievement card.'
    }
}
