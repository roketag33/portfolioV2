import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routingConfig';
import { NextRequest, NextResponse } from 'next/server';

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Security Check for Admin Routes
    if (pathname.includes('/admin')) {
        const adminSession = request.cookies.get('admin_session');

        if (!adminSession) {
            // Determine locale (default to 'fr' if not present or invalid)
            const locale = pathname.split('/')[1];
            const validLocale = ['fr', 'en'].includes(locale) ? locale : 'fr';

            return NextResponse.redirect(new URL(`/${validLocale}/login`, request.url));
        }
    }

    return intlMiddleware(request);
}

export const config = {
    // Match all pathnames except for
    // - … if they start with `/api`, `/_next` or `/_vercel`
    // - … the ones containing a dot (e.g. `favicon.ico`)
    matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
};
