import Commodity from "../models/Commodity.js";

export const getCommodities = async (req, res) => {
    try {
        const commodities = await Commodity.find();
        if (commodities) {
            res.status(200).json(commodities);
        }
    } catch (error) {
        console.log(error.message);
        res.status(400).json(error.message);
    }
};

export const getCommodity = async (req, res) => {
    try {
        const { id } = req.params;
        const commodity = await Commodity.findOne({ _id: id });
        if (!commodity) {
            res.status(404).json("该商品不存在");
            return;
        }
        res.status(200).json(commodity);
    } catch (error) {
        console.log(error);
        res.status(400).json(error.message);
    }
};

export const addCommodity = async (req, res) => {
    try {
        const { name, commodityNumber, category, address, unit, price, inventory, imageURL, description } = req.body;
        console.log(name);
        const commodity = await Commodity.findOne({ name });
        console.log(commodity);
        if (commodity) {
            res.status(409).json("该商品已存在");
            return;
        }
        const newCommodity = new Commodity({ name, commodityNumber, category, address, unit, price, inventory, imageURL, description });
        await newCommodity.save();
        res.status(200).json(newCommodity);
    } catch (error) {
        console.log(error.message);
        res.status(400).json(error.message);
    }
};

export const updateCommodity = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, commodityNumber, category, address, unit, price, inventory, imageURL, description } = req.body;
        const commodity = await Commodity.findByIdAndUpdate(id, {
            $set: {
                name, commodityNumber, category, address, unit, price, inventory, imageURL, description
            }
        });
        if (commodity) {
            res.status(200).json(commodity);
        }
    } catch (error) {
        console.log(error.message);
        res.status(400).json(error.message);
    }
};

export const deleteCommodity = async (req, res) => {
    try {
        const { id } = req.params;
        const commodity = await Commodity.deleteOne({_id: id});
        res.status(200).json("删除成功");
    } catch (error) {
        console.log(error.message);
        res.status(400).json(error.message);
    }
};

export const search = async (req, res) => {
    try {
        const keyword = req.query.keyword.trim();
        console.log(keyword);
        const regex = new RegExp(keyword, "i");
        const commodities = await Commodity.find({
            $or: [
                { name: { $regex: regex} },
                { commodityNumber: { $regex: regex } },
                { category: { $regex: regex } },
                { unit: { $regex: regex } },
                // { price: { $regex: regex } },
                // { inventory: { $regex: regex } },
                { address: { $regex: regex } },
                // { createdAt: { $regex: regex }},
                // { updatedAt: { $regex: regex } },
                // regex对数字，日期都不能适用
            ]
        });
        res.status(200).json(commodities);
    } catch (error) {
        console.log(error.message);
        res.status(400).json(error.message);
    }
};