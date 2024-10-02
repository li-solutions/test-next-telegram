import {NextRequest, NextResponse} from 'next/server'
import {jwtVerify} from 'jose';

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || 'your-very-strong-secret');
export default async function middleware(req: NextRequest) {
  const tokenCookie = req.cookies.get('auth'); // Получаем токен из cookies
  const isSignInOrSignUp = req.nextUrl.pathname === '/sign-in' || req.nextUrl.pathname === '/sign-up';
  const isDashboard = req.nextUrl.pathname === '/dashboard';

  if (tokenCookie) {
    const token = tokenCookie.value;

    try {
      await jwtVerify(token, JWT_SECRET);
      if (isSignInOrSignUp) {
        return NextResponse.redirect(new URL('/dashboard', req.url));
      }
    } catch (error) {
      console.error(error)
      if (isDashboard) {
        return NextResponse.redirect(new URL('/sign-in', req.url));
      }
    }
  } else {
    if (isDashboard) {
      return NextResponse.redirect(new URL('/sign-in', req.url));
    }
    if (isSignInOrSignUp) {
      return NextResponse.next();
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard', '/sign-in', '/sign-up'],
}