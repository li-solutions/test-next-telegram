import {NextRequest, NextResponse} from 'next/server';
import cookie from 'cookie';
import jwt from 'jsonwebtoken';
import {HARDCODED_USER} from "@/lib/constants";

const JWT_SECRET = process.env.JWT_SECRET || 'your-very-strong-secret';

export async function POST(req: NextRequest) {
  const {email, password} = await req.json()
  if (!email || !password) {
    return NextResponse.json({message: 'Password and email are required'}, {status: 400});
  }

  if (email === HARDCODED_USER.email && password === HARDCODED_USER.password) {
    const token = jwt.sign({email}, JWT_SECRET, {
      expiresIn: '10d',
    });
    const cookieHeader = cookie.serialize('auth', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24,
      sameSite: 'strict',
      path: '/',
    });
    return NextResponse.json({message: 'Authenticated successfully', username: HARDCODED_USER.userName}, {
      status: 200,
      headers: {
        'Set-Cookie': cookieHeader,
      },
    });
  } else {
    return NextResponse.json({message: 'Invalid credentials'}, {status: 401});
  }
}
