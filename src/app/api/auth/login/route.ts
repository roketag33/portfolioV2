import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function POST(request: Request) {
    try {
        const body = await request.json()
        const { password } = body
        const adminPassword = process.env.ADMIN_PASSWORD

        if (!adminPassword) {
            console.error('ADMIN_PASSWORD is not set in environment variables')
            return NextResponse.json({ error: 'Server configuration error' }, { status: 500 })
        }

        if (password === adminPassword) {
            const cookieStore = await cookies()
            // Set http-only cookie
            cookieStore.set('admin_session', 'true', {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 60 * 60 * 24 * 7, // 1 week
                path: '/',
            })

            return NextResponse.json({ success: true })
        }

        return NextResponse.json({ error: 'Invalid password' }, { status: 401 })
    } catch (_) {
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}
