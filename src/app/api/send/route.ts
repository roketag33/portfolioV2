import { Resend } from 'resend'
import { contactSchema } from '@/lib/schemas'
import { NextResponse } from 'next/server'

const resend = process.env.RESEND_API_KEY
    ? new Resend(process.env.RESEND_API_KEY)
    : null

export async function POST(req: Request) {
    try {
        const body = await req.json()
        const result = contactSchema.safeParse(body)

        if (!result.success) {
            return NextResponse.json({ error: result.error.flatten() }, { status: 400 })
        }

        const { name, email, subject, message } = result.data

        if (!resend) {
            // Mock success if no API key (for dev/demo)
            console.log('MOCK EMAIL SEND (No Key):', { name, email, subject, message })
            return NextResponse.json({ success: true, mock: true })
        }

        const data = await resend.emails.send({
            from: 'Portfolio Contact <onboarding@resend.dev>', // Default Resend testing domain
            to: ['contact@roketag.com'], // Replace with user's actual email eventually
            subject: `[Portfolio] ${subject}`,
            text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
        })

        return NextResponse.json(data)
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}
