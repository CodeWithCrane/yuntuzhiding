import mongoose from "mongoose";


const OrderSchema = new mongoose.Schema({
    orderId: {
        type: String,
        required: true
    },
    user: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    cost: {
        type: Number,
        required: true
    },
    deliveryState: {
        type: String,
        default: "已发货"
    },
    orderState: {
        type: String,
        default: "已完成"
    },
    deliveryTime: {
        type: Date,
        // required: true
        default: new Date()
    },
    handler: {
        type: String,
        default: "crane"
    },
    account: {
        type: Number,
        default: 1
    }
}, {timestamps: true});

const Order = mongoose.model("Order", OrderSchema);

export default Order;