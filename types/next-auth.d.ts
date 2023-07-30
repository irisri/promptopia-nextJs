// my-project/types/next-auth.d.ts

import NextAuth from "next-auth";
// import type { Profile } from 'next-auth';

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    accessToken?: string;
    user?: {
      id: string;
      email: string;
      image: string;
      username: string;
    };
  }

  interface Profile {
    picture?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id_token?: string;
    provider?: string;
    accessToken?: string;
  }
}
