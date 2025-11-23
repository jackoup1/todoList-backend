import { Router } from "express";
import authRouter from "./authRouter.js";
import todoListRouter from "./todoListRouter.js";
import authMiddleware from "../middleware/authMw.js";

const router = Router();



router.use("/auth",authRouter);
router.use("/todoList",authMiddleware,todoListRouter);

export default router;