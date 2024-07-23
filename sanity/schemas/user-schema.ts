import { defineField, defineType } from "sanity";

export const shippingAddress = {
  title: 'Shipping Address',
  name: 'shippingAddress',
  type: 'object',
  fields: [
    { name: 'name', type: 'string', title: 'Name' },
    { name: 'phone', type: 'string', title: 'Phone' },
    { name: 'country', type: 'string', title: 'Country' },
    { name: 'state', type: 'string', title: 'State' },
    { name: 'lineAddress1', type: 'string', title: 'Address Line 1' },
    { name: 'lineAddress2', type: 'string', title: 'Address Line 2' },
    { name: 'city', type: 'string', title: 'City' },
    { name: 'zip', type: 'string', title: 'ZIP Code' },
  ],
};

export const user = defineType({
  name: 'user',
  title: 'user',
  type: 'document',
  fields: [
    defineField({
      name: 'isAdmin',
      title: 'Is Admin',
      type: 'boolean',
      description: 'Check if the user is admin',
      initialValue: false,
      validation: Rule => Rule.required(),
      //   readOnly: true,
      //   hidden: true,
    }),
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      description: 'Name of the user',
      readOnly: true,
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'url',
    }),
    defineField({
      name: 'password',
      type: 'string',
      hidden: true,
    }),
    defineField({
      name: 'email',
      type: 'string',
      title: 'Email',
    }),
    defineField({
      name: 'emailVerified',
      type: 'datetime',
      hidden: true,
    }),
    defineField({
      name: 'about',
      title: 'About',
      type: 'text',
      description: 'A brief description about the user',
    }),
    defineField({
      name: 'shippingAddress',
      title: 'Shipping Address',
      type: 'shippingAddress',
    }),
  ],
});

