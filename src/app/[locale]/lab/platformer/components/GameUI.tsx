
import LabExitButton from '@/components/lab/LabExitButton'

interface GameUIProps {
    gameState: 'start' | 'playing' | 'won' | 'lost'
    resetGame: () => void
}


export function GameUI({ gameState, resetGame }: GameUIProps) {
    return (
        <>
            {/* Header UI */}
            <LabExitButton />

            {/* UI Overlays */}
            {gameState !== 'playing' && (
                <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-black/80 backdrop-blur-sm px-4 text-center">
                    <h1 className="text-4xl md:text-5xl font-black italic tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 drop-shadow-[0_0_15px_rgba(34,211,238,0.5)] mb-8">
                        {gameState === 'start' && 'NEON RUNNER'}
                        {gameState === 'won' && 'LEVEL COMPLETE'}
                        {gameState === 'lost' && 'WASTED'}
                    </h1>
                    <button
                        onClick={resetGame}
                        className="px-8 py-3 bg-white text-black font-bold text-xl rounded-full hover:scale-105 active:scale-95 transition-transform shadow-[0_0_20px_rgba(255,255,255,0.5)]"
                    >
                        {gameState === 'start' ? 'TAP TO START' : gameState === 'won' ? 'NEXT LEVEL' : 'TRY AGAIN'}
                    </button>
                    <div className="mt-8 flex flex-col gap-2 text-sm md:text-base text-neutral-400 font-mono">
                        <p className="flex items-center justify-center gap-2">
                            <span className="px-2 py-1 bg-white/10 rounded">SPACE</span>
                            <span>or</span>
                            <span className="px-2 py-1 bg-white/10 rounded">TAP SCREEN</span>
                            <span>to JUMP</span>
                        </p>
                        <p className="text-xs text-neutral-600 mt-2">Avoid Red Spikes • Reach the Gold Zone</p>
                    </div>
                </div>
            )}
        </>
    )
}
