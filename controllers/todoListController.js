import taskModel from "../models/taskModel.js";

// ------------------------------
// GET /todoList
// ------------------------------
export async function getAllTasks(req, res) {
  try {
    console.log("Getting tasks");
    const userId = req.user.id;
    const todos = await taskModel.find({ authorId: userId });

    res.status(200).json({
      success: true,
      count: todos.length,
      todos,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Error fetching todos" });
  }
}

// ------------------------------
// POST /todoList
// ------------------------------
export async function addTask(req, res) {
  try {
    const userId = req.user.id;

    const newTask = await taskModel.create({
      title: req.body.title,
      content: req.body.content || "",
      authorId: userId,
    });

    res.status(201).json({
      success: true,
      message: "Task added successfully",
      task: newTask,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Error adding todo" });
  }
}

// ------------------------------
// DELETE /todoList/:id
// ------------------------------
export async function deleteTask(req, res) {
  try {
    const deleted = await taskModel.findOneAndDelete({
      _id: req.params.id,
      authorId: req.user.id,
    });

    if (!deleted) {
      return res.status(404).json({ success: false, message: "Task not found" });
    }

    res.json({
      success: true,
      message: "Task deleted successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Error deleting todo" });
  }
}

// ------------------------------
// DELETE /todoList/clear
// ------------------------------
export async function clearAllTasks(req, res) {
  try {
    await taskModel.deleteMany({ authorId: req.user.id });

    res.json({
      success: true,
      message: "All tasks cleared successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Error clearing todos" });
  }
}
