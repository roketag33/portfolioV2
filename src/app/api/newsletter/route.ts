import { NextResponse } from 'next/server'
import { newsletterSchema } from '@/lib/schemas'
import nodemailer from 'nodemailer'

export async function POST(req: Request) {
    try {
        const body = await req.json()
        const result = newsletterSchema.safeParse(body)

        if (!result.success) {
            return NextResponse.json({ error: result.error.flatten() }, { status: 400 })
        }

        const { email } = result.data

        // Check if SMTP config is present
        if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASSWORD) {
            console.error('Missing SMTP Configuration')
            return NextResponse.json({ error: 'Server Misconfiguration' }, { status: 500 })
        }

        // Create Transporter (OVH SMTP)
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: Number(process.env.SMTP_PORT) || 465,
            secure: true, // true for 465
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD,
            },
        })

        // Verify connection
        try {
            await transporter.verify()
        } catch (error) {
            console.error('SMTP Connection Failed:', error)
            return NextResponse.json({ error: 'Failed to connect to email server' }, { status: 500 })
        }

        // Send Email to Admin
        await transporter.sendMail({
            from: `"Newsletter Bot" <${process.env.SMTP_USER}>`,
            to: process.env.SMTP_USER, // Send to yourself
            subject: `[Portfolio] New Newsletter Subscriber`,
            text: `New subscriber: ${email}`,
            html: `
                <h3>New Newsletter Subscriber! 🚀</h3>
                <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
                <p>Time to send them some cool updates!</p>
            `,
        })

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error('Newsletter Subscription Error:', error)
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}
