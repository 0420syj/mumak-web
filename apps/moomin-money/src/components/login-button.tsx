/* eslint-disable @typescript-eslint/no-non-null-assertion -- safe */

import Link from 'next/link';
import { buttonVariants } from '@ui/components/ui/button';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@moomin-money/app/api/auth/[...nextauth]/route';

export async function LoginButton(): Promise<React.ReactElement> {
  const session = await getServerSession(authOptions);

  return session ? (
    <>
      <h1>{session.user!.name}</h1>
      <Link href="/api/auth/signout">Sign Out</Link>
    </>
  ) : (
    <Link className="hidden md:flex" href="/api/auth/signin">
      <div
        className={buttonVariants({
          size: 'default',
          variant: 'ghost',
        })}
      >
        Login
      </div>
    </Link>
  );
}
