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
    signIn: async ({ user }) => {
      try {
        // Ellenőrizzük, hogy létezik-e már a felhasználó
        const existingUser = await sanityClient.fetch<{ _id: string }>(
          `*[_type == "user" && email == $email][0] {
            _id
          }`,
          { email: user.email }
        );

        // Ha nem létezik a felhasználó (új regisztráció)
        if (!existingUser) {
          // Email küldés a regisztrált felhasználónak
          const response = await fetch('/api/email/welcome', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: user.email }), // Küldjük az új felhasználó email címét
          });

          if (!response.ok) {
            throw new Error('Failed to send welcome email');
          }

          console.log('Welcome email sent to:', user.email);
        }

        // Folytatódik a bejelentkezési folyamat
        return true;
      } catch (error) {
        console.error('Error during signIn process:', error);
        return false;
      }
    },

    // Session callback, ahol a felhasználói adatokat hozzáadjuk a session-höz
    session: async ({ session, token }) => {
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
