import {NextResponse} from 'next/server';
import type {NextRequest} from 'next/server';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL as string;

export async function GET(req: NextRequest) {
  const response = NextResponse.redirect(new URL(BASE_URL, req.url));
  response.cookies.set('auth', '', {
    maxAge: -1,
    path: '/',
  });
  response.cookies.set('telegram_user', '', {
    maxAge: -1,
    path: '/',
  });
  return response;
}
