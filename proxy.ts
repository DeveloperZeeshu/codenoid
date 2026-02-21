import rateLimit from "@/config/rateLimit"
import { NextRequest, NextResponse } from "next/server"

const PROTECTED_ROUTES = [
    '/tools',
    '/tools/generate',
    '/tools/explain',
    '/tools/report'
]

const PUBLIC_ROUTES = [
    '/auth/login',
    '/auth/register'
]

const RATE_LIMIT_APIS = [
    '/api/ai',
    '/api/auth/login',
    '/api/auth/register',
    '/api/auth/google'
]

const LIMITERS = {
    ai: rateLimit(5, '1 h'),
    auth: rateLimit(5, '1 m'),
    register: rateLimit(3, '1 m'),
    default: rateLimit(3, '1 m')
};

const ROUTE_TO_LIMITER: Record<string, typeof LIMITERS.ai> = {
    '/api/ai': LIMITERS.ai,
    '/api/auth/login': LIMITERS.auth,
    '/api/auth/register': LIMITERS.register,
    '/api/auth/google': LIMITERS.auth
};

const proxy = async (request: NextRequest) => {
    try {
        const { pathname } = request.nextUrl
        const ip = (request.headers.get('x-forwarded-for') || '127.0.0.1').split(',')[0].trim()

        const matchedRoute = RATE_LIMIT_APIS.find(route =>
            pathname === route || pathname.startsWith(route + '/')
        )

        if (matchedRoute) {
            const limiter = ROUTE_TO_LIMITER[matchedRoute] || LIMITERS.default

            const result = await limiter.limit(ip)
            if (!result.success) {
                return NextResponse.json({
                    ok: false,
                    message: `Too many requests.`
                }, {
                    status: 429,
                    headers: {
                        'X-RateLimit-Limit': result.limit.toString(),
                        'X-RateLimit-Remaining': result.remaining.toString(),
                        'X-RateLimit-Reset': result.reset.toString(),
                    }
                })
            }
        }

        const access = request.cookies.get('access_token')?.value
        const refresh = request.cookies.get('refresh_token')?.value

        const isPublic = PUBLIC_ROUTES.some(p => pathname.startsWith(p))
        const isProtected = PROTECTED_ROUTES.some(p => pathname.startsWith(p))

        if ((access || refresh) && isPublic) {
            return NextResponse.redirect(
                new URL('/', request.url)
            )
        }

        if ((!access && !refresh) && isProtected) {
            return NextResponse.redirect(
                new URL('/auth/login', request.url)
            )
        }

        return NextResponse.next()
    } catch (err: unknown) {
        // console.error('Middleware error:',err)
        return NextResponse.next()
    }
}

export default proxy

export const config = {
    matcher: [
        '/auth/login',
        '/auth/register',
        '/tools/:path*',
        '/api/auth/:path*',
        '/api/ai'
    ]
}