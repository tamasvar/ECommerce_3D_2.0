import { groq } from 'next-sanity';

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
