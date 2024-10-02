import {NextRequest, NextResponse} from 'next/server';
import crypto from 'crypto';
import jwt from "jsonwebtoken";
import {dashboardRoute} from "@/lib/appRoutes";

const TELEGRAM_TOKEN = process.env.TELEGRAM_BOT_TOKEN as string;
const JWT_SECRET = process.env.JWT_SECRET || 'your-very-strong-secret';

type TelegramData = {
  id: string,
  first_name: string,
  last_name: string,
  username: string,
  photo_url: string,
  auth_date: string,
  hash: string,
  [key: string]: string;
}

export async function POST(req: NextRequest) {
  const data = await req.json() as TelegramData;

  if (checkTelegramAuth(data)) {
    return prepareRedirectResponse(data, JWT_SECRET)
  }
  // Authentication failed
  return NextResponse.json({status: 'error', message: 'Authentication failed'});
}

export async function GET(req: NextRequest) {
  const {searchParams} = new URL(req.url);
  const data = Object.fromEntries(searchParams.entries()) as TelegramData;
  if (checkTelegramAuth(data)) {
    return prepareRedirectResponse(data, JWT_SECRET)
  }
  return NextResponse.json({status: 'error', message: 'Authentication failed'});
}

function prepareRedirectResponse(data: TelegramData, JWT_SECRET: string) {
  const firstName = decodeURIComponent(data.first_name);
  const LastName = decodeURIComponent(data.last_name);
  const response = NextResponse.redirect(dashboardRoute() + `?userName=${firstName + '|' + LastName}&userAvatar=${data.photo_url}`);
  const token = jwt.sign({data: data.username}, JWT_SECRET, {
    expiresIn: '10d',
  });
  response.cookies.set('auth', token, {
    httpOnly: true,
    secure: true,
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
  });
  return response
}

function checkTelegramAuth(data: TelegramData) {
  const secret = crypto.createHash('sha256').update(TELEGRAM_TOKEN).digest();
  const checkString = Object.keys(data)
  .filter((key) => key !== 'hash')
  .map((key) => `${key}=${data[key]}`)
  .sort()
  .join('\n');
  const hmac = crypto.createHmac('sha256', secret).update(checkString).digest('hex');
  return hmac === data.hash;
}