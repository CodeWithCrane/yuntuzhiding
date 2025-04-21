import express from "express";
import { getCommodities, getCommodity, addCommodity, updateCommodity, deleteCommodity, search } from "../controllers/commodity.js";

const router = express.Router();

router.get("/commodities", getCommodities);
router.get("/commodities/search", search);
router.get("/commodity/:id", getCommodity);
router.post("/commodity", addCommodity);
router.put("/commodity/:id", updateCommodity);
router.delete("/commodity/:id", deleteCommodity);
router.get("/commodity/search", search);
export default router;