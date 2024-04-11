import { Schema, model } from 'mongoose';

const reviewSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "user"
      },
    product:String,
    productid:String,
    reviews:String,
    reviewImage:{ 
        type:String
    },
    userImage:String
});

export const Review = model("Review",reviewSchema)
