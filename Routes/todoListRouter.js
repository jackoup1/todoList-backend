import { Router } from "express";
import { addTask, clearAllTasks, deleteTask, getAllTasks } from "../controllers/todoListController.js";

const router = Router();

router.get("/",getAllTasks);
router.post("/add",addTask);
router.post("/delete/:id",deleteTask);
router.post("/clear",clearAllTasks);


export default router;