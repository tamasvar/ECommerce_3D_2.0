import { account } from "./schemas/account-schema"
import { order } from "./schemas/order-schema"
import { product } from "./schemas/product-schema"
import review from "./schemas/review-schema"
import { shippingAddress, user } from "./schemas/user-schema"
import { coupon } from './schemas/coupon-schema'

export const schemaTypes = [
  product, user, shippingAddress, account, order, review, coupon
];

