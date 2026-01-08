'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { Lock } from 'lucide-react'

export default function LoginPage() {
    const [password, setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)

        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ password })
            })

            if (res.ok) {
                toast.success('Accès autorisé')
                router.push('/fr/admin') // Defaulting to FR, but middleware should handle it ideally via router.refresh or redirect
                router.refresh()
            } else {
                toast.error('Mot de passe incorrect')
            }
        } catch (_) {
            toast.error('Une erreur est survenue')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-black">
            <div className="w-full max-w-md p-8 rounded-2xl border border-white/10 bg-neutral-900/50 backdrop-blur-md">
                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-primary/20">
                        <Lock className="w-8 h-8 text-primary" />
                    </div>
                    <h1 className="text-2xl font-bold text-white mb-2">Accès Administrateur</h1>
                    <p className="text-neutral-400 text-sm">Veuillez entrer le code d&apos;accès sécurisé</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Input
                            type="password"
                            placeholder="Mot de passe..."
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="bg-black/50 border-white/10 text-white placeholder:text-neutral-600 focus-visible:ring-primary"
                        />
                    </div>
                    <Button
                        type="submit"
                        className="w-full"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Vérification...' : 'Déverrouiller / Unlock'}
                    </Button>
                </form>
            </div>
        </div>
    )
}
