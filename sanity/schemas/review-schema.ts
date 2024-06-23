//review-schema.ts
import { defineField } from 'sanity';

const review = {
  name: 'review',
  title: 'Review',
  type: 'document',
  fields: [
    defineField({
      name: 'user',
      title: 'User',
      type: 'reference',
      to: [{ type: 'user' }],
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'order',
      title: 'Order',
      type: 'reference',
      to: [{ type: 'order' }],
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'product',
      title: 'Product',
      type: 'reference',
      to: [{ type: 'product' }],
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'text',
      title: 'Review Text',
      type: 'text',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'userRating',
      title: 'User Rating',
      type: 'number',
      validation: Rule =>
        Rule.required().min(1).max(5).error('Rating must be between 1 and 5'),
    }),
    {
      name: 'image',
      title: 'Review Image',
      type: 'image',
      options: {
        accept: ['image/jpeg','image/png']
      }
    },
  ],
};

export default review;
