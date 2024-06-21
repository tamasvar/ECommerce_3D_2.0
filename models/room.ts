//room
    type CoverImage = {
    url: string;
  };
  
  export type Image = {
    _key: string;
    url: string;
  };
  
  type Amenity = {
    _key: string;
    amenity: string;
    icon: string;
  };
  
  type Slug = {
    _type: string;
    current: string;
  };
  
  export type ym = {
    _id: string;
    coverImage: CoverImage;
    description: string;
    dimension: string;
    discount: number;
    images: Image[];
    isBooked: boolean;
    isFeatured: boolean;
    name: string;
    numberOfBeds: number;
    offeredAmenities: Amenity[];
    price: number;
    slug: Slug;
    specialNote: string;
    type: string;
  };
  
  export type CreateOrderDto = {
    id:string;
    user: string;
    products: Array<{
      product: {
        _id: string;
        name: string;
      };
      style: string;
      size: string;
        
    }>;
  orderdate: string;
  totalPrice: number;
  };
