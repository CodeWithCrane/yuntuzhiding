import mongoose from "mongoose";
const { Schema } = mongoose;

const CommoditySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    commodityNumber: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    address: String,
    unit: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    // 库存
    inventory: Number,
    imageURL: String,
    description: String
}, { timestamps: true});

const Commodity = mongoose.model("Commodity", CommoditySchema);
export default Commodity;