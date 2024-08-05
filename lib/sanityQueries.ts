//sanityQueries
import { groq } from 'next-sanity';
export const getProductsQuery = (filter: string, order: string) => groq`${filter} ${order} {
    _id,
    _createdAt,
    name,
    sku,
    images,
    currency,
    sizes,
    size,
    style,
    rating,
    rating_quantity,
    description,
    specdescription,
    isFeatured,
    "slug": slug.current
  }`;
  
  export const getAllReviewsQuery = groq`*[_type == "review"] {
    _id,
    _createdAt,
    text,
    userRating,
    image {
      asset->{
        url
      }
    },
    user->{
      _id,
      name,
      image
    },
    product->
  }`;
  
  export const getReviewRatingsQuery = groq`*[_type == "review"] {
    _id,
    userRating,
    product
  }`;

export const getFeaturedRoomQuery = groq`*[_type == "hotelRoom" && isFeatured == true][0] {
    _id,
    description,
    discount,
    images,
    isFeatured,
    name,
    price,
    slug,
    coverImage
}`;

export const getRoomsQuery = groq`*[_type == "hotelRoom"] {
    _id, 
    coverImage,
    description,
    dimension,
    isBooked,
    isFeatured,
    name,
    price,
    slug,
    type
}`;

export const getRoom = groq`*[_type == "hotelRoom" && slug.current == $slug][0] {
    _id,
    coverImage,
    description,
    dimension,
    discount,
    images,
    isBooked,
    isFeatured,
    name,
    numberOfBeds,
    offeredAmenities,
    price,
    slug,
    specialNote,
    type
}`;

export const getUserOrdersQuery = groq`*[_type == 'order' && user._ref == $userId] {
    _id,
    products[]  {
        product -> {
        _id,
        name,
        slug,
        },
        style,
        size,
    },
    orderdate,
    status,
    trackingNumber,
    totalPrice,
}`;

export const getUserDataQuery = groq`*[_type == 'user' && _id == $userId][0] {
    _id,
    name,
    email,
    isAdmin,
    about,
    _createdAt,
    image,
    shippingAddress
}`;

export const getRoomReviewsQuery = groq`*[_type == "review" && product._ref == $ProductId] {
    _createdAt,
    _id,
    text,
    user -> {
        name
    },
    userRating
}`;

export const getCouponsQuery = groq`*[_type == "coupon" && code == $code][0]{
    _id,
    useLimit,
    isValid,
    usersAvailed,
    discount,
    expirationDate,
    type,
    }`