import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(req: NextRequest) {
    // Only protect /admin routes
    if (!req.nextUrl.pathname.startsWith('/admin')) {
        return NextResponse.next()
    }

    const basicAuth = req.headers.get('authorization')

    if (basicAuth) {
        const auth = basicAuth.split(' ')[1]
        const [user, pwd] = Buffer.from(auth, 'base64').toString().split(':')

        const validUser = process.env.ADMIN_USER || 'admin'
        const validPass = process.env.ADMIN_PASSWORD || 'admin'

        if (user === validUser && pwd === validPass) {
            return NextResponse.next()
        }
    }

    return new NextResponse('Authentication required', {
        status: 401,
        headers: {
            'WWW-Authenticate': 'Basic realm="Secure Admin Area"',
        },
    })
}

export const config = {
    matcher: '/admin/:path*',
}
