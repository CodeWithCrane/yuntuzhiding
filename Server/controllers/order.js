import Order from "../models/Order.js";
import moment from "moment";

export const getOrders = async (req, res) => {
    try {
        const orders = await Order.find();
        res.status(200).json(orders);
    } catch (error) {
        console.log(error.message);
        res.status(400).json(error.message);
    }
};

export const getOrder = async (req, res) => {
    try {
        const { id } = req.params;
        const order = await Order.findOne({ _id: id });
        if (order) {
            res.status(200).json(order);
        }    
    } catch (error) {
        console.log(error.message);
        res.status(400).json(error.message);
    }
};

export const addOrder = async (req, res) => {
    try {
        const { user, phoneNumber, address, cost, handler, deliveryTime } = req.body;
        const timestamp = Date.now();
        const randomNumber = Math.floor(Math.random() * 10000);
        // const orderId = "OD-" + new Date().toLocaleString("zh-CN", { year: 'numeric', month: '2-digit', day: '2-digit' }) + "-" + randomNumber;
        const orderId = "OD-" + moment(new Date).format("YYYY-MM-DD") + randomNumber;
        console.log(orderId);
        const order = new Order({user, phoneNumber, address, cost, handler, deliveryTime, orderId});
        console.log(order);
        await order.save();
        res.status(200).json(order);
    } catch (error) {
        console.log(error);
        res.status(400).json(error.message);
    }
};

export const updateOrder = async (req, res) => {
    try {
        const { id } = req.params;
        const { user, phoneNumber, address, cost, handler, deliveryTime, orderState, deliveryState } = req.body;
        console.log(req.body);
        console.log(deliveryState);
        console.log(orderState);
        const order = await Order.findByIdAndUpdate(id, {
            $set: {
                user, phoneNumber, address, cost, handler, deliveryTime, orderState, deliveryState
            }
        }, { new: true});
        res.status(200).json(order);
    } catch (error) {
        console.log(error);
        res.status(400).json(error.message);
    }
};

export const deleteOrder = async (req, res) => {
    try {
        const { id } = req.params;
        await Order.deleteOne({_id: id});
        res.status(200).json("删除成功");
    } catch (error) {
        console.log(error.message);
        res.status(400).json(error.message);
    }
};

export const searchOrderByKeyword = async (req, res) => {
    try {
        const keyword = req.query.keyword.trim();
        const regex = new RegExp(keyword, "i");
        const orders = await Order.find({
            $or: [
                { user: { $regex: regex } },
                { phoneNumber: { $regex: regex} },
                { address: { $regex: regex }},
                { handler: { $regex: regex }},
                { deliveryState: { $regex: regex }},
                { orderState: { $regex: regex }}
            ]
        });
        res.status(200).json(orders);
    } catch (error) {
        console.log(error.message);
        res.status(400).json(error.message);
    }
}

export const searchOrderByOrderState = async (req, res) => {
    try {
        const orderState = req.query.orderState;
        console.log(orderState);
        if (orderState === "全部订单") {
            const orders = await Order.find();
            res.status(200).json(orders);
            return ;
        }
        const orders = await Order.find({ orderState: orderState });
        res.status(200).json(orders);
    } catch (error) {
        console.log(error.message);
        res.status(400).json(error.message);
    }
};

export const searchOrderByTime = async (req, res) => {
    try {
        const { start, end } = req.body;
        console.log(start, end);
        const orders = await Order.find({ createdAt: { $gte: start, $lte: end }});
        console.log(orders);
        res.status(200).json(orders);
    } catch (error) {
        console.log(error.message);
        res.status(400).json(error.message);
    }
}