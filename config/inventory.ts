import { Image } from "sanity"
//product
interface InventoryProduct {
  id: string
  name: string
  image: string
  images: string[]
  universes: string[]
  arts: string[]
  style:string[]
  size: {
    name: string;
    price: number;
  }[];
  currency: string
  description: string
  specdescription: string
  sku: string
  price:number
  sizes:string
  isFeatured: boolean,
}

export interface SanityProduct extends Omit<InventoryProduct, "images"> {
  _id: string
  _createdAt: Date
  slug: string
  images: Image[]
  product_data: {
    size: string
    style: string
  };
  quantity: number
}

export interface Reviews {
  _id: string;
  _createdAt: string;
  text: string;
  userRating: number;
  image?: { asset: { url: string } };
  user: {
    _id: string;
    name: string;
    image: string;
  };
  product: {
    _ref: string;
  };
}