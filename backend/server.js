const express = require("express");
const cors = require("cors");
const tasksRouter = require("./routes/tasks");

const app = express();

// middlewares
app.use(cors()); // allow frontend localhost:5173
app.use(express.json()); // parse JSON body

// health check
app.get("/", (req, res) => {
  res.json({ ok: true, message: "API up 👋" });
});

// tasks api
app.use("/tasks", tasksRouter);

// start server (local development)
if (process.env.NODE_ENV !== 'production') {
  const PORT = 4000;
  app.listen(PORT, () => {
    console.log(`✅ API server running at http://localhost:${PORT}`);
  });
}

// Export for Vercel serverless
module.exports = app;