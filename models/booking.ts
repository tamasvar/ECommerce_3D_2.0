//booking
  export type Order = {
    _id: string;
    id:string;
    products: Array<{
        product: {
          _id: string;
          name: string;
        };
        style: string;
        size: string;
      }>;
    orderdate: string;
    status: 'shipment' | 'process' | 'delivered';
    trackingNumber?: string;
    totalPrice: number;
};