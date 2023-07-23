import NextAuth, { Session } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import Auth0Provider from "next-auth/providers/auth0";

import { connectToDB } from "@utils/database";
import User from "@models/user";

export const handler = NextAuth({
  providers: [
    // GoogleProvider({
    //   clientId: process.env.GOOGLE_CLIENT_ID || "",
    //   clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    // }),
    Auth0Provider({
      clientId: process.env.AUTH0_CLIENT_ID || "",
      clientSecret: process.env.AUTH0_CLIENT_SECRET || "",
      issuer: process.env.AUTH0_ISSUER || "",
    }),
  ],
  callbacks: {
    async session({ session }: { session: Session }) {
      console.log("session", session);
      if (!session || !session.user) return session;
      console.log("session user", session.user);

      const sessionUser = await User.findOne({ email: session.user?.email });
      session.user.id = sessionUser._id.toString();

      return session;
    },
    async signIn({ profile }) {
      if (!profile) return false;

      try {
        await connectToDB();
        const userExists = await User.findOne({ email: profile.email });

        if (!userExists) {
          await User.create({
            email: profile?.email,
            username: profile.name?.replace(" ", "").toLocaleLowerCase(),
            image: profile.image,
          });
        }
      } catch (error) {
        console.error(error);
        return false;
      }

      return true;
    },
  },
});

export { handler as GET, handler as POST };
