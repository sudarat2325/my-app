import React, { useEffect, useState } from "react";
import { fetchTasks, createTask, toggleTask } from "./api.js";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  // load once
  useEffect(() => {
    (async () => {
      try {
        const data = await fetchTasks();
        setTasks(data);
      } catch (e) {
        setErr(e.message);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  async function onAdd(e) {
    e.preventDefault();
    if (!text.trim()) return;
    try {
        const newTask = await createTask(text.trim());
        setTasks((prev) => [newTask, ...prev]);
        setText("");
        setErr("");
    } catch (e) {
        setErr(e.message);
    }
  }

  async function onToggle(id) {
    try {
      const updated = await toggleTask(id);
      setTasks((prev) =>
        prev.map((t) => (t.id === id ? updated : t))
      );
    } catch (e) {
      setErr(e.message);
    }
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        padding: "2rem"
      }}
    >
      <div
        style={{
          background:
            "rgba(30, 41, 59, 0.6)",
          border: "1px solid rgba(255,255,255,0.08)",
          boxShadow:
            "0 30px 80px rgba(0,0,0,0.8), 0 0 120px rgba(34,211,238,0.15)",
          borderRadius: "1rem",
          padding: "2rem",
          width: "100%",
          maxWidth: "400px",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)"
        }}
      >
        <h1
          style={{
            fontSize: "1rem",
            fontWeight: 500,
            color: "#38bdf8",
            letterSpacing: "-0.03em",
            margin: 0
          }}
        >
          Mini Taskboard
        </h1>
        <p
          style={{
            fontSize: ".8rem",
            color: "#94a3b8",
            marginTop: ".25rem",
            marginBottom: "1rem"
          }}
        >
          super tiny full-stack app 💻
        </p>

        <form
          onSubmit={onAdd}
          style={{
            display: "flex",
            gap: ".5rem",
            marginBottom: "1rem"
          }}
        >
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Add task..."
            style={{
              flex: 1,
              backgroundColor: "rgba(15,23,42,.6)",
              border: "1px solid rgba(148,163,184,.3)",
              borderRadius: ".5rem",
              color: "white",
              fontSize: ".8rem",
              padding: ".6rem .75rem",
              outline: "none"
            }}
          />
          <button
            type="submit"
            style={{
              backgroundColor: "#0ea5e9",
              border: 0,
              borderRadius: ".5rem",
              padding: ".6rem .8rem",
              color: "#0f172a",
              fontWeight: 600,
              fontSize: ".8rem",
              cursor: "pointer"
            }}
          >
            Add
          </button>
        </form>

        {err && (
          <div
            style={{
              backgroundColor: "rgba(248,113,113,.15)",
              border: "1px solid rgba(248,113,113,.4)",
              color: "#fecaca",
              fontSize: ".7rem",
              padding: ".5rem .75rem",
              borderRadius: ".5rem",
              marginBottom: ".75rem"
            }}
          >
            {err}
          </div>
        )}

        {loading ? (
          <div style={{ color: "#94a3b8", fontSize: ".8rem" }}>
            Loading…
          </div>
        ) : tasks.length === 0 ? (
          <div style={{ color: "#475569", fontSize: ".8rem" }}>
            No tasks yet.
          </div>
        ) : (
          <ul
            style={{
              listStyle: "none",
              margin: 0,
              padding: 0,
              display: "grid",
              gap: ".5rem",
              maxHeight: "260px",
              overflowY: "auto"
            }}
          >
            {tasks.map((t) => (
              <li
                key={t.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  backgroundColor: "rgba(15,23,42,.6)",
                  border: "1px solid rgba(148,163,184,.2)",
                  borderRadius: ".5rem",
                  padding: ".6rem .75rem",
                  fontSize: ".8rem",
                  lineHeight: "1.2rem",
                  cursor: "pointer",
                  color: t.done ? "#475569" : "#f8fafc",
                  textDecoration: t.done ? "line-through" : "none"
                }}
                onClick={() => onToggle(t.id)}
              >
                <span
                  style={{
                    width: ".75rem",
                    height: ".75rem",
                    borderRadius: ".25rem",
                    marginRight: ".5rem",
                    border: t.done
                      ? "2px solid #22c55e"
                      : "2px solid #94a3b8",
                    backgroundColor: t.done
                      ? "#22c55e"
                      : "transparent"
                  }}
                />
                <span style={{ flex: 1 }}>{t.text}</span>
                <span
                  style={{
                    fontSize: ".7rem",
                    color: t.done ? "#22c55e" : "#94a3b8"
                  }}
                >
                  {t.done ? "Done" : "Active"}
                </span>
              </li>
            ))}
          </ul>
        )}

        <div
          style={{
            fontSize: ".7rem",
            color: "#475569",
            marginTop: "1rem",
            textAlign: "center"
          }}
        >
          click item to toggle ✅
        </div>
      </div>
    </div>
  );
}