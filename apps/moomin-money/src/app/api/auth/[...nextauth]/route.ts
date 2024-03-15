/* eslint-disable @typescript-eslint/no-unsafe-assignment -- safe */

import NextAuth from 'next-auth';
import { authOptions } from '@moomin-money/libs/auth';

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
