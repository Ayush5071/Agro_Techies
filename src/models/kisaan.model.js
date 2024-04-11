import mongoose, { Schema } from "mongoose";
import plm from "passport-local-mongoose"

const soldCropSchema = new Schema({
    cropName: String,
    quantitySold: Number,
    pricePerKg: Number,
    totalPrice: Number
});

const kisaanSchema = new Schema({
    username: {
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
        index:true  
    },
    fullName:String,

    password:String,
    email:{
        type:String
    },
    balance : {
        type:Number,
        default:0
    },
    crops : {
        type:Schema.Types.ObjectId,
        ref:"Crop"
    },
    state:String,
    city:String,
    country:String,
    landArea:Number,
    profileImage:String,
    orders : [{
        type:Schema.Types.ObjectId,
        ref:"Order"
    }],
    soldCrops: [soldCropSchema] ,
    balanceHistory:{
        type:Array,
        default:[]
    }
},
{
    timestamps:true
}

)
kisaanSchema.plugin(plm)

export const Kisaan = mongoose.model("Kisaan",kisaanSchema)