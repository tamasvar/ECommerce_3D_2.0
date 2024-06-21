import { defineField } from 'sanity';

export const product = {
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: Rule =>
        Rule.required().min(10).error('min 10 Characters'),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {
        source: 'name',
      },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      validation: Rule =>
        Rule.required().min(10).error('Minimum 100 Characters'),
    }),
    defineField({
        name: "images",
        title: "Images",
        type: "array",
        of:[{type:'image'}]
      
    }),
    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'arts',
      title: 'Arts',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'style',
      title: 'Style',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'sku',
      title: 'SKU',
      type: 'string',
    }),
    defineField({
      name: 'reviews',
      title: 'Reviews',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'review' }] }],
    }),
    defineField({
      name: 'currency',
      title: 'Currency',
      type: 'string',
    }),
    defineField({
      name: 'size',
      title: 'Size',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'name',
              title: 'Size Name',
              type: 'string',
            },
            {
              name: 'price',
              title: 'Size Price',
              type: 'number',
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'isFeatured',
      title: 'Is Featured',
      type: 'boolean',
      initialValue: false,
    }),
  ],
};
