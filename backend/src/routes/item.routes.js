import { Router } from "express";
import { createItem } from "../controllers/item.controller.js";

const router = Router();

router.route("/create").post(createItem)

export default router;

