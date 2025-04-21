import mongoose from "mongoose";
const { Schema } = mongoose;

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        required: false,
    },
    role: {
        type: String,
        default: "user"
    },
    imageURL: {
        type: String,
        default: "https://pic.616pic.com/ys_img/00/28/17/opU0KF5A84.jpg"
    },
    phoneNumber: {
        type: "String",
        default: "12345678910"
    },
    address: {
        type: String,
        default: "盐城"
    }
}, { timestamps: true});

const User = mongoose.model("User", UserSchema);
export default User;