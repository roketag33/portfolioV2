'use client'

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { newsletterSchema } from "@/lib/schemas"
import { useState } from "react"
import { toast } from "sonner"
import { Loader2, ArrowRight } from "lucide-react"
import { z } from "zod"
import { useTranslations } from "next-intl"

type NewsletterFormValues = z.infer<typeof newsletterSchema>

export function NewsletterForm() {
    const t = useTranslations('Footer.Newsletter')
    const [isSubmitting, setIsSubmitting] = useState(false)

    const form = useForm<NewsletterFormValues>({
        resolver: zodResolver(newsletterSchema),
        defaultValues: {
            email: "",
        },
    })

    async function onSubmit(data: NewsletterFormValues) {
        setIsSubmitting(true)
        try {
            const response = await fetch("/api/newsletter", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            })

            const result = await response.json()

            if (!response.ok) throw new Error(result.error || "Failed to subscribe")

            toast.success(t('success'))
            form.reset()
        } catch {
            toast.error(t('error'))
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <form onSubmit={form.handleSubmit(onSubmit)} className="mt-8 relative max-w-sm">
            <div className="relative group">
                <input
                    {...form.register("email")}
                    placeholder={t('placeholder')}
                    className="w-full bg-white/5 border border-white/10 rounded-full py-3 px-5 pr-12 text-sm text-foreground focus:outline-none focus:border-primary/50 focus:bg-white/10 transition-all placeholder:text-muted-foreground/50"
                    disabled={isSubmitting}
                />
                <button
                    type="submit"
                    disabled={isSubmitting}
                    aria-label="S'inscrire à la newsletter"
                    className="absolute right-1 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full bg-primary text-primary-foreground hover:scale-105 active:scale-95 disabled:opacity-50 disabled:hover:scale-100 transition-all"
                >
                    {isSubmitting ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                        <ArrowRight className="w-4 h-4" />
                    )}
                </button>
            </div>
            {form.formState.errors.email && (
                <p className="text-red-400 text-xs mt-2 ml-4 animate-in slide-in-from-top-1 fade-in">
                    {form.formState.errors.email.message}
                </p>
            )}
        </form>
    )
}
