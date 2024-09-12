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
    // A session callback marad ugyanaz
    session: async ({ session, token }) => {
      const userEmail = token.email;
      const userIdObj = await sanityClient.fetch<{ _id: string }>(
        `*[_type == "user" && email == $email][0] {
            _id
        }`,
        { email: userEmail }
      );
      return {
        ...session,
        user: {
          ...session.user,
          id: userIdObj._id,
        },
      };
    },

    // A signIn callback, amely e-mailt küld a felhasználónak
    signIn: async ({ user, account, profile }) => {
      try {
        // Ellenőrizd, hogy a profile rendelkezik e-mail címmel
        if (profile?.email) {
          // E-mail küldés a bejelentkezés után
          const response = await fetch('/api/email/welcome', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: profile.email }), // Használjuk a profile.email értéket
          });

          if (!response.ok) {
            throw new Error('Failed to send email');
          }
        }
        return true; // Sikeres bejelentkezés
      } catch (error) {
        console.error('Error sending email:', error);
        return false; // Bejelentkezés meghiúsul, ha hiba történik
      }
    },
  },
};
