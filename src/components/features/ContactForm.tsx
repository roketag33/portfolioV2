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

export function ContactForm() {
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

            toast.success("Message sent!", {
                description: "Thanks for reaching out. I'll get back to you soon.",
            })
            form.reset()
        } catch (error) {
            toast.error("Error", {
                description: "Something went wrong. Please try again.",
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
                        <label htmlFor="name" className="text-sm font-medium text-white/70 uppercase tracking-widest">Name</label>
                        <SpotlightInput
                            {...form.register("name")}
                            placeholder="John Doe"
                        />
                        {form.formState.errors.name && (
                            <p className="text-red-400 text-xs mt-1">{form.formState.errors.name.message}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium text-white/70 uppercase tracking-widest">Email</label>
                        <SpotlightInput
                            {...form.register("email")}
                            placeholder="john@example.com"
                        />
                        {form.formState.errors.email && (
                            <p className="text-red-400 text-xs mt-1">{form.formState.errors.email.message}</p>
                        )}
                    </div>
                </div>

                <div className="space-y-2">
                    <label htmlFor="subject" className="text-sm font-medium text-white/70 uppercase tracking-widest">Subject</label>
                    <SpotlightInput
                        {...form.register("subject")}
                        placeholder="Project Opportunity..."
                    />
                    {form.formState.errors.subject && (
                        <p className="text-red-400 text-xs mt-1">{form.formState.errors.subject.message}</p>
                    )}
                </div>

                <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium text-white/70 uppercase tracking-widest">Message</label>
                    <SpotlightTextarea
                        {...form.register("message")}
                        placeholder="Tell me about your project..."
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
                            Send Message
                            <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </div>
                    )}
                </MagneticButton>
            </form>
        </motion.div>
    )
}
