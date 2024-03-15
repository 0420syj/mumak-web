import Link from 'next/link';
import { buttonVariants } from '@repo/ui/button';
import { cn } from '@repo/lib';

export function SignIn(): React.ReactElement {
  return (
    <Link
      className={buttonVariants({
        size: 'default',
        variant: 'ghost',
      })}
      href="/api/auth/signin"
    >
      로그인
    </Link>
  );
}

export function SignOut(): React.ReactElement {
  return (
    <Link
      className={cn(
        buttonVariants({
          size: 'default',
          variant: 'ghost',
        }),
        'w-full'
      )}
      href="/api/auth/signout"
    >
      로그아웃
    </Link>
  );
}
