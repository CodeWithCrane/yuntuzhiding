import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";

import authRoutes from "./routers/auth.js";
import userRoutes from "./routers/user.js";
import commodityRoutes from "./routers/commodity.js";
import orderRoutes from "./routers/order.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(cors());

console.log(process.env.MONGO_URL);

mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {
        console.log("MongoDB is connected");
        app.listen(8000, () => {
            console.log("Server is running on post: 8000");
        });
    })
    .catch((error) => {
        console.log(error.message);
    });


app.use("/auth", authRoutes);
app.use("/", userRoutes);
app.use("/", commodityRoutes);
app.use("/", orderRoutes);