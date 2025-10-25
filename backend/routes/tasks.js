const express = require("express");
const router = express.Router();
const store = require("../data/tasksStore");

// GET /tasks  -> list all
router.get("/", (req, res) => {
  res.json(store.getAll());
});

// POST /tasks {text} -> create new
router.post("/", (req, res) => {
  const { text } = req.body;
  if (!text || text.trim() === "") {
    return res.status(400).json({ error: "text is required" });
  }
  const task = store.addTask(text.trim());
  res.status(201).json(task);
});

// PATCH /tasks/:id/toggle -> flip done true/false
router.patch("/:id/toggle", (req, res) => {
  const { id } = req.params;
  const updated = store.toggleDone(id);
  if (!updated) {
    return res.status(404).json({ error: "task not found" });
  }
  res.json(updated);
});

module.exports = router;