import mongoose, { Schema, model }  from "mongoose";
const commentSchema = new Schema({
    kisaanImage:{
        type:String,
    },
    user:{
        type:String
    },
    comment:{
        type:String
    }

},{timestamps:true}
)
export const Comment = model("Comment",commentSchema);