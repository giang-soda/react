import { usersDetail } from '@/lib/api/server/users';
import { getSession, updateSession } from '@/lib/helpers/session';
import { NextResponse, NextRequest } from 'next/server';

export async function GET(_request: NextRequest, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const users = await usersDetail(Number(params.id));
  await updateSession();
  const session = await getSession();
  return NextResponse.json({ ...users, session });
}
