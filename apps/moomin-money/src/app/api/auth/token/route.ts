import { getToken } from 'next-auth/jwt';
import { type NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest): Promise<NextResponse> {
  const token = await getToken({ req: request });
  return NextResponse.json(token);
}
