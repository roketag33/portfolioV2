import { NextResponse } from 'next/server'
import { contactSchema } from '@/lib/schemas'
import nodemailer from 'nodemailer'

export async function POST(req: Request) {
    try {
        const body = await req.json()
        const result = contactSchema.safeParse(body)

        if (!result.success) {
            return NextResponse.json({ error: result.error.flatten() }, { status: 400 })
        }

        const { name, email, subject, message } = result.data

        // Check if SMTP config is present
        if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASSWORD) {
            console.error('Missing SMTP Configuration')
            return NextResponse.json({ error: 'Server Misconfiguration' }, { status: 500 })
        }

        // Create Transporter (OVH SMTP)
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: Number(process.env.SMTP_PORT) || 465,
            secure: true, // true for 465, false for other ports
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

        // Send Email
        await transporter.sendMail({
            from: `"${name}" <${process.env.SMTP_USER}>`, // Valid OVH sender
            to: process.env.SMTP_USER, // Send to yourself (contact@alexandresarrazin.fr)
            replyTo: email, // Reply to the visitor's email
            subject: `[Portfolio] ${subject}`,
            text: `Message from: ${name} (${email})\n\n${message}`,
            html: `
                <h3>New Message from Portfolio</h3>
                <p><strong>From:</strong> ${name} (<a href="mailto:${email}">${email}</a>)</p>
                <p><strong>Subject:</strong> ${subject}</p>
                <hr />
                <p>${message.replace(/\n/g, '<br />')}</p>
            `,
        })

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error('Email Send Error:', error)
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}
