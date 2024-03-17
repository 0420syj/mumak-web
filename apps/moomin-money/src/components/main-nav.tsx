'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@repo/lib/utils';
import { HomeIcon } from '@radix-ui/react-icons';

export function MainNav(): React.ReactElement {
  const pathname = usePathname();

  return (
    <div className="mr-4 flex">
      <Link className="mr-6 flex items-center space-x-2" href="/">
        <HomeIcon className="w-6 h-6" />
      </Link>
      <nav className="flex items-center gap-6 text-sm">
        <Link
          className={cn(
            'transition-colors hover:text-foreground/80',
            pathname === '/moneybook' ? 'text-foreground' : 'text-foreground/60'
          )}
          href="/moneybook"
        >
          Moneybook
        </Link>
      </nav>
    </div>
  );
}
