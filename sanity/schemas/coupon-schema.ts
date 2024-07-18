import { defineField, defineType } from "sanity";

export const coupon = defineType({
  name: 'coupon',
  title: 'coupon',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Coupon Name',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'type',
      title: 'Coupon Type',
      type: 'string',
      validation: Rule => Rule.required(),
      options: {
        list: ['percentage', 'free_shipping', 'fixed'],
      },
    }),
    defineField({
      name: 'code',
      title: 'Coupon Code',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'discount',
      title: 'Discount Amount',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'expirationDate',
      title: 'Expiration Date',
      type: 'date',
    }),
  ],
});

