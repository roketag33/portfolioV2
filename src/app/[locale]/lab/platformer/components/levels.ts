export type EntityType = 'ground' | 'hazard' | 'platform' | 'goal' | 'coin'

export type LevelEntity = {
    x: number
    y: number
    w: number
    h: number
    type: EntityType
}

export type LevelData = {
    id: number
    name: string
    entities: LevelEntity[]
    speed: number // Base speed for this level
}

const FLOOR_Y = 500

export const LEVELS: LevelData[] = [
    {
        id: 1,
        name: "Neon Genesis",
        speed: 5,
        entities: [
            // Floor
            { x: 0, y: FLOOR_Y, w: 2000, h: 50, type: 'ground' },

            // Basic Jumps
            { x: 600, y: FLOOR_Y - 30, w: 30, h: 30, type: 'hazard' }, // Spike
            { x: 900, y: FLOOR_Y - 30, w: 30, h: 30, type: 'hazard' },

            // Platforms
            { x: 1200, y: FLOOR_Y - 100, w: 200, h: 20, type: 'platform' },
            { x: 1600, y: FLOOR_Y - 30, w: 30, h: 30, type: 'hazard' },

            // Gap
            { x: 2000, y: FLOOR_Y, w: 200, h: 50, type: 'hazard' }, // Lava gap (visualized as hazard or just no ground)
            { x: 2200, y: FLOOR_Y, w: 1000, h: 50, type: 'ground' },

            // High Jump
            { x: 2500, y: FLOOR_Y - 150, w: 100, h: 20, type: 'platform' },
            { x: 2800, y: FLOOR_Y - 30, w: 30, h: 30, type: 'hazard' },

            // Finish
            { x: 3100, y: FLOOR_Y - 80, w: 50, h: 80, type: 'goal' }
        ]
    },
    {
        id: 2,
        name: "Cyber Sprint",
        speed: 6,
        entities: [
            // Floor
            { x: 0, y: FLOOR_Y, w: 5000, h: 50, type: 'ground' },
            // Rapid small obstacles - Spaced out more
            { x: 500, y: FLOOR_Y - 30, w: 30, h: 30, type: 'hazard' },
            { x: 900, y: FLOOR_Y - 30, w: 30, h: 30, type: 'hazard' },
            { x: 1300, y: FLOOR_Y - 30, w: 30, h: 30, type: 'hazard' },
            // Staircase
            { x: 1700, y: FLOOR_Y - 80, w: 100, h: 20, type: 'platform' },
            { x: 1900, y: FLOOR_Y - 160, w: 100, h: 20, type: 'platform' },
            { x: 2100, y: FLOOR_Y - 240, w: 100, h: 20, type: 'platform' },
            // Big drop - Smaller gap
            { x: 2400, y: FLOOR_Y - 30, w: 300, h: 30, type: 'hazard' }, // Spikes below
            // Finish
            { x: 4000, y: FLOOR_Y - 80, w: 50, h: 80, type: 'goal' }
        ]
    }
]
