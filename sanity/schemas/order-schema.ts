import { defineField, defineType } from "sanity";

export const order = defineType({
  name: 'order',
  title: 'Order',
  type: 'document',
  fields: [
    defineField({
      name: 'orderId',
      title: 'Order ID',
      type: 'string',
      readOnly: true, // Az orderId nem módosítható
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'user',
      title: 'User',
      type: 'reference',
      to: [{ type: 'user' }],
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'products',
      title: 'Products',
      type: 'array', // Tömb típus
      of: [
        {
          type: 'object', // Objektum típus
          fields: [
            {
              name: 'product',
              title: 'Product',
              type: 'reference',
              to: [{ type: 'product' }],
              validation: Rule => Rule.required(), // A termék referencia kötelező
            },
            {
              name: 'style',
              title: 'Style',
              type: 'string', // Stílus típusa
            },
            {
              name: 'size',
              title: 'Size',
              type: 'string', // Méret típusa
            },
          ],
        },
      ],
      validation: Rule => Rule.required().min(1), // Legalább 1 terméket kell választani
    }),
    defineField({
      name: 'orderdate',
      title: 'Order Date',
      type: 'date',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'totalPrice',
      title: 'Total Price',
      type: 'number',
      validation: Rule => Rule.required().min(0),
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'Shipment', value: 'shipment' },
          { title: 'Process', value: 'process' },
          { title: 'Delivered', value: 'delivered' },
        ],
      },
      validation: Rule => Rule.required(),
      initialValue: 'process', // Kezdeti érték beállítása
    }),
    defineField({
      name: 'trackingNumber',
      title: 'Tracking Number',
      type: 'string',
    }),
  ],
});
