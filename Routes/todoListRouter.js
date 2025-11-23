import { Router } from "express";
import { addTask, clearAllTasks, deleteTask, getAllTasks } from "../controllers/todoListController.js";

const router = Router();

router.get("/",getAllTasks);
router.post("/add",addTask);
router.delete("/delete/:id",deleteTask);
router.delete("/clear",clearAllTasks);


export default router;