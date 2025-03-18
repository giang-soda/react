import { usersList } from '@/lib/api/server/users';
// import { updateSession } from '@/lib/helpers/session';
import { NextResponse, NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  const users = await usersList(params);
  // await updateSession();
  return NextResponse.json(users);
}

export async function POST(request: Request) {
  const body = await request.json();
  return NextResponse.json({ message: 'Đã tạo người dùng', data: body });
}
