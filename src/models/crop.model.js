import mongoose, { Schema } from "mongoose";

const cropSchema = new Schema({
    rice: { type: Number, default: 0 },
    wheat: { type: Number, default: 0 },
    maize: { type: Number, default: 0 },
});

export const Crop = mongoose.model('Crop', cropSchema);

