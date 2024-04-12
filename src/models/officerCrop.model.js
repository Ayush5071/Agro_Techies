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
        type:Number,
        default:0
    }
});

export const cropPrice = mongoose.model('cropPrice', cropPriceSchema);
