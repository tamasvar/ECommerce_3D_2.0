import { Image } from "sanity"
//product
interface InventoryProduct {
  id: string
  name: string
  image: string
  images: string[]
  categories: string[]
  arts: string[]
  style:string[]
  size: {
    name: string;
    price: number;
  }[];
  currency: string
  description: string
  sku: string
  price:number
  sizes:string
}

export interface SanityProduct extends Omit<InventoryProduct, "images"> {
  _id: string
  _createdAt: Date
  slug: string
  images: Image[]
}

