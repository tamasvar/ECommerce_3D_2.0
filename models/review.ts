//review models
export type UpdateReviewDto = {
    reviewId: string;
    reviewText: string;
    userRating: number;
    image?: any; // Optional image field
  };
  
  export type CreateReviewDto = {
    OrderId: string;
    ProductId: string;
    reviewText: string;
    userRating: number;
    userId: string;
    image?: any; // Optional image field
  };
  
  export type Review = {
    text: string;
    user: { name: string };
    userRating: number;
    _createdAt: Date;
    _id: string;
  };
  