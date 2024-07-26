import { defineField, defineType } from "sanity";

export const coupon = defineType({
  name: 'coupon',
  title: 'Coupon',
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
      validation: Rule => Rule.required().min(new Date().toISOString()),
    }),
    defineField({
      name: 'useLimit',
      title: 'Use Limit',
      type: 'number',
      validation: Rule => Rule.required().min(1),
    }),
    {
      name: 'usersAvailed',
      title: 'Users who availed this coupon',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'userId',
              type: 'reference',
              title: 'User ID',
              to: [{ type: 'user' }], // Reference to user documents
              validation: Rule => Rule.required(),
            },
            {
              name: 'orderId',
              type: 'string',
              title: 'Order ID',
              validation: Rule => Rule.required(),
            },
            {
              name: 'orderDate',
              type: 'datetime',
              title: 'Order Date',
              validation: Rule => Rule.required(),
            },
          ],
        },
      ],
      initialValue: [],
    },
    defineField({
      name: 'isValid',
      title: 'Is Valid',
      type: 'boolean',
      readOnly: true,
      initialValue: false,
      validation: Rule => Rule.custom((field, context) => {
        const { document } = context;

        if (!document || typeof document !== 'object') {
          return ({
            valid: false,
            message: 'Coupon document is invalid'
          });
        }

        const expirationDate = new Date(String(document.expirationDate));
        const currentDate = new Date();

        if (!(expirationDate instanceof Date && !isNaN(expirationDate.getTime()))) {
          return ({
            valid: false,
            message: 'Invalid expiration date format'
          });
        }

        if (expirationDate < currentDate) {
          return ({
            valid: false,
            message: 'Coupon has expired'
          });
        }

        if (typeof document.useLimit !== 'number') {
          return ({
            valid: false,
            message: 'Coupon document is missing user limit'
          });
        }

        if (Array.isArray(document.usersAvailed) && document.usersAvailed.length >= document.useLimit) {
          return ({
            valid: false,
            message: 'Coupon has reached use limit'
          });
        }

        return true; // Validation passed
      }),
    }),
  ],
});
