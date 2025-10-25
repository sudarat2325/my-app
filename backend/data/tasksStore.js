const { nanoid } = require("nanoid");

// in-memory list
const tasks = [
  { id: nanoid(8), text: "🚀 Build this app", done: false },
  { id: nanoid(8), text: "✅ Push to GitHub", done: true }
];

function getAll() {
  return tasks;
}

function addTask(text) {
  const t = { id: nanoid(8), text, done: false };
  tasks.push(t);
  return t;
}

function toggleDone(id) {
  const t = tasks.find((x) => x.id === id);
  if (!t) return null;
  t.done = !t.done;
  return t;
}

module.exports = {
  getAll,
  addTask,
  toggleDone
};