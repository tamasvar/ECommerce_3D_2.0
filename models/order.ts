export type Order = {
  _id: string;
  id: string;
  products: Array<{
    product: {
      _key:string;
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
  formattedAddress?: string;
}
export type CreateOrderDto = {
  id: string;
  user: string;
  products: Array<{
    product: {
      _key: string;
      _id: string;
      name: string;
    };
    style: string;
    size: string;
   
  }>;
  orderdate: string;
  totalPrice: number;
  couponId?: string
  formattedAddress?: string;

};

export type couponUpdateData = {
  _key: string,
  userId: string,
  orderId:string,
  orderDate:string,
  couponId:string
};