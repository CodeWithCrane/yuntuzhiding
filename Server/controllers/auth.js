import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        if (!username || !email || !password || username === '' || email === '' || password === '') {
            res.status(400).json({message: "所有字段都要输入"});
            return ;
        }

        const user = await User.findOne({username});
        if (user) {
            res.status(409).json({message: "该用户已存在"});
            console.log(user);
            return ;
        }

        const hashedPassword = bcrypt.hashSync(password, 10);
        const newUser = new User({ username, email, password: hashedPassword});
        await newUser.save();
        res.status(200).json({message: "注册成功"});
    } catch (error) {
        console.log(error.message);
        res.status(400).json(error.message);
    }
};

export const login = async (req, res) => {
    try {
        const { username, password } = req.body;
      
        if (!username || !password) {
            res.status(400).json({message: "请输入所有字段"});
            return ;
        }

        const user = await User.findOne({username});
        if (!user) {
            res.status(404).json({message: "用户不存在"});
            console.log("用户不存在")
            return ;
        }

        const isValidPassword = await bcrypt.compareSync(password, user.password);
        if (!isValidPassword) {
            console.log("密码错误");
            res.status(400).json({message: "密码错误"});
            return;
        }

        const payload = { userId: user._id};
        const token = jwt.sign(payload, process.env.JWT_SECRET, {
            algorithm: "HS256",
            expiresIn: "12h"
        });

        res
            .status(200)
            .cookie("accessToken", token, {
                httpOnly: true,
                secure: false
            })
            .json(user);
    } catch (error) {
        console.log(error.message);
        res.status(400).json(error.message);
    }
};