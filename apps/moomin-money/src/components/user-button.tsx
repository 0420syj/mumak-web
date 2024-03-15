import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@repo/ui/dropdown-menu';
import { Button } from '@repo/ui/button';
import { getServerSession } from 'next-auth/next';
import { Avatar, AvatarFallback, AvatarImage } from '@repo/ui/avatar';
import { Skeleton } from '@repo/ui/skeleton';
import { authOptions } from '@moomin-money/libs/auth';
import { SignIn, SignOut } from './auth-components';

export default async function UserButton(): Promise<React.ReactElement> {
  const session = await getServerSession(authOptions);
  if (!session?.user) return <SignIn />;
  return (
    <div className="flex gap-2 items-center">
      <span className="hidden text-sm sm:inline-flex">{session.user.email}</span>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="relative w-8 h-8 rounded-full" variant="ghost">
            <Avatar className="w-8 h-8">
              {session.user.image ? <AvatarImage alt={session.user.name ?? ''} src={session.user.image} /> : null}
              <AvatarFallback asChild>
                <Skeleton className="w-8 h-8 rounded-full" />
              </AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">{session.user.name}</p>
              <p className="text-xs leading-none text-muted-foreground">{session.user.email}</p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuItem>
            <SignOut />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
