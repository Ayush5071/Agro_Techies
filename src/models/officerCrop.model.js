import mongoose, { Schema } from 'mongoose';

const cropPriceSchema = new Schema({
    cropName: {
        type: String,
    },
    price: {
        type: Number,
    },
    image:{
        type:String
    },
    totalSelled:{
        type:Number
    }
});

export const cropPrice = mongoose.model('cropPrice', cropPriceSchema);
