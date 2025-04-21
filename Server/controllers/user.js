import User from "../models/User.js";

export const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        console.log(error.message);
        res.status(400).json(error.message);
    }
}

export const getUser = async (req, res) => {
    try {
        const { id } = req.params
        const user = await User.findOne({ _id: id });
        res.status(200).json(user);
    } catch (error) {
        console.log(error.message);
    }
};

export const addUser = async (req, res) => {
    try {
        const { username, email, password, phoneNumber, address, unit, price, inventory,imageURL } = req.body;
        const user = await User.findOne({
            $or: [
                { username: username },
                { email: email }
            ]
        });
        if (user) {
            res.status(409).json({ message: "用户已存在" });
            return;
        }
        const newUser = new User({ username, email, password, phoneNumber, address, imageURL });
        await newUser.save();
        res.status(200).json(newUser);
    } catch (error) {
        console.log(error.message);
    }
};

export const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { username, email, password, phoneNumber, address, imageURL } = req.body;
        const user = await User.findByIdAndUpdate({ _id: id }, {
            $set: {
                username,
                email,
                password,
                phoneNumber,
                address,
                imageURL
            }
        },
            { new: true }
        );
        res.status(200).json(user);
    } catch (error) {
        console.log(error.message);
        res.status(400).json(error.message);
    }
};
// 注意findByIdAndUpdate返回的是更新后的文档，但是updateOne返回的是更新操作的结果对象

export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await User.deleteOne({ _id: id });
        res.status(200).json({ message: "删除成功" });
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
        const users = await User.find({
            $or: [
                { username: { $regex: regex } },
                { email: { $regex: regex } },
                { phoneNumber: { $regex: regex } },
                { address: { $regex: regex } }
            ]
        });
        res.status(200).json(users);
    } catch (error) {
        console.log(error.message);
        res.status(400).json(error.message);
    }
};