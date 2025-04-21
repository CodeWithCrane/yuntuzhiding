import express from "express";
import User from "../models/User.js";
import { getUsers, getUser, addUser, updateUser, deleteUser, search } from "../controllers/user.js";
const router = express.Router();

router.get("/users", getUsers);
router.get("/users/search", search);
router.get("/user/:id", getUser);
router.post("/user", addUser);
router.put("/user/:id", updateUser)
router.delete("/user/:id", deleteUser);

export default router;