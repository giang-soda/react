import { authLogin } from "@/lib/api/server/auth";
import { createSession } from "@/lib/helpers/session";
import { NextResponse, NextRequest } from 'next/server';

export async function POST(request: Request) {
  const body = await request.json();
  const res = await authLogin(body);

  if (!res.ok) {
    return NextResponse.json(res.body, { status: res.status });
  }

  await createSession({
    id: res.body?.data?.id,
  })

  return NextResponse.json({a: 'success'}, {status: 200});
}
