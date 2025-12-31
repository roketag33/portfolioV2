'use client'

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { contactSchema, ContactFormValues } from "@/lib/schemas"
import { useState } from "react"
import { toast } from "sonner"
import { motion } from "framer-motion"
import { Loader2, Send } from "lucide-react"
import { SpotlightInput, SpotlightTextarea } from "@/components/ui/spotlight-input"
import MagneticButton from "@/components/ui/magnetic-button"

import { useTranslations } from "next-intl"

export function ContactForm() {
    const t = useTranslations('Contact')
    const [isSubmitting, setIsSubmitting] = useState(false)

    const form = useForm<ContactFormValues>({
        resolver: zodResolver(contactSchema),
        defaultValues: {
            name: "",
            email: "",
            subject: "",
            message: "",
        },
    })

    async function onSubmit(data: ContactFormValues) {
        setIsSubmitting(true)
        try {
            const response = await fetch("/api/send", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            })

            if (!response.ok) throw new Error("Failed to send message")

            toast.success(t('toast_success_title'), {
                description: t('toast_success_desc'),
            })
            form.reset()
        } catch {
            toast.error(t('toast_error_title'), {
                description: t('toast_error_desc'),
            })
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="w-full max-w-xl mx-auto p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md shadow-2xl"
        >
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label htmlFor="name" className="text-sm font-medium text-white/70 uppercase tracking-widest">{t('form_name_label')}</label>
                        <SpotlightInput
                            {...form.register("name")}
                            placeholder={t('form_name_placeholder')}
                        />
                        {form.formState.errors.name && (
                            <p className="text-red-400 text-xs mt-1">{form.formState.errors.name.message}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium text-white/70 uppercase tracking-widest">{t('form_email_label')}</label>
                        <SpotlightInput
                            {...form.register("email")}
                            placeholder={t('form_email_placeholder')}
                        />
                        {form.formState.errors.email && (
                            <p className="text-red-400 text-xs mt-1">{form.formState.errors.email.message}</p>
                        )}
                    </div>
                </div>

                <div className="space-y-2">
                    <label htmlFor="subject" className="text-sm font-medium text-white/70 uppercase tracking-widest">{t('form_subject_label')}</label>
                    <SpotlightInput
                        {...form.register("subject")}
                        placeholder={t('form_subject_placeholder')}
                    />
                    {form.formState.errors.subject && (
                        <p className="text-red-400 text-xs mt-1">{form.formState.errors.subject.message}</p>
                    )}
                </div>

                <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium text-white/70 uppercase tracking-widest">{t('form_message_label')}</label>
                    <SpotlightTextarea
                        {...form.register("message")}
                        placeholder={t('form_message_placeholder')}
                    />
                    {form.formState.errors.message && (
                        <p className="text-red-400 text-xs mt-1">{form.formState.errors.message.message}</p>
                    )}
                </div>

                <MagneticButton
                    type="submit"
                    variant="primary"
                    disabled={isSubmitting}
                    className="w-full"
                >
                    {isSubmitting ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                        <div className="flex items-center gap-2">
                            {t('form_submit_button')}
                            <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </div>
                    )}
                </MagneticButton>
            </form>
        </motion.div>
    )
}
