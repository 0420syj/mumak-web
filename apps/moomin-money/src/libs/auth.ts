/* eslint-disable @typescript-eslint/require-await -- safe */
/* eslint-disable @typescript-eslint/no-non-null-assertion -- safe */

import { type NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { getServerSession } from 'next-auth';

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      if (user.email && process.env.GOOGLE_ACCOUNT_LIST!.split(',').includes(user.email)) {
        return true;
      }
      return false;
    },
  },
};

export const isSessionValid = async (): Promise<boolean> => {
  const session = await getServerSession(authOptions);
  return Boolean(session);
};
