import express from "express";
import { updateUser } from "../controllers/user.controller.js";
import { verifyToken } from "../middlewares/verifyUser.js";

const router = express.Router();

router.put("/update/:userId", verifyToken, updateUser);

export default router;
