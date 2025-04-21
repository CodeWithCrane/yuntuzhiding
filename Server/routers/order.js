import express from "express";
import { getOrders, getOrder, addOrder, updateOrder, deleteOrder, searchOrderByKeyword, searchOrderByOrderState, searchOrderByTime } from "../controllers/order.js";

const router = express.Router();

router.get("/orders", getOrders);
router.get("/order/:id", getOrder);
router.post("/order", addOrder);
router.put("/order/:id", updateOrder);
router.delete("/order/:id", deleteOrder);
router.get("/searchOrderByKeyword", searchOrderByKeyword);
router.get("/searchOrderByOrderState", searchOrderByOrderState);
router.post("/searchOrderByTime", searchOrderByTime);

export default router;