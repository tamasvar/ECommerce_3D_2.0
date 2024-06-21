import { account } from "./schemas/account-schema"
import booking from "./schemas/booking-schema"
import hotelRoom from "./schemas/hotelRoom-schema"
import { order } from "./schemas/order-schema"
import { product } from "./schemas/product-schema"
import review from "./schemas/review-schema"
import { user } from "./schemas/user-schema"

export const schemaTypes = [
  product,user,account,order,review,booking,hotelRoom
];

