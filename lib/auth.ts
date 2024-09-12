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
    // JWT callback, itt küldünk e-mailt, amikor a felhasználó hitelesített
    jwt: async ({ token, account, profile }) => {
      if (account && profile && profile.email) {
        try {
          // Email elküldése az API endpointnak
          const response = await fetch('/api/email/welcome', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: profile.email }), // Email elküldése az API-nak
          });

          if (!response.ok) {
            throw new Error('Failed to send email');
          }

          console.log('Welcome email sent to:', profile.email);
        } catch (error) {
          console.error('Error sending welcome email:', error);
        }

        // Az email hozzáadása a tokenhez
        token.email = profile.email;
      }
      return token;
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
