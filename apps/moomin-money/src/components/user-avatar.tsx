'use client';

import * as React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@repo/ui/avatar';
import { Skeleton } from '@repo/ui/skeleton';

interface User {
  image?: string | null;
  name?: string | null;
}

interface UserAvatarProps {
  user: User;
}

export function UserAvatar({ user }: UserAvatarProps): React.ReactElement {
  return (
    <Avatar className="w-8 h-8">
      {user.image ? <AvatarImage alt={user.name ?? ''} src={user.image} /> : null}
      <AvatarFallback asChild>
        <Skeleton className="w-8 h-8 rounded-full" />
      </AvatarFallback>
    </Avatar>
  );
}
