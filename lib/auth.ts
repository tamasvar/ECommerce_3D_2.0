import { NextAuthOptions } from 'next-auth';
import { SanityAdapter, SanityCredentials } from 'next-auth-sanity';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';

import sanityClient from '@/sanity/lib/client';

export const authOptions: NextAuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    SanityCredentials(sanityClient),
  ],
  session: {
    strategy: 'jwt',
  },
  adapter: SanityAdapter(sanityClient),
  debug: process.env.NODE_ENV === 'development',
  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {
    async signIn({ user }) {
      const userEmail = user.email;
      const existingUser = await sanityClient.fetch(
        `*[_type == "user" && email == $email][0]`,
        { email: userEmail }
      );
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      if (!existingUser) {
        // User does not exist, send a welcome email
        try {
          await fetch(`${apiUrl}/api/email/welcome`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: user.email }),
          });
        } catch (error) {
          console.error('Error sending welcome email:', error);
        }
      }

      return true; // Continue with the sign-in process
    },

    async session({ session, token }) {
      const userEmail = token.email;
      const userIdObj = await sanityClient.fetch<{ _id: string }>(
        `*[_type == "user" && email == $email][0] {
            _id
        }`,
        { email: userEmail }
      );
      // Visszatérítjük a session-t az ID-val
      return {
        ...session,
        user: {
          ...session.user,
          id: userIdObj._id,
        },
      };
    },
  },
};
