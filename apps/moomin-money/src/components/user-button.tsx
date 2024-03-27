import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@repo/ui/dropdown-menu';
import { Button } from '@repo/ui/button';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@moomin-money/libs/auth';
import { SignIn, SignOut } from './auth-components';
import { UserAvatar } from './user-avatar';

export default async function UserButton(): Promise<React.ReactElement> {
  const session = await getServerSession(authOptions);
  if (!session?.user) return <SignIn />;
  return (
    <div className="flex gap-2 items-center">
      <span className="hidden text-sm sm:inline-flex">{session.user.email}</span>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="relative w-8 h-8 rounded-full" variant="ghost">
            <UserAvatar user={session.user} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-2 p-2">
              <p className="text-sm font-medium leading-none">{session.user.name}</p>
              <p className="text-xs leading-none text-muted-foreground">{session.user.email}</p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuItem className="flex justify-center p-0">
            <SignOut />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
