import { defineField, defineType } from "sanity";

export const account = defineType({
  name: 'account',
  title: 'Account',
  type: 'document',
  fields: [
    defineField({
      name: 'providerType',
      type: 'string',
    }),
    defineField({
      name: 'providerId',
      type: 'string',
    }),
    defineField({
      name: 'providerAccountId',
      type: 'string',
    }),
    defineField({
      name: 'refreshToken',
      type: 'string',
    }),
    defineField({
      name: 'accessToken',
      type: 'string',
    }),
    defineField({
      name: 'accessTokenExpires',
      type: 'number',
    }),
    {
      name: 'user',
      title: 'user',
      type: 'reference',
      to: [{ type: 'user' }],
    },
  ],
});

