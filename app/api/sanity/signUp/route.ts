import { signUpHandler } from 'next-auth-sanity';

import sanityClient from '@/sanity/lib/client';

export const POST = signUpHandler(sanityClient);