import { Router } from "express";
import { createItem, updateItem, deleteItem, getItem } from "../controllers/item.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.use(verifyJWT)
router.route("/create").post(createItem)
router.route("/:itemId").patch(updateItem).delete(deleteItem).get(getItem)


export default router;

