import { usersDetail } from '@/lib/api/server/users';
import { NextResponse, NextRequest } from 'next/server';

export async function GET(_request: NextRequest, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const users = await usersDetail(Number(params.id));

  return NextResponse.json(users);
}
